/* Atribución de leads: de dónde viene quien envía cualquiera de los dos
   formularios del sitio.

   Nació como port de window.collectLeadTags, el guion inline de la landing de
   inglés, y durante un tiempo convivió con esa copia porque el modal de
   WhatsApp seguía siendo DOM suelto y no podía importar un módulo. Ya no:
   FlotanteWhatsApp.tsx es React y usa esta pieza, así que la copia se borró y
   esta es la única. El formulario de contacto y el de WhatsApp mandan el mismo
   payload y se distinguen solo por `origen`. */

/* El valor con el que se rellena cualquier campo de atribución que no venga.
   Se exporta porque el modal de WhatsApp lo consulta: es como distingue una
   ruta de /idioma/ del resto del sitio para redactar su mensaje. */
export const NO_ESPECIFICADO = "No especificado";
const CLAVE_SESION = "speak_attribution";

/* El endpoint propio del proyecto, en app/api/lead/route.ts.
   LA BARRA FINAL NO SOBRA: el proyecto tiene trailingSlash activado, así que
   /api/lead responde con un 308 hacia /api/lead/. La redirección preserva
   método y cuerpo, o sea que funcionaría igual, pero con un salto de más en
   cada envío. No la quites. */
export const ENDPOINT_LEAD = "/api/lead/";

/* El idioma se deducía de la página porque el guion solo existía en la landing
   de inglés. Ahora que el modal es de todo el sitio, sale de la ruta. Las cinco
   páginas de idioma que faltan quedan resueltas de antemano. */
const IDIOMA_POR_RUTA: Record<string, string> = {
  "/idioma/ingles-para-empresas": "Inglés",
  "/idioma/frances-para-empresas": "Francés",
  "/idioma/aleman-para-empresas": "Alemán",
  "/idioma/italiano-para-empresas": "Italiano",
  "/idioma/portugues-para-empresas": "Portugués",
  "/idioma/espanol-para-empresas": "Español para extranjeros",
};

/* Las opciones del campo de idioma de los dos formularios. Los valores de
   IDIOMA_POR_RUTA están todos aquí, para que el de la página se pueda
   preseleccionar. */
export const OPCIONES_IDIOMA = [
  "Inglés",
  "Francés",
  "Alemán",
  "Portugués",
  "Italiano",
  "Español para extranjeros",
  "Varios idiomas",
];

export function idiomaDeRuta(ruta: string): string {
  // El sitio usa trailingSlash, así que la ruta puede llegar con barra o sin ella.
  const limpia = ruta.replace(/\/+$/, "");
  return IDIOMA_POR_RUTA[limpia] ?? NO_ESPECIFICADO;
}

export type Atribucion = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  gclid: string;
  idioma: string;
  pagina: string;
  /* La fuente de tráfico ya clasificada ("Google Ads", "ChatGPT", "Google
     orgánico"…): la de la primera visita y la de esta. Van al final a
     propósito, después de las claves de siempre. Ver FUENTE DE TRÁFICO. */
  fuente_original: string;
  fuente_visita: string;
};

const CLAVES_ATRIBUCION = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "gclid",
] as const;

/* PERSISTENCIA. El gclid y los UTM se guardan en localStorage, con la fecha en
   que se guardaron, para que sobrevivan aunque el visitante cierre el navegador
   y vuelva otro día. Vencen a los 90 días, la ventana máxima de conversión de
   Google Ads: pasado ese plazo se borran y se tratan como si no existieran.
   Si el navegador bloquea localStorage, todo sigue funcionando con lo que traiga
   la URL, solo que sin memoria. */
const VIGENCIA_MS = 90 * 24 * 60 * 60 * 1000;

type Guardado = { datos: Record<string, string>; guardado: number };

/* Si la URL trae alguno, reemplaza lo guardado entero y reinicia los 90 días:
   es una visita de campaña nueva y no debe mezclarse con la anterior. Si no
   trae ninguno, no toca nada. */
