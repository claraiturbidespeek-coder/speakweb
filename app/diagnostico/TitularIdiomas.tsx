"use client";

import { useEffect, useState } from "react";

/* Titular del hero de /diagnostico/ con el idioma que rota: inglés, portugués,
   francés, alemán, italiano, español para extranjeros y vuelta a inglés.

   - Arranca en «inglés», que es también lo que trae el HTML del servidor.
   - Cada palabra se queda PERMANENCIA ms. Al cambiar, la saliente se desvanece
     subiendo un poco; la entrante aparece igual, desde abajo.
   - El idioma va en su propia línea, con un corte fijo antes y después, y
     nunca se parte (`claseIdioma`, white-space: nowrap). Lo de arriba y lo de
     abajo es el mismo texto en las seis versiones, así que el titular ocupa
     siempre las mismas líneas y lo de debajo no se mueve. El tamaño de letra
     está pensado para que «español para extranjeros» quepa en una línea.
   - La palabra va en un trozo inline-block por palabra, porque las
     transformaciones no aplican a un inline.
   - Con prefers-reduced-motion no rota: se queda en «inglés». */

const IDIOMAS = [
  "inglés",
  "portugués",
  "francés",
  "alemán",
  "italiano",
  "español para extranjeros",
];
const PERMANENCIA = 2500;
/* Lo que tarda la palabra en desaparecer: el cambio de texto va justo después.
   Debe coincidir con la duración de la transición de `clasePalabra`
   (diagnostico.module.css, .titularPalabra). */
const SALIDA = 300;

export default function TitularIdiomas({
  claseTitular,
  claseIdioma,
  clasePalabra,
  claseEntrando,
  claseSaliendo,
}: {
  claseTitular: string;
  claseIdioma: string;
  clasePalabra: string;
  claseEntrando: string;
  claseSaliendo: string;
}) {
  const [indice, setIndice] = useState(0);
  const [saliendo, setSaliendo] = useState(false);
  /* «inglés» no entra animada: es lo primero que se pinta del hero, y
     esconderla aunque sea un instante retrasaría el pintado del titular. Solo
     las palabras que llegan por rotación llevan la entrada. */
  const [rotado, setRotado] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cambio: ReturnType<typeof setTimeout> | null = null;
    const ciclo = setInterval(() => {
      setSaliendo(true);
      cambio = setTimeout(() => {
        setIndice((i) => (i + 1) % IDIOMAS.length);
        setRotado(true);
        setSaliendo(false);
      }, SALIDA);
    }, PERMANENCIA);
    return () => {
      clearInterval(ciclo);
      if (cambio) clearTimeout(cambio);
    };
  }, []);

  const idioma = IDIOMAS[indice];

  return (
    <h1 className={claseTitular}>
      Conozca el nivel de
      <br />
      {/* La `key` vuelve a montar los trozos en cada idioma: así la animación
          de entrada corre de nuevo para cada palabra. */}
      <span key={idioma} className={claseIdioma}>
        {idioma.split(" ").map((trozo, i, todos) => (
          <span key={i}>
            <span
              className={[
                clasePalabra,
                rotado ? claseEntrando : "",
                saliendo ? claseSaliendo : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {trozo}
            </span>
            {i < todos.length - 1 ? " " : null}
          </span>
        ))}
      </span>
      <br />
      de su equipo antes de invertir en capacitación
    </h1>
  );
}
