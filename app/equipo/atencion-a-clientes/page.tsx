import type { Metadata } from "next";
import PaginaEquipo from "../PaginaEquipo";
import datos from "../datos/atencion-a-clientes";

export const metadata: Metadata = {
  title: "Idiomas para Atención a Clientes y Contact Center | S-Peak",
  description:
    "Inglés y otros idiomas para soporte, posventa y contact center. Menos escalaciones, más cuentas retenidas y niveles de servicio cumplidos. Cotice ahora.",
  alternates: { canonical: "https://s-peak.com/equipo/atencion-a-clientes/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "S-Peak",
    title: "Idiomas para Atención a Clientes y Contact Center | S-Peak",
    description:
      "Inglés y otros idiomas para soporte, posventa y contact center. Menos escalaciones, más cuentas retenidas y niveles de servicio cumplidos. Cotice ahora.",
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
