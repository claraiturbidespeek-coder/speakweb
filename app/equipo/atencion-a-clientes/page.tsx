import type { Metadata } from "next";
import PaginaEquipo from "../PaginaEquipo";
import datos from "../datos/atencion-a-clientes";

export const metadata: Metadata = {
  title: "Capacitación de Idiomas para Atención a Clientes y Contact Center | S-Peak",
  description:
    "Inglés y otros idiomas para equipos de soporte, posventa y contact center. Atención sin fricción, retención de clientes y cumplimiento de niveles de servicio. Cotice ahora.",
  alternates: { canonical: "https://s-peak.com/equipo/atencion-a-clientes/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "S-Peak",
    title: "Capacitación de Idiomas para Atención a Clientes y Contact Center | S-Peak",
    description:
      "Inglés y otros idiomas para equipos de soporte, posventa y contact center. Atención sin fricción, retención de clientes y cumplimiento de niveles de servicio.",
    url: "https://s-peak.com/equipo/atencion-a-clientes/",
    images: [
      {
        url: "https://s-peak.com/images/og-links.jpg",
        alt: "Capacitación de idiomas para equipos de atención a clientes de S-Peak",
      },
    ],
  },
};

export default function AtencionAClientes() {
  return <PaginaEquipo datos={datos} />;
}
