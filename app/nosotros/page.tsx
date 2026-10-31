import type { Metadata } from "next";
import AnimacionesEntrada from "@/app/components/AnimacionesEntrada";
import BandaLogos from "@/app/components/BandaLogos";
import CentroDeRecursos from "@/app/components/CentroDeRecursos";
import BotonContacto from "@/app/components/contacto/BotonContacto";
import Icono from "@/app/components/Icono";
import { TableroProgreso } from "@/app/components/SeccionEvidencia";
import SelloSTPS from "@/app/components/SelloSTPS";
// La lista de las seis páginas de idioma vive con la plantilla de equipo.
import { IDIOMAS } from "@/app/equipo/tipos";
import styles from "./nosotros.module.css";

/* /nosotros/: quiénes somos, contado como la historia de una gerente de RH.

   Hero de una columna, secciones sp-* y CTA final en rojo, como /diagnostico/.
   Se renderiza en el servidor: los únicos trozos de cliente son los botones de
   contacto, AnimacionesEntrada y el carrusel del Centro de Recursos. Todos los
   botones abren el modal de contacto general. */

const URL = "https://s-peak.com/nosotros/";
const TITULO = "S-Peak, capacitación en idiomas para empresas desde 2006";
const DESCRIPCION =
  "Capacitación en idiomas para empresas desde 2006: registro STPS, constancia DC-3 y metodología PACTO con reportes mensuales. Presencial, en línea o híbrida.";

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

/* Mismos iconos que las cifras de /equipo/. */
const CIFRAS = [
  { icono: "premio", num: "+20", label: "Años de experiencia" },
  { icono: "edificio", num: "+500", label: "Empresas atendidas" },
  { icono: "birrete", num: "+40K", label: "Profesionales formados" },
];

const DOLORES = [
  {
    titulo: "«Mi directora me está pidiendo el estatus»",
    descripcion:
      "Cada mes recibe un reporte automático de asistencia y calificaciones.",
  },
  {
    titulo: "«Tengo que cuadrar las horas tomadas contra la factura»",
    descripcion:
      "El reporte mensual trae las horas tomadas contra las facturadas y las sesiones repuestas, y su programa incluye un margen de sesiones canceladas que no se cobran.",
  },
  {
    titulo: "«¿Qué día termina el nivel?»",
    descripcion:
      "Le damos por escrito la fecha en que termina cada nivel y cada etapa; si una sesión cancelada no se repone, la fecha se recorre.",
  },
  {
    titulo: "«Están súper ocupados»",
    descripcion:
      "Horarios, modalidad y reposiciones se ajustan a su operación; damos seguimiento a cada falta.",
  },
  {
    titulo: "«No puedo gestionar mi área y además este programa»",
    descripcion:
      "Cada cliente tiene un ejecutivo de cuentas que resuelve lo operativo por usted.",
  },
  {
    titulo: "«No buscamos el típico curso teórico»",
    descripcion:
      "Su equipo practica en el idioma lo que hace en su puesto: hablar con sus clientes, sus proveedores y su corporativo.",
  },
];

/* Los cinco pasos de la metodología, en orden: cada uno es un escalón más
   alto que el anterior. */
const PACTO = [
  {
    letra: "P",
    nombre: "Planificación",
    descripcion:
      "Diagnosticamos el nivel de cada colaborador y definimos con usted qué debe poder hacer en el idioma en su puesto.",
  },
  {
    letra: "A",
    nombre: "Arranque",
    descripcion:
      "Sesión de arranque con el grupo: calendario, reglas del programa y metas de cada colaborador.",
  },
  {
    letra: "C",
    nombre: "Competencias",
    descripcion:
      "Etapas de 26 horas, cada una enfocada en un dominio del puesto, con práctica real: juntas, correos y presentaciones.",
  },
  {
    letra: "T",
    nombre: "Trazabilidad",
    descripcion:
      "Reportes por mes, trimestre, nivel y año; evidencia evaluada con rúbrica; Tarjeta de Resultados al cerrar cada etapa y constancia DC-3.",
  },
  {
    letra: "O",
    nombre: "Optimización",
    descripcion:
      "Con base en los resultados, decidimos con usted la siguiente etapa y ajustamos el programa.",
  },
];

/* Las cifras son las del tablero de /idioma/aleman-para-empresas/, tal cual:
   ilustrativas, como dice la etiqueta. */
