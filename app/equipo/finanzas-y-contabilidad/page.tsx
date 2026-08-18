import type { Metadata } from "next";
import PaginaEquipo from "../PaginaEquipo";
import datos from "../datos/finanzas-y-contabilidad";

export const metadata: Metadata = {
  title: "Capacitación de Idiomas para Finanzas y Contabilidad | S-Peak",
  description:
    "Inglés y otros idiomas para equipos de finanzas y contabilidad. El idioma con que su equipo reporta y presenta cifras al corporativo. Cotice ahora.",
  alternates: { canonical: "https://s-peak.com/equipo/finanzas-y-contabilidad/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "S-Peak",
    title: "Capacitación de Idiomas para Finanzas y Contabilidad | S-Peak",
    description:
      "Inglés y otros idiomas para equipos de finanzas y contabilidad. El idioma con que su equipo reporta y presenta cifras al corporativo.",
    url: "https://s-peak.com/equipo/finanzas-y-contabilidad/",
    images: [
      {
        url: "https://s-peak.com/images/og-links.jpg",
        alt: "Capacitación de idiomas para equipos de finanzas y contabilidad de S-Peak",
      },
    ],
  },
};

export default function FinanzasYContabilidad() {
  return <PaginaEquipo datos={datos} />;
}
