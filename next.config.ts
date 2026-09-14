import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      /* Rutas heredadas sin destino propio. Las cuatro son permanentes: la URL
         vieja debe salir del índice y cederle el sitio a la nueva. La query se
         conserva sola —Next la arrastra cuando el destino no declara la suya—,
         así que el gclid y los utm de una campaña llegan íntegros al destino.

         La quinta, /landing/ingles-para-empresas/, no está aquí: necesita
         añadir el fragmento #landing además de la query, y eso se compone a
         mano en su propio route handler. */
      {
        source: "/italiano-lp-aterrizaje-google-ads",
        destination: "/idioma/italiano-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/portugues-lp-aterrizaje-google-ads",
        destination: "/idioma/portugues-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/mcer",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/convenios",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/idioma/frances",
        destination: "/idioma/frances-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/aleman",
        destination: "/idioma/aleman-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/italiano",
        destination: "/idioma/italiano-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/portugues",
        destination: "/idioma/portugues-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/espanol",
        destination: "/idioma/espanol-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/idioma-capacitacion-espanol-empresas",
        destination: "/idioma/espanol-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/idioma-capacitacion-italiano-empresas",
        destination: "/idioma/italiano-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/capacitacion-ingles-empresas",
        destination: "/idioma/ingles-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/capacitacion-frances-empresas",
        destination: "/idioma/frances-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/capacitacion-aleman-empresas",
        destination: "/idioma/aleman-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/capacitacion-portugues-empresas",
        destination: "/idioma/portugues-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/capacitacion-espanol-empresas",
        destination: "/idioma/espanol-para-empresas/",
        statusCode: 301,
      },
      // Slugs viejos restantes, tomados de _wp_old_slug en el export de WordPress.
      // Quedan fuera aleman-para-empresas, espanol-para-empresas, italiano-para-empresas
      // y portugues-para-empresas: son slugs viejos que coinciden con los destinos
      // actuales y redirigirlos crearía un bucle.
      {
        source: "/idioma/ingles",
        destination: "/idioma/ingles-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/idioma-capacitacion-ingles-empresas",
        destination: "/idioma/ingles-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/idioma-capacitacion-frances-empresas",
        destination: "/idioma/frances-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/capacitacion-italiano-empresas",
        destination: "/idioma/italiano-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/capacitacion-italiano-para-empresas",
        destination: "/idioma/italiano-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/italiano-para-empresas-capacitacion-corporativa",
        destination: "/idioma/italiano-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/capacitacion-portugues-para-empresas",
        destination: "/idioma/portugues-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/idioma-capacitacion-portugues-empresas",
        destination: "/idioma/portugues-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/poortugues",
        destination: "/idioma/portugues-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/portugues-para-empresas-capacitacion-corporativa",
        destination: "/idioma/portugues-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/idioma/capacitacion-espanol-para-empresas",
        destination: "/idioma/espanol-para-empresas/",
        statusCode: 301,
      },
      {
        source: "/8-claves-para-poner-en-marcha-tu-capacitacion-empresarial",
        destination: "/capacitacion-de-idiomas-para-empresas/",
        statusCode: 301,
      },
      // El slug del post de nearshoring perdió el prefijo "blog-"; la URL vieja
      // ya pudo haber sido indexada antes de este cambio.
      {
        source: "/blog-nearshoring-mexico-ingles-empresas",
        destination: "/nearshoring-mexico-ingles-empresas/",
        statusCode: 301,
      },
      // Slug viejo de WordPress para la misma nota (ver _wp_old_slug); apunta
      // directo al slug nuevo para no encadenar dos redirecciones.
      {
        source: "/nearshoring-que-es",
        destination: "/nearshoring-mexico-ingles-empresas/",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
