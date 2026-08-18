import type { Metadata } from "next";
import PaginaEquipo from "../PaginaEquipo";
import datos from "../datos/operaciones-y-logistica";

export const metadata: Metadata = {
  title: "Capacitación de Idiomas para Operaciones y Logística | S-Peak",
  description:
    "Inglés y otros idiomas para equipos de planta, calidad, cadena de suministro y comercio exterior. Comunicación técnica sin errores. Cotice ahora.",
  alternates: { canonical: "https://s-peak.com/equipo/operaciones-y-logistica/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "S-Peak",
    title: "Capacitación de Idiomas para Operaciones y Logística | S-Peak",
    description:
      "Inglés y otros idiomas para equipos de planta, calidad, cadena de suministro y comercio exterior. Comunicación técnica sin errores.",
    url: "https://s-peak.com/equipo/operaciones-y-logistica/",
    images: [
      {
        url: "https://s-peak.com/images/og-links.jpg",
        alt: "Capacitación de idiomas para equipos de operaciones y logística de S-Peak",
      },
    ],
  },
};

export default function OperacionesYLogistica() {
  return <PaginaEquipo datos={datos} />;
}
