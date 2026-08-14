"use client";

import { useEffect, useState } from "react";
import type { Encabezado } from "@/lib/posts";
import styles from "./IndiceContenidos.module.css";

const ESCRITORIO = "(min-width: 961px)";

// Único componente de cliente de la nota. Recibe los encabezados ya calculados
// en el servidor; aquí solo vive el estado de apertura y el marcado del activo.
export default function IndiceContenidos({
  encabezados,
}: {
  encabezados: Encabezado[];
}) {
  const [activo, setActivo] = useState<string>("");
  // Cerrado en el servidor: es lo correcto en móvil y evita el parpadeo.
  // En escritorio se abre al hidratar. Sin JavaScript queda plegado pero usable.
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(ESCRITORIO);
    const aplicar = () => setAbierto(mq.matches);
    aplicar();
    mq.addEventListener("change", aplicar);
    return () => mq.removeEventListener("change", aplicar);
  }, []);

  useEffect(() => {
    if (encabezados.length === 0) return;

    const nodos = encabezados
      .map((e) => document.getElementById(e.id))
      .filter((n): n is HTMLElement => n !== null);
    if (nodos.length === 0) return;

    const visibles = new Set<string>();
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) visibles.add(entrada.target.id);
          else visibles.delete(entrada.target.id);
        }
        // El activo es el primero del documento entre los visibles. Si no hay
        // ninguno visible se conserva el último marcado.
        const primero = encabezados.find((e) => visibles.has(e.id));
        if (primero) setActivo(primero.id);
      },
      // La banda superior descuenta el header sticky de 68px más aire.
      { rootMargin: "-92px 0px -60% 0px", threshold: 0 }
    );

    nodos.forEach((n) => observador.observe(n));
    return () => observador.disconnect();
  }, [encabezados]);

  if (encabezados.length === 0) return null;

  return (
    <nav aria-label="Contenido del artículo">
      <details
        className={styles.indice}
        open={abierto}
        onToggle={(e) => setAbierto(e.currentTarget.open)}
      >
        <summary className={styles.resumen}>Contenido</summary>
        <ol className={styles.lista}>
          {encabezados.map((e) => (
            <li
              key={e.id}
              className={e.nivel === 3 ? styles.itemNivel3 : styles.item}
            >
              <a
                href={`#${e.id}`}
                className={`${styles.enlace} ${
                  activo === e.id ? styles.activo : ""
                }`}
                aria-current={activo === e.id ? "true" : undefined}
              >
                {e.texto}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