const TABLERO = {
  mejora: 16,
  activos: 15,
  sesiones: 28,
  aprobadas: 85,
  alza: 5,
  curva: [75, 64, 61, 50, 47, 31, 26],
  competencias: [
    { nombre: "Comunicación oral", pct: 79 },
    { nombre: "Comprensión auditiva", pct: 68 },
    { nombre: "Redacción corporativa", pct: 77 },
    { nombre: "Negociación", pct: 70 },
  ],
  colaboradores: [
    { nivel: "B2", pct: 87 },
    { nivel: "B1", pct: 76 },
    { nivel: "B1", pct: 70 },
    { nivel: "A2", pct: 61 },
  ],
};

const MCER = "https://www.coe.int/en/web/common-european-framework-reference-languages";

const FAQ = [
  {
    pregunta: "¿Con qué escala miden el nivel de cada colaborador?",
    respuesta: (
      <>
        Con la del{" "}
        <a href={MCER} target="_blank" rel="noopener noreferrer">
          Marco Común Europeo de Referencia
        </a>{" "}
        (A1 a C2), desde el examen del diagnóstico inicial.
      </>
    ),
  },
  {
    pregunta: "¿Cuánto tiempo hay que contratar?",
    respuesta:
      "Un año mínimo. Es el tiempo en que el avance alcanza a verse en el puesto.",
  },
  {
    pregunta: "¿Quién da las sesiones?",
    respuesta:
      "Especialistas en idioma de negocios, nativos o bilingües, con experiencia en entornos empresariales; si alguno no resulta el adecuado, lo cambiamos.",
  },
  {
    pregunta: "¿Qué pasa si el instructor no puede dar una sesión?",
    respuesta: "Se repone en un horario que acuerdan el colaborador y el instructor.",
  },
  {
    pregunta: "¿Pueden darse de alta como proveedor en nuestra empresa?",
    respuesta:
      "Sí: entregamos la documentación para el alta y firmamos acuerdo de confidencialidad.",
  },
  {
    pregunta: "¿El material tiene costo?",
    respuesta: "El material se cotiza aparte; su costo depende del idioma y del nivel.",
  },
  {
    pregunta: "¿Cómo se factura?",
    respuesta: "Nos adaptamos a la forma de facturación de su empresa.",
  },
  {
    pregunta: "¿Atienden fuera de la Ciudad de México?",
    respuesta:
      "Sí, en cualquier parte de México: presencial en la empresa, en línea en vivo o híbrida, en una o varias sedes.",
  },
  {
    pregunta:
      "¿La constancia DC-3 es una certificación de idioma, como Cambridge o IELTS?",
    respuesta: (
      <>
        No. La DC-3 es la constancia de capacitación con formato de la{" "}
        <a href="https://www.gob.mx/stps" target="_blank" rel="noopener noreferrer">
          STPS
        </a>
        , que firmamos como agente capacitador externo; el nivel de idioma se mide
        aparte, con la escala del Marco Común Europeo.
      </>
    ),
  },
];

/* Los tres del Centro de Recursos, por su url en CentroDeRecursos.tsx. */
const ARTICULOS = [
  "/blog-capacitacion-en-ingles-programa-fantasma/",
  "/blog-nivel-ingles-empresas-areas/",
  "/capacitacion-personal-programa-idiomas/",
];

