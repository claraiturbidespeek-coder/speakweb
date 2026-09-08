import type { Metadata, Viewport } from "next";

// La metadata vive aquí y no en page.tsx porque ese archivo es "use client",
// y Next no permite exportar metadata desde un Client Component.
export const metadata: Metadata = {
  title: "Español para Extranjeros en Empresas de México | S-Peak",
  description:
    "Cursos de español para el personal extranjero de su operación en México, diseñados por puesto, con avance medible y evidencia para Recursos Humanos.",
  authors: [{ name: "S-Peak" }],
  alternates: {
    canonical: "https://s-peak.com/idioma/espanol-para-empresas/",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "S-Peak",
    title: "Español para Extranjeros en Empresas de México | S-Peak",
    description:
      "Cursos de español para ejecutivos y técnicos expatriados: dirigir al equipo local, entender el piso y tratar con proveedores y autoridades. Más de 500 empresas y 40 000 profesionales formados.",
    url: "https://s-peak.com/idioma/espanol-para-empresas/",
    images: [
      {
        url: "https://s-peak.com/img/ejecutiva-hero.webp",
        alt: "Ejecutiva en un curso de español para personal extranjero de S-Peak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Español para Extranjeros en Empresas de México | S-Peak",
    description:
      "Cursos de español para el personal extranjero de su operación en México, con avance medible y evidencia para Dirección. Solicite su propuesta.",
    images: ["https://s-peak.com/img/ejecutiva-hero.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1A3C4D",
};

export default function Layout({
  children,
}: LayoutProps<"/idioma/espanol-para-empresas">) {
  return children;
}
