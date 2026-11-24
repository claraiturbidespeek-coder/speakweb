import type { Metadata } from "next";
import AnimacionesEntrada from "@/app/components/AnimacionesEntrada";
import BandaLogos from "@/app/components/BandaLogos";
import BotonContacto from "@/app/components/contacto/BotonContacto";
import CasosDeExito from "@/app/components/proyectos/CasosDeExito";
import Icono from "@/app/components/Icono";
import SelloSTPS from "@/app/components/SelloSTPS";
import TarjetaDudas from "@/app/components/TarjetaDudas";
import styles from "./diagnostico.module.css";
import AnimacionDiagnostico from "./AnimacionDiagnostico";
import TitularIdiomas from "./TitularIdiomas";

/* /diagnostico/: el diagnóstico de nivel sin costo.

   Sigue el sistema visual de las landings de idioma —hero, secciones sp-*,
   franja de idiomas, FAQ y CTA final— pero se renderiza en el servidor, como
   las páginas de /equipo/: los únicos trozos de cliente son los botones de
   contacto, AnimacionesEntrada, el titular con el idioma que rota
   (TitularIdiomas) y la animación del hero (AnimacionDiagnostico).

   Los botones abren por ahora el modal de contacto general. La variante del
   formulario propia del diagnóstico va en una pasada aparte. */

/* «Qué mide, y qué no»: el examen en línea cubre tres habilidades; Hablar se
   evalúa aparte, en la evaluación oral. */
const HABILIDADES = [
  { nombre: "Escuchar", icono: "diadema", incluida: true },
  { nombre: "Leer", icono: "lectura", incluida: true },
  { nombre: "Escribir", icono: "lapiz", incluida: true },
  { nombre: "Hablar", icono: "dialogo", incluida: false },
];

const URL = "https://s-peak.com/diagnostico/";
const TITULO = "Diagnóstico de Nivel para Equipos, sin costo | S-Peak";
const DESCRIPCION =
  "Cada colaborador presenta un examen en línea y le presentamos en una junta el nivel de cada persona, una propuesta de grupos y el tiempo para llegar a B1 o B2. Sin costo.";

/* Página publicada: indexable, en el sitemap (app/sitemap.ts), en el menú
   (Recursos, app/components/nav/secciones.ts), en el pie y en llms.txt. */
export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
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
        alt: "Diagnóstico de nivel de idioma para equipos de S-Peak",
      },
    ],
  },
};

const CTA = "Solicite su diagnóstico sin costo";

/* Tarjetas de color (.sp-tarjeta-color), como Competencias de /equipo/. El
   orden de colores es para la rejilla de tres columnas: ni en horizontal ni en
   vertical quedan dos iguales contiguas, y tampoco al apilarse en una. */
/* Las descripciones solo repiten lo que la página ya explica en "Cómo
   funciona", "Qué mide, y qué no", el FAQ y el cierre: no agregan alcance. */
const RECIBE = [
  {
    titulo: "El nivel de cada colaborador.",
    descripcion:
      "Según el examen en línea, que mide comprensión oral, comprensión escrita y expresión escrita.",
    icono: "usuarioCheck",
    color: "navy",
  },
  {
    titulo: "Una propuesta de grupos por nivel, de 1 a 10 colaboradores cada uno.",
    descripcion: "Para que cada persona avance con compañeros de su mismo nivel.",
    icono: "usuarios",
    color: "rojo",
  },
  {
    titulo: "Duración y presupuesto por grupo para llegar al nivel que su equipo necesita.",
    descripcion: "Para que presente el proyecto a Dirección con un costo y una duración.",
    icono: "reloj",
    color: "amarillo",
  },
  {
    titulo: "Una clase muestra sin costo con uno de los grupos propuestos.",
    descripcion: "Para que vea cómo trabajamos antes de decidir.",
    icono: "presentacion",
    color: "rojo",
  },
  {
    titulo: "Cuánto tardaría cada colaborador",
    descripcion:
      "en llegar a un nivel intermedio (B1) o al siguiente (B2), según su nivel de partida",
    icono: "tendencia",
    color: "amarillo",
  },
  {
    titulo:
      "La propuesta de afinar el nivel de algunos participantes con una evaluación oral.",
    descripcion: "Se la proponemos en la junta.",
    icono: "mensaje",
    color: "navy",
  },
];

const PASOS = [
  "Platicamos con usted y definimos en qué idioma evaluar a su equipo.",
  "Damos de alta a su empresa y creamos su acceso al examen, en el idioma acordado.",
  "Le enviamos el enlace para que lo comparta con su equipo.",
  "Cada colaborador lo presenta en línea. Le toma de 5 minutos a una hora, según su nivel.",
  "En cuanto su equipo termine, agendamos con usted la junta de resultados: todo lo que se enlista en «Qué recibe».",
];

/* En el orden en que los nombra esta página, no en el de secciones.ts. Las
   rutas son las de las seis landings, igual que en la franja de las demás. */
