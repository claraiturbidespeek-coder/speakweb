import type { Metadata } from "next";

// La metadata vive aquí y no en page.tsx porque ese archivo es "use client":
// el acordeón del FAQ conserva sus handlers del original y Next no permite
// exportar metadata desde un Client Component.
export const metadata: Metadata = {
  title: "Cursos de Idiomas para Equipos de Ventas y Marketing | S-Peak",
  description:
    "Inglés y otros idiomas para vendedores y equipos de marketing B2B. Vocabulario comercial, negociación internacional y presentaciones ejecutivas. Cotice ahora.",
  alternates: { canonical: "https://s-peak.com/equipo/ventas-y-marketing/" },
};

export default function Layout({
  children,
}: LayoutProps<"/equipo/ventas-y-marketing">) {
  return children;
}
