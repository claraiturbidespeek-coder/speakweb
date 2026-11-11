import type { CSSProperties } from "react";
import Icono from "@/app/components/Icono";
import { imagenResponsiva } from "@/lib/imagenes";
import CeldaVideo, { type VideoProyecto } from "./CeldaVideo";
import RejillaContorno from "./RejillaContorno";
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

   Las tarjetas blancas (cifras y testimonios, no la destacada ni los videos)
   llevan un contorno rojo que las recorre por turnos, en bucle: lo dibuja
   cada tarjeta (Contorno) y lo reparte RejillaContorno.

   Es componente de servidor: los trozos de cliente son la celda de video, que
   inserta el iframe al hacer clic, y la rejilla, que reparte el contorno. */

/* El logo de la empresa de una tarjeta, en lugar de su nombre escrito. Los
   logos del sitio son lienzos transparentes de 600×300 con la marca centrada
   (public/images/logos/), y ese margen transparente cambia de un logo a otro.
   `caja` es el rectángulo que ocupa la marca dentro del lienzo —izquierda,
   arriba, ancho y alto, en píxeles del archivo—, medido recortando la
   transparencia: con él la tarjeta muestra solo la marca, alineada con el
   texto. Si se reexporta un logo, hay que volver a medir su caja. */
export type LogoProyecto = {
  src: string;
  caja: [number, number, number, number];
  /* Multiplica la escala común, para una marca que a esa escala se ve con
     menos peso que las demás (una muy alargada sale más baja). */
  escala?: number;
};

export type CifraProyecto = {
  icono: string;
  cifra: string;
  descriptor: string;
  /* Nombre de la empresa: el texto de la tarjeta, o el alt de su logo. */
  cliente: string;
  logo?: LogoProyecto;
};

export type TestimonioProyecto = {
  /* Cita literal, sin comillas: las pone el componente. */
  cita: string;
  /* Quien firma: el texto de la tarjeta, o el alt del logo si es una
     empresa. */
  nombre: string;
  rol: string;
  logo?: LogoProyecto;
};

export type AreaProyecto = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I";

export type CeldaProyecto = { area: AreaProyecto } & (
  | ({ tipo: "video" } & VideoProyecto)
  | ({ tipo: "cifra" } & CifraProyecto)
  | ({ tipo: "testimonio" } & TestimonioProyecto)
);

type Props = {
  /* Antetítulo opcional sobre el H2, con el patrón .sp-eyebrow. */
  eyebrow?: string;
  titulo: string;
  bajada: string;
  celdas: CeldaProyecto[];
  id?: string;
  className?: string;
};

/* La clase del área y si la celda es la destacada: las pone ProyectosVideo. */
type DeCelda = { className: string; destacado: boolean };

/* Alto en pantalla del lienzo completo de un logo. Es la escala común: todas
   las marcas se reducen igual, como en la banda de clientes, y cada una
   ocupa lo que su dibujo pide dentro del lienzo (unos 16 a 34px de alto). */
const ALTO_LIENZO_LOGO = 56;
const ESCALA_LOGO = ALTO_LIENZO_LOGO / 300;

/* El contorno rojo de las tarjetas blancas: un rectángulo con el radio de la
   tarjeta, encima de su borde, que RejillaContorno enciende por turnos. El
   pathLength de 1 deja escribir el trazo en fracciones del perímetro. El rx
   del atributo es el respaldo de --radius-grande (20px) para un navegador
   que no aplique el rx del módulo. */
function Contorno() {
  return (
    <svg className={styles.contorno} data-contorno aria-hidden="true">
      <rect width="100%" height="100%" rx="20" pathLength={1} />
    </svg>
  );
}

/* El logo recortado a su marca: una caja del tamaño de la marca, con el
   lienzo entero dentro y desplazado para que solo se vea ella. */
function LogoCliente({ logo, alt }: { logo: LogoProyecto; alt: string }) {
  const escala = ESCALA_LOGO * (logo.escala ?? 1);
  const [izquierda, arriba, ancho, alto] = logo.caja.map((n) => n * escala);
  const anchoLienzo = 600 * escala;
  const altoLienzo = 300 * escala;
  return (
    <span
      className={styles.logo}
      style={{ width: `${ancho}px`, height: `${alto}px` } as CSSProperties}
    >
      <img
        {...imagenResponsiva(logo.src, `${anchoLienzo}px`)}
        alt={alt}
        width={600}
        height={300}
        loading="lazy"
        decoding="async"
        style={{
          width: `${anchoLienzo}px`,
          height: `${altoLienzo}px`,
          left: `${-izquierda}px`,
          top: `${-arriba}px`,
        }}
      />
    </span>
  );
}

function TarjetaCifra({
  icono,
  cifra,
  descriptor,
  cliente,
  logo,
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
      <p className={styles.cifraCliente}>
        {logo ? <LogoCliente logo={logo} alt={cliente} /> : cliente}
      </p>
      {destacado ? null : <Contorno />}
    </div>
  );
}

/* Las piezas de las tarjetas de testimonio del sitio (.sp-estrellas,
   .sp-testi-quote, .sp-testi-autor…), sobre la superficie de la celda. */
function TarjetaTestimonio({
  cita,
  nombre,
  rol,
  logo,
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
        {/* Con el logo de la empresa, el círculo de iniciales sobra. */}
        {logo ? null : (
          <div className="sp-avatar" aria-hidden="true">
            {iniciales}
          </div>
        )}
        <div>
          {logo ? (
            <div className={styles.autorLogo}>
              <LogoCliente logo={logo} alt={nombre} />
            </div>
          ) : (
            <div className="sp-autor-nombre">{nombre}</div>
          )}
          <div className="sp-autor-rol">{rol}</div>
        </div>
      </figcaption>
      {destacado ? null : <Contorno />}
    </figure>
  );
}

export default function ProyectosVideo({
  eyebrow,
  titulo,
  bajada,
  celdas,
  id,
  className,
}: Props) {
  return (
    <section className={`sp-seccion${className ? ` ${className}` : ""}`} id={id}>
      <div className="sp-inner">
        <div className="sp-seccion-top reveal">
          {eyebrow ? <div className={`sp-eyebrow ${styles.eyebrow}`}>{eyebrow}</div> : null}
          <h2>{titulo}</h2>
          <p>{bajada}</p>
        </div>

        <RejillaContorno className={`${styles.rejilla} reveal stagger`}>
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
        </RejillaContorno>
      </div>
    </section>
  );
}
