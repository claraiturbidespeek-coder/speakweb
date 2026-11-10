"use client";

import Icono from "@/app/components/Icono";
import { useVideoDecorativo } from "@/app/components/useVideoDecorativo";
import { imagenResponsiva } from "@/lib/imagenes";
import styles from "./nosotros.module.css";

/* La caja de video del hero de /nosotros/: un fondo decorativo, no contenido.

   Mismo criterio que HeroHomeMedia: el servidor pinta siempre el poster como
   <img> con srcset, y el <video> solo se monta en el cliente cuando toca, que
   es desde 960px y sin movimiento reducido (lo decide useVideoDecorativo). En
   móvil, en tablet y con movimiento reducido se queda la imagen y el video no
   se descarga.

   El video lleva el mismo poster, así que al montarse encima no hay salto
   mientras carga. Va silenciado, en bucle y sin controles.

   Sin video ni poster (hoy) es un placeholder: el gris y el icono apagado de
   las celdas de video vacías del bento de proyectos. */

type Props = {
  /* Ruta del MP4 en public/video/. */
  video?: string;
  /* Primer fotograma del video, en WebP 16:9 en public/images/. */
  poster?: string;
};

/* Medido en el navegador con el poster 16:9 recortado con object-fit: cover
   en la caja. Manda el mayor entre el ancho de la caja (la página menos dos
   gutters extendidos) y su alto por 16/9: 462px a 390 de ancho, 559 a 599,
   640 a 600, 919 a 959, 996 de 960 a 1000 y, por encima, el 96% de la
   ventana (1382 a 1440, 1843 a 1920). */
const SIZES =
  "(max-width: 599px) max(calc(100vw - 40px), 463px), (max-width: 959px) max(calc(100vw - 40px), 640px), max(96vw, 996px)";

export default function HeroVideo({ video, poster }: Props) {
  const animar = useVideoDecorativo();

  const vacio = !video && !poster;

  /* aria-hidden en la caja: cubre la imagen y el video. */
  return (
    <div
      className={`${styles.heroVideo}${vacio ? ` ${styles.heroVideoVacio}` : ""}`}
      aria-hidden="true"
    >
      {vacio ? (
        <span className={`sp-icono ${styles.heroVideoIcono}`}>
          <Icono nombre="reproducir" />
        </span>
      ) : null}

      {/* Sin carga diferida: está en la primera pantalla. */}
      {poster ? (
        <img
          className={styles.heroVideoMedia}
          {...imagenResponsiva(poster, SIZES)}
          alt=""
          width="1920"
          height="1080"
          loading="eager"
          decoding="async"
        />
      ) : null}

      {video && animar ? (
        <video
          className={styles.heroVideoMedia}
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : null}
    </div>
  );
}
