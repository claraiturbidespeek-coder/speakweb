/* Atribución de leads: de dónde viene quien envía el formulario de contacto.
   Portado literalmente de window.collectLeadTags, el guion que traía la landing
   de inglés, para que el payload no cambie ni un campo.

   OJO: HAY UNA SEGUNDA COPIA DE ESTA LÓGICA.
   Vive en el guion inline de app/idioma/ingles-para-empresas/page.tsx, como
   window.collectLeadTags, y la usa el formulario del modal de WhatsApp. Un
   guion inline no puede importar este módulo, y exponer estas funciones en
   window desde React crearía una dependencia de orden de carga: si el guion
   corriera antes de que el componente monte, el lead se enviaría sin
   atribución y sin que nada lo delatara. Perder el rastro de un lead en
   silencio es peor que duplicar cuarenta líneas a la vista.

   Las dos copias tienen que cambiar juntas. La duplicación desaparece el día
   que el modal de WhatsApp pase a React. */

const NO_ESPECIFICADO = "No especificado";
const CLAVE_SESION = "speak_attribution";

export const ENDPOINT_LEAD = "https://s-peak-landings.vercel.app/api/lead";

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
  let utmContent = crudo("utm_content");
  const gclid = crudo("gclid");

  // Respaldo Google Ads: si NO hubo utm_source (ni en URL ni persistido) pero sí
  // hay gclid, marcamos origen google/cpc y guardamos el gclid en utm_content
  // para no perder el rastro. Si los UTM sí vienen, mandan ellos.
  if (!utmSource && gclid) {
    utmSource = "google";
    if (!utmMedium) utmMedium = "cpc";
    if (!utmContent) utmContent = "gclid:" + gclid;
  }

  return {
    utm_source: utmSource || NO_ESPECIFICADO,
    utm_medium: utmMedium || NO_ESPECIFICADO,
    utm_campaign: utmCampaign || NO_ESPECIFICADO,
    utm_content: utmContent || NO_ESPECIFICADO,
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
