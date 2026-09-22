"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/* Cuándo aparecen los dos flotantes del sitio: el de WhatsApp y el de volver
   arriba.

   Por debajo de 960px (tablet horizontal, ver tokens.css) esperan a que el
   visitante deje atrás el hero de la página —la sección marcada con
   `data-hero`—, porque en la primera pantalla tapaban contenido: el sello de la
   STPS, el primer campo del formulario, los filtros del blog. En las páginas
   sin hero el umbral es un desplazamiento fijo de 400px, el mismo que ya usaba
   el botón de volver arriba.

   Por encima de 960px el umbral es siempre ese desplazamiento fijo. El
   flotante de WhatsApp no lo consulta ahí —su CSS solo lo esconde en móvil y
   tablet—, así que en escritorio queda como estaba.

   El borde del hero se mide en cada evento y no una vez al montar: el alto del
   hero cambia al cargar su imagen o su video, y el componente vive en el
   layout, así que sobrevive a la navegación entre páginas. */

const DESPLAZAMIENTO_FIJO = 400;
const MOVIL = "(max-width: 960px)";

function umbral() {
  if (!window.matchMedia(MOVIL).matches) return DESPLAZAMIENTO_FIJO;
  const hero = document.querySelector("[data-hero]");
  if (!hero) return DESPLAZAMIENTO_FIJO;
  return hero.getBoundingClientRect().bottom + window.scrollY;
}

export default function useTrasHero() {
  const ruta = usePathname();
  const [pasado, setPasado] = useState(false);

  useEffect(() => {
    const medir = () => setPasado(window.scrollY > umbral());
    medir();
    window.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      window.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };
  }, [ruta]);

  return pasado;
}
