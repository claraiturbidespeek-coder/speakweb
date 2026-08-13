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
    ];
  },
};

export default nextConfig;
