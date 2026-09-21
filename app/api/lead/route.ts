/* Endpoint de leads. Réplica de api/lead.js del repo s-peak-landings, portada a
   un Route Handler de App Router.

   Recibe el lead de los dos formularios del sitio y lo reparte a tres destinos:
   correo con Resend, alta en Kommo y envío al CRM de SCNDAL. Sin dependencias:
   las tres APIs se llaman con fetch. Los tres son independientes entre sí: que
   uno falle no impide a los otros dos, y ninguno cambia lo que ve el visitante.

   Las claves NUNCA se escriben aquí: salen de process.env. Ver el bloque de
   variables al final de este comentario.

   QUÉ CAMBIÓ AL PORTARLO, Y NADA MÁS:
   - La firma: de un handler (req, res) de función serverless a POST y OPTIONS.
   - El cuerpo: Vercel lo parseaba solo; aquí es request.json() dentro de un
     try/catch, que conserva la misma salida 400 de JSON inválido.
   - Las cabeceras de entrada se leen con request.headers.get().
   - Las respuestas se construyen con Response.json y un objeto Headers.
   - El 405: App Router lo devuelve solo, con la cabecera Allow correcta, para
     cualquier método que no se exporte aquí. El original añadía un cuerpo JSON
     que nadie consume; se acepta el nativo y no se exportan más métodos.

   Lo demás es idéntico a propósito, incluidas dos cosas que el original daba por
   sentadas porque servía a una sola landing y que ahora sirve al sitio entero:
   el campo `idioma` cae por defecto a "Inglés" si el cliente no lo manda. Se
   ajusta después de comprobar que este endpoint funciona, no a la vez. El
   asunto ya no es fijo: lo arma asuntoCorreoLead con el origen, el nombre y
   la empresa.

   VARIABLES DE ENTORNO (ninguna con prefijo NEXT_PUBLIC_: son secretas):
     RESEND_API_KEY    sin ella el endpoint responde 500 y no envía nada
     KOMMO_TOKEN       sin ella se omite el lead de Kommo; el correo se manda igual
     KOMMO_SUBDOMAIN   el {x} de {x}.kommo.com; misma consecuencia que la anterior
     CRM_WEBHOOK_SECRET_FORMULARIO  secreto del CRM de SCNDAL para el
                       formulario principal; si falta, la petición se manda
                       igual y el CRM responde 401
     CRM_WEBHOOK_SECRET_WHATSAPP    lo mismo para el modal de WhatsApp

   FILTROS ANTIBOT (añadidos después del porteo): un campo trampa invisible
   (`sitio_web`) que una persona nunca rellena, y el rango reservado de ficción
   555-0100 a 555-0199. Los dos descartan el envío antes de tocar Kommo y
   Resend, y los dos responden 200 con `ok: true` para no darle al bot la señal
   de qué lo detuvo. El motivo se registra con console.warn.

   OJO CON trailingSlash: el proyecto lo tiene activado, así que este endpoint
   responde en /api/lead/ y una llamada a /api/lead se redirige con un 308. Al
   repuntar el modal hay que apuntar a /api/lead/, con barra. */

import { asuntoCorreoLead, plantillaCorreoLead } from "@/lib/correoLead";

const FROM = "S-Peak Landing <hello@mail.s-peak.com>";
const TO = [
  "hola@scndal.com",
  "nblondel@s-peak.com",
  "hola@s-peak.com",
  "michel.l@scndal.com",
];

// Orígenes permitidos para CORS.
const ALLOWED_ORIGINS = ["https://s-peak.com", "https://www.s-peak.com"];

// Kommo — el lead se crea en el buzón "Leads Entrantes" (Incoming Leads) del
// pipeline Leads B2B por la ruta Unsorted (POST /leads/unsorted/forms). El token
// y el subdominio SOLO se leen de variables de entorno, nunca del código.
const KOMMO_PIPELINE_ID = 7648487;
const KOMMO_REQUEST_TIMEOUT_MS = 7000;

