import Icono from "@/app/components/Icono";
import CeldaVideo, { type VideoProyecto } from "./CeldaVideo";
import styles from "./ProyectosVideo.module.css";

/* Sección de proyectos: videos de YouTube, cifras y testimonios en una
   rejilla. Hoy la monta /nosotros/; está pensada para la home también, así que
   todo el contenido llega por props y el estilo vive en su propio módulo.

   Es un mosaico de nueve áreas, A a I, que dibuja el módulo CSS (ahí está el
   esquema). Cada celda dice en qué área va; en el HTML van en el orden de las
   áreas, que es el de lectura. Las áreas tienen tamaños distintos: D es la
   celda alta, F y G son anchas.

   Cada celda llena su área entera; los videos, con la portada en
   object-fit: cover. Por debajo de 600px, una columna con alto automático y
   videos en 16:9.

   La celda del área F es la destacada: va en navy con texto claro, para
   anclar la composición, sea cual sea su contenido (cifra o testimonio). Las
   demás celdas son superficie blanca.

   Es componente de servidor: el único trozo de cliente es la celda de video,
   que inserta el iframe al hacer clic. */

export type CifraProyecto = {
  icono: string;
  cifra: string;
  descriptor: string;
  cliente: string;
};

export type TestimonioProyecto = {
  /* Cita literal, sin comillas: las pone el componente. */
  cita: string;
  nombre: string;
  rol: string;
};

export type AreaProyecto = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I";

export type CeldaProyecto = { area: AreaProyecto } & (
  | ({ tipo: "video" } & VideoProyecto)
  | ({ tipo: "cifra" } & CifraProyecto)
  | ({ tipo: "testimonio" } & TestimonioProyecto)
);

type Props = {
  titulo: string;
  bajada: string;
  celdas: CeldaProyecto[];
  id?: string;
  className?: string;
};

/* La clase del área y si la celda es la destacada: las pone ProyectosVideo. */
type DeCelda = { className: string; destacado: boolean };

function TarjetaCifra({
  icono,
  cifra,
  descriptor,
  cliente,
  className,
  destacado,
}: CifraProyecto & DeCelda) {
  const superficie = destacado ? styles.destacado : "sp-tarjeta";
  return (
    <div className={`${superficie} ${styles.cifra} ${className}`}>
      <span className="sp-icono sp-icono--md sp-icono--rojo">
        <Icono nombre={icono} />
      </span>
      <div className={styles.cifraCentro}>
        <p className={styles.cifraNum}>{cifra}</p>
        <p className={styles.cifraDescriptor}>{descriptor}</p>
      </div>
      <p className={styles.cifraCliente}>{cliente}</p>
    </div>
  );
}

/* Las piezas de las tarjetas de testimonio del sitio (.sp-estrellas,
   .sp-testi-quote, .sp-testi-autor…), sobre la superficie de la celda. */
function TarjetaTestimonio({
  cita,
  nombre,
  rol,
  destacado,
  className,
}: TestimonioProyecto & DeCelda) {
  const iniciales = nombre
    .split(" ")
    .map((palabra) => palabra[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <figure
      className={
        destacado
          ? `${styles.testimonio} ${styles.destacado} ${className}`
          : `sp-tarjeta ${styles.testimonio} ${className}`
      }
    >
      <div className="sp-estrellas">★★★★★</div>
      <blockquote className="sp-testi-quote">&ldquo;{cita}&rdquo;</blockquote>
      <figcaption className="sp-testi-autor">
        <div className="sp-avatar" aria-hidden="true">
          {iniciales}
        </div>
        <div>
          <div className="sp-autor-nombre">{nombre}</div>
          <div className="sp-autor-rol">{rol}</div>
        </div>
      </figcaption>
    </figure>
  );
}

export default function ProyectosVideo({ titulo, bajada, celdas, id, className }: Props) {
  return (
    <section className={`sp-seccion${className ? ` ${className}` : ""}`} id={id}>
      <div className="sp-inner">
        <div className="sp-seccion-top reveal">
          <h2>{titulo}</h2>
          <p>{bajada}</p>
        </div>

        <div className={`${styles.rejilla} reveal stagger`}>
          {celdas.map((celda, i) => {
            const key = `${celda.area}-${i}`;
            const clase = styles[`area${celda.area}`];
            const destacado = celda.area === "F";
            if (celda.tipo === "video")
              return <CeldaVideo key={key} {...celda} className={clase} />;
            if (celda.tipo === "cifra")
              return (
                <TarjetaCifra key={key} {...celda} className={clase} destacado={destacado} />
              );
            return (
              <TarjetaTestimonio key={key} {...celda} className={clase} destacado={destacado} />
            );
          })}
        </div>
      </div>
    </section>
  );
}
