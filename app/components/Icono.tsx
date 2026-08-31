/* Iconos de las páginas de Soluciones por Equipo, y registro central de
   iconos del sitio: cualquier página que necesite uno de estos trazados
   importa este componente en vez de escribir el SVG suelto.

   Trazados de estilo Lucide, los mismos que trajo la referencia. Viven en un
   registro y no sueltos en cada página porque son 17 por área y siete áreas: en
   línea serían más de cien bloques de SVG repetidos entre archivos.

   El trazo, el grosor y los remates los pone `.sp-icono svg` en patrones.css;
   aquí solo va la geometría. Regla de las páginas: dentro de una misma página
   no se repite un icono. */

const TRAZOS: Record<string, string> = {
  // — Genéricos del hero —
  birrete: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z|M22 10v6|M6 12.5V16a6 3 0 0 0 12 0v-3.5",
  edificio:
    "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z|M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2|M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2|M10 6h4|M10 10h4|M10 14h4|M10 18h4",
  premio:
    "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526|circle:12,8,6",

  // — Comunicación y coordinación —
  usuarios:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2|circle:9,7,4|M22 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75",
  usuarioCheck:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2|circle:9,7,4|m16 11 2 2 4-4",
  mensaje:
    "M21 11.5a8.4 8.4 0 0 1-.9 3.8A8.5 8.5 0 0 1 12.5 20a8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.4 8.4 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8z",
  correo:
    "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2z|m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
  presentacion: "M2 3h20|M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3|m7 21 5-5 5 5",
  globo:
    "circle:12,12,10|M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20|M2 12h20",
  enlace:
    "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71|M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",

  // — Documentos y lectura —
  documento:
    "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z|M14 2v4a2 2 0 0 0 2 2h4",
  lectura:
    "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z|M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  lista:
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M16 13H8|M16 17H8|M10 9H8",
  sello:
    "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z|m9 12 2 2 4-4",

  // — Negocio y análisis —
  grafico: "M3 3v16a2 2 0 0 0 2 2h16|M18 17V9|M13 17V5|M8 17v-3",
  tendencia: "M3 3v16a2 2 0 0 0 2 2h16|m19 9-5 5-4-4-3 3",
  graficoArea:
    "M3 3v16a2 2 0 0 0 2 2h16|M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z",
  balanza:
    "M12 3v18|M5 7h14|m5 7-3 6h6z|m19 7-3 6h6z|M8 21h8",
  escudo:
    "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z|m9 12 2 2 4-4",
  alerta:
    "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3|M12 9v4|M12 17h.01",
  reloj: "circle:12,12,10|M12 6v6l4 2",
  flecha: "M16 7h6v6|m22 7-8.5 8.5-5-5L2 17",
  fabrica:
    "M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z|M17 18h1|M12 18h1|M7 18h1",
  apreton:
    "m11 17 2 2a1 1 0 1 0 3-3|m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4|m21 3 1 11h-2|M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3|M3 4h8",
  lapiz:
    "M12 20h9|M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
  diadema:
    "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a9 9 0 0 1 18 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
  bloques: "rect:8,8,3,3,2|M7 11v4a2 2 0 0 0 2 2h4|rect:8,8,13,13,2",
  documentoX:
    "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z|M14 2v4a2 2 0 0 0 2 2h4|m14.5 12.5-5 5|m9.5 12.5 5 5",
  correoX:
    "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8|m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7|m17 17 4 4|m21 17-4 4",
  usuarioX:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2|circle:9,7,4|line:17,8,22,13|line:22,8,17,13",
  diana: "circle:12,12,10|circle:12,12,6|circle:12,12,2",
};

/* Marcas de marca: un solo trazado relleno, no un contorno de Lucide. Van en
   su propio registro porque necesitan lo contrario de TRAZOS —
   fill: currentColor, sin stroke— así que anulan en línea el estilo que
   `.sp-icono svg` pone para los iconos de contorno, en vez de vivir de él. */
const SOLIDOS: Record<string, string> = {
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.328-1.85 3.556 0 4.212 2.342 4.212 5.39v6.351zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};

export type NombreIcono = keyof typeof TRAZOS | keyof typeof SOLIDOS;

export default function Icono({ nombre }: { nombre: string }) {
  const solido = SOLIDOS[nombre];
  if (solido) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" style={{ fill: "currentColor", stroke: "none" }}>
        <path d={solido} />
      </svg>
    );
  }
  const trazo = TRAZOS[nombre];
  if (!trazo) {
    // Ruidoso a propósito: un icono que no existe se vería como un hueco.
    throw new Error(
      `Icono desconocido: "${nombre}". Añádelo a TRAZOS o SOLIDOS en app/components/Icono.tsx.`
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {trazo.split("|").map((d, i) => {
        if (d.startsWith("circle:")) {
          const [cx, cy, r] = d.slice(7).split(",");
          return <circle key={i} cx={cx} cy={cy} r={r} />;
        }
        if (d.startsWith("rect:")) {
          const [w, h, x, y, rx] = d.slice(5).split(",");
          return <rect key={i} width={w} height={h} x={x} y={y} rx={rx} />;
        }
        if (d.startsWith("line:")) {
          const [x1, y1, x2, y2] = d.slice(5).split(",");
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        }
        return <path key={i} d={d} />;
      })}
    </svg>
  );
}