export function guardarAtribucion(): void {
  guardarFuentes();
  try {
    const params = new URLSearchParams(window.location.search);
    const datos: Record<string, string> = {};
    for (const clave of CLAVES_ATRIBUCION) {
      const valor = (params.get(clave) || "").trim();
      if (valor) datos[clave] = valor;
    }
    if (Object.keys(datos).length === 0) return;
    const registro: Guardado = { datos, guardado: Date.now() };
    localStorage.setItem(CLAVE_SESION, JSON.stringify(registro));
  } catch {
    // localStorage bloqueado: el envío sigue leyendo la URL.
  }
}

// Lo guardado y vigente, o vacío. Si venció o no se entiende, se borra.
function leerGuardado(): Record<string, string> {
  try {
    const crudo = localStorage.getItem(CLAVE_SESION);
    if (!crudo) return {};
    const registro = JSON.parse(crudo) as Partial<Guardado> | null;
    const vigente =
      registro &&
      typeof registro.guardado === "number" &&
      registro.datos &&
      typeof registro.datos === "object" &&
      Date.now() - registro.guardado <= VIGENCIA_MS;
    if (!vigente) {
      localStorage.removeItem(CLAVE_SESION);
      return {};
    }
    return registro.datos as Record<string, string>;
  } catch {
    return {};
  }
}

/* Respaldo para cuando no hay nada guardado: la cookie _gcl_aw que crea el
   Vinculador de Conversiones de GTM. Su valor es GCL.<marca de tiempo>.<gclid>. */
function gclidDeCookie(): string {
  try {
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("_gcl_aw="));
    if (!cookie) return "";
    const partes = decodeURIComponent(cookie.slice("_gcl_aw=".length)).split(".");
    return partes.length >= 3 ? partes.slice(2).join(".").trim() : "";
  } catch {
    return "";
  }
}

/* FUENTE DE TRÁFICO. De dónde llegó el visitante, en una etiqueta legible para
   el correo de leads. Dos lecturas:

   - Original: la de la primera visita. Se guarda en localStorage y se conserva
     90 días, la misma vigencia que el gclid; mientras esté vigente no se pisa.
   - Visita: la de esta sesión. Se guarda en sessionStorage al llegar. Una
     llegada externa posterior en la misma pestaña (otro clic de anuncio, otro
     buscador) la reemplaza; recargar o llegar desde el propio sitio, no.

   Se lee una sola vez por carga de documento: al navegar dentro del sitio,
   document.referrer sigue siendo el de la llegada y volver a clasificar no
   aporta nada. De la referencia se guarda solo el dominio, nunca la URL. */
const CLAVE_FUENTE_ORIGINAL = "speak_fuente_original";
const CLAVE_FUENTE_VISITA = "speak_fuente_visita";
const DIRECTO = "Directo";

// Dominios del sitio: una llegada desde aquí no es una fuente nueva.
const DOMINIOS_PROPIOS = ["s-peak.com"];

const ASISTENTES_IA: [string, string][] = [
  ["chatgpt.com", "ChatGPT"],
  ["openai.com", "ChatGPT"],
  ["perplexity.ai", "Perplexity"],
  ["gemini.google.com", "Gemini"],
  ["copilot.microsoft.com", "Copilot"],
  ["claude.ai", "Claude"],
];

const REDES: [string, string][] = [
  ["linkedin.com", "LinkedIn"],
  ["facebook.com", "Facebook"],
  ["instagram.com", "Instagram"],
  ["t.co", "X"],
  ["x.com", "X"],
];

// El dominio o cualquiera de sus subdominios (www., l., m., search.…).
function esDominio(host: string, dominio: string): boolean {
  return host === dominio || host.endsWith(`.${dominio}`);
}

function buscarEn(lista: [string, string][], valor: string): string {
  return lista.find(([dominio]) => esDominio(valor, dominio))?.[1] ?? "";
}

