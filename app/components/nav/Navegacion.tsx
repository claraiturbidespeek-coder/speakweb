"use client";

import Link from "next/link";
import Desplegable from "./Desplegable";
import {
  ANCLAS_LANDING,
  ENLACES_EQUIPOS,
  ENLACES_IDIOMAS,
  ENLACES_SUELTOS,
} from "./secciones";
import useModoLanding from "./useModoLanding";
import styles from "./nav.module.css";

/* La navegación en línea del header.

   Es una isla de cliente por el modo landing: el fragmento de la URL no llega
   al servidor y decide cuál de las dos navegaciones se pinta. El logo y el
   botón de contacto siguen fuera de la isla.

   Las dos ocupan el mismo sitio, la columna del medio del header, y comparten
   la misma caja de estilos —`.nav`, `.list`, `.item`, `.link`—: son la misma
   barra de enlaces con distinto contenido, y por eso también desaparecen las
   dos en el mismo punto, 960px.

   Lo que cambia es a dónde llevan. Fuera del modo landing, el menú general del
   sitio. Dentro, las secciones de la propia página y nada más: en modo landing
   el header no ofrece ninguna salida —el logo deja de ser enlace y el botón de
   menú no se monta—, así que estos son enlaces internos, `<a href="#...">` y
   no <Link>, y no navegan a ninguna otra ruta.

   Del clic se encarga ScrollSuave: delega en el documento sobre `a[href^="#"]`
   y hace el desplazamiento y el pushState al `id`. Que ese pushState pise el
   `#landing` de la URL no apaga el modo: useModoLanding lee el fragmento una
   sola vez por ruta, que es justo para lo que se escribió así.

   `data-lenis-prevent-touch` es lo que hace posible arrastrar la barra por
   debajo de 960px, donde no cabe entera. Lenis escucha el touchmove de la
   ventana y lo consume para su scroll virtual; con este atributo lo ignora
   dentro de la barra y el arrastre vuelve a ser el nativo del navegador. Es la
   variante de touch y no `data-lenis-prevent` entero a propósito: la rueda
   sobre el header se queda con el desplazamiento suave del sitio. Lo que sí
   cambia es el gesto vertical que empieza sobre la barra, que a partir de aquí
   mueve la página sin suavizado. */

export default function Navegacion() {
  const landing = useModoLanding();

  if (landing) {
    return (
      <nav
        className={styles.anclas}
        aria-label="Secciones de esta página"
        data-lenis-prevent-touch
      >
        <ul className={styles.list}>
          {ANCLAS_LANDING.map((s) => (
            <li key={s.ancla} className={styles.item}>
              <a className={styles.link} href={s.ancla}>
                {s.nombre}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

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
