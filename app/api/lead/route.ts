/* Endpoint de leads. Réplica de api/lead.js del repo s-peak-landings, portada a
   un Route Handler de App Router.

   Recibe el lead del modal de contacto, lo manda por correo con Resend y lo crea
   en Kommo. Sin dependencias: las dos APIs se llaman con fetch.

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
   sentadas porque servía a una sola landing y que ahora sirven al sitio entero:
   el asunto del correo dice "Landing Inglés para Empresas" siempre, y el campo
   `idioma` cae por defecto a "Inglés" si el cliente no lo manda. Se ajustan
   después de comprobar que este endpoint funciona, no a la vez.

   VARIABLES DE ENTORNO (ninguna con prefijo NEXT_PUBLIC_: son secretas):
     RESEND_API_KEY    sin ella el endpoint responde 500 y no envía nada
     KOMMO_TOKEN       sin ella se omite el lead de Kommo; el correo se manda igual
     KOMMO_SUBDOMAIN   el {x} de {x}.kommo.com; misma consecuencia que la anterior

   OJO CON trailingSlash: el proyecto lo tiene activado, así que este endpoint
   responde en /api/lead/ y una llamada a /api/lead se redirige con un 308. Al
   repuntar el modal hay que apuntar a /api/lead/, con barra. */

const FROM = "S-Peak Landing <hello@mail.s-peak.com>";
const TO = [
  "hola@scndal.com",
  "nblondel@s-peak.com",
  "hola@s-peak.com",
  "michel.l@scndal.com",
];
const SUBJECT = "Nuevo lead - Landing Inglés para Empresas";

// Orígenes permitidos para CORS.
const ALLOWED_ORIGINS = ["https://s-peak.com", "https://www.s-peak.com"];

// Kommo — el lead se crea en el buzón "Leads Entrantes" (Incoming Leads) del
// pipeline Leads B2B por la ruta Unsorted (POST /leads/unsorted/forms). El token
// y el subdominio SOLO se leen de variables de entorno, nunca del código.
const KOMMO_PIPELINE_ID = 7648487;
const KOMMO_REQUEST_TIMEOUT_MS = 7000;

function escapeHtml(value: unknown): string {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
  const idioma = campo(body.idioma) || "Inglés";

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
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const html = `
  <div style="font-family: Arial, Helvetica, sans-serif; color: #111827; max-width: 560px;">
    <h2 style="color:#1A3C4D; margin:0 0 4px;">Nuevo lead — Landing Inglés para Empresas</h2>
    <p style="margin:0 0 16px; color:#6b7280; font-size:14px;">Recibido desde: <strong>${escapeHtml(origen)}</strong></p>
    <table style="border-collapse:collapse; width:100%; font-size:15px;">
      ${rows
        .map(
          ([k, v]) => `
        <tr>
          <td style="padding:8px 12px; background:#F5F7FA; font-weight:bold; border:1px solid #e5e7eb; white-space:nowrap; vertical-align:top;">${escapeHtml(k)}</td>
          <td style="padding:8px 12px; border:1px solid #e5e7eb;">${escapeHtml(v).replace(/\n/g, "<br>")}</td>
        </tr>`
        )
        .join("")}
    </table>
  </div>`;

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
        subject: SUBJECT,
        html,
        text,
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

  // Esperamos a que Kommo termine dentro del ciclo de vida de la función (nunca
  // lanza), pero su resultado no altera el status que devolvemos.
  await kommoDone;

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
