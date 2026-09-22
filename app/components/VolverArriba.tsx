"use client";

import useTrasHero from "./useTrasHero";

/* Botón de volver arriba, global: antes vivía solo en
   /idioma/ingles-para-empresas/ como <Script> de esa página. Montado aquí
   una vez, en el layout raíz, aparece en todo el sitio.

   Usa window.__lenis (la instancia que monta ScrollSuave.tsx) para el
   desplazamiento suave; si no existe —Lenis no se monta con movimiento
   reducido— cae a scrollTo nativo, igual que el guion original.

   Aparece a la vez que el flotante de WhatsApp: los dos consultan
   useTrasHero. */

export default function VolverArriba() {
  const visible = useTrasHero();

  const irArriba = () => {
    if (window.__lenis) window.__lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className="sp-volver-arriba"
      data-visible={visible || undefined}
      onClick={irArriba}
      aria-label="Volver al inicio"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
