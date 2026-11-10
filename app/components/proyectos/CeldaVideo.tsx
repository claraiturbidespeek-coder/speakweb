"use client";

import { useCallback, useState } from "react";
import Icono from "@/app/components/Icono";
import { useVideoDecorativo } from "@/app/components/useVideoDecorativo";
import { imagenResponsiva } from "@/lib/imagenes";
import ModalVideo from "./ModalVideo";
import styles from "./ProyectosVideo.module.css";

/* Celda de video de ProyectosVideo: el único trozo de cliente de la sección.

   En la celda no va el reproductor de YouTube: dos embeds de entrada pesarían
   más que el resto de la página junto. Va un preview:
     - la portada, una imagen propia de public/images/ servida con
       imagenResponsiva, que pinta siempre el servidor;
     - encima, desde 960px y sin movimiento reducido, un clip corto propio de
       public/video/ en bucle, silenciado y sin controles. Lo decide
       useVideoDecorativo: en móvil y tablet, o con movimiento reducido, no se
       monta y se queda la portada. El clip no lleva `poster`: la portada ya
       está debajo y sería descargarla dos veces;
     - encima de todo, el <button> que abre el video en un modal (ModalVideo).

   Sin `id` (aún no hay video) la celda es un estado vacío, para que la
   rejilla no cambie cuando llegue. */

export type VideoProyecto = {
  /* ID de YouTube, el de ?v= en la URL del video. */
  id?: string;
  /* Título del video: nombra el botón y el modal para lectores de pantalla. */
  titulo?: string;
  /* Portada en public/images/, en WebP 16:9: el primer fotograma del clip. */
  portada?: string;
  /* Clip de preview en public/video/: MP4 H.264 corto, sin audio. */
  clip?: string;
  /* Ancho en pantalla de la portada, medido en el navegador. */
  sizes?: string;
};

/* Genérico: cada celda de un mosaico tiene su tamaño, así que la página pasa
   el sizes de cada video, medido en el navegador. */
const SIZES_POR_DEFECTO = "(max-width: 599px) calc(100vw - 40px), 50vw";

export default function CeldaVideo({
  id,
  titulo,
  portada,
  clip,
  sizes = SIZES_POR_DEFECTO,
  className,
}: VideoProyecto & { className?: string }) {
  const [abierto, setAbierto] = useState(false);
  const animar = useVideoDecorativo();
  const alCerrar = useCallback(() => setAbierto(false), []);

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

  return (
    <div className={clases}>
      {portada ? (
        <img
          className={styles.portada}
          {...imagenResponsiva(portada, sizes)}
          alt=""
          width="1280"
          height="720"
          loading="lazy"
          decoding="async"
        />
      ) : null}
      {clip && animar ? (
        <video
          className={styles.portada}
          src={clip}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : null}
      <button
        type="button"
        className={styles.botonPlay}
        aria-label={titulo ? `Reproducir video: ${titulo}` : "Reproducir video"}
        aria-haspopup="dialog"
        onClick={() => setAbierto(true)}
      >
        <span className={`sp-icono ${styles.play}`}>
          <Icono nombre="reproducir" />
        </span>
      </button>
      <ModalVideo id={id} titulo={titulo} abierto={abierto} alCerrar={alCerrar} />
    </div>
  );
}
