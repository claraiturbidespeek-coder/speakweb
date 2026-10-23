/* Canal web del lead de Kommo: convierte fuente_visita, la etiqueta que arma
   clasificarFuente en lib/atribucion.ts, en una de las opciones del campo de
   lista "Canal web". Los nombres que devuelve tienen que coincidir letra por
   letra con las opciones del campo en Kommo: app/api/lead/route.ts busca el
   enum_id por ese nombre.

   Las etiquetas de UTM llegan como "utm_source / utm_medium", o solo una de
   las dos si la otra no vino. De ellas se mira el utm_source, que es lo
   primero; el utm_medium solo cuenta para Google Maps ("google / maps"),
   porque google suelto no dice el canal. Una etiqueta sin " / " puede ser un
   utm_source suelto o un dominio de referencia: se compara primero con las
   listas de utm_source, y si no está en ellas y tiene forma de dominio, es un
   backlink.

   Nunca lanza: lo que no encaja devuelve null y deja constancia en el log. El
   lead se crea igual, sin el campo. */

const POR_ETIQUETA: Record<string, string> = {
  "Google Ads": "Google Ads",
  "ChatGPT Ads": "ChatGPT Ads",
  ChatGPT: "ChatGPT",
  Gemini: "Gemini",
  Claude: "Claude",
  Perplexity: "Otros asistentes de IA",
  Copilot: "Otros asistentes de IA",
  LinkedIn: "LinkedIn",
  Facebook: "Otras redes",
  Instagram: "Otras redes",
  X: "Otras redes",
  Directo: "Directo",
};

const UTM_LINKEDIN = ["linkedin", "lnkd.in"];
const UTM_OTRAS_REDES = ["facebook", "fb", "instagram", "ig", "twitter", "x"];

const ES_DOMINIO = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i;

export function canalWebKommo(fuenteVisita: string): string | null {
  const fuente = fuenteVisita.trim();
  if (!fuente) {
    console.warn("Kommo: fuente_visita vacía; el lead va sin Canal web");
    return null;
  }

  if (POR_ETIQUETA[fuente]) return POR_ETIQUETA[fuente];
  if (fuente.endsWith(" orgánico")) return "Búsqueda orgánica";

  const conMedio = fuente.includes(" / ");
  const [utmSource, utmMedium = ""] = fuente
    .split(" / ")
    .map((parte) => parte.trim().toLowerCase());
  if (UTM_LINKEDIN.includes(utmSource)) return "LinkedIn";
  if (UTM_OTRAS_REDES.includes(utmSource)) return "Otras redes";
  if (utmSource === "google" && utmMedium === "maps") return "Google Maps";

  if (!conMedio && ES_DOMINIO.test(fuente)) return "Backlink";

  console.warn("Kommo: fuente_visita sin Canal web asignado; el lead va sin él", {
    fuente_visita: fuente,
  });
  return null;
}
