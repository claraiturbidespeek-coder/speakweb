"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* La rejilla del bento con el contorno rojo que recorre sus tarjetas blancas.

   Las tarjetas que lo llevan traen su dibujo (un SVG con data-contorno, que
   pinta ProyectosVideo). Aquí solo se decide cuál lo muestra: una a la vez,
   en el orden del HTML, que es el de lectura. A la activa se le pone
   data-contorno-activo y el módulo corre una vez la animación —el trazo
   recorre el borde hasta cerrarse y después se desvanece—; al terminar el
   turno pasa a la siguiente, en bucle.

   Solo corre con la rejilla en pantalla, y con movimiento reducido no
   arranca. El turno dura lo mismo que la animación del módulo (DURACION, en
   ms; ver .contorno en ProyectosVideo.module.css). */

const DURACION = 3200;

export default function RejillaContorno({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rejilla = ref.current;
    if (!rejilla) return;
    const tarjetas = [...rejilla.querySelectorAll<HTMLElement>("[data-contorno]")].map(
      (svg) => svg.parentElement!,
    );
    if (tarjetas.length === 0) return;

    const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)");
    let turno = 0;
    let temporizador = 0;
    let enPantalla = false;

    const apagar = () => {
      window.clearTimeout(temporizador);
      temporizador = 0;
      tarjetas.forEach((t) => t.removeAttribute("data-contorno-activo"));
    };

    const siguiente = () => {
      tarjetas.forEach((t) => t.removeAttribute("data-contorno-activo"));
      tarjetas[turno].setAttribute("data-contorno-activo", "");
      turno = (turno + 1) % tarjetas.length;
      temporizador = window.setTimeout(siguiente, DURACION);
    };

    const decidir = () => {
      if (enPantalla && !movimientoReducido.matches) {
        if (!temporizador) siguiente();
      } else {
        apagar();
      }
    };

    const visibilidad = new IntersectionObserver(([entrada]) => {
      enPantalla = entrada.isIntersecting;
      decidir();
    });
    visibilidad.observe(rejilla);
    movimientoReducido.addEventListener("change", decidir);

    return () => {
      apagar();
      visibilidad.disconnect();
      movimientoReducido.removeEventListener("change", decidir);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
