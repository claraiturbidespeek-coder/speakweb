import type { MetadataRoute } from "next";

/* robots.txt del sitio.

   Solo se bloquea /api/, que no son páginas sino el endpoint de leads.

   Lo que NO se bloquea, a propósito: las rutas que llevan `noindex`
   —/clientes/, /nosotros/ y los esqueletos sin terminar—. Bloquear en
   robots.txt una página con noindex es contraproducente: el rastreador no puede
   entrar a leer la etiqueta, así que nunca se entera de que no debe indexarla, y
   la URL puede acabar listada igual, sin contenido. Para no indexar algo, el
   noindex; para ahorrar rastreo de lo que no es una página, el Disallow. */

const SITIO = "https://s-peak.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITIO}/sitemap.xml`,
  };
}
