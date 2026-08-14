import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
