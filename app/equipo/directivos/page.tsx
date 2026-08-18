import type { Metadata } from "next";
import PaginaEquipo from "../PaginaEquipo";
import datos from "../datos/directivos";

export const metadata: Metadata = {
  title: "Capacitación de Idiomas para Directivos y Gerencia | S-Peak",
  description:
    "Programas de idiomas para directores, gerentes y dueños de empresa. Negociación, juntas de dirección y relación con casa matriz. Confidencial y a la medida. Cotice ahora.",
  alternates: { canonical: "https://s-peak.com/equipo/directivos/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "S-Peak",
    title: "Capacitación de Idiomas para Directivos y Gerencia | S-Peak",
    description:
      "Programas de idiomas para directores, gerentes y dueños de empresa. Negociación, juntas de dirección y relación con casa matriz. Confidencial y a la medida.",
    url: "https://s-peak.com/equipo/directivos/",
    images: [
      {
        url: "https://s-peak.com/images/og-links.jpg",
        alt: "Capacitación de idiomas para directivos y gerencia de S-Peak",
      },
    ],
  },
};

export default function Directivos() {
  return <PaginaEquipo datos={datos} />;
}