/* Sin FAQPage, a diferencia de las demás páginas con preguntas frecuentes. */
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
            <div className="sp-etiqueta">Capacitación en idiomas para empresas</div>
            <h1>
              Desde 2006 ayudamos a equipos de trabajo a hablar, negociar y colaborar
              con seguridad en otro idioma.
            </h1>
            <p className="sp-hero-sub">
              Nos encargamos de coordinar horarios, reponer sesiones y entregar
              reportes, para que capacitar a su equipo en idiomas deje de ser un
              pendiente y se convierta en un logro que pueda presentar a Dirección.
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

        {/* LOGOS */}
        <BandaLogos />

        {/* PRESENTACIÓN E IDIOMAS */}
        <section className={`sp-seccion ${styles.presentacion}`} id="presentacion">
          <div className={`${styles.presentacionInner} reveal`}>
            <p className={styles.presentacionLinea}>
              S-Peak es una empresa mexicana de capacitación en idiomas para empresas,
              <br className={styles.corte} /> fundada en 2006 y registrada ante la
              STPS como agente capacitador.
            </p>
            <ul className={styles.idiomas}>
              {IDIOMAS.map((i) => (
                <li key={i.ruta}>
                  <a className={`sp-pill ${styles.pill}`} href={i.ruta}>
                    {i.nombre}
                  </a>
                </li>
              ))}
            </ul>
            <p className={styles.modalidades}>
              Presencial, en línea en vivo o híbrida, en una o varias sedes en
              cualquier parte de México.
            </p>
          </div>
        </section>

        {/* LO QUE SUELE FALLAR */}
        <section className="sp-seccion" id="historia">
          <div className={styles.dosColumnas}>
            <div className={`${styles.lectura} reveal`}>
              <h2>Lo que suele fallar con un proveedor de idiomas</h2>
              <p>
                Imagine a una gerente de Recursos Humanos. Dirección le pide que, en un
                año, sus gerentes dirijan las juntas con la casa matriz en inglés.
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
            {/* PLACEHOLDER: aquí va la imagen definitiva de «Lo que suele fallar». */}
            <div className={`${styles.placeholderImagen} reveal`} aria-hidden="true">
              Imagen
            </div>
          </div>
        </section>

        {/* S-PEAK NACIÓ DE UNA INCONFORMIDAD */}
        <section className={styles.origen} id="origen">
          <div className={`sp-seccion ${styles.origenTop}`}>
            <div className={`${styles.dosColumnas} ${styles.dosColumnasInvertido}`}>
              <div className={`sp-seccion-top ${styles.origenIntro} reveal`}>
                <h2>S-Peak nació de una inconformidad</h2>
                <p>
                  En 2006, lo normal era que la empresa se acomodara a su proveedor.
                  Nosotros hicimos lo contrario.
                </p>
                <p>
                  Por eso fuimos de los primeros en México en llevar al instructor a la
                  empresa y en capacitar por videoconferencia. Desde el primer día
                  trabajamos para empresas, y conocemos de cerca lo que vive Recursos
                  Humanos:
                </p>
              </div>
              {/* PLACEHOLDER: aquí va la imagen definitiva de «S-Peak nació de una
                  inconformidad». */}
              <div className={`${styles.placeholderImagen} reveal`} aria-hidden="true">
                Imagen
              </div>
            </div>
          </div>

          <div className={`sp-banda ${styles.confianza}`}>
            <div className={`${styles.confianzaInner} reveal`}>
              <h3>«Busco un proveedor confiable, con buenas referencias»</h3>
              <p>
                La primera empresa que confió en nosotros siguió con S-Peak durante
                15 años.
              </p>
            </div>
          </div>

          <div className={`sp-seccion ${styles.origenGrid}`}>
            <ul className={`sp-inner ${styles.dolores} reveal stagger`}>
              {DOLORES.map((d) => (
                <li key={d.titulo} className={`sp-tarjeta sp-barra ${styles.dolor}`}>
                  <h3>{d.titulo}</h3>
                  <p>{d.descripcion}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* METODOLOGÍA PACTO */}
        <section className="sp-seccion" id="metodologia">
          <div className="sp-inner">
            <div className="sp-seccion-top reveal">
              <h2>
                Cómo trabajamos: metodología PACTO para programas de idiomas en
                empresas
              </h2>
              <p>
                PACTO son cinco pasos para que su inversión se vea en el puesto, no
                solo en la lista de asistencia.
              </p>
            </div>

            <ol className={`${styles.escalera} reveal stagger`}>
              {PACTO.map((p) => (
                <li key={p.letra} className={`sp-tarjeta ${styles.escalon}`}>
                  <span className={styles.letra} aria-hidden="true">
                    {p.letra}
                  </span>
                  <h3>{p.nombre}</h3>
                  <p>{p.descripcion}</p>
                </li>
              ))}
            </ol>

            <figure
              className={`sp-testi-card sp-testi-card--acento ${styles.testiPacto} reveal`}
            >
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

            <TableroProgreso
              amplio
              className={styles.panel}
              titulo="Así se ve la Trazabilidad"
              ejemplo="Ejemplo de reporte · Datos ilustrativos"
              etiqueta="Ejemplo de reporte de Trazabilidad de S-Peak, con datos ilustrativos"
              tablero={TABLERO}
            />

            <div className={`${styles.panelCierre} reveal`}>
              <p>
                ¿Así quiere ver el avance de su equipo? Le proponemos un programa a la
                medida.
              </p>
              <BotonContacto className="sp-btn sp-btn--rojo">{CTA}</BotonContacto>
            </div>
          </div>
        </section>

        {/* SI ALGO SE COMPLICA */}
        <section className={`sp-seccion ${styles.aviso}`} id="aviso">
          <div className={`sp-inner ${styles.avisoInner}`}>
            <div className={`${styles.avisoTexto} reveal`}>
              <h2>Si algo se complica, se lo avisamos primero</h2>
              <p>
                En todo proyecto aparecen imprevistos. Aprendimos que entre más pronto se
                anticipan y se comunican, más rápido se resuelven y más chicos se quedan.
                Por eso, si un cierre de mes obliga a cancelar sesiones, su ejecutivo de
                cuentas se lo avisa en cuanto lo detecta y le propone cuándo reponerlas,
                antes de que Dirección se lo pregunte.
              </p>
              <p>
                Revisamos los avances
                con usted, escuchamos a su equipo y adaptamos el programa conforme su
                empresa cambia.
              </p>
            </div>
            {/* Los dos testimonios, con el texto de
                app/idioma/ingles-para-empresas/page.tsx tal cual. */}
            <div className={`${styles.avisoTestimonios} reveal stagger`}>
              <figure className="sp-testi-card">
                <div className="sp-estrellas">★★★★★</div>
                <blockquote className="sp-testi-quote">
                  &quot;Valoramos el seguimiento que <strong>S-Peak</strong> nos brinda,
                  el feedback que piden a través de citas regulares y encuestas, así como
                  reaccionan a lo que pedimos como cliente. Además, los profesores están
                  muy bien preparados para asegurar el aprendizaje, y los precios son
                  justos.&quot;
                </blockquote>
                <figcaption className="sp-testi-autor">
                  <div className="sp-avatar">EC</div>
                  <div>
                    <div className="sp-autor-nombre">Erika C.</div>
                    <div className="sp-autor-rol">
                      People Development, Culture &amp; D&amp;I Expert
                    </div>
                  </div>
                </figcaption>
              </figure>
              <figure className="sp-testi-card">
                <div className="sp-estrellas">★★★★★</div>
                <blockquote className="sp-testi-quote">
                  &quot;El equipo de <strong>S-Peak</strong> tiene una gran actitud de
                  servicio, sus cursos de idiomas son excelentes para nuestros equipos,
                  se adaptan a las necesidades de sus perfiles de puesto.&quot;
                </blockquote>
                <figcaption className="sp-testi-autor">
                  <div className="sp-avatar">BI</div>
                  <div>
                    <div className="sp-autor-nombre">Braskem Idesa</div>
                    <div className="sp-autor-rol">Área de RRHH</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* PREGUNTAS FRECUENTES */}
        <section className="sp-seccion" id="faq">
          <div className="sp-inner">
            <div className="sp-seccion-top reveal">
              <h2>Preguntas frecuentes sobre la capacitación en idiomas para su empresa</h2>
            </div>
            <div className={`sp-faq-lista ${styles.faqLista} reveal`}>
              {FAQ.map((f) => (
                <details key={f.pregunta} className="sp-faq-item" name="faq-nosotros">
                  <summary className="sp-faq-pregunta">
                    {f.pregunta}
                    <span className="sp-faq-icono">+</span>
                  </summary>
                  <div className={`sp-faq-respuesta ${styles.faqRespuesta}`}>
                    {f.respuesta}
                  </div>
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
          <div className={`${styles.finalInner} reveal`}>
            <h2>Ahora imagine a esa misma gerente, con S-Peak</h2>
            <p>
              Esta vez el proveedor trabaja para ella. Al cerrar el año no llega a
              Dirección con listas de asistencia: llega con el avance de cada gerente en
              la escala del Marco Común Europeo y su Tarjeta de Resultados.
            </p>
            <BotonContacto className="sp-btn sp-btn--blanco">{CTA}</BotonContacto>
          </div>
        </section>

        {/* CENTRO DE RECURSOS */}
        <CentroDeRecursos articulos={ARTICULOS} />
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