/* CRM de SCNDAL — tercer destino, en paralelo al correo y a Kommo.

   Las URLs van como constantes y no en variables de entorno a propósito: no son
   secretas, y una variable que falta produciría una URL rota sin avisar.

   El mapeo origen → destino y origen → secreto es rígido y vive en dos tablas
   separadas, sin recurso de una fuente a la otra: si un secreto se filtra, se
   revoca esa integración y la otra sigue en pie. Un `origen` que no esté en las
   tablas no se envía a ninguna parte. */
const CRM_SCNDAL_URLS: Record<string, string> = {
  "Formulario principal": "https://api.scndal.com/leads/s-peak?source=formulario",
  WhatsApp: "https://api.scndal.com/leads/s-peak?source=whatsapp",
};

const CRM_SCNDAL_VARIABLES: Record<string, string> = {
  "Formulario principal": "CRM_WEBHOOK_SECRET_FORMULARIO",
  WhatsApp: "CRM_WEBHOOK_SECRET_WHATSAPP",
};

const CRM_SCNDAL_TIMEOUT_MS = 7000;

/* Las catorce claves que viajan al CRM: las mismas con que llegan del
   navegador, sin renombrar ni quitar acentos. `sitio_web`, el señuelo antibot,
   no entra aquí: no es un dato del lead y no debe salir del endpoint. */
type LeadCrm = {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  puesto: string;
  mensaje: string;
  origen: string;
  pagina: string;
  idioma: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  gclid: string;
};

/* Rango reservado para ficción de Norteamérica (NANP): los números locales
   555-0100 a 555-0199 no se asignan a nadie, así que un lead con uno es
   inventado. Se mira solo el número local de siete dígitos, sin lada, que es
   lo que define el rango. */
function esTelefonoFicticio(telefono: string): boolean {
  const digitos = telefono.replace(/\D/g, "");
  return /55501\d{2}$/.test(digitos);
}

// Mismo juego de cabeceras que aplicaba applyCors en el original.
function cabecerasCors(request: Request): Headers {
  const cabeceras = new Headers();
  const origin = request.headers.get("origin");
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    cabeceras.set("Access-Control-Allow-Origin", origin);
  }
  cabeceras.set("Vary", "Origin");
  cabeceras.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  cabeceras.set("Access-Control-Allow-Headers", "Content-Type");
  cabeceras.set("Access-Control-Max-Age", "86400");
  return cabeceras;
}

// Petición a la API de Kommo con timeout, para que una llamada lenta no retenga
// la función.
async function kommoFetch(
  url: string,
  token: string,
  method: string,
  body?: unknown
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), KOMMO_REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

type ValoresCampo = { value: string; enum_code: string };
type CampoContacto = { field_code: string; values: ValoresCampo[] };

