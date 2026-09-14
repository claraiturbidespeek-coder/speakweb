import fs from "node:fs";
import path from "node:path";

/* Dimensiones intrínsecas de una imagen de public/, leídas del propio archivo.

   Existe para que las <img> declaren width y height: sin ellos el navegador no
   sabe cuánto espacio reservar hasta que descarga la imagen, y el contenido
   salta cuando llega. Es la causa directa del CLS.

   Se leen del archivo y no se escriben a mano porque las imágenes cambian: en
   una sola sesión se reexportaron 23 portadas a otro tamaño. Una dimensión
   escrita a mano se habría quedado con la proporción vieja y el salto sería
   peor que no declarar nada. Así se ajusta sola al reexportar.

   SOLO SERVIDOR: usa `fs`. No se puede importar desde un componente que acabe
   dentro de un árbol de cliente —las seis landings de idioma son "use client"—.
   Ahí las dimensiones van escritas junto al dato; ver logos-clientes.ts.

   Sin dependencias: el sitio solo sirve WebP y SVG, y leer la cabecera de esos
   dos formatos son unas líneas. `sharp` está en node_modules pero como
   dependencia transitiva de Next, no nuestra, y no conviene apoyarse en ella. */

export type Dimensiones = { width: number; height: number };

const PUBLICO = path.join(process.cwd(), "public");
const cache = new Map<string, Dimensiones | null>();

function webp(b: Buffer): Dimensiones | null {
  if (b.toString("ascii", 0, 4) !== "RIFF" || b.toString("ascii", 8, 12) !== "WEBP") {
    return null;
  }
  const trozo = b.toString("ascii", 12, 16);
  if (trozo === "VP8X") {
    // Formato extendido: ancho y alto menos uno, en 24 bits little-endian.
    return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
  }
  if (trozo === "VP8 ") {
    // Con pérdida: tras el código de inicio 9d 01 2a, dos enteros de 14 bits.
    if (b[23] !== 0x9d || b[24] !== 0x01 || b[25] !== 0x2a) return null;
    return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
  }
  if (trozo === "VP8L") {
    // Sin pérdida: firma 0x2f y luego ancho-1 y alto-1 empaquetados en 14 bits.
    if (b[20] !== 0x2f) return null;
    const bits = b.readUInt32LE(21);
    return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
  }
  return null;
}

function svg(texto: string): Dimensiones | null {
  const raiz = texto.match(/<svg\b[^>]*>/i)?.[0];
  if (!raiz) return null;
  const num = (attr: string) => {
    const v = raiz.match(new RegExp(`\\b${attr}="([\\d.]+)(px)?"`, "i"));
    return v ? Number(v[1]) : undefined;
  };
  const w = num("width");
  const h = num("height");
  if (w && h) return { width: Math.round(w), height: Math.round(h) };
  // Sin width/height absolutos, la proporción la da el viewBox.
  const vb = raiz.match(/\bviewBox="[\d.\-]+[\s,]+[\d.\-]+[\s,]+([\d.]+)[\s,]+([\d.]+)"/i);
  if (vb) return { width: Math.round(Number(vb[1])), height: Math.round(Number(vb[2])) };
  return null;
}

/* null si no se puede leer: ruta externa, archivo inexistente o formato que no
   es WebP ni SVG. Quien llama decide qué hacer; nunca lanza. */
export function dimensionesDe(src: string | undefined): Dimensiones | null {
  if (!src || !src.startsWith("/")) return null;
  if (cache.has(src)) return cache.get(src)!;

  let resultado: Dimensiones | null = null;
  try {
    const archivo = path.join(PUBLICO, decodeURIComponent(src.split("?")[0]));
    const datos = fs.readFileSync(archivo);
    if (archivo.endsWith(".webp")) resultado = webp(datos);
    else if (archivo.endsWith(".svg")) resultado = svg(datos.toString("utf8"));
  } catch {
    resultado = null;
  }

  cache.set(src, resultado);
  return resultado;
}

/* Para esparcir en una <img>: `<img {...atributosDimension(src)} />`. Devuelve
   un objeto vacío si no hay dimensiones, así que esparcirlo nunca rompe. */
export function atributosDimension(src: string | undefined): Partial<Dimensiones> {
  return dimensionesDe(src) ?? {};
}
