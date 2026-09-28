import type { Metadata, Viewport } from "next";
import IndiceIdiomas from "./IndiceIdiomas";

/* El índice de idiomas. La página es componente de cliente, como las seis de
   idioma, y Next no permite exportar metadata desde uno: por eso este archivo
   la declara y monta IndiceIdiomas. No va en un layout.tsx de /idioma/ porque
   ese layout envolvería también a las seis páginas y les heredaría el noindex.

   Sigue sin terminar: lleva robots noindex/nofollow y queda fuera del sitemap,
   del menú y del footer. Al completarla, quitar el robots y darla de alta en
   app/sitemap.ts.

   Sustituye a /idiomas-para-empresas/, que ahora redirige aquí. */
const TITULO = "Cursos de Idiomas para Empresas en México | S-Peak";
const DESCRIPCION =
  "Cursos de inglés, francés, alemán, italiano, portugués y español para empresas en México, por puesto, con avance medible y evidencia para Dirección.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  authors: [{ name: "S-Peak" }],
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://s-peak.com/idioma/",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "S-Peak",
    title: TITULO,
    description:
      "Cursos de idiomas para empresas diseñados por puesto, con avance medible y evidencia para Dirección. Más de 500 empresas y 40 000 profesionales formados.",
    url: "https://s-peak.com/idioma/",
    images: [
      {
        url: "https://s-peak.com/images/ejecutiva-hero.webp",
        alt: "Ejecutiva en un curso de idiomas para empresas de S-Peak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description:
      "Cursos de idiomas para empresas diseñados por puesto, con avance medible y evidencia para Dirección. Solicite su propuesta.",
    images: ["https://s-peak.com/images/ejecutiva-hero.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1A3C4D",
};

export default function Page() {
  return <IndiceIdiomas />;
}
