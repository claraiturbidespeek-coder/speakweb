import type { MouseEvent } from "react";

/* «Clientes» del menú principal: lleva a la sección de casos de éxito
   (CasosDeExito) de la página en la que se está, con desplazamiento suave.

   La sección no tiene el mismo `id` en todas las páginas (`proyectos` en el
   home y /nosotros/, `resultados` en equipos e idiomas), así que se busca por
   su marca, `data-casos-exito`. Si la página no la tiene, no se hace nada y el
   enlace sigue su `href`, que lleva a la del home (/#proyectos).

   El desplazamiento es el de ScrollSuave: Lenis con el mismo desfase del
   header (--anchor-offset, el de `[id] { scroll-margin-top }` en base.css).
   Sin Lenis (movimiento reducido) va scrollIntoView, que respeta ese margen;
   suave salvo con movimiento reducido. Como ScrollSuave, deja el `id` en la
   URL con pushState.

   `antes` corre justo antes de desplazar: el panel de celular lo usa para
   cerrarse y soltar el bloqueo del fondo en el mismo clic, igual que hace
   MenuAnclas con sus anclas. */
export function irACasosDeExito(e: MouseEvent, antes?: () => void) {
  const destino = document.querySelector<HTMLElement>("[data-casos-exito]");
  if (!destino) return;
  e.preventDefault();
  antes?.();

  const desfase =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--anchor-offset")) || 0;
  if (window.__lenis) {
    window.__lenis.scrollTo(destino, { offset: -desfase });
  } else {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    destino.scrollIntoView({ behavior: reducido ? "auto" : "smooth", block: "start" });
  }
  if (destino.id) history.pushState(null, "", `#${destino.id}`);
}