function buscadorOrganico(host: string): string {
  // google.com, google.com.mx, google.co.uk…, con o sin www.
  if (/(^|\.)google\.[a-z]{2,3}(\.[a-z]{2})?$/.test(host)) return "Google orgánico";
  if (esDominio(host, "bing.com")) return "Bing orgánico";
  if (esDominio(host, "duckduckgo.com")) return "DuckDuckGo orgánico";
  if (esDominio(host, "yahoo.com")) return "Yahoo orgánico";
  return "";
}

/* Clasifica una llegada. `referencia` es solo el dominio, ya sin "www." y sin
   las visitas internas. Orden de prioridad: Google Ads, asistentes de IA, otra
   campaña con UTM, buscadores, redes, otro sitio y directo. */
export function clasificarFuente(
  params: { utm_source: string; utm_medium: string; gclid: string },
  referencia: string
): string {
  const fuente = params.utm_source.toLowerCase();
  const medio = params.utm_medium.toLowerCase();

  if (params.gclid || ((medio === "cpc" || medio === "ppc") && fuente === "google")) {
    return "Google Ads";
  }

  const ia = buscarEn(ASISTENTES_IA, fuente) || buscarEn(ASISTENTES_IA, referencia);
  if (ia) return ia;

  if (params.utm_source || params.utm_medium) {
    return [params.utm_source, params.utm_medium].filter(Boolean).join(" / ");
  }

  if (referencia) {
    return buscadorOrganico(referencia) || buscarEn(REDES, referencia) || referencia;
  }

  return DIRECTO;
}

/* El dominio de document.referrer, sin "www.". Vacío si no hay referencia o si
   es el propio sitio (o el mismo host, para que en local y en las vistas
   previas tampoco cuente). */
function dominioDeReferencia(): string {
  try {
    if (!document.referrer) return "";
    const host = new URL(document.referrer).hostname.toLowerCase().replace(/^www\./, "");
    const propio =
      host === window.location.hostname.toLowerCase().replace(/^www\./, "") ||
      DOMINIOS_PROPIOS.some((d) => esDominio(host, d));
    return propio ? "" : host;
  } catch {
    return "";
  }
}

// La llegada actual, clasificada, y si trae señal propia (UTM, gclid o una
// referencia externa) o es solo una recarga o una visita interna.
function llegadaActual(): { fuente: string; conSenal: boolean } {
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    params = new URLSearchParams();
  }
  const leer = (clave: string) => (params.get(clave) || "").trim();
  const datos = {
    utm_source: leer("utm_source"),
    utm_medium: leer("utm_medium"),
    gclid: leer("gclid"),
  };
  const referencia = dominioDeReferencia();
  return {
    fuente: clasificarFuente(datos, referencia),
    conSenal: Boolean(datos.utm_source || datos.utm_medium || datos.gclid || referencia),
  };
}

let fuenteLeida = false;

/* Guarda las dos fuentes. La llama guardarAtribucion en cada carga y en cada
   navegación, pero solo actúa una vez por documento. */
function guardarFuentes(): void {
  if (fuenteLeida) return;
  fuenteLeida = true;
  const { fuente, conSenal } = llegadaActual();

  try {
    const crudo = localStorage.getItem(CLAVE_FUENTE_ORIGINAL);
    const registro = crudo ? (JSON.parse(crudo) as Partial<{ fuente: string; guardado: number }>) : null;
    const vigente =
      registro &&
      typeof registro.fuente === "string" &&
      typeof registro.guardado === "number" &&
      Date.now() - registro.guardado <= VIGENCIA_MS;
    if (!vigente) {
      localStorage.setItem(
        CLAVE_FUENTE_ORIGINAL,
        JSON.stringify({ fuente, guardado: Date.now() })
      );
    }
  } catch {
    // localStorage bloqueado: recogerFuentes cae a la llegada actual.
  }

  try {
    if (conSenal || !sessionStorage.getItem(CLAVE_FUENTE_VISITA)) {
      sessionStorage.setItem(CLAVE_FUENTE_VISITA, fuente);
    }
  } catch {
    // sessionStorage bloqueado: lo mismo.
  }
}

