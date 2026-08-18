import type { Metadata } from "next";
import PaginaEquipo from "../PaginaEquipo";
import datos from "../datos/ventas-y-marketing";

export const metadata: Metadata = {
  title: "Cursos de Idiomas para Equipos de Ventas y Marketing | S-Peak",
  description:
    "Inglés y otros idiomas para vendedores y equipos de marketing B2B. Vocabulario comercial, presentaciones ejecutivas y conversación con clientes internacionales. Cotice ahora.",
  alternates: { canonical: "https://s-peak.com/equipo/ventas-y-marketing/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "S-Peak",
    title: "Cursos de Idiomas para Equipos de Ventas y Marketing | S-Peak",
    description:
      "Inglés y otros idiomas para vendedores y equipos de marketing B2B. Vocabulario comercial, presentaciones ejecutivas y conversación con clientes internacionales.",
    url: "https://s-peak.com/equipo/ventas-y-marketing/",
    images: [
      {
        url: "https://s-peak.com/images/og-links.jpg",
        alt: "Capacitación de idiomas para equipos de ventas y marketing de S-Peak",
      },
    ],
  },
};

export default function VentasYMarketing() {
  return <PaginaEquipo datos={datos} />;
}
