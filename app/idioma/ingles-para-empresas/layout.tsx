import type { Metadata, Viewport } from "next";

// La metadata vive aquí y no en page.tsx porque ese archivo es "use client",
// y Next no permite exportar metadata desde un Client Component.
export const metadata: Metadata = {
  title: "Inglés para Empresas en México – Programas Medibles | S-Peak",
  description:
    "Cursos de inglés para empresas en México, diseñado por puesto, con avance medible y evidencia para Dirección. Programa a la medida. Solicite su propuesta.",
  authors: [{ name: "S-Peak" }],
  alternates: {
    canonical: "https://s-peak.com/idioma/ingles-para-empresas/",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "S-Peak",
    title: "Inglés para Empresas en México – Programas Medibles | S-Peak",
    description:
      "Cursos de inglés para empresas diseñados por puesto, con avance medible y evidencia para Dirección. Más de 500 empresas y 40 000 profesionales formados.",
    url: "https://s-peak.com/idioma/ingles-para-empresas/",
    images: [
      {
        url: "https://s-peak.com/img/ejecutiva-hero.webp",
        alt: "Ejecutiva en un curso de inglés para empresas de S-Peak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inglés para Empresas en México – Programas Medibles | S-Peak",
    description:
      "Cursos de inglés para empresas diseñados por puesto, con avance medible y evidencia para Dirección. Solicite su propuesta.",
    images: ["https://s-peak.com/img/ejecutiva-hero.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1A3C4D",
};

export default function Layout({
  children,
}: LayoutProps<"/idioma/ingles-para-empresas">) {
  return children;
}
