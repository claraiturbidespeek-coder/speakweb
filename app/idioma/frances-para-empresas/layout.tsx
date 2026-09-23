import type { Metadata, Viewport } from "next";

// La metadata vive aquí y no en page.tsx porque ese archivo es "use client",
// y Next no permite exportar metadata desde un Client Component.
const DESCRIPCION =
  "Cursos de francés para empresas en México, diseñados por puesto para operar con Francia y Canadá, con avance medible y evidencia para Dirección.";

/* El Service de esta página. Organization va una sola vez en el layout raíz;
   aquí solo lo propio de la ruta, con la misma descripción que la metadata. */
const DATOS_PAGINA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Cursos de francés para empresas",
  url: "https://s-peak.com/idioma/frances-para-empresas/",
  provider: { "@type": "Organization", name: "S-Peak", url: "https://s-peak.com" },
  areaServed: { "@type": "Country", name: "México" },
  description: DESCRIPCION,
});

export const metadata: Metadata = {
  title: "Francés para Empresas en México – Programas Medibles | S-Peak",
  description: DESCRIPCION,
  authors: [{ name: "S-Peak" }],
  alternates: {
    canonical: "https://s-peak.com/idioma/frances-para-empresas/",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "S-Peak",
    title: "Francés para Empresas en México – Programas Medibles | S-Peak",
    description:
      "Cursos de francés para empresas diseñados por puesto, para equipos que tratan con Francia y Canadá. Más de 500 empresas y 40 000 profesionales formados.",
    url: "https://s-peak.com/idioma/frances-para-empresas/",
    images: [
      {
        url: "https://s-peak.com/img/ejecutiva-hero.webp",
        alt: "Ejecutiva en un curso de francés para empresas de S-Peak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Francés para Empresas en México – Programas Medibles | S-Peak",
    description:
      "Cursos de francés para empresas diseñados por puesto, con avance medible y evidencia para Dirección. Solicite su propuesta.",
    images: ["https://s-peak.com/img/ejecutiva-hero.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1A3C4D",
};

export default function Layout({
  children,
}: LayoutProps<"/idioma/frances-para-empresas">) {
  return (
    <>
      {/* Etiqueta nativa: con next/script el JSON-LD se inyectaría desde el
          cliente y no estaría en el HTML que lee Google. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: DATOS_PAGINA }}
      />
      {children}
    </>
  );
}
