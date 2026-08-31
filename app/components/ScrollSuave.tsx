"use client";

import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

/* Lenis global, montado una sola vez en el layout raíz. Antes solo vivía en
   /idioma/ingles-para-empresas/ como script de página; este componente es esa
   misma pieza (mismo archivo vendored, mismo guion) generalizada para las 55
   rutas del sitio.

   Sigue siendo el mismo patrón "sin librería": `public/js/lenis-1.1.13.min.js`
   cargado con <Script>, no el paquete de npm. `window.__lenis` es el punto de
   contacto con el resto del sitio — hoy lo consume ModalContacto.tsx para
   pausar el scroll mientras el modal está abierto. */

type LenisInstance = {
  raf: (time: number) => void;
  stop: () => void;
  start: () => void;
  resize: () => void;
  scrollTo: (target: number | string | Element, opts?: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    Lenis?: new (options?: Record<string, unknown>) => LenisInstance;
    __lenis?: LenisInstance;
  }
}

export default function ScrollSuave() {
  const ruta = usePathname();

  // Atado a onLoad del <Script>, no a un segundo <script> inline corriendo
  // justo después: un script insertado por JS es async por defecto, así que
  // el inline se ejecutaba antes de que este terminara de descargar y
  // `typeof Lenis` seguía dando 'undefined' — Lenis nunca arrancaba, sin
  // error en consola.
  const iniciarLenis = useCallback(() => {
    if (window.__lenis || !window.Lenis) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Mismo desfase que ya usa `[id] { scroll-margin-top }` en base.css para
    // el salto nativo: una sola fuente de verdad, en vez de duplicar el valor.
    const offset =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--anchor-offset")
      ) || 0;

    const lenis = new window.Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Anclas de página, en cualquier ruta: delegado en document porque el
    // contenido cambia con la navegación de la SPA. preventDefault y
    // pushState a mano porque Lenis no conoce scroll-margin-top por sí solo.
    document.addEventListener("click", function (e) {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -offset });
      history.pushState(null, "", id);
    });

    window.__lenis = lenis;
  }, []);

  // La navegación entre rutas de la SPA cambia la altura del documento sin
  // disparar un resize de ventana, que es lo único que Lenis escucha por
  // defecto. Sin esto, el límite de scroll queda con la medida de la ruta
  // anterior hasta que el ResizeObserver interno lo alcance (250ms de
  // debounce), lo que en el peor caso deja al usuario incapaz de llegar al
  // fondo real de una página más larga justo después de navegar.
  useEffect(() => {
    window.__lenis?.resize();
  }, [ruta]);

  return (
    <Script
      src="/js/lenis-1.1.13.min.js"
      strategy="afterInteractive"
      onReady={iniciarLenis}
    />
  );
}
