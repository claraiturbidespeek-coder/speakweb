"use client";

import { useEffect, useState, type ReactNode } from "react";
import styles from "./landing.module.css";

/* Ciclo radial de "El método S-Peak": el círculo de cinco pasos con el centro
   que muestra el que está activo.

   Antes vivía como marcado repetido más un guion en línea (`SCRIPT_PRINCIPAL`)
   en cada una de las seis landings de idioma: seis copias literales de la misma
   lógica y de las mismas coordenadas. Aquí quedan en un solo sitio la
   geometría, el orden y el comportamiento; cada página solo aporta el texto y
   el icono de sus cinco pasos, que es lo único que cambia entre idiomas.

   Sigue el camino que ya habían tomado el envío de leads y el modal de
   WhatsApp: salir del guion en línea y pasar a React. */

export type PasoMetodo = {
  titulo: string;
  descripcion: string;
  /* Para el lector de pantalla: el título sin el punto final. */
  etiqueta: string;
  icono: ReactNode;
};

const INTERVALO_MS = 2000;

/* Geometría del círculo, en porcentaje del contenedor y desde su centro. El
   radio va a la par del anillo punteado de landing.module.css (.cycle::before,
   82% de diámetro): si cambia uno, cambia el otro. */
const RADIO = 41;
const PASO_GRADOS = 72;

/* El paso 01 arriba, a las 12, y los siguientes cada 72° en sentido horario.
   -90° es el punto más alto, y sumar grados gira con el reloj porque en
   pantalla el eje Y crece hacia abajo. */
function posicion(indice: number) {
  const rad = ((-90 + indice * PASO_GRADOS) * Math.PI) / 180;
  return {
    left: `${(50 + RADIO * Math.cos(rad)).toFixed(1)}%`,
    top: `${(50 + RADIO * Math.sin(rad)).toFixed(1)}%`,
  };
}

export default function CicloMetodo({ pasos }: { pasos: PasoMetodo[] }) {
  const [activo, setActivo] = useState(0);
  const [pausado, setPausado] = useState(false);

  // Avance automático. Se detiene mientras el cursor está sobre el círculo y se
  // reanuda al salir, igual que hacía el guion.
  useEffect(() => {
    if (pausado || pasos.length === 0) return;
    // Con "reducir movimiento" activado el ciclo no arranca solo, el mismo
    // criterio que sigue Carrusel.tsx. Los nodos siguen respondiendo al cursor
    // y al clic, así que los cinco pasos se pueden recorrer igual, a mano.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const temporizador = setInterval(
      () => setActivo((i) => (i + 1) % pasos.length),
      INTERVALO_MS
    );
    return () => clearInterval(temporizador);
  }, [pausado, pasos.length]);

  if (pasos.length === 0) return null;

  const paso = pasos[activo];
  const numero = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <>
      <div
        className={styles.cycle}
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
      >
        <div className={styles.cycleCenter}>
          <div className={styles.cycleNum}>{numero(activo)}</div>
          <div className={styles.cycleTitle}>{paso.titulo}</div>
          <div className={styles.cycleDesc}>{paso.descripcion}</div>
        </div>

        {pasos.map((p, i) => (
          <button
            key={p.titulo}
            type="button"
            className={`${styles.cycleNode}${
              i === activo ? ` ${styles.cycleNodeActivo}` : ""
            }`}
            style={posicion(i)}
            aria-label={`Paso ${i + 1} de ${pasos.length}: ${p.etiqueta}`}
            aria-current={i === activo ? "step" : undefined}
            onMouseEnter={() => setActivo(i)}
            onClick={() => setActivo(i)}
          >
            {p.icono}
            {/* El número va marcado como decorativo: el orden ya se lo dice el
                aria-label al lector de pantalla, y repetirlo sobra. */}
            <span className={styles.cycleNodeNum} aria-hidden="true">
              {i + 1}
            </span>
          </button>
        ))}
      </div>

      {/* En móvil la descripción sale del círculo y va debajo, a ancho completo:
          dentro no cabe a un tamaño legible. En escritorio este bloque no se
          pinta y la descripción sigue en el centro.

          Van las cinco, apiladas en la misma celda, y solo se ve la del paso
          activo: así el bloque siempre mide lo que la más larga, a cualquier
          ancho, y el contenido de debajo no sube y baja al cambiar de paso. */}
      <div className={styles.cycleDescMovil}>
        {pasos.map((p, i) => (
          <p
            key={p.titulo}
            className={i === activo ? styles.cycleDescMovilActivo : undefined}
          >
            {p.descripcion}
          </p>
        ))}
      </div>
    </>
  );
}
