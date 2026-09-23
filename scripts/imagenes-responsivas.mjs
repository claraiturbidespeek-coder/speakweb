/* Genera las variantes por ancho de cada imagen WebP de public/images/, para
   que las <img> del sitio puedan declarar srcset y el navegador descargue el
   tamaño en que se muestra la imagen, no el original.

   Corre solo a mano: `npm run imagenes`, al añadir o reexportar una imagen. Las
   variantes y los dos JSON que escribe van al repositorio; el build no lo
   ejecuta.

   - Salida: public/images/variantes/<misma ruta>-<ancho>.webp.
   - Solo anchos menores que el original: el original es siempre el último
     candidato del srcset y no se reescala hacia arriba.
   - Escribe lib/imagenes-variantes.json, el índice que lee lib/imagenes.ts, y
     scripts/imagenes-responsivas.estado.json, su memoria entre ejecuciones.
   - Incremental por contenido, no por fecha: git no conserva las fechas de
     modificación, así que tras clonar no dirían nada. El estado guarda un hash
     de cada original; si no cambió, sus variantes se dan por buenas y solo se
     crean las que falten. Reexportar una imagen cambia su hash y rehace todas.
   - Un original muy comprimido puede pesar menos que su versión reducida a
     calidad 80. Esa variante no ahorra nada: se borra, el srcset usa el
     original y el estado la recuerda como descartada para no rehacerla en cada
     ejecución.

   SVG, JPG y PNG quedan fuera: los SVG no tienen tamaño, y el JPG que queda es
   la imagen de Open Graph, que no se muestra en la página. */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const RAIZ = process.cwd();
const IMAGENES = path.join(RAIZ, "public", "images");
const SALIDA = path.join(IMAGENES, "variantes");
const INDICE = path.join(RAIZ, "lib", "imagenes-variantes.json");
const ESTADO = path.join(RAIZ, "scripts", "imagenes-responsivas.estado.json");

/* Cubren los anchos en que se muestran las imágenes del sitio (de 88px a
   pantalla completa) a densidad 1x, 2x y 3x. */
const ANCHOS = [160, 320, 480, 640, 800, 1080, 1440, 1920];
const CALIDAD = 80;

function recorrer(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const ruta = path.join(dir, e.name);
    if (e.isDirectory()) return ruta === SALIDA ? [] : recorrer(ruta);
    return /\.webp$/i.test(e.name) ? [ruta] : [];
  });
}

const estadoPrevio = fs.existsSync(ESTADO) ? JSON.parse(fs.readFileSync(ESTADO, "utf8")) : {};
const indice = {};
const estado = {};
let generadas = 0;

for (const archivo of recorrer(IMAGENES).sort()) {
  const relativa = path.relative(IMAGENES, archivo);
  const clave = `/images/${relativa.split(path.sep).join("/")}`;
  const contenido = fs.readFileSync(archivo);
  const hash = crypto.createHash("sha1").update(contenido).digest("hex");
  const { width, height } = await sharp(contenido).metadata();
  const previo = estadoPrevio[clave]?.hash === hash ? estadoPrevio[clave] : undefined;
  const anchos = [];
  const descartados = [];

  for (const ancho of ANCHOS.filter((a) => a < width)) {
    if (previo?.descartados.includes(ancho)) {
      descartados.push(ancho);
      continue;
    }
    const destino = path.join(SALIDA, relativa.replace(/\.webp$/i, `-${ancho}.webp`));
    if (!previo || !fs.existsSync(destino)) {
      fs.mkdirSync(path.dirname(destino), { recursive: true });
      await sharp(contenido).resize({ width: ancho }).webp({ quality: CALIDAD }).toFile(destino);
      if (fs.statSync(destino).size >= contenido.length) {
        fs.rmSync(destino);
        descartados.push(ancho);
        continue;
      }
      generadas++;
    }
    anchos.push(ancho);
  }

  indice[clave] = { width, height, anchos };
  estado[clave] = { hash, descartados };
}

fs.writeFileSync(INDICE, `${JSON.stringify(indice, null, 2)}\n`);
fs.writeFileSync(ESTADO, `${JSON.stringify(estado, null, 2)}\n`);
console.log(
  `imagenes-responsivas: ${Object.keys(indice).length} imágenes, ${generadas} variantes nuevas.`,
);
