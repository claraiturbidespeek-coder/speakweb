"use client";

import { useEffect } from "react";

/* Observador de aparición al hacer scroll para `.reveal` (y `.stagger`, que se
   apoya en la misma clase `.visible`), compartido por /idioma/ingles-para-empresas/
   y /equipo/*.

   Antes vivía como texto dentro de un <Script id="..."> de cada página. next/script
   solo ejecuta un script con un `id` dado una vez por sesión de navegador: al volver
   a la misma ruta por navegación interna (sin recarga completa), el observador nunca
   se volvía a crear para los nodos `.reveal` recién montados, que se quedaban en
   opacity:0 para siempre. Un useEffect normal sí se vuelve a ejecutar en cada montaje
   del componente de página, que es lo que ocurre en cada navegación de la SPA. */

export default function AnimacionesEntrada({
  threshold = 0.1,
}: {
  threshold?: number;
}) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold]);

  return null;
}
