"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Categoria } from "@/lib/posts";
import styles from "./ListadoBlog.module.css";

const TODOS = "todos";
const PASO = 9;

// Las 26 tarjetas llegan como children ya renderizadas en el servidor: aquí no
// se pinta ninguna. Este componente solo gobierna dos atributos del envoltorio
// y el CSS decide qué se ve. Así los 26 enlaces están en el HTML inicial.
export default function ListadoBlog({
  categorias,
  total,
  children,
}: {
  categorias: Categoria[];
  total: number;
  children: ReactNode;
}) {
  const [filtro, setFiltro] = useState<string>(TODOS);
  const [visibles, setVisibles] = useState<number>(PASO);
  const centinela = useRef<HTMLDivElement>(null);

  const quedanOcultas = filtro === TODOS && visibles < total;

  useEffect(() => {
    if (!quedanOcultas) return;
    const nodo = centinela.current;
    if (!nodo) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setVisibles((v) => Math.min(v + PASO, total));
        }
      },
      { rootMargin: "300px 0px" }
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, [quedanOcultas, total]);

  const cambiarFiltro = (slug: string) => {
    setFiltro(slug);
    setVisibles(PASO);
  };

  return (
    <>
      {/* TODO: cuando existan las páginas de categoría, estos botones pasan a
          <Link href={`/category/${c.slug}/`}> y el filtrado deja de ser local. */}
      <div className={styles.filtro} role="group" aria-label="Filtrar por categoría">
        <button
          type="button"
          className={`${styles.opcion} ${filtro === TODOS ? styles.activa : ""}`}
          aria-pressed={filtro === TODOS}
          onClick={() => cambiarFiltro(TODOS)}
        >
          Todos <span className={styles.cuenta}>{total}</span>
        </button>
        {categorias.map((c) => (
          <button
            key={c.slug}
            type="button"
            className={`${styles.opcion} ${filtro === c.slug ? styles.activa : ""}`}
            aria-pressed={filtro === c.slug}
            onClick={() => cambiarFiltro(c.slug)}
          >
            {c.nombre} <span className={styles.cuenta}>{c.total}</span>
          </button>
        ))}
      </div>

      {/* Sin JavaScript el estado nunca cambia y solo se verían las primeras
          nueve. Esto devuelve las 26 a la vista. */}
      <noscript>
        <style>{`.${styles.rejilla} > * { display: block !important }`}</style>
      </noscript>

      <ul
        className={styles.rejilla}
        data-filtro={filtro}
        data-visibles={visibles}
      >
        {children}
      </ul>

      <div ref={centinela} aria-hidden="true" />

      {quedanOcultas ? (
        <div className={styles.masWrap}>
          <button
            type="button"
            className={styles.mas}
            onClick={() => setVisibles((v) => Math.min(v + PASO, total))}
          >
            Ver más artículos
          </button>
        </div>
      ) : null}
    </>
  );
}
