"use client";

import Link from "next/link";
import Desplegable from "./Desplegable";
import { ENLACES_EQUIPOS, ENLACES_IDIOMAS, ENLACES_SUELTOS } from "./secciones";
import useModoLanding from "./useModoLanding";
import styles from "./nav.module.css";

/* La navegación en línea del header.

   Es una isla de cliente por el modo landing: el fragmento de la URL no llega
   al servidor y decide si esta navegación se pinta o no. El logo y el botón de
   contacto siguen fuera de la isla. */

export default function Navegacion() {
  const landing = useModoLanding();

  if (landing) return null;

  return (
    <nav className={`${styles.nav} sp-menu`} aria-label="Principal">
      <ul className={styles.list}>
        <li className={styles.item}>
          <Desplegable etiqueta="Idiomas" enlaces={ENLACES_IDIOMAS} />
        </li>
        <li className={styles.item}>
          <Desplegable etiqueta="Equipos" enlaces={ENLACES_EQUIPOS} />
        </li>
        {ENLACES_SUELTOS.map((e) => (
          <li key={e.ruta} className={styles.item}>
            <Link className={styles.link} href={e.ruta}>
              {e.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
