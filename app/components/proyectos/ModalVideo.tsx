"use client";

import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import styles from "./ProyectosVideo.module.css";

/* El reproductor de YouTube de una celda de video, en modal.

   Misma mecánica que ModalContacto: un <dialog> abierto con showModal(). El
   navegador atrapa el foco dentro, lo cierra con Escape, deja inerte el
   fondo y, al cerrar, devuelve el foco al botón que lo abrió. A mano solo van
   el clic fuera y el bloqueo del scroll (overflow del body y Lenis), y los
   tres caminos de cierre —Escape, clic fuera y la cruz— pasan por close(),
   así que el evento `close` es el único sitio donde se deshace todo.

   El iframe solo existe con el modal abierto: al cerrar se desmonta y el
   video se detiene. Se carga desde youtube-nocookie.com, que no pone cookies
   hasta que se reproduce, y arranca solo.

   Límite conocido: cuando el foco está dentro del reproductor (tras pulsar en
   el video), las teclas las recibe el iframe, que es de otro origen, y
   Escape no llega al <dialog>. Con el foco en la cruz, que es donde cae al
   abrir, o en el fondo, sí cierra. */

type Props = {
  id: string;
  titulo?: string;
  abierto: boolean;
  alCerrar: () => void;
};

export default function ModalVideo({ id, titulo, abierto, alCerrar }: Props) {
  const dialogo = useRef<HTMLDialogElement>(null);

  // Abrir y cerrar según el estado de la celda.
  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (abierto && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
      window.__lenis?.stop();
    } else if (!abierto && d.open) {
      d.close();
    }
  }, [abierto]);

  // Cerrar: un solo sitio, sea quien sea quien lo haya provocado.
  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    const alCerrarNativo = () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
      alCerrar();
    };
    d.addEventListener("close", alCerrarNativo);
    return () => d.removeEventListener("close", alCerrarNativo);
  }, [alCerrar]);

  // Clic fuera: el destino es el propio <dialog> cuando se pincha su relleno.
  const alHacerClic = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogo.current) dialogo.current?.close();
  };

  const nombre = titulo ? `Video: ${titulo}` : "Video de YouTube";

  return (
    <dialog
      ref={dialogo}
      className={`sp-modal-overlay ${styles.modalVideo}`}
      role="dialog"
      aria-modal="true"
      aria-label={nombre}
      onClick={alHacerClic}
    >
      <div className={styles.modalCaja}>
        <button
          type="button"
          className={`sp-modal-cerrar ${styles.modalCerrar}`}
          onClick={() => dialogo.current?.close()}
          aria-label="Cerrar video"
        >
          &times;
        </button>
        <div className={styles.modalMarco}>
          {abierto ? (
            <iframe
              className={styles.iframe}
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`}
              title={titulo ?? "Video de YouTube"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : null}
        </div>
      </div>
    </dialog>
  );
}
