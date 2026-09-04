import type { ReactNode } from "react";

/* Forma del contenido de una página de Soluciones por Equipo.

   Sale del documento del cliente (referencias/Soluciones por Equipo - S-Peak.pdf),
   que trae las siete áreas con la misma estructura. Lo que el documento no da
   —cifras del hero, avatares, logos y testimonios— lo pone la plantilla, igual
   para las siete.

   `respuestaPlana` existe porque el FAQ va dos veces: como markup, donde el
   texto lleva <strong>, y dentro del JSON-LD de FAQPage, que solo admite texto.
   Se escriben las dos para que el schema no arrastre etiquetas. */

export type TarjetaEquipo = {
  icono: string;
  titulo: string;
  texto: ReactNode;
};

export type DatosEquipo = {
  slug: string;
  nombre: string;

  hero: {
    etiqueta: string;
    titulo: ReactNode;
    sub: ReactNode;
    cta: string;
    prueba: ReactNode;
    imagen: { src: string; alt: string };
  };

  /* Bajo el hero, dice qué enseña S-Peak y qué no. Solo la traen las áreas
     cuyo contenido la incluye; las demás no la llevan. */
  encuadre?: string;

  competencias: {
    eyebrow: string;
    titulo: string;
    sub: ReactNode;
    tarjetas: TarjetaEquipo[];
  };

  /* Opcional: ventas y marketing no tiene texto de franja en el documento del
     cliente. Está pedido; hasta que llegue, esa página no la pinta. */
  franja?: {
    titulo: string;
    texto: ReactNode;
    idiomas: { nombre: string; ruta: string }[];
  };

  dolor: {
    eyebrow: string;
    titulo: string;
    sub: ReactNode;
    tarjetas: TarjetaEquipo[];
    cta: string;
  };

  mercado: {
    eyebrow: string;
    titulo: string;
    texto: ReactNode;
    etiquetaCarrusel: string;
    tarjetas: (TarjetaEquipo & { fuente?: string })[];
  };

  diferenciadores: {
    eyebrow: string;
    titulo: string;
    tarjetas: TarjetaEquipo[];
  };

  banda: { titulo: string; texto: string; cta: string };

  testimonios: { titulo: string };

  faq: {
    titulo: string;
    texto: string;
    ctaTitulo: string;
    ctaBoton: string;
    preguntas: { pregunta: string; respuesta: ReactNode; respuestaPlana: string }[];
  };

  servicio: { nombre: string; tipo: string; descripcion: string };
};

/* Las seis páginas de idioma, en el orden en que las lista el documento. Van a
   los slugs canónicos: el documento enlaza a /idioma/capacitacion-*-empresas/,
   que existen pero son redirecciones 301. */
export const IDIOMAS = [
  { nombre: "Inglés", ruta: "/idioma/ingles-para-empresas/" },
  { nombre: "Francés", ruta: "/idioma/frances-para-empresas/" },
  { nombre: "Alemán", ruta: "/idioma/aleman-para-empresas/" },
  { nombre: "Italiano", ruta: "/idioma/italiano-para-empresas/" },
  { nombre: "Portugués", ruta: "/idioma/portugues-para-empresas/" },
  { nombre: "Español para extranjeros", ruta: "/idioma/espanol-para-empresas/" },
];
