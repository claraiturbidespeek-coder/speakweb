"use client";

import { useEffect, useState } from "react";

/* Si toca montar un video decorativo (un clip en bucle, silenciado): solo
   desde 960px y sin movimiento reducido. En móvil y tablet, o con movimiento
   reducido, se queda la imagen y el video ni se monta ni se descarga.
   Esconderlo por CSS no bastaría —el navegador lo bajaría igual— y con
   `autoPlay` el CSS tampoco puede impedir que arranque.

   Empieza en false, que es lo que pinta el servidor, y se corrige al hidratar.
   Si cambia el ancho o la preferencia con la página abierta, se reevalúa.

   Lo usan el hero de /nosotros/ y las celdas de video del bento de proyectos. */

const ESCRITORIO = "(min-width: 960px)";
const SIN_MOVIMIENTO = "(prefers-reduced-motion: reduce)";

export function useVideoDecorativo() {
  const [montar, setMontar] = useState(false);

  useEffect(() => {
    const escritorio = window.matchMedia(ESCRITORIO);
    const sinMovimiento = window.matchMedia(SIN_MOVIMIENTO);
    const aplicar = () => setMontar(escritorio.matches && !sinMovimiento.matches);
    aplicar();
    escritorio.addEventListener("change", aplicar);
    sinMovimiento.addEventListener("change", aplicar);
    return () => {
      escritorio.removeEventListener("change", aplicar);
      sinMovimiento.removeEventListener("change", aplicar);
    };
  }, []);

  return montar;
}