/* Las dos fuentes para el envío. Sin almacenamiento, las dos son la llegada
   actual: es lo único que se sabe. */
function recogerFuentes(): { fuente_original: string; fuente_visita: string } {
  let original = "";
  let visita = "";
  try {
    const crudo = localStorage.getItem(CLAVE_FUENTE_ORIGINAL);
    const registro = crudo ? (JSON.parse(crudo) as Partial<{ fuente: string }>) : null;
    original = typeof registro?.fuente === "string" ? registro.fuente : "";
  } catch {
    original = "";
  }
  try {
    visita = sessionStorage.getItem(CLAVE_FUENTE_VISITA) || "";
  } catch {
    visita = "";
  }
  if (!original || !visita) {
    const actual = llegadaActual().fuente;
    original = original || actual;
    visita = visita || actual;
  }
  return { fuente_original: original, fuente_visita: visita };
}

export function recogerAtribucion(idioma: string): Atribucion {
  let params: URLSearchParams | null;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    params = null;
  }

  let guardado: Record<string, string> = leerGuardado();
  if (Object.keys(guardado).length === 0) {
    const gclidCookie = gclidDeCookie();
    if (gclidCookie) guardado = { gclid: gclidCookie };
  }

  // Prioridad por campo: 1) query actual en la URL, 2) valor guardado y
  // vigente, o el gclid de la cookie _gcl_aw si no hay nada guardado, 3) vacío.
  const crudo = (clave: string): string => {
    const enVivo = params ? (params.get(clave) || "").trim() : "";
    if (enVivo) return enVivo;
    return (guardado[clave] ?? "").toString().trim();
  };

  let utmSource = crudo("utm_source");
  let utmMedium = crudo("utm_medium");
  const utmCampaign = crudo("utm_campaign");
  const utmContent = crudo("utm_content");
  const gclid = crudo("gclid");

  /* El gclid viaja en su propio campo y se manda SIEMPRE que exista, vengan o
     no los UTM. Antes se colaba en utm_content solo cuando no había utm_source,
     así que una campaña con UTM completos perdía el identificador de clic: lo
     que llegaba al CRM no permitía cerrar el círculo con Google Ads.

     Lo que sí se conserva del comportamiento anterior es marcar origen
     google/cpc cuando hay gclid y no hay UTM: eso es atribución de fuente, no
     transporte del gclid, y sin ello ese lead entraría como "No especificado". */
  if (!utmSource && gclid) {
    utmSource = "google";
    if (!utmMedium) utmMedium = "cpc";
  }

  return {
    utm_source: utmSource || NO_ESPECIFICADO,
    utm_medium: utmMedium || NO_ESPECIFICADO,
    utm_campaign: utmCampaign || NO_ESPECIFICADO,
    utm_content: utmContent || NO_ESPECIFICADO,
    gclid: gclid || NO_ESPECIFICADO,
    idioma,
    // Dirección completa de la página desde la que se envió el formulario.
    pagina: (() => {
      try {
        return window.location.href;
      } catch {
        return "";
      }
    })(),
    ...recogerFuentes(),
  };
}

export type PayloadLead = {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  puesto: string;
  mensaje: string;
  origen: string;
  /* Campo trampa. Va siempre, y siempre vacío desde una persona: los dos
     formularios lo pintan invisible (clase `sp-trampa`) y el endpoint descarta
     el envío si llega con algo. Ver app/api/lead/route.ts. */
  sitio_web: string;
  /* Casilla trampa: "si" si llega marcada, vacía desde una persona. Misma
     lógica que `sitio_web`, para el bot que marca casillas en vez de, o además
     de, rellenar textos. */
  recibir_novedades: string;
} & Atribucion;

// Lanza si la respuesta no es ok.
export async function enviarLead(payload: PayloadLead): Promise<void> {
  const res = await fetch(ENDPOINT_LEAD, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
}
