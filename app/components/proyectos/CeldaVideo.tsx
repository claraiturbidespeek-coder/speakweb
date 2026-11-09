"use client";

import { useEffect, useRef, useState } from "react";
import Icono from "@/app/components/Icono";
import { imagenResponsiva } from "@/lib/imagenes";
import styles from "./ProyectosVideo.module.css";

/* Celda de video de ProyectosVideo: el único trozo de cliente de la sección.

   No monta el iframe de YouTube al cargar: dos embeds de entrada pesarían más
   que el resto de la página junto. Muestra la portada —una imagen propia de
   public/images/, servida con imagenResponsiva— con un <button> encima, y solo
   al pulsarlo inserta el iframe desde youtube-nocookie.com, que no pone cookies
   hasta que se reproduce.

   Sin `id` (aún no hay video) la celda es un estado vacío de la misma
   proporción, para que la rejilla no cambie cuando llegue. */

export type VideoProyecto = {
  /* ID de YouTube, el de ?v= en la URL del video. */
  id?: string;
  /* Título del video: nombra el botón y el iframe para lectores de pantalla. */
  titulo?: string;
  /* Portada en public/images/, en WebP 16:9. */
  portada?: string;
  /* Ancho en pantalla de la portada, medido en el navegador. El valor por
     defecto es el de /nosotros/; otra página con otra rejilla pasa el suyo. */
  sizes?: string;
};

const SIZES_POR_DEFECTO =
  "(max-width: 600px) calc(100vw - 40px), (max-width: 960px) 92vw, min(46vw, 670px)";

export default function CeldaVideo({
  id,
  titulo,
  portada,
  sizes = SIZES_POR_DEFECTO,
  className,
}: VideoProyecto & { className?: string }) {
  const [activo, setActivo] = useState(false);
  const iframe = useRef<HTMLIFrameElement>(null);

  /* El botón desaparece al pulsarlo: el foco pasa al reproductor para no
     perderse en el documento. */
  useEffect(() => {
    if (activo) iframe.current?.focus();
  }, [activo]);

  const clases = `${styles.celdaVideo}${className ? ` ${className}` : ""}`;

  if (!id) {
    return (
      <div className={`${clases} ${styles.celdaVacia}`} aria-hidden="true">
        <span className={`sp-icono ${styles.playVacio}`}>
          <Icono nombre="reproducir" />
        </span>
      </div>
    );
  }

  if (activo) {
    return (
      <div className={clases}>
        <iframe
          ref={iframe}
          className={styles.iframe}
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`}
          title={titulo ?? "Video de YouTube"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={clases}>
      {portada ? (
        <img
          className={styles.portada}
          {...imagenResponsiva(portada, sizes, 16 / 9)}
          alt=""
          width="1920"
          height="1080"
          loading="lazy"
          decoding="async"
        />
      ) : null}
      <button
        type="button"
        className={styles.botonPlay}
        aria-label={titulo ? `Reproducir video: ${titulo}` : "Reproducir video"}
        onClick={() => setActivo(true)}
      >
        <span className={`sp-icono ${styles.play}`}>
          <Icono nombre="reproducir" />
        </span>
      </button>
    </div>
  );
}