// Crea el lead en Kommo por la ruta Unsorted para que caiga en el buzón "Leads
// Entrantes" del pipeline Leads B2B, con el contacto (y empresa si viene)
// ligados y SIN responsable: quien lo acepte en Kommo se vuelve el responsable,
// por eso no mandamos user_id ni status_id.
// Nunca lanza: cualquier error se registra en log para que no pase silencioso.
async function sendLeadToKommo({
  nombre,
  empresa,
  correo,
  telefono,
  detalles,
  sourceName,
  request,
}: {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  detalles: string;
  sourceName: string;
  request: Request;
}): Promise<void> {
  const token = process.env.KOMMO_TOKEN;
  const subdomain = process.env.KOMMO_SUBDOMAIN;
  if (!token || !subdomain) {
    console.error(
      "Kommo: faltan variables de entorno; se omite la creación del lead",
      { hasToken: !!token, hasSubdomain: !!subdomain }
    );
    return;
  }

  const base = `https://${subdomain}.kommo.com/api/v4`;
  const nowSec = Math.floor(Date.now() / 1000);
  const ip =
    (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    "0.0.0.0";
  const referer =
    request.headers.get("referer") || request.headers.get("origin") || "";

  // Contacto: nombre + email y teléfono como campos de sistema de Kommo.
  const contactFields: CampoContacto[] = [];
  if (correo) {
    contactFields.push({
      field_code: "EMAIL",
      values: [{ value: correo, enum_code: "WORK" }],
    });
  }
  if (telefono) {
    contactFields.push({
      field_code: "PHONE",
      values: [{ value: telefono, enum_code: "WORK" }],
    });
  }
  const contact: { name: string; custom_fields_values?: CampoContacto[] } = {
    name: nombre || correo || "Contacto sin nombre",
  };
  if (contactFields.length) {
    contact.custom_fields_values = contactFields;
  }

  const leadName = `Lead Web — ${nombre || correo || "Sin nombre"}${
    empresa ? ` (${empresa})` : ""
  }`;

  // NO enviamos responsable ni status_id: el lead entra al buzón de aceptación
  // tal cual.
  const embedded: {
    leads: { name: string; pipeline_id: number }[];
    contacts: typeof contact[];
    companies?: { name: string }[];
  } = {
    leads: [{ name: leadName, pipeline_id: KOMMO_PIPELINE_ID }],
    contacts: [contact],
  };
  if (empresa) {
    embedded.companies = [{ name: empresa }];
  }

  const payload = [
    {
      source_name: sourceName,
      source_uid: `web-${nowSec}-${Math.random().toString(36).slice(2, 10)}`,
      created_at: nowSec,
      pipeline_id: KOMMO_PIPELINE_ID,
      metadata: {
        form_id: "formulario-landing",
        form_name: sourceName,
        form_sent_at: nowSec,
        form_page: referer || "https://s-peak.com",
        ip,
      },
      _embedded: embedded,
    },
  ];

  let leadId: number | null = null;
  try {
    const res = await kommoFetch(
      `${base}/leads/unsorted/forms`,
      token,
      "POST",
      payload
    );
    const text = await res.text().catch(() => "");
    if (!res.ok) {
      console.error(
        "Kommo: fallo al crear el lead (unsorted/forms):",
        res.status,
        text
      );
      return;
    }
    try {
      const data = JSON.parse(text);
      const unsorted =
        (((data._embedded || {}).unsorted || [])[0] || {})._embedded || {};
      leadId = unsorted.leads && unsorted.leads[0] ? unsorted.leads[0].id : null;
    } catch {
      // Si no podemos parsear el ID, el lead ya se creó; solo perderíamos la nota.
    }
  } catch (err) {
    console.error(
      "Kommo: excepción al crear el lead (unsorted/forms):",
      String((err as Error)?.message || err)
    );
    return;
  }

  // Nota con los detalles del formulario, para que se vean al aceptar el lead
  // en el buzón.
  if (leadId && detalles) {
    try {
      const noteRes = await kommoFetch(
        `${base}/leads/${leadId}/notes`,
        token,
        "POST",
        [{ note_type: "common", params: { text: detalles } }]
      );
      if (!noteRes.ok) {
        const noteText = await noteRes.text().catch(() => "");
        console.error(
          "Kommo: lead creado pero falló la nota con los detalles:",
          noteRes.status,
          noteText
        );
      }
    } catch (err) {
      console.error(
        "Kommo: lead creado pero excepción al agregar la nota:",
        String((err as Error)?.message || err)
      );
    }
  }
}

/* Envío al CRM de SCNDAL. Aislado como el de Kommo: no lanza nunca, tiene su
   propio timeout y su resultado no altera la respuesta al visitante. Si esto
   falla, el correo y Kommo salen igual y el navegador ve éxito. */
async function enviarLeadACrmScndal(lead: LeadCrm): Promise<void> {
  const url = CRM_SCNDAL_URLS[lead.origen];
  const variable = CRM_SCNDAL_VARIABLES[lead.origen];

  /* Sin entrada en el mapeo no hay destino ni secreto que usar, y no se
     improvisa uno: no enviar y dejar constancia. Hoy no debería ocurrir —los
     dos formularios mandan siempre uno de los dos literales—, pero la ruta pone
     "Desconocido" si el campo llega vacío y un tercer formulario futuro caería
     aquí sin que nadie se enterase. */
  if (!url || !variable) {
    console.error(
      "CRM SCNDAL: origen sin destino en el mapeo; el lead no se envía",
      { origen: lead.origen }
    );
    return;
  }

  /* Si falta el secreto se manda igual, con la cabecera presente y vacía: el
     CRM responderá 401 y ese 401 queda en el log, que es rastreable. Un envío
     que nunca ocurre no lo es. El console.error nombra la variable para que en
     el log se vea la causa y no solo el síntoma. */
  const secreto = process.env[variable] ?? "";
  if (!secreto) {
    console.error(
      `CRM SCNDAL: falta la variable ${variable}; se envía igual para que el 401 quede registrado`,
      { origen: lead.origen }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CRM_SCNDAL_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secreto}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
      signal: controller.signal,
    });
    if (!res.ok) {
      const detalle = await res.text().catch(() => "");
      console.error(
        "CRM SCNDAL: el destino rechazó el lead:",
        res.status,
        detalle.slice(0, 300),
        { origen: lead.origen }
      );
    }
  } catch (err) {
    console.error(
      "CRM SCNDAL: excepción al enviar el lead:",
      String((err as Error)?.message || err),
      { origen: lead.origen }
    );
  } finally {
    clearTimeout(timeout);
  }
}

