"use client";

import { useEffect, useState } from "react";
import { imagenResponsiva } from "@/lib/imagenes";

/* La media del hero del home: el video en escritorio y su primer fotograma en
   móvil y tablet.

   El video pesa 4,3MB y en móvil no compensa: por debajo de 960px se sirve
   solo la imagen, 21KB. No basta con esconder el <video> por CSS —el
   navegador lo descarga igual—, así que la elección se hace aquí y el
   elemento que sobra no llega al DOM.

   El servidor pinta siempre la imagen, que es lo que necesita el móvil; en
   escritorio el video la sustituye al hidratar. No hay salto: el video lleva
   el mismo fotograma como `poster`, así que la caja enseña la misma imagen
   mientras el video carga, que era el hueco vacío que dejaba antes.

   Las dos versiones comparten la clase del módulo del home, así que miden y
   se colocan igual. */

const POSTER = "/images/home/hero-speak-poster.webp";
const VIDEO = "/video/hero-speak.mp4";

/* Mismo corte que usa la home para separar tablet de escritorio. */
const ESCRITORIO = "(min-width: 961px)";

export default function HeroHomeMedia({ className }: { className?: string }) {
  const [escritorio, setEscritorio] = useState(false);

  useEffect(() => {
    const consulta = window.matchMedia(ESCRITORIO);
    const aplicar = () => setEscritorio(consulta.matches);
    aplicar();
    consulta.addEventListener("change", aplicar);
    return () => consulta.removeEventListener("change", aplicar);
  }, []);

  if (escritorio) {
    return (
      <video
        className={className}
        src={VIDEO}
        poster={POSTER}
        width={720}
        height={900}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  /* Sin carga diferida: en móvil esta imagen es lo más grande de la primera
     pantalla y es la que mide el LCP.

     El alt va vacío a propósito: el video al que sustituye tampoco describía
     nada, y el texto alternativo de una foto es contenido, no maquetación. */
  return (
    <img
      className={className}
      {...imagenResponsiva(POSTER, "(max-width: 960px) calc(100vw - 40px), 720px")}
      alt=""
      width={720}
      height={900}
      loading="eager"
      fetchPriority="high"
    />
  );
}
