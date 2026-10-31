"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./SeccionEvidencia.module.css";

/* La versión `rotativo` de TableroProgreso: el único trozo de cliente del
   tablero. Todo lo que pinta llega ya renderizado desde el servidor; aquí solo
   vive qué vista está activa.

   - Las vistas se apilan en la misma celda de un grid, así que el tablero mide
     siempre lo que la más alta y la sección no brinca al cambiar.
   - Cambia cada 5 s, solo mientras el tablero está en pantalla. Al salir de
     ella se para y vuelve a la vista 1, para que al entrar se vea siempre
     desde el principio (salvo que se haya pulsado un punto). Se para también
     mientras el cursor está encima o hay foco dentro, y del todo en cuanto se
     pulsa un punto.
   - Una vista anima sus barras la primera vez que se muestra (`vistaMostrada`),
     no antes ni en las rotaciones siguientes.
   - Con prefers-reduced-motion no rota: el CSS apila las vistas y esconde los
     puntos.

   La clase de la raíz no depende del estado, para que React no pise la clase
   `visible` que le pone AnimacionesEntrada. */

const INTERVALO = 5000;
/* El mismo umbral con el que /nosotros/ monta AnimacionesEntrada: la rotación
   arranca a la vez que la animación de entrada del tablero. */
const UMBRAL = 0.08;

export default function TableroRotativo({
  className,
  etiqueta,
  barra,
  chips,
  vistas,
}: {
  className: string;
  etiqueta: string;
  barra: ReactNode;
  chips: ReactNode;
  vistas: ReactNode[];
}) {
  const [activa, setActiva] = useState(0);
  const [mostradas, setMostradas] = useState(() => vistas.map((_, i) => i === 0));
  const [encima, setEncima] = useState(false);
  const [foco, setFoco] = useState(false);
  const [detenida, setDetenida] = useState(false);
  const [reducida, setReducida] = useState(false);
  const [enPantalla, setEnPantalla] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const detenidaRef = useRef(false);

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const actualizar = () => setReducida(consulta.matches);
    actualizar();
    consulta.addEventListener("change", actualizar);
    return () => consulta.removeEventListener("change", actualizar);
  }, []);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        setEnPantalla(entrada.isIntersecting);
        // Fuera de pantalla vuelve a la vista 1: el fundido ocurre donde nadie
        // lo ve. Si se pulsó un punto, se respeta la vista elegida.
        if (!entrada.isIntersecting && !detenidaRef.current) setActiva(0);
      },
      { threshold: UMBRAL },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  function mostrar(i: number) {
    setActiva(i);
    setMostradas((m) => (m[i] ? m : m.map((v, j) => v || j === i)));
  }

  useEffect(() => {
    if (!enPantalla || reducida || detenida || encima || foco) return;
    const t = window.setTimeout(() => mostrar((activa + 1) % vistas.length), INTERVALO);
    return () => window.clearTimeout(t);
  }, [activa, enPantalla, reducida, detenida, encima, foco, vistas.length]);

  return (
    <div
      ref={raiz}
      className={className}
      onMouseEnter={() => setEncima(true)}
      onMouseLeave={() => setEncima(false)}
      onFocus={() => setFoco(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFoco(false);
      }}
    >
      <div className={styles.dash} role="img" aria-label={etiqueta}>
        {barra}
        <div className={styles.dashContent}>
          {chips}
          <div className={styles.vistas}>
            {vistas.map((vista, i) => (
              <div
                key={i}
                className={[
                  styles.dashGrid,
                  styles.vista,
                  i === activa && styles.vistaActiva,
                  mostradas[i] && styles.vistaMostrada,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {vista}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Fuera del tablero: dentro, el role="img" los escondería. */}
      <div className={styles.indicadores} role="group" aria-label="Vistas del tablero">
        {vistas.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.indicador} ${i === activa ? styles.indicadorActivo : ""}`}
            aria-label={`Mostrar la vista ${i + 1} de ${vistas.length}`}
            aria-pressed={i === activa}
            onClick={() => {
              detenidaRef.current = true;
              setDetenida(true);
              mostrar(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}
