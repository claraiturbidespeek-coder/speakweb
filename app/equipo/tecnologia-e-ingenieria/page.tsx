import type { Metadata } from "next";
import PaginaEquipo from "../PaginaEquipo";
import datos from "../datos/tecnologia-e-ingenieria";

export const metadata: Metadata = {
  title: "Capacitación de Idiomas para Tecnología e Ingeniería | S-Peak",
  description:
    "Inglés y otros idiomas para equipos de TI e ingeniería. El idioma de negocios con que coordinan proyectos con casa matriz y equipos globales. Cotice ahora.",
  alternates: { canonical: "https://s-peak.com/equipo/tecnologia-e-ingenieria/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "S-Peak",
    title: "Capacitación de Idiomas para Tecnología e Ingeniería | S-Peak",
    description:
      "Inglés y otros idiomas para equipos de TI e ingeniería. El idioma de negocios con que coordinan proyectos con casa matriz y equipos globales.",
    url: "https://s-peak.com/equipo/tecnologia-e-ingenieria/",
    images: [
      {
        url: "https://s-peak.com/images/og-links.jpg",
        alt: "Capacitación de idiomas para equipos de tecnología e ingeniería de S-Peak",
      },
    ],
  },
};

export default function TecnologiaEIngenieria() {
  return <PaginaEquipo datos={datos} />;
}
