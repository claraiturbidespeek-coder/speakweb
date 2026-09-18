import type { Metadata } from "next";
import AnimacionesEntrada from "@/app/components/AnimacionesEntrada";
import BotonContacto from "@/app/components/contacto/BotonContacto";
import styles from "./diagnostico.module.css";

/* /diagnostico/: el diagnóstico de nivel sin costo.

   Sigue el sistema visual de las landings de idioma —hero, secciones sp-*,
   franja de idiomas, FAQ y CTA final— pero se renderiza en el servidor, como
   las páginas de /equipo/: los únicos trozos de cliente son los botones de
   contacto y AnimacionesEntrada.

   Los botones abren por ahora el modal de contacto general. La variante del
   formulario propia del diagnóstico va en una pasada aparte. */

const URL = "https://s-peak.com/diagnostico/";
const TITULO = "Diagnóstico de Nivel para Equipos, sin costo | S-Peak";
const DESCRIPCION =
  "Cada colaborador presenta un examen en línea y le presentamos en una junta el nivel de cada persona, una propuesta de grupos y el tiempo para llegar a B1 o B2. Sin costo.";

/* Página oculta mientras se revisa: robots noindex/nofollow, fuera del sitemap
   y sin enlaces desde el menú ni desde ninguna otra página. Solo se llega
   escribiendo la URL. Para publicarla: quitar `robots` de aquí, añadir
   "/diagnostico/" a las rutas fijas de app/sitemap.ts y darle su entrada de
   menú en app/components/nav/secciones.ts. No se bloquea en robots.txt, por lo
   que explica ese archivo. */
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
        alt: "Diagnóstico de nivel de idioma para equipos de S-Peak",
      },
    ],
  },
};

const CTA = "Solicite su diagnóstico sin costo";

const RECIBE = [
  "El nivel de cada colaborador.",
  "Una propuesta de grupos, de 1 a 10 colaboradores cada uno.",
  "Cuánto costaría cada grupo propuesto y en cuánto tiempo terminaría.",
  "Una sesión muestra sin costo para todo el grupo.",
  "Cuánto tardaría cada colaborador en llegar a un nivel intermedio (B1) o al siguiente (B2), según su nivel de partida.",
  "La propuesta de afinar el nivel de algunos participantes con una evaluación oral.",
  "Se lo presentamos en una junta de resultados.",
];

const PASOS = [
  "Platicamos con usted y definimos en qué idioma evaluar a su equipo. Si aún no sabe cuál, lo decidimos juntos en esa primera conversación.",
  "Damos de alta a su empresa y creamos su acceso al examen, en el idioma acordado.",
  "Le enviamos el enlace para que lo comparta con su equipo.",
  "Cada colaborador lo presenta en línea. Le toma de 5 minutos a una hora, según su nivel.",
  "Unos días después de que su equipo termine, junta de resultados: el nivel de cada colaborador, la propuesta de grupos con su costo y en cuánto tiempo terminaría cada uno, cuánto tardaría cada colaborador en llegar a B1 o a B2, la propuesta de afinar con una evaluación oral el nivel de algunos participantes y una sesión muestra sin costo.",
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
      "El examen escrito y la sesión muestra, no. La evaluación oral se cotiza, y no tiene costo si contrata el programa.",
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
      "Unos días después de que su equipo termine el examen. Se los presentamos en una junta.",
  },
  {
    pregunta: "¿Por qué la parte oral va aparte?",
    respuesta:
      "Porque este examen no mide la expresión oral. En la junta le proponemos afinar el nivel de algunos participantes con una evaluación oral.",
  },
  {
    pregunta: "¿En qué idiomas está disponible?",
    respuesta:
      "Inglés, francés, español para extranjeros, italiano y portugués. En alemán, el examen escrito y la evaluación oral se los enviamos por correo electrónico (costo de la evaluación oral por confirmar).",
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
        provider: { "@type": "Organization", name: "S-Peak", url: "https://s-peak.com" },
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
          <div className={`${styles.heroInner} reveal`}>
            <div className="sp-etiqueta">Diagnóstico de Nivel para Equipos · Sin costo</div>
            <h1>Conozca el nivel de inglés de su equipo antes de invertir en capacitación</h1>
            <p className={styles.heroIdiomas}>
              También en francés, español para extranjeros, italiano, portugués y alemán.
            </p>
            <p className="sp-hero-sub">
              Cada colaborador presenta un examen en línea. Unos días después de que su
              equipo lo termine, le presentamos en una junta el nivel de cada persona, una
              propuesta de grupos y cuánto tardaría cada una en llegar a un nivel intermedio
              (B1) o al siguiente (B2), según su nivel de partida. Sin costo.
            </p>
            <BotonContacto className="sp-btn sp-btn--rojo">{CTA}</BotonContacto>
          </div>
        </section>

        {/* QUÉ RECIBE */}
        <section className="sp-seccion" id="que-recibe">
          <div className="sp-inner">
            <div className="sp-seccion-top reveal">
              <h2>Qué recibe</h2>
            </div>
            <ul className={`${styles.recibeGrid} reveal stagger`}>
              {RECIBE.map((texto) => (
                <li key={texto} className={`sp-tarjeta sp-barra ${styles.recibeCard}`}>
                  <p>{texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className={`sp-seccion ${styles.pasosSeccion}`} id="como-funciona">
          <div className="sp-inner">
            <div className="sp-seccion-top reveal">
              <h2>Cómo funciona, paso a paso</h2>
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
          </div>
        </section>

        {/* QUÉ MIDE, Y QUÉ NO */}
        <section className="sp-seccion" id="que-mide">
          <div className={`${styles.mideInner} reveal`}>
            <h2>Qué mide, y qué no</h2>
            <p>
              El examen mide tres de las cuatro habilidades del idioma: comprensión oral
              (escuchar), comprensión escrita (leer) y expresión escrita.
            </p>
            <p>
              La expresión oral no forma parte de este examen. En la junta le proponemos
              afinar el nivel de algunos participantes con una evaluación oral:
            </p>
            <ul className={styles.mideLista}>
              <li>Sin costo si contrata el programa.</li>
              <li>Se cotiza si solo desea la evaluación.</li>
            </ul>
          </div>
        </section>

        {/* FRANJA DE IDIOMAS — solo las etiquetas. No usa FranjaIdiomas porque
            ese componente pide un titular y un texto que esta página no lleva. */}
        <section className="sp-franja" aria-label="Idiomas del diagnóstico">
          <div className={`sp-franja-inner ${styles.franjaInner}`}>
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
                Hemos recopilado las dudas más comunes de nuestros clientes para brindarle
                claridad desde el primer momento.
              </p>
              <div className={`sp-cta-card ${styles.faqCtaCard}`}>
                <p>¿Tiene una pregunta que no está aquí?</p>
                <BotonContacto className="sp-btn sp-btn--rojo">{CTA}</BotonContacto>
              </div>
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
