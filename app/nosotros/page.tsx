import type { Metadata } from "next";
import AnimacionesEntrada from "@/app/components/AnimacionesEntrada";
import BandaLogos from "@/app/components/BandaLogos";
import CentroDeRecursos from "@/app/components/CentroDeRecursos";
import BotonContacto from "@/app/components/contacto/BotonContacto";
import Icono from "@/app/components/Icono";
import SelloSTPS from "@/app/components/SelloSTPS";
import styles from "./nosotros.module.css";

/* /nosotros/: quiénes somos, contado como la historia de una gerente de RH.

   Sigue el sistema visual de /diagnostico/ —hero de una columna, secciones
   sp-*, CTA final en rojo— y se renderiza en el servidor: los únicos trozos de
   cliente son los botones de contacto, AnimacionesEntrada y el carrusel del
   Centro de Recursos. Los tres botones abren el modal de contacto general. */

const URL = "https://s-peak.com/nosotros/";
const TITULO = "Capacitación en idiomas para empresas desde 2006 | S-Peak";
const DESCRIPCION =
  "Desde 2006 nos adaptamos a su empresa: instructores en sus oficinas o por videoconferencia, un ejecutivo de cuentas y reportes automáticos. Constancia DC-3.";

/* Página oculta mientras el cliente la aprueba: robots noindex/nofollow, fuera
   del sitemap y sin enlaces desde el menú ni desde ninguna otra página. Solo se
   llega escribiendo la URL. Para publicarla: quitar `robots` de aquí, añadir
   "/nosotros/" a las rutas fijas de app/sitemap.ts (y retirarla del comentario
   de ese archivo y del de app/robots.ts) y darle su entrada de menú en
   app/components/nav/secciones.ts. */
export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  robots: { index: false, follow: false },
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "S-Peak",
    title: TITULO,
    description: DESCRIPCION,
    url: URL,
    images: [
      {
        url: "https://s-peak.com/images/og-links.jpg",
        alt: "S-Peak, capacitación en idiomas para empresas desde 2006",
      },
    ],
  },
};

const CTA = "Solicite una Cotización";

/* Mismos iconos que las cifras de /equipo/. Ninguno se repite abajo en las
   tarjetas: la regla del registro es no repetir icono dentro de una página. */
const CIFRAS = [
  { icono: "premio", num: "+20", label: "Años de experiencia" },
  { icono: "edificio", num: "+500", label: "Empresas atendidas" },
  { icono: "birrete", num: "+40K", label: "Profesionales formados" },
];

/* Tarjetas de color (.sp-tarjeta-color), como "Qué recibe" de /diagnostico/ y
   con su mismo orden de colores: en la rejilla de 3 × 2 no quedan dos iguales
   contiguas ni en horizontal ni en vertical, y tampoco al apilarse en una. */
const DOLORES = [
  {
    titulo: "«Tengo que justificar el presupuesto»",
    descripcion:
      "Cada mes recibe un reporte automático de asistencia y calificaciones. Al cerrar cada etapa de 26 horas, recibe una Tarjeta de Resultados con la evidencia de lo que su colaborador ya puede hacer en el idioma.",
    icono: "grafico",
    color: "navy",
  },
  {
    titulo: "«Empiezan con ganas y luego dejan de ir»",
    descripcion:
      "Damos seguimiento a cada falta y buscamos recuperar al colaborador o ajustar el grupo.",
    icono: "usuarioX",
    color: "rojo",
  },
  {
    titulo: "«Sus agendas cambian cada semana»",
    descripcion: "Horarios, modalidad y reposiciones se ajustan a su operación.",
    icono: "reloj",
    color: "amarillo",
  },
  {
    titulo: "«Coordinar al proveedor me quita horas»",
    descripcion:
      "Cada cliente tiene un ejecutivo de cuentas que resuelve lo operativo por usted.",
    icono: "diadema",
    color: "rojo",
  },
  {
    titulo: "«No practican lo que su puesto necesita»",
    descripcion:
      "Su equipo ya sabe hacer su trabajo; le enseñamos a hacerlo en el idioma de sus clientes y de su corporativo.",
    icono: "diana",
    color: "amarillo",
  },
  {
    titulo: "«Necesito cumplir con la STPS»",
    descripcion:
      "Somos agente capacitador registrado y entregamos la constancia DC-3.",
    icono: "sello",
    color: "navy",
  },
];

