"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./nav.module.css";

/* Un desplegable del menú general.

   Sigue siendo <details>/<summary> y no un <button> con estado, porque así
   funciona sin JavaScript, el teclado va nativo, el estado plegado/desplegado
   se expone solo a los lectores de pantalla y no hay aria-expanded que
   mantener a mano.

   Lo único que el elemento no trae son tres cierres, y son los de aquí abajo.
   El cuarto —que abrir uno cierre el otro— lo da el atributo `name`
   compartido, sin una línea de código. */

export default function Desplegable({
  etiqueta,
  enlaces,
}: {
  etiqueta: string;
  enlaces: { nombre: string; ruta: string }[];
}) {
  const detalles = useRef<HTMLDetailsElement>(null);
  const ruta = usePathname();

  // 1. Cerrar al navegar. El header sobrevive a la navegación, así que sin
  //    esto el panel se queda abierto sobre la página nueva.
  useEffect(() => {
    if (detalles.current) detalles.current.open = false;
  }, [ruta]);

  // 2. Cerrar al hacer clic fuera. 3. Cerrar con Escape, devolviendo el foco
  //    al summary, que es de donde salió.
  useEffect(() => {
    const alPulsarFuera = (e: PointerEvent) => {
      const d = detalles.current;
      if (d?.open && e.target instanceof Node && !d.contains(e.target)) {
        d.open = false;
      }
    };
    const alPulsarEscape = (e: KeyboardEvent) => {
      const d = detalles.current;
      if (e.key === "Escape" && d?.open) {
        d.open = false;
        d.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", alPulsarFuera);
    document.addEventListener("keydown", alPulsarEscape);
    return () => {
      document.removeEventListener("pointerdown", alPulsarFuera);
      document.removeEventListener("keydown", alPulsarEscape);
    };
  }, []);

  return (
    <details ref={detalles} className={styles.details} name="menu-general">
      <summary className={styles.summary}>{etiqueta}</summary>
      <ul className={styles.dropdown}>
        {enlaces.map((e) => (
          <li key={e.ruta}>
            <Link className={styles.dropdownLink} href={e.ruta}>
              {e.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
