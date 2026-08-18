"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Desplegable from "./Desplegable";
import {
  ENLACES_EQUIPOS,
  ENLACES_IDIOMAS,
  ENLACES_SUELTOS,
  seccionesDe,
} from "./secciones";
import styles from "./nav.module.css";

/* La navegación en línea del header.

   Es la única isla de cliente del header, y lo es por una razón concreta: en
   App Router un componente de servidor no conoce la ruta, y la única forma de
   saberla en el servidor —headers()— volvería dinámicas las 54 páginas del
   sitio. Un menú no justifica perder la generación estática.

   El logo y el botón de contacto siguen fuera de esta isla. */

export default function Navegacion() {
  const ruta = usePathname();
  const secciones = seccionesDe(ruta);

  if (secciones) {
    return (
      <nav className={styles.nav} aria-label="Secciones de esta página">
        <ul className={styles.list}>
          {secciones.map((s) => (
            <li key={s.id} className={styles.item}>
              {/* Ancla de la misma página: <a>, no <Link>. */}
              <a className={styles.link} href={`#${s.id}`}>
                {s.etiqueta}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav className={styles.nav} aria-label="Principal">
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
