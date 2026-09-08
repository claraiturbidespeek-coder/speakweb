"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ENLACES_EQUIPOS, ENLACES_IDIOMAS, ENLACES_SUELTOS } from "./secciones";
import useModoLanding from "./useModoLanding";
import styles from "./nav.module.css";

/* El botón de menú y el panel a pantalla completa que abre.

   Sigue siendo un <dialog> con showModal(): el navegador resuelve el foco
   atrapado, el Escape, el fondo inerte y la devolución del foco al botón. Solo
   se escribe el cierre al hacer clic fuera y el cierre al navegar, y todos los
   caminos de cierre pasan por el evento `close`.

   Cuándo se ve el botón lo decide el CSS: por debajo de 960px. En modo landing
   no se pinta en ninguna medida.

   ---------- La composición ----------

   En escritorio son dos columnas: a la izquierda la lista principal, a la
   derecha el contenido del elemento seleccionado. La selección cambia con el
   clic y también con el foco, que es lo que hace que funcione con el teclado
   sin inventar navegación por flechas: al tabular por la lista, la derecha va
   siguiendo.

   Por debajo de 768px las dos columnas no caben, así que se colapsa a una: se
   ve la lista, y al tocar un elemento con submenú se sustituye por su contenido
   con un botón para volver. Ese cambio lo gobierna `data-detalle`, y el CSS lo
   ignora por encima del breakpoint.

   Clientes y Recursos no despliegan nada: navegan. Se distinguen por ir tras
   una separación, sin el fondo de seleccionado y con una flecha en lugar del
   chevron. Un elemento que lleva a otra página y otro que abre contenido a la
   derecha no deberían verse igual. */

type Enlace = { nombre: string; ruta: string };
type Grupo = { clave: string; etiqueta: string; enlaces: Enlace[] };

export default function MenuCompleto() {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [abierto, setAbierto] = useState(false);
  const [seleccion, setSeleccion] = useState("");
  const [enDetalle, setEnDetalle] = useState(false);
  const ruta = usePathname();
  const landing = useModoLanding();

  const grupos: Grupo[] = [
    { clave: "idiomas", etiqueta: "Idiomas", enlaces: ENLACES_IDIOMAS },
    { clave: "equipos", etiqueta: "Equipos", enlaces: ENLACES_EQUIPOS },
  ];

  const activo = grupos.find((g) => g.clave === seleccion) ?? grupos[0];

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (abierto && !d.open) {
      // Al abrir se muestra el primero de la lista, y en móvil se empieza por
      // la lista, no por un detalle.
      setSeleccion(grupos[0].clave);
      setEnDetalle(false);
      d.showModal();
      document.body.style.overflow = "hidden";
    } else if (!abierto && d.open) {
      d.close();
    }
    // `grupos` se reconstruye en cada render; la clave del primero no cambia
    // mientras no cambie la ruta, y la ruta ya cierra el panel.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierto]);

  // Cerrar al navegar: el header sobrevive a la navegación. Se cierra el
  // diálogo, no el estado: el evento `close` es el único que sincroniza.
  useEffect(() => {
    const d = dialogo.current;
    if (d?.open) d.close();
  }, [ruta]);

  // Un solo sitio donde se restaura el scroll, venga el cierre de donde venga.
  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    const alCerrar = () => {
      document.body.style.overflow = "";
      setAbierto(false);
    };
    d.addEventListener("close", alCerrar);
    return () => d.removeEventListener("close", alCerrar);
  }, []);

  const elegir = (clave: string) => {
    setSeleccion(clave);
    setEnDetalle(true);
  };

  const cerrar = () => dialogo.current?.close();

  // Sin menú en modo landing: el botón se va con el panel. Va después de los
  // hooks, que no pueden quedar detrás de un return condicional.
  if (landing) return null;

  return (
    <>
      <button
        type="button"
        className={`${styles.toggle} sp-menu`}
        onClick={() => setAbierto(true)}
        aria-label="Abrir el menú"
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
        aria-label="Menú"
        onClick={(e) => {
          if (e.target === dialogo.current) cerrar();
        }}
      >
        <div
          className={styles.panelInner}
          data-detalle={enDetalle ? "si" : "no"}
        >
          <button
            type="button"
            className={styles.cerrar}
            onClick={cerrar}
            aria-label="Cerrar el menú"
          >
            &times;
          </button>

          {/* Columna izquierda */}
          <nav className={styles.lista} aria-label="Menú principal">
            <ul className={styles.listaItems}>
              {grupos.map((g) => (
                <li key={g.clave}>
                  <button
                    type="button"
                    className={`${styles.listaBoton} ${
                      activo.clave === g.clave ? styles.listaActivo : ""
                    }`}
                    onClick={() => elegir(g.clave)}
                    onFocus={() => setSeleccion(g.clave)}
                    aria-expanded={activo.clave === g.clave}
                  >
                    {g.etiqueta}
                  </button>
                </li>
              ))}
            </ul>

            {/* Estos dos no despliegan: llevan a otra página. */}
            <ul className={`${styles.listaItems} ${styles.listaDirectos}`}>
              {ENLACES_SUELTOS.map((e) => (
                <li key={e.ruta}>
                  <Link className={styles.listaEnlace} href={e.ruta}>
                    {e.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Columna derecha */}
          <div className={styles.contenido}>
            <button
              type="button"
              className={styles.volver}
              onClick={() => setEnDetalle(false)}
            >
              Volver
            </button>

            <h2 className={styles.contenidoTitulo}>{activo.etiqueta}</h2>
            <ul className={styles.contenidoLista}>
              {activo.enlaces.map((e) => (
                <li key={e.ruta}>
                  <Link className={styles.panelEnlace} href={e.ruta}>
                    {e.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </dialog>
    </>
  );
}
