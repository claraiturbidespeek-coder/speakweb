import type { Metadata } from "next";
import AnimacionesEntrada from "@/app/components/AnimacionesEntrada";
import BandaLogos from "@/app/components/BandaLogos";
import BotonContacto from "@/app/components/contacto/BotonContacto";
import Icono from "@/app/components/Icono";
import SelloSTPS from "@/app/components/SelloSTPS";
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
                claseIdioma={styles.titularIdioma}
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

        {/* QUÉ RECIBE */}
        <section className="sp-seccion" id="que-recibe">
          <div className="sp-inner">
            <div className="sp-seccion-top reveal">
              {/* La línea de público: justo debajo del hero, centrada, como
                  entrada de «Qué recibe». */}
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

        {/* LOGOS */}
        <BandaLogos className={styles.logos} />

        {/* TESTIMONIO: la tarjeta de /equipo/, sola, con el CTA debajo. */}
        <section className={`sp-seccion ${styles.testimonio}`} id="testimonio">
          <div className={`${styles.testimonioInner} reveal`}>
            <div className="sp-testi-card sp-barra">
              <div className="sp-estrellas">★★★★★</div>
              <p className="sp-testi-quote">
                &ldquo;El equipo de S-Peak tiene una gran actitud de servicio, sus cursos de
                idiomas son excelentes para nuestros equipos, se adaptan a las necesidades de
                nuestros perfiles de puesto.&rdquo;
              </p>
              <div className="sp-testi-autor">
                <div className="sp-avatar">BI</div>
                <div>
                  <div className="sp-autor-nombre">Braskem Idesa</div>
                  <div className="sp-autor-rol">Área de RRHH</div>
                </div>
              </div>
            </div>
            <BotonContacto className="sp-btn sp-btn--rojo">{CTA}</BotonContacto>
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
            <div className={`${styles.pasosCta} reveal`}>
              <BotonContacto className="sp-btn sp-btn--rojo">{CTA}</BotonContacto>
            </div>
          </div>
        </section>

        {/* QUÉ MIDE, Y QUÉ NO */}
        <section className="sp-seccion" id="que-mide">
          <div className={`${styles.mideInner} reveal`}>
            <h2>Qué mide, y qué no</h2>
            <ul className={styles.habilidades}>
              {["Escuchar", "Leer", "Escribir"].map((h) => (
                <li key={h}>
                  <span
                    className={`sp-icono sp-icono--sm sp-icono--rojo ${styles.habilidadMarca}`}
                    role="img"
                    aria-label="Se evalúa:"
                  >
                    <Icono nombre="palomita" />
                  </span>
                  {h}
                </li>
              ))}
              <li>
                <span className={styles.habilidadMarca} aria-hidden="true" />
                Hablar
                <span className={styles.habilidadNota}>Se evalúa aparte</span>
              </li>
            </ul>
            <p>
              En la junta le proponemos afinar el nivel de algunos participantes con una
              evaluación oral.
            </p>
            <table className={styles.mideTabla}>
              <thead>
                <tr>
                  <th scope="col">Si contrata el programa</th>
                  <th scope="col">Si solo desea la evaluación</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sin costo</td>
                  <td>Se cotiza</td>
                </tr>
              </tbody>
            </table>
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
                Lo que nos preguntan las áreas de Recursos Humanos antes de solicitar el
                diagnóstico.
              </p>
              <div className={`sp-cta-card ${styles.faqCtaCard}`}>
                <p>¿Tiene una pregunta que no está aquí?</p>
                <BotonContacto className="sp-btn sp-btn--rojo">Hablar con un Experto</BotonContacto>
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