// Preflight CORS.
export async function OPTIONS(request: Request): Promise<Response> {
  return new Response(null, { status: 204, headers: cabecerasCors(request) });
}

export async function POST(request: Request): Promise<Response> {
  const headers = cabecerasCors(request);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Falta la variable de entorno RESEND_API_KEY");
    return Response.json(
      { ok: false, error: "Configuración del servidor incompleta" },
      { status: 500, headers }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) || {};
  } catch {
    return Response.json(
      { ok: false, error: "JSON inválido" },
      { status: 400, headers }
    );
  }

  // Mismo criterio que el original: los valores falsy se tratan como vacíos.
  const campo = (valor: unknown): string => (valor ? String(valor) : "").trim();

  const nombre = campo(body.nombre);
  const empresa = campo(body.empresa);
  const correo = campo(body.correo);
  const telefono = campo(body.telefono);
  const puesto = campo(body.puesto);
  const mensaje = campo(body.mensaje);
  const origen = campo(body.origen) || "Desconocido";
  // Página desde la que se envió el formulario: la manda el front
  // (window.location.href). Respaldo: el referer del navegador. Si no hay
  // ninguno, se marca como no especificada.
  const pagina =
    campo(body.pagina) ||
    (request.headers.get("referer") || "").trim() ||
    "No especificada";

  // Etiquetas internas: UTMs de la URL e idioma fijo de la landing.
  const noEspecificado = "No especificado";
  const utmSource = campo(body.utm_source) || noEspecificado;
  const utmMedium = campo(body.utm_medium) || noEspecificado;
  const utmCampaign = campo(body.utm_campaign) || noEspecificado;
  const utmContent = campo(body.utm_content) || noEspecificado;
  /* Identificador de clic de Google Ads. Llega en su propio campo y no dentro
     de utm_content: los dos formularios lo mandan siempre que exista, con UTM
     o sin ellos, para poder cerrar el círculo con Ads desde el CRM. */
  const gclid = campo(body.gclid) || noEspecificado;
  const idioma = campo(body.idioma) || "Inglés";

  /* FILTROS ANTIBOT. Van antes que la validación de campos obligatorios para
     que el descarte sea siempre la misma respuesta, pase lo que pase con el
     resto del formulario: al bot se le contesta 200 y `ok: true`, igual que a
     un envío bueno, para no decirle qué lo delató. Ni Kommo ni Resend llegan a
     enterarse; el motivo queda en el log del servidor. */
  const trampa = campo(body.sitio_web);
  if (trampa) {
    console.warn("Lead descartado: campo trampa relleno", {
      origen,
      pagina,
      // Recortado: solo interesa ver que venía algo y de qué pinta.
      sitio_web: trampa.slice(0, 80),
    });
    return Response.json({ ok: true }, { status: 200, headers });
  }

  if (telefono && esTelefonoFicticio(telefono)) {
    console.warn("Lead descartado: teléfono en el rango ficticio 555-01XX", {
      origen,
      pagina,
      telefono,
    });
    return Response.json({ ok: true }, { status: 200, headers });
  }

  // Validación mínima: nombre y correo son indispensables para un lead útil.
  if (!nombre || !correo) {
    return Response.json(
      { ok: false, error: "Faltan campos obligatorios (nombre y correo)" },
      { status: 400, headers }
    );
  }

  const noProporcionado = "No proporcionado";
  const rows: [string, string][] = [
    ["Origen", origen],
    ["Página", pagina],
    ["Nombre", nombre],
    ["Empresa", empresa || noProporcionado],
    ["Correo", correo],
    ["Teléfono", telefono || noProporcionado],
    ["Puesto", puesto || noProporcionado],
    ["Mensaje", mensaje || noProporcionado],
    ["Idioma", idioma],
    ["UTM Source", utmSource],
    ["UTM Medium", utmMedium],
    ["UTM Campaign", utmCampaign],
    ["UTM Content", utmContent],
    ["GCLID", gclid],
  ];

  /* `rows` alimenta los dos destinos: la tabla del correo de Resend y, como
     texto plano, la nota que se cuelga del lead en Kommo. Añadir una fila aquí
     la propaga a ambos; no hay que tocar nada más. */

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  /* El cuerpo del correo sale de lib/correoLead.ts: solo presentación, con
     los mismos valores que `rows`. `text` se queda como estaba porque es la
     nota de Kommo; el correo lleva su propia versión en texto plano, en el
     orden de la plantilla. */
  const asunto = asuntoCorreoLead(origen, nombre, empresa);
  const correoLead = plantillaCorreoLead({
    origen,
    pagina,
    nombre,
    empresa: empresa || noProporcionado,
    puesto: puesto || noProporcionado,
    correo,
    telefono: telefono || noProporcionado,
    mensaje: mensaje || noProporcionado,
    idioma,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    gclid,
    fecha: new Date(),
    asunto,
  });

  // Kommo (fire-and-forget): arrancamos la creación del lead en paralelo al
  // correo. Su resultado NUNCA cambia la respuesta al cliente: el correo se
  // manda y la conversión se dispara aunque Kommo falle. sendLeadToKommo ya
  // captura todo; el .catch es cinturón extra.
  const sourceName = `Formulario Sitio Web${
    origen && origen !== "Desconocido" ? ` — ${origen}` : ""
  }`;
  const kommoDone = sendLeadToKommo({
    nombre,
    empresa,
    correo,
    telefono,
    detalles: text,
    sourceName,
    request,
  }).catch((err) => {
    console.error(
      "Kommo: excepción no controlada al crear el lead:",
      String((err as Error)?.message || err)
    );
  });

  /* CRM de SCNDAL, tercer destino y mismo trato que Kommo: arranca en paralelo
     al correo y su resultado no cambia lo que ve el visitante. Los valores son
     los ya normalizados, los mismos que alimentan el correo y la nota; los
     campos opcionales que el visitante no llenó viajan como cadena vacía, que
     es el dato real. El "No proporcionado" del correo es presentación de la
     tabla, no un valor, y no sale de ahí. */
  const crmScndalDone = enviarLeadACrmScndal({
    nombre,
    empresa,
    correo,
    telefono,
    puesto,
    mensaje,
    origen,
    pagina,
    idioma,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    utm_content: utmContent,
    gclid,
  }).catch((err) => {
    console.error(
      "CRM SCNDAL: excepción no controlada:",
      String((err as Error)?.message || err)
    );
  });

  let emailStatus: "ok" | "failed" | "error";
  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: TO,
        subject: asunto,
        html: correoLead.html,
        text: correoLead.texto,
        // Responder al correo va directo al lead.
        reply_to: correo,
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text().catch(() => "");
      console.error("Error de Resend:", resendRes.status, detail);
      emailStatus = "failed";
    } else {
      emailStatus = "ok";
    }
  } catch (err) {
    console.error("Excepción al enviar con Resend:", err);
    emailStatus = "error";
  }

  /* Esperamos a que Kommo y el CRM de SCNDAL terminen dentro del ciclo de vida
     de la función —ninguno lanza—, para que la serverless no muera con una
     petición a medias. Sus resultados no alteran el status que devolvemos. */
  await Promise.all([kommoDone, crmScndalDone]);

  if (emailStatus === "ok") {
    return Response.json({ ok: true }, { status: 200, headers });
  }
  if (emailStatus === "failed") {
    return Response.json(
      { ok: false, error: "No se pudo enviar el correo" },
      { status: 502, headers }
    );
  }
  return Response.json(
    { ok: false, error: "Error inesperado al enviar el correo" },
    { status: 500, headers }
  );
}