function datosEstructurados() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://s-peak.com/" },
          { "@type": "ListItem", position: 2, name: "Nosotros", item: URL },
        ],
      },
      {
        "@type": "AboutPage",
        name: TITULO,
        url: URL,
        description: DESCRIPCION,
        /* El Organization del layout raíz, por su @id. */
        about: { "@id": "https://s-peak.com/#organizacion" },
      },
    ],
    // Escapa `<` para que ningún texto pueda cerrar la etiqueta <script>: es
    // la recomendación de la guía de JSON-LD de Next.
  }).replace(/</g, "\\u003c");
}

export default function Nosotros() {
  return (
    <>
      <AnimacionesEntrada threshold={0.08} />
      <main>
        {/* HERO */}
        <section className={styles.hero}>
          <img
            className={styles.decoHero}
            src="/images/isotype.svg"
            alt=""
            aria-hidden="true"
            width="1587"
            height="907"
            loading="lazy"
          />
          <div className={styles.heroInner}>
            <h1>
              Usted no tiene que adaptarse a su proveedor. Desde 2006, nosotros nos
              adaptamos a usted.
            </h1>
            <p className="sp-hero-sub">
              Le facilitamos la vida y le quitamos fricciones, para que capacitar a su
              equipo en idiomas deje de ser un pendiente y se convierta en un logro que
              pueda presentar a Dirección.
            </p>
            <BotonContacto className="sp-btn sp-btn--rojo">{CTA}</BotonContacto>
            <SelloSTPS />
            <div className={`sp-stats-row ${styles.cifras}`}>
              {CIFRAS.map((c) => (
                <div key={c.num} className="sp-stat">
                  <span className="sp-icono sp-icono--sm sp-icono--rojo">
                    <Icono nombre={c.icono} />
                  </span>
                  <span className="sp-stat-num">{c.num}</span>
                  <span className="sp-stat-label">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* UNA HISTORIA */}
        <section className="sp-seccion" id="historia">
          <div className={`${styles.lectura} reveal`}>
            <h2>Una historia que quizá le suene</h2>
            <p>
              Imagine a una gerente de Recursos Humanos en 2006. Dirección le pide que,
              en un año, sus gerentes dirijan las juntas con la casa matriz en inglés.
            </p>
            <p>
              Contrata a un proveedor y se acomoda a él: sus horarios, su sede, su
              temario. Llegan los cierres de mes y los viajes, y las sesiones perdidas
              no se reponen. Ella pasa las semanas persiguiendo asistencias.
            </p>
            <p>
              Al cerrar el año, Dirección le pregunta qué se logró. Ella solo tiene
              listas de asistencia.
            </p>
          </div>
        </section>

        {/* POR QUÉ NACIÓ S-PEAK */}
        <section className={`sp-seccion ${styles.porQue}`} id="por-que">
          <div className="sp-inner">
            <div className={`sp-seccion-top ${styles.porQueTop} reveal`}>
              <h2>Por qué nació S-Peak</h2>
              <p>
                En 2006 decidimos que si alguien tenía que adaptarse, éramos nosotros.
                Por eso fuimos de los primeros en México en llevar al instructor a la
                empresa y en capacitar por videoconferencia. Desde el primer día
                trabajamos para empresas, y conocemos de cerca lo que vive Recursos
                Humanos:
              </p>
            </div>
            <ul className={`${styles.doloresGrid} reveal stagger`}>
              {DOLORES.map((d) => (
                <li
                  key={d.titulo}
                  className={`sp-tarjeta sp-barra sp-tarjeta-color sp-tarjeta-color--${d.color}`}
                >
                  <div className="sp-icono sp-icono--xl">
                    <Icono nombre={d.icono} />
                  </div>
                  <h3>{d.titulo}</h3>
                  <p>{d.descripcion}</p>
                </li>
              ))}
            </ul>
            <div className={`${styles.porQueCierre} reveal`}>
              <p>
                ¿Se identificó con alguna? Le proponemos un programa a la medida de su
                equipo.
              </p>
              <BotonContacto className="sp-btn sp-btn--rojo">{CTA}</BotonContacto>
            </div>
          </div>
        </section>

        {/* SU ÉXITO ES NUESTRO ÉXITO */}
        <section className={`sp-seccion ${styles.exito}`} id="su-exito">
          <div className={`sp-inner ${styles.exitoInner}`}>
            <div className={`${styles.exitoTexto} reveal`}>
              <h2>Su éxito es nuestro éxito</h2>
              <p>
                En todo proyecto aparecen imprevistos. Aprendimos que entre más pronto se
                anticipan y se comunican, más rápido se resuelven y más chicos se quedan.
                Por eso, en cuanto detectamos un riesgo, se lo avisamos y le proponemos
                cómo resolverlo.
              </p>
              <p>
                No le vendemos un paquete para luego desaparecer. Revisamos los avances
                con usted, escuchamos a su equipo y ajustamos el programa conforme su
                empresa cambia.
              </p>
            </div>
            <figure className="sp-testi-card sp-testi-card--acento sp-barra reveal">
              <div className="sp-estrellas" style={{ color: "var(--color-navy)" }}>
                ★★★★★
              </div>
              <blockquote className="sp-testi-quote">
                &ldquo;S-Peak ha sido un gran aliado para nosotros, ya que se adapta a
                nuestras necesidades y cuenta con un sistema robusto de seguimiento en
                asistencias. Valoramos también que siempre nos brinda una buena atención
                tanto a la empresa como a los alumnos.&rdquo;
              </blockquote>
              <figcaption className="sp-testi-autor">
                <div className="sp-avatar">AP</div>
                <div>
                  <div className="sp-autor-nombre">Anabel P.</div>
                  <div className="sp-autor-rol">
                    Analista de Planeación y Desarrollo de RH
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* LOGOS */}
        <BandaLogos />

        {/* CIERRE */}
        <section className={`sp-seccion ${styles.finalCta}`}>
          <img
            className={styles.decoCta}
            src="/images/isotype.svg"
            alt=""
            aria-hidden="true"
            width="1587"
            height="907"
            loading="lazy"
          />
          <div className={`${styles.finalInner} reveal`}>
            <h2>Ahora imagine a esa misma gerente hoy, con S-Peak</h2>
            <p>
              Esta vez el proveedor trabaja para ella. Al cerrar el año no llega a
              Dirección con listas de asistencia: llega con la evidencia del avance de
              su equipo. Y deja de cargar el proyecto para empezar a presumirlo.
            </p>
            <p className={styles.finalPregunta}>
              ¿Qué historia quiere contarle a Dirección dentro de un año?
            </p>
            <BotonContacto className="sp-btn sp-btn--blanco">{CTA}</BotonContacto>
            <p className={styles.finalNota}>
              Un asesor se pondrá en contacto en menos de 24 horas hábiles.
            </p>
          </div>
        </section>

        {/* CENTRO DE RECURSOS */}
        <CentroDeRecursos />
      </main>

      {/* Etiqueta nativa, no next/script: con `afterInteractive` el JSON-LD se
          inyectaría desde el cliente y no estaría en el HTML que lee Google. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: datosEstructurados() }}
      />
    </>
  );
}
