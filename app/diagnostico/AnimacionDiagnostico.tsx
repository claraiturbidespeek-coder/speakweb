"use client";

import { useEffect, useState, type CSSProperties } from "react";
import styles from "./diagnostico.module.css";

/* La animación del hero de /diagnostico/: qué entrega el diagnóstico, en
   cuatro pasos sobre 18 personas, una por colaborador. Cada persona es un
   círculo con su silueta: gris claro mientras no termina el examen, azul
   marino con la silueta en blanco cuando termina. Se repite en bucle, PASO ms
   por paso:

   1. Examen en línea: las personas terminan una a una.
   2. Nivel de cada persona: cada una muestra su nivel junto a su ícono.
   3. Grupos sugeridos: se juntan en tres grupos de un solo nivel, con su
      nombre.
   4. Ruta al siguiente nivel: bajo cada grupo avanza una barra, sin cifras.

   Cada punto lleva en variables CSS su casilla en la rejilla (pasos 1 y 2) y
   en su grupo (pasos 3 y 4); el CSS elige una u otra según el paso y anima el
   viaje. Los niveles y los grupos son ilustrativos.

   Con prefers-reduced-motion no rota: se queda quieta en el paso 3.

   Para un lector de pantalla es una sola imagen con su descripción: el texto
   que cambia y los puntos van fuera del árbol de accesibilidad. */

const PASO = 3000;
/* Lo que tarda en llenarse cada punto tras el anterior, en el paso 1. Con 18
   puntos son ~2 s, dentro de los 3 s del paso. */
const ESCALON_LLENADO = 110;

const TITULOS = [
  "Examen en línea",
  "Nivel de cada persona",
  "Grupos sugeridos",
  "Ruta al siguiente nivel",
];

/* Un grupo por nivel, sin mezclar. */
const GRUPOS = [
  { nombre: "A1", personas: 5, siguiente: "A2" },
  { nombre: "A2", personas: 6, siguiente: "B1" },
  { nombre: "B1", personas: 7, siguiente: "B2" },
];

/* Ordenados por nivel, así quedan ya en el orden de su grupo. */
const NIVELES = [
  "A1", "A1", "A1", "A1", "A1",
  "A2", "A2", "A2", "A2", "A2", "A2",
  "B1", "B1", "B1", "B1", "B1", "B1", "B1",
];
const grupoDe = (nivel: string) => GRUPOS.findIndex((g) => g.nombre === nivel);

/* Casilla de cada punto en la rejilla de 6 × 3: revueltos, para que en el
   paso 2 los niveles se vean mezclados como en un equipo real. */
const CASILLAS = [7, 0, 12, 3, 16, 9, 1, 14, 5, 10, 17, 2, 8, 13, 4, 11, 6, 15];

const PUNTOS = NIVELES.map((nivel, i) => {
  const grupo = grupoDe(nivel);
  const k = NIVELES.slice(0, i).filter((n) => grupoDe(n) === grupo).length;
  return {
    nivel,
    estilo: {
      "--col": CASILLAS[i] % 6,
      "--fila": Math.floor(CASILLAS[i] / 6),
      "--orden": CASILLAS[i],
      "--grupo": grupo,
      "--gcol": k % 2,
      "--gfila": Math.floor(k / 2),
    } as CSSProperties,
  };
});

const DESCRIPCION =
  "Ejemplo ilustrativo de lo que entrega el diagnóstico, en cuatro pasos: 18 colaboradores presentan el examen en línea; se obtiene el nivel de cada persona (A1: 5, A2: 6, B1: 7); se proponen tres grupos de un solo nivel (A1 con 5 personas, A2 con 6 y B1 con 7); y cada grupo tiene su ruta al siguiente nivel: A1 hacia A2, A2 hacia B1 y B1 hacia B2.";

export default function AnimacionDiagnostico() {
  const [paso, setPaso] = useState(0);
  /* En el paso 1 los puntos entran vacíos y se llenan un instante después,
     para que el llenado escalonado arranque de cero en cada vuelta. */
  const [llenos, setLlenos] = useState(false);

  /* Todo cambio de estado va en un temporizador: el servidor pinta el paso 1
     vacío, y desde ahí manda el reloj. */
  useEffect(() => {
    const temporizadores: ReturnType<typeof setTimeout>[] = [];
    const despues = (ms: number, accion: () => void) => {
      temporizadores.push(setTimeout(accion, ms));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      despues(0, () => {
        setPaso(2);
        setLlenos(true);
      });
      return () => temporizadores.forEach(clearTimeout);
    }

    let actual = 0;
    despues(60, () => setLlenos(true));
    const ciclo = setInterval(() => {
      actual = (actual + 1) % TITULOS.length;
      setPaso(actual);
      if (actual === 0) {
        setLlenos(false);
        despues(60, () => setLlenos(true));
      }
    }, PASO);

    return () => {
      clearInterval(ciclo);
      temporizadores.forEach(clearTimeout);
    };
  }, []);

  const clases = [
    styles.anim,
    styles[`animPaso${paso + 1}`],
    paso !== 0 || llenos ? styles.animLlenos : "",
  ]
    .filter(Boolean)
    .join(" ");

  /* El marco es el contenedor de la animación: sus medidas se escalan con el
     ancho del marco (ver .animMarco en diagnostico.module.css). */
  return (
    <div className={styles.animMarco}>
      <div
        className={clases}
        role="img"
        aria-label={DESCRIPCION}
        style={{ "--escalon": `${ESCALON_LLENADO}ms` } as CSSProperties}
      >
        <div className={styles.animTitulos} aria-hidden="true">
          {TITULOS.map((t, i) => (
            <p key={t} className={`${styles.animTitulo}${i === paso ? ` ${styles.animTituloActivo}` : ""}`}>
              {t}
            </p>
          ))}
        </div>
        <div className={styles.animEscena} aria-hidden="true">
          {PUNTOS.map((p, i) => (
            <span key={i} className={styles.animPunto} style={p.estilo}>
              {/* La silueta: cabeza y hombros en trazo, del color del texto
                  del círculo (gris o blanco, ver .animPunto). */}
              <svg className={styles.animPersona} viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="9" r="3.5" />
                <path d="M5.5 19c.8-3.3 3.4-5.2 6.5-5.2s5.7 1.9 6.5 5.2" />
              </svg>
              <span className={styles.animNivel}>{p.nivel}</span>
            </span>
          ))}
          <div className={styles.animGrupos}>
            {GRUPOS.map((g) => (
              <div key={g.nombre} className={styles.animGrupo}>
                <span className={styles.animGrupoNombre}>{g.nombre}</span>
                <span className={styles.animGrupoPersonas}>{g.personas} personas</span>
                <span className={styles.animRuta}>
                  <span className={styles.animBarra}><span></span></span>
                  <span className={styles.animSiguiente}>Hacia {g.siguiente}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
