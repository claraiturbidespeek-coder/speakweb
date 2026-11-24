"use client";

import { useEffect, useState } from "react";

/* Titular del hero de /diagnostico/ con el idioma que rota: inglés, portugués,
   francés, alemán, italiano, español y vuelta a inglés.

   - Tres líneas fijas, cada una sin partirse (`claseLinea`):
       Conozca el nivel de
       {idioma} de su equipo
       antes de invertir en capacitación
     El idioma nunca queda solo: va siempre con «de su equipo». Las seis
     versiones ocupan exactamente las mismas tres líneas, así que lo de debajo
     no se mueve. El tamaño de letra que hace que quepan está en el CSS
     (.titular).
   - Arranca en «inglés», que es también lo que trae el HTML del servidor.
   - Cada palabra se queda PERMANENCIA ms. Al cambiar, la saliente se desvanece
     y la entrante aparece en el mismo lugar: solo un fundido, sin moverse.
   - Con prefers-reduced-motion no rota: se queda en «inglés». */

const IDIOMAS = ["inglés", "portugués", "francés", "alemán", "italiano", "español"];
const PERMANENCIA = 2500;
/* Lo que tarda la palabra en desaparecer: el cambio de texto va justo después.
   Debe coincidir con la duración de la transición de `clasePalabra`
   (diagnostico.module.css, .titularPalabra). */
const SALIDA = 300;

export default function TitularIdiomas({
  claseTitular,
  claseLinea,
  clasePalabra,
  claseEntrando,
  claseSaliendo,
}: {
  claseTitular: string;
  claseLinea: string;
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
      <span className={claseLinea}>Conozca el nivel de</span>{" "}
      <span className={claseLinea}>
        {/* La `key` vuelve a montar la palabra en cada idioma: así la
            animación de entrada corre de nuevo para cada una. */}
        <span
          key={idioma}
          className={[clasePalabra, rotado ? claseEntrando : "", saliendo ? claseSaliendo : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {idioma}
        </span>{" "}
        de su equipo
      </span>{" "}
      <span className={claseLinea}>antes de invertir en capacitación</span>
    </h1>
  );
}
