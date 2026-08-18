import type { Metadata } from "next";
import PaginaEquipo from "../PaginaEquipo";
import datos from "../datos/legal-y-juridico";

export const metadata: Metadata = {
  title: "Capacitación de Idiomas para Equipos Legales | S-Peak",
  description:
    "Inglés y otros idiomas para áreas legales y de cumplimiento. El idioma de negocios con que su equipo coordina con corporativo, matriz legal y despachos. Cotice ahora.",
  alternates: { canonical: "https://s-peak.com/equipo/legal-y-juridico/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "S-Peak",
    title: "Capacitación de Idiomas para Equipos Legales | S-Peak",
    description:
      "Inglés y otros idiomas para áreas legales y de cumplimiento. El idioma de negocios con que su equipo coordina con corporativo, matriz legal y despachos.",
    url: "https://s-peak.com/equipo/legal-y-juridico/",
    images: [
      {
        url: "https://s-peak.com/images/og-links.jpg",
        alt: "Capacitación de idiomas para equipos legales de S-Peak",
      },
    ],
  },
};

export default function LegalYJuridico() {
  return <PaginaEquipo datos={datos} />;
}
