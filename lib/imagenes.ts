import VARIANTES from "./imagenes-variantes.json";

/* srcset y sizes de una imagen de public/images/, para que el navegador
   descargue el ancho en que se muestra y no el original.

   Las variantes las genera a mano `npm run imagenes`
   (scripts/imagenes-responsivas.mjs) y van en el repositorio; este archivo
   solo lee su índice. A diferencia de lib/dimensiones.ts no usa `fs`: sirve
   también en los componentes de cliente, como las seis landings de idioma.

   `sizes` es el ancho de la imagen en pantalla en cada punto de corte, medido
   en el navegador. Si la imagen va con object-fit: cover, cuenta el ancho que
   ocupa la imagen recortada, no el de su caja: el mayor entre el ancho de la
   caja y su alto por la proporción del archivo. Con una caja de proporción fija
   basta pasar `proporcionCaja` y escribir el sizes con el ancho de la caja. Un
   sizes más chico que el real hace que el navegador elija una variante
   insuficiente y la imagen se ve borrosa; uno algo mayor solo cuesta unos KB.
   Si cambia el CSS que da tamaño a una imagen, hay que revisar su sizes.

   Una imagen que no está en el índice (un SVG o una ruta externa) sale solo
   con su src, sin srcset. */

type Entrada = { width: number; height: number; anchos: number[] };
const INDICE: Record<string, Entrada> = VARIANTES;

/* Separa un sizes en sus entradas —"(condición) longitud"— y multiplica cada
   longitud por `factor`. Las comas y espacios de dentro de calc() no cortan. */
function escalarSizes(sizes: string, factor: number) {
  const entradas: string[] = [];
  let nivel = 0;
  let inicio = 0;
  for (let i = 0; i < sizes.length; i++) {
    if (sizes[i] === "(") nivel++;
    else if (sizes[i] === ")") nivel--;
    else if (sizes[i] === "," && nivel === 0) {
      entradas.push(sizes.slice(inicio, i).trim());
      inicio = i + 1;
    }
  }
  entradas.push(sizes.slice(inicio).trim());

  const f = Number(factor.toFixed(3));
  return entradas
    .map((entrada) => {
      // La longitud es lo último de la entrada: una función como calc(…) o
      // un valor suelto. Lo anterior, si hay, es la condición de medio.
      let corte: number;
      if (entrada.endsWith(")")) {
        let n = 0;
        corte = entrada.length - 1;
        for (; corte >= 0; corte--) {
          if (entrada[corte] === ")") n++;
          else if (entrada[corte] === "(" && --n === 0) break;
        }
        while (corte > 0 && /[a-z-]/i.test(entrada[corte - 1])) corte--;
      } else {
        corte = entrada.lastIndexOf(" ") + 1;
      }
      const condicion = entrada.slice(0, corte);
      const longitud = entrada.slice(corte);
      return `${condicion}calc(${longitud} * ${f})`;
    })
    .join(", ");
}

/* `proporcionCaja` es para las imágenes con object-fit: cover dentro de una caja
   de proporción fija (ancho / alto). Si la imagen es más apaisada que su caja,
   se recorta por los lados y ocupa más ancho que la caja: el sizes, escrito con
   el ancho de la caja, se multiplica por esa diferencia. */
export function imagenResponsiva(src: string, sizes: string, proporcionCaja?: number) {
  const ruta = decodeURI(src);
  const entrada = INDICE[ruta];
  if (!entrada || entrada.anchos.length === 0) return { src };

  const base = ruta.replace(/^\/images\//, "/images/variantes/").replace(/\.webp$/i, "");
  const srcSet = [
    ...entrada.anchos.map((ancho) => `${encodeURI(`${base}-${ancho}.webp`)} ${ancho}w`),
    `${encodeURI(ruta)} ${entrada.width}w`,
  ].join(", ");

  const factor = proporcionCaja ? entrada.width / entrada.height / proporcionCaja : 1;
  return { src, srcSet, sizes: factor > 1 ? escalarSizes(sizes, factor) : sizes };
}