const IDIOMAS = [
  { nombre: "Inglés", ruta: "/idioma/ingles-para-empresas/" },
  { nombre: "Francés", ruta: "/idioma/frances-para-empresas/" },
  { nombre: "Español para extranjeros", ruta: "/idioma/espanol-para-empresas/" },
  { nombre: "Italiano", ruta: "/idioma/italiano-para-empresas/" },
  { nombre: "Portugués", ruta: "/idioma/portugues-para-empresas/" },
  { nombre: "Alemán", ruta: "/idioma/aleman-para-empresas/" },
];

/* Las respuestas son texto plano, así que el mismo texto sirve para el markup
   y para el JSON-LD de FAQPage. */
const FAQ = [
  {
    pregunta: "¿Tiene costo?",
    respuesta:
      "El examen escrito y la clase muestra, no. La evaluación oral se cotiza, y no tiene costo si contrata el programa.",
  },
  {
    pregunta: "¿Hacer el diagnóstico me obliga a contratar?",
    respuesta: "No. El examen escrito es sin costo, contrate o no.",
  },
  {
    pregunta: "¿Cuánto tiempo le quita a mi equipo?",
    respuesta: "De 5 minutos a una hora por colaborador, según su nivel.",
  },
  {
    pregunta: "¿Cuándo tengo los resultados?",
    respuesta:
      "En cuanto su equipo termina el examen, agendamos con usted la junta de resultados.",
  },
  {
    pregunta: "¿En qué idiomas está disponible?",
    respuesta:
      "Inglés, francés, español para extranjeros, italiano, portugués y alemán.",
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
          { "@type": "ListItem", position: 2, name: "Diagnóstico de Nivel para Equipos", item: URL },
        ],
      },
      {
        "@type": "Service",
        name: "Diagnóstico de nivel de idioma para equipos",
        serviceType: "Evaluación de nivel de idioma",
        /* El Organization del layout raíz, por su @id. */
        provider: { "@id": "https://s-peak.com/#organizacion" },
        areaServed: { "@type": "Country", name: "México" },
        description: DESCRIPCION,
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.pregunta,
          acceptedAnswer: { "@type": "Answer", text: f.respuesta },
        })),
      },
    ],
    // Escapa `<` para que ningún texto pueda cerrar la etiqueta <script>: es
    // la recomendación de la guía de JSON-LD de Next.
  }).replace(/</g, "\\u003c");
}

