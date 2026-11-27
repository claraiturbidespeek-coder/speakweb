import Link from "next/link";
import Icono from "@/app/components/Icono";

/* La tarjeta de artículo del sitio: la del carrusel Centro de Recursos, la de
   los relacionados de una nota y la del índice del blog. Sin imagen: un bloque
   de color sólido de la marca con la flecha de enlace, el título y el resumen.
   La imagen destacada no sale en la tarjeta: va en la nota, entera bajo
   la cabecera, y en sus datos (Open Graph y JSON-LD). La cabecera de la nota toma el color de su
   tarjeta con `colorDeTarjeta`.

   Sin `fs` ni nada de servidor: la montan también las landings de idioma, que
   son componentes de cliente (vía CentroDeRecursos).

   El color sale de la categoría. Solo hay tres combinaciones y cinco
   categorías, así que dos colores se repiten: el color agrupa, no identifica.
   Una nota con una categoría que no esté aquí rota los tres por su posición. */

type Color = "navy" | "rojo" | "amarillo";

const COLOR_POR_CATEGORIA: Record<string, Color> = {
  "diagnostico-de-necesidades": "rojo",
  "seleccion-de-proveedor": "amarillo",
  "implementacion-del-programa": "navy",
  "resultados-y-roi": "rojo",
  "nearshoring-y-expansion": "amarillo",
};

const ROTACION: Color[] = ["navy", "rojo", "amarillo"];

export function colorDeTarjeta(categoria: string | undefined, indice: number): Color {
  return (categoria && COLOR_POR_CATEGORIA[categoria]) || ROTACION[indice % ROTACION.length];
}

const MAX_PALABRAS = 15;

/* Hasta 15 palabras, siempre enteras. Si sobra texto, se cierra con puntos
   suspensivos, sin dejar delante una coma o un punto colgando. */
export function recortarResumen(texto: string, max = MAX_PALABRAS): string {
  const palabras = texto.trim().split(/\s+/);
  if (palabras.length <= max) return palabras.join(" ");
  return `${palabras.slice(0, max).join(" ").replace(/[.,;:]+$/, "")}…`;
}

export default function TarjetaArticulo({
  titulo,
  href,
  categoria,
  resumen,
  indice,
  como = "article",
  className,
}: {
  titulo: string;
  href: string;
  /** Slug de la categoría (`categorySlug` del frontmatter). */
  categoria?: string;
  /** El `excerpt` de la nota, entero: aquí se recorta. */
  resumen?: string;
  /** Posición en su listado: decide el color si la categoría no lo hace. */
  indice: number;
  como?: "article" | "li";
  className?: string;
}) {
  const Raiz = como;
  const color = colorDeTarjeta(categoria, indice);
  return (
    <Raiz
      className={`sp-post-card sp-post-card--${color}${className ? ` ${className}` : ""}`}
      data-categoria={categoria}
    >
      {/* draggable={false}: el enlace cubre toda la tarjeta, y en el carrusel
          el arrastre nativo de un <a> cancelaría el arrastre del track. */}
      <Link className="sp-post-enlace" href={href} draggable={false}>
        <span className="sp-icono sp-icono--sm sp-post-flecha">
          <Icono nombre="flechaEnlace" />
        </span>
        <div className="sp-post-texto">
          <h3 className="sp-post-titulo">{titulo}</h3>
          {resumen ? <p className="sp-post-resumen">{recortarResumen(resumen)}</p> : null}
        </div>
      </Link>
    </Raiz>
  );
}
