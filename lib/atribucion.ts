/* Atribución de leads: de dónde viene quien envía cualquiera de los dos
   formularios del sitio.

   Nació como port de window.collectLeadTags, el guion inline de la landing de
   inglés, y durante un tiempo convivió con esa copia porque el modal de
   WhatsApp seguía siendo DOM suelto y no podía importar un módulo. Ya no:
   FlotanteWhatsApp.tsx es React y usa esta pieza, así que la copia se borró y
   esta es la única. El formulario de contacto y el de WhatsApp mandan el mismo
   payload y se distinguen solo por `origen`. */

const NO_ESPECIFICADO = "No especificado";
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
  "/idioma/espanol-para-empresas": "Español",
};

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
};

export function recogerAtribucion(idioma: string): Atribucion {
  let params: URLSearchParams | null;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    params = null;
  }

  let guardado: Record<string, unknown> = {};
  try {
    guardado = JSON.parse(sessionStorage.getItem(CLAVE_SESION) || "{}") || {};
  } catch {
    guardado = {};
  }

  // Prioridad por campo: 1) query actual en la URL, 2) valor persistido en la
  // sesión, 3) vacío.
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
