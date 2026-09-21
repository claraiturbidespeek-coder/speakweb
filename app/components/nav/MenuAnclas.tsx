"use client";

import { useEffect, useRef, useState } from "react";
import { ANCLAS_LANDING } from "./secciones";
import useModoLanding from "./useModoLanding";
import styles from "./nav.module.css";

/* El menú del modo landing por debajo de 960px: un botón junto a Cotizar que
   abre el mismo panel a pantalla completa de MenuCompleto, con las anclas de la
   página y nada más. En escritorio no se ve: ahí las anclas van en línea en la
   barra de Navegacion.tsx.

   Es el mismo <dialog> con showModal(): el navegador resuelve el foco
   atrapado, el Escape y la devolución del foco al botón. Todos los cierres
   pasan por el evento `close`, que es el único sitio que devuelve el scroll.

   El fondo se bloquea por partida doble, como en el modal de contacto:
   overflow en el body para el scroll nativo y Lenis detenido para el suave,
   que no se entera del overflow.

   AL TOCAR UN ANCLA el panel se cierra y devuelve el scroll en el mismo clic,
   sin esperar al evento `close`, que llega en una tarea posterior: el
   desplazamiento lo hace ScrollSuave con su listener en el documento, que
   corre justo después de este, y con Lenis todavía detenido lo ignoraría.
   Sin Lenis (movimiento reducido) salta el enlace nativo, que tampoco puede
   hacerlo con el body bloqueado. */

function liberarFondo() {
  document.body.style.overflow = "";
  window.__lenis?.start();
}

export default function MenuAnclas() {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [abierto, setAbierto] = useState(false);
  const landing = useModoLanding();

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

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    const alCerrar = () => {
      liberarFondo();
      setAbierto(false);
    };
    d.addEventListener("close", alCerrar);
    return () => d.removeEventListener("close", alCerrar);
  }, [landing]);

  const cerrar = () => dialogo.current?.close();

  // Solo en modo landing. Después de los hooks, que no pueden quedar detrás
  // de un return condicional.
  if (!landing) return null;

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setAbierto(true)}
        aria-label="Abrir las secciones de esta página"
        aria-haspopup="dialog"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 6h18" />
          <path d="M3 12h18" />
          <path d="M3 18h18" />
        </svg>
      </button>

      <dialog
        ref={dialogo}
        className={styles.panel}
        aria-label="Secciones de esta página"
        onClick={(e) => {
          if (e.target === dialogo.current) cerrar();
        }}
      >
        <div className={styles.panelInner}>
          <button
            type="button"
            className={styles.cerrar}
            onClick={cerrar}
            aria-label="Cerrar el menú"
          >
            &times;
          </button>

          <nav className={styles.lista} aria-label="Secciones de esta página">
            <ul className={styles.listaItems}>
              {ANCLAS_LANDING.map((s) => (
                <li key={s.ancla}>
                  <a
                    className={styles.listaEnlace}
                    href={s.ancla}
                    onClick={() => {
                      liberarFondo();
                      cerrar();
                    }}
                  >
                    {s.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  );
}
