import type { MetadataRoute } from "next";
import { ENLACES_EQUIPOS, ENLACES_IDIOMAS } from "@/app/components/nav/secciones";
import { obtenerPosts } from "@/lib/posts";

/* Sitemap del sitio.

   Solo entra lo que está terminado y debe indexarse. Quedan fuera, a propósito:

   - /clientes/ y /nosotros/, ocultas por decisión y ya con robots noindex.
   - /gracias/, que dispara la conversión y por su naturaleza no se indexa.
   - /idiomas-para-empresas/, pendiente de contenido: será el índice de idiomas
     y entra aquí cuando lo tenga.
   - Las cinco de /category/, hoy esqueletos. Entran cuando el listado por
     categoría esté construido.
   - Las cinco rutas heredadas que ahora redirigen —/landing/ingles-para-empresas/,
     las dos de Google Ads, /mcer/ y /convenios/—: una redirección no es una
     página y no se declara en un sitemap.

   Las rutas de equipo y de idioma se leen de secciones.ts y las notas de
   lib/posts.ts, así que una nota nueva entra sola y nada se queda obsoleto. Las
   barras finales son deliberadas: el proyecto usa trailingSlash y así el
   sitemap coincide con los canonical de cada página. */

const SITIO = "https://s-peak.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = obtenerPosts();

  const fijas = [
    "/",
    "/blog/",
    "/aviso-de-privacidad/",
    ...ENLACES_IDIOMAS.map((e) => e.ruta),
    ...ENLACES_EQUIPOS.map((e) => e.ruta),
  ].map((ruta) => ({ url: `${SITIO}${ruta}` }));

  /* La fecha del frontmatter es la única que tenemos; no se inventa una para
     las páginas fijas, que no la llevan. */
  const notas = posts.map((p) => ({
    url: `${SITIO}/${p.slug}/`,
    lastModified: new Date(p.date),
  }));

  return [...fijas, ...notas];
}