export default function Diagnostico() {
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
            <div className={styles.heroTexto}>
              <div className="sp-etiqueta">Diagnóstico de Nivel para Equipos · Sin costo</div>
              <TitularIdiomas
                claseTitular={styles.titular}
                claseLinea={styles.titularLinea}
                clasePalabra={styles.titularPalabra}
                claseEntrando={styles.titularEntrando}
                claseSaliendo={styles.titularSaliendo}
              />
              <p className="sp-hero-sub">
                Cada colaborador presenta un examen en línea. En cuanto su equipo lo termine,
                agendamos con usted una junta para presentarle el nivel de cada persona, una
                propuesta de grupos y cuánto tardaría cada una en llegar a un nivel intermedio
                (B1) o al siguiente (B2), según su nivel de partida. Sin costo.
              </p>
              <BotonContacto className="sp-btn sp-btn--rojo">{CTA}</BotonContacto>
              <SelloSTPS />
            </div>
            <AnimacionDiagnostico />
          </div>
        </section>

        {/* LOGOS: encimados en el borde inferior del hero, como en el resto del
            sitio (.sp-logos se monta 60px sobre la sección anterior). */}
        <BandaLogos />

        {/* QUÉ RECIBE */}
        <section className="sp-seccion" id="que-recibe">
          <div className="sp-inner">
            <div className="sp-seccion-top reveal">
              {/* La línea de público: justo debajo del hero y sus logos,
                  centrada, como entrada de «Qué recibe». */}
              <p>
                Para áreas de Recursos Humanos y Dirección que van a capacitar a un equipo en
                idiomas
              </p>
              <h2>Qué recibe</h2>
            </div>
            <ul className={`${styles.recibeGrid} reveal stagger`}>
              {RECIBE.map((r) => (
                <li
                  key={r.titulo}
                  className={`sp-tarjeta sp-barra sp-tarjeta-color sp-tarjeta-color--${r.color}`}
                >
                  <div className="sp-icono sp-icono--xl">
                    <Icono nombre={r.icono} />
                  </div>
                  <h3>{r.titulo}</h3>
                  <p>{r.descripcion}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CASOS DE ÉXITO: la sección compartida con el resto del sitio
            (CasosDeExito). Sus bloques entran con .reveal, que ya activa
            AnimacionesEntrada. */}
        <CasosDeExito />

        {/* CÓMO FUNCIONA */}
        <section className={`sp-seccion ${styles.pasosSeccion}`} id="como-funciona">
          <div className="sp-inner">
            <div className="sp-seccion-top reveal">
              <h2>Cómo funciona, paso a paso</h2>
              <p>
                Usted nos indica el idioma y el equipo; nosotros damos de alta su empresa y le
                enviamos el enlace del examen. Cuando todos terminan, agendamos la junta para
                presentarle los resultados.
              </p>
            </div>
            <ol className={`${styles.pasos} reveal stagger`}>
              {PASOS.map((texto, i) => (
                <li key={texto} className={styles.paso}>
                  <span className={styles.pasoNum} aria-hidden="true">
                    {i + 1}
                  </span>
                  <p>{texto}</p>
                </li>
              ))}
            </ol>
            <div className={`${styles.pasosCta} reveal`}>
              <BotonContacto className="sp-btn sp-btn--rojo">{CTA}</BotonContacto>
            </div>
          </div>
        </section>

        {/* QUÉ MIDE, Y QUÉ NO */}
        <section className={`sp-seccion ${styles.mide}`} id="que-mide">
          {/* Dos columnas: a la izquierda, en un tercio, el texto y el botón; a
              la derecha, en dos, las habilidades y la evaluación oral. */}
          <div className={`${styles.mideInner} reveal`}>
            <div>
              <div className="sp-eyebrow">El examen</div>
              <h2>Qué mide, y qué no</h2>
              <p>
                El examen en línea mide tres habilidades: escuchar, leer y escribir. Con el
                resultado de cada persona, en la junta le presentamos su nivel y una propuesta
                de grupos.
              </p>
              <BotonContacto className="sp-btn sp-btn--rojo">{CTA}</BotonContacto>
            </div>
            <div className={styles.mideTarjetas}>
              {/* Las cuatro habilidades: tres incluidas en el examen en línea y
                  Hablar, la excepción, con borde punteado y su etiqueta en
                  amarillo. */}
              <ul className={styles.habilidades}>
                {HABILIDADES.map((h) => (
                  <li
                    key={h.nombre}
                    className={`${styles.habilidad}${h.incluida ? "" : ` ${styles.habilidadAparte}`}`}
                  >
                    <span className="sp-icono sp-icono--xl sp-icono--rojo">
                      <Icono nombre={h.icono} />
                    </span>
                    <span className={styles.habilidadNombre}>{h.nombre}</span>
                    {h.incluida ? (
                      <span className={`${styles.habilidadEtiqueta} ${styles.habilidadIncluida}`}>
                        <span className={`sp-icono ${styles.habilidadPalomita}`}>
                          <Icono nombre="palomita" />
                        </span>
                        Incluido
                      </span>
                    ) : (
                      <span className={`${styles.habilidadEtiqueta} ${styles.habilidadEtiquetaAparte}`}>
                        Se evalúa aparte
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              {/* La evaluación oral y su costo. */}
              <div className={styles.oral}>
                <div className={styles.oralCabeza}>
                  <span className="sp-icono sp-icono--lg sp-icono--navy">
                    <Icono nombre="dialogo" />
                  </span>
                  <p>
                    En la junta le proponemos afinar el nivel de algunos participantes con una
                    evaluación oral.
                  </p>
                </div>
                <dl className={styles.costos}>
                  <div className={styles.costo}>
                    <dt>Si contrata el programa</dt>
                    <dd>Sin costo</dd>
                  </div>
                  <div className={styles.costo}>
                    <dt>Si solo desea la evaluación</dt>
                    <dd>Se cotiza</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* FRANJA DE IDIOMAS — un titular centrado y las etiquetas debajo. No
            usa FranjaIdiomas porque ese componente reparte titular y texto en
            dos columnas, y esta página no lleva texto. El titular toma el
            estilo de las demás franjas (.sp-franja-texto h2). */}
        <section className="sp-franja" aria-labelledby="franja-idiomas-titulo">
          <div className={`sp-franja-inner ${styles.franjaInner}`}>
            <div className={`sp-franja-texto ${styles.franjaTitulo} reveal`}>
              <h2 id="franja-idiomas-titulo">Capacitamos a su equipo en estos idiomas</h2>
            </div>
            <div className="sp-franja-idiomas reveal">
              {IDIOMAS.map((i) => (
                <a key={i.ruta} className="sp-pill" href={i.ruta}>
                  {i.nombre}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sp-seccion" id="faq">
          <div className={styles.faqInner}>
            <div className={`${styles.faqLeft} reveal`}>
              <div className="sp-eyebrow">Preguntas frecuentes</div>
              <h2>Preguntas frecuentes sobre el diagnóstico de nivel</h2>
              <p>
                Lo que nos preguntan las áreas de Recursos Humanos antes de solicitar el
                diagnóstico.
              </p>
              <TarjetaDudas />
            </div>
            <div className="sp-faq-lista reveal">
              {FAQ.map((f, i) => (
                <details key={f.pregunta} className="sp-faq-item" name="faq-diagnostico">
                  <summary className="sp-faq-pregunta">
                    {i + 1}. {f.pregunta}
                    <span className="sp-faq-icono">+</span>
                  </summary>
                  <div className="sp-faq-respuesta">{f.respuesta}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

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
          <h2>
            Sepa en cuánto tiempo su equipo llegará al nivel de idioma que necesita y
            cuánto le va a costar, antes de invertir.
          </h2>
          <BotonContacto className="sp-btn sp-btn--blanco">{CTA}</BotonContacto>
        </section>
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
