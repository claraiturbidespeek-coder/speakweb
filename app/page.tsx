import type { Metadata } from "next";
import Link from "next/link";
import BotonContacto from "@/app/components/contacto/BotonContacto";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Cursos de Idiomas para Empresas | ROI y Resultados - S-Peak",
  description:
    "Transforme el dominio de idiomas en métricas de negocio. Capacitación para empresas con evidencias de desempeño y reportes para RRHH.",
};

const CLIENTES = [
  { marca: "Walmart", archivo: "cliente-walmart.png" },
  { marca: "Paramount+", archivo: "cliente-paramount.png" },
  { marca: "KIO Networks", archivo: "cliente-kio.png" },
  { marca: "Santander", archivo: "cliente-santander.png" },
  { marca: "L'Oréal", archivo: "cliente-loreal.png" },
  { marca: "Naturgy", archivo: "cliente-naturgy.png" },
  { marca: "GBM", archivo: "cliente-gbm.png" },
  { marca: "Renault", archivo: "cliente-renault.png" },
  { marca: "AXA", archivo: "cliente-axa.png" },
  { marca: "PepsiCo", archivo: "cliente-pepsico.png" },
  { marca: "Club Med", archivo: "cliente-club-med.png" },
];

const IDIOMAS = [
  "🇬🇧 Inglés",
  "🇫🇷 Francés",
  "🇩🇪 Alemán",
  "🇵🇹 Portugués",
  "🇮🇹 Italiano",
  "🇪🇸 Español",
];

const DIFERENCIADORES = [
  {
    titulo: "Expansión Global y comunicación estratégica",
    texto:
      "Prepara a tus líderes para negociar, vender y operar en cualquier parte del mundo. Eliminamos las barreras de comunicación para que tu empresa pueda cerrar tratos con clientes y socios globales sin fricciones.",
    imagen: "diferenciador-expansion-global.jpg",
    alt: "Equipo directivo revisando una estrategia comercial en una oficina",
  },
  {
    titulo: "Retención de Talento mediante planes de carrera",
    texto:
      "El desarrollo profesional es el beneficio más valorado hoy en día. Ofrece un programa de idiomas de alto nivel que aumente el sentido de pertenencia, fortalezca el liderazgo de tu equipo y reduzca la rotación de personal.",
    imagen: "diferenciador-retencion-talento.jpg",
    alt: "Colaboradores aprendiendo un nuevo idioma en su lugar de trabajo",
  },
  {
    titulo: "Agilidad Operativa y fluidez empresarial",
    texto:
      "Evita retrasos causados por malentendidos al dotar a tu equipo de la fluidez que tu industria exige, optimizas tiempos de respuesta, agilizas procesos internos y elimina los cuellos de botella en la comunicación diaria.",
    imagen: "diferenciador-agilidad-operativa.jpg",
    alt: "Sesión de formación intercultural con empleados de mercados internacionales",
  },
];

// Tres columnas con reparto 3/3/2, igual que el original.
const MOSAICO = [
  [
    {
      nombre: "Ventas y Marketing",
      ruta: "/equipo/ventas-y-marketing/",
      imagen: "area-ventas-y-marketing.jpg",
    },
    {
      nombre: "Atención a Clientes",
      ruta: "/equipo/atencion-a-clientes/",
      imagen: "area-atencion-a-clientes.jpg",
    },
    {
      nombre: "Directivos",
      ruta: "/equipo/directivos/",
      imagen: "area-directivos.jpg",
    },
  ],
  [
    {
      nombre: "Finanzas y Contabilidad",
      ruta: "/equipo/finanzas-y-contabilidad/",
      imagen: "area-finanzas-y-contabilidad.jpg",
    },
    {
      nombre: "Legal y Jurídico",
      ruta: "/equipo/legal-y-juridico/",
      imagen: "area-legal-y-juridico.jpg",
    },
    {
      nombre: "Operaciones y Logística",
      ruta: "/equipo/operaciones-y-logistica/",
      imagen: "area-operaciones-y-logistica.jpg",
    },
  ],
  [
    {
      nombre: "Recursos Humanos",
      ruta: "/equipo/recursos-humanos/",
      imagen: "area-recursos-humanos.jpg",
    },
    {
      nombre: "Tecnología e Ingeniería",
      ruta: "/equipo/tecnologia-e-ingenieria/",
      imagen: "area-tecnologia-e-ingenieria.jpg",
    },
  ],
];

const FAQ = [
  {
    pregunta: "¿Cómo miden el progreso de mis colaboradores?",
    respuesta: [
      "A diferencia de otras escuelas que usan exámenes de memoria, nosotros evaluamos el desempeño real. Al final de cada etapa, el colaborador debe entregar una evidencia técnica (como una simulación de junta o un correo negociando). Esto se califica con una rúbrica profesional y se entrega a RH en una Tarjeta de Resultados con enlaces para que puedas ver y escuchar el avance.",
    ],
  },
  {
    pregunta: "¿Qué pasa si mis colaboradores tienen agendas muy ocupadas?",
    respuesta: [
      "Tenemos una política clara de seguimiento proactivo. Si un colaborador falta, nuestro equipo de coordinación lo detecta de inmediato y lo reportamos a RH en tiempo real. No dejamos que el programa se pierda por falta de uso; buscamos recuperar al colaborador o ajustar el grupo para que tu inversión no se desperdicie.",
    ],
  },
  {
    pregunta: "¿Qué idiomas tienen disponibles?",
    respuesta: [
      "Contamos con programas de Inglés, Francés, Alemán, Italiano, Portugués y Español para extranjeros. Nos enfocamos en los idiomas que tu empresa necesita para conectar con el mundo.",
    ],
  },
  {
    pregunta:
      "¿S-Peak esta registrado y tiene constancia ante la Secretaría del Trabajo y Previsión Social (STPS)?",
    respuesta: [
      "Sí, el programa S-Peak cuenta con registro oficial ante la Secretaría del Trabajo y Previsión Social (STPS). Actualmente, S-Peak puede emitir una constancia de que te capacitamos para el aprendizaje de un idioma.",
    ],
  },
  {
    pregunta: "¿Pueden manejar proyectos masivos en varios países?",
    respuesta: [
      "Sí. Estamos especializados en gestionar proyectos complejos y de gran escala para multinacionales.",
      "Alcance: Gracias a nuestra operación, eliminamos las barreras geográficas. Podemos capacitar a tus equipos en México y en cualquier otra filial de Latinoamérica o el mundo de forma simultánea.",
      "Gestión Centralizada: Aunque el proyecto sea masivo, tú mantienes el control desde un solo punto. Nosotros nos encargamos de la logística y el seguimiento de cada grupo, sin importar el país donde se encuentren.",
      "Uniformidad: Garantizamos que todos los colaboradores, sin importar su ubicación, reciban el mismo estándar de calidad y evaluación bajo nuestra metodología, entregándote resultados consolidados de toda tu operación regional.",
    ],
  },
  {
    pregunta:
      "¿Cuál es el retorno de inversión (ROI) de capacitar en idiomas con S-peak?",
    respuesta: [
      "El ROI de S-Peak se mide en eficiencia y ahorro operativo. Al entrenar a tu equipo en tareas específicas, reducimos el tiempo perdido por errores de comunicación y el costo de retrabajo, permitiéndoles enfocarse en lo estratégico mientras nosotros garantizamos que el presupuesto se convierta en capacidades reales.",
    ],
  },
  {
    pregunta: "¿Cómo garantizan que los colaboradores realmente aprendan?",
    respuesta: [
      "Cambiamos los exámenes por evidencias de desempeño. En S-Peak, el colaborador no solo memoriza reglas, sino que debe producir algo real (como una presentación o una negociación) que se califica con una rúbrica profesional. Al final, te entregamos una Tarjeta de Resultados con pruebas del avance.",
    ],
  },
];

const POSTS = [
  {
    titulo:
      "Aprender idiomas en la era del nearshoring: Las lenguas más demandadas en México",
    url: "/aprender-idiomas-nearshoring-mexico/",
    imagen: "blog-nearshoring-idiomas.webp",
    alt: "Ejecutivos bilingües en México planeando estrategias comerciales para aprender idiomas corporativos.",
  },
  {
    titulo:
      "Capacitación de personal: cómo diseñar un programa de idiomas que sí completen",
    url: "/capacitacion-personal-programa-idiomas/",
    imagen: "blog-capacitacion-personal.webp",
    alt: "Capacitación de personal corporativo participando activamente en un taller de idiomas dinámico.",
  },
  {
    titulo:
      "Inglés para ejecutivos: 6 situaciones clave donde urge una evaluación de inglés",
    url: "/evaluacion-de-ingles-ejecutivos/",
    imagen: "blog-evaluacion-ingles.jpg",
    alt: "Evaluación de inglés corporativa para ejecutivos y directores en una junta de negocios.",
  },
  {
    titulo:
      "Por qué el 70% de los programas de capacitación en idiomas fracasan antes de los 6 meses",
    url: "/negocios-en-ingles-porque-fracasan-cursos/",
    imagen: "blog-negocios-en-ingles.webp",
    alt: "Grupo de profesionales en una oficina moderna colaborando y preparándose para hacer negocios en inglés con éxito.",
  },
  {
    titulo: "Inglés de negocios: habilidades clave según su rol ejecutivo",
    url: "/ingles-de-negocios-ejecutivos/",
    imagen: "blog-ingles-de-negocios.jpg",
    alt: "Ejecutiva participando en una videollamada internacional y aplicando su inglés de negocios con un equipo de trabajo.",
  },
  {
    titulo:
      "¿Alemán, francés o inglés? Cómo identificar qué idiomas para empresas necesita su equipo",
    url: "/mejores-idiomas-para-empresas/",
    imagen: "blog-idiomas-para-empresas.jpg",
    alt: "os ejecutivos corporativos analizando la estrategia de idiomas para empresas frente a un mapa mundial.",
  },
  {
    titulo:
      "De cero a bilingüe: Cómo estructurar una capacitación en inglés que su equipo no abandone",
    url: "/como-implementar-capacitacion-en-ingles-empresas/",
    imagen: "blog-capacitacion-en-ingles.jpg",
    alt: "Capacitación en inglés empresarial para equipos de trabajo en una mesa de negociación con banderas internacionales.",
  },
  {
    titulo: "5 errores de comunicación en tu primer año de Nearshoring",
    url: "/errores-comunicacion-nearshoring-en-mexico/",
    imagen: "blog-errores-nearshoring.jpg",
    alt: "Directivo analizando mapas de comercio global y estrategias de nearshoring en mexico usando una tableta en su oficina.",
  },
];

export default function Home() {
  return (
    <main>
      {/* 1. Hero */}
      <section className={styles.hero}>
        <div className={`sp-inner ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Cursos de idiomas para empresas en México
            </h1>
            <p>
              Sus colaboradores <strong>necesitan</strong> comunicarse con
              seguridad en inglés u otro idioma:
              <strong> hablar, presentar, negociar y colaborar</strong> en
              situaciones reales de trabajo.
            </p>
            <p>
              En <strong>S-Peak</strong> diseñamos programas de capacitación en
              idiomas individuales y grupales para empresas, con seguimiento
              continuo, reportes claros y evidencia verificable del avance de
              cada colaborador.
            </p>
            <BotonContacto className="sp-btn sp-btn--rojo">
              Solicite una Cotización
            </BotonContacto>
          </div>

          <div className={styles.heroMedia}>
            <video
              className={styles.heroVideo}
              src="/video/hero-speak.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <p className={`${styles.callout} ${styles.calloutTop}`}>
              Potencie las habilidades lingüísticas de su equipo y compita a
              nivel global
            </p>
            <p className={`${styles.callout} ${styles.calloutBottom}`}>
              Formación en idiomas diseñada para los retos reales de su empresa
            </p>
          </div>
        </div>
      </section>

      {/* 2. Confianza */}
      <section className={`sp-seccion ${styles.trust}`}>
        <div className={styles.trustCard}>
          <h2 className={styles.trustTitle}>
            +500 organizaciones confían en nuestra formación lingüística
            corporativa
          </h2>
          <div className="sp-marquesina">
            <div className="sp-marquesina-track">
              {[...CLIENTES, ...CLIENTES].map((c, i) => (
                <img
                  key={`${c.archivo}-${i}`}
                  src={`/images/home/${c.archivo}`}
                  alt={i < CLIENTES.length ? `Logo de ${c.marca}` : ""}
                  aria-hidden={i >= CLIENTES.length}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Claim + idiomas */}
      <section className={`sp-seccion ${styles.claim}`}>
        <div className="sp-inner">
          <h2 className={styles.claimTitle}>
            El 96% de los colaboradores demuestra un desempeño superior en su
            puesto con evidencias verificables.
          </h2>
          <ul className={styles.langs}>
            {IDIOMAS.map((idioma) => (
              <li key={idioma}>{idioma}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Prepare a su talento */}
      <section className="sp-seccion">
        <div className={`sp-inner ${styles.programGrid}`}>
          <img
            className={styles.programImage}
            src="/images/home/programa-metricas.jpg"
            alt="Colaboradora en una sesión de idiomas con burbujas de conversación"
            loading="lazy"
          />
          <div>
            <h2 className={styles.heading}>
              Prepare a su talento con clases de idiomas para el mercado global
            </h2>
            <p className={styles.lead}>
              Traducimos el desarrollo del idioma en métricas de negocio.
              Proporcionamos a las direcciones de Recursos Humanos cuadros de
              mando integrales que detallan el rendimiento, el nivel de adopción
              y el impacto real del programa en su organización, permitiendo una
              toma de decisiones basada en datos y la optimización continua de su
              presupuesto.
            </p>
            <ul className={styles.features}>
              <li>Evidencias Demostrables</li>
              <li>Métricas de Asistencia</li>
              <li>Reportes de Desempeño</li>
            </ul>
            <BotonContacto className="sp-btn sp-btn--rojo">
              Solicite una Cotización
            </BotonContacto>
          </div>
        </div>
      </section>

      {/* 5. Contadores */}
      <section className={`sp-seccion ${styles.countersSection}`}>
        <ul className={`sp-inner ${styles.counters}`}>
          <li className={styles.counter}>
            <span className={styles.counterNum}>+40K</span>
            <span className={styles.counterLabel}>Alumnos</span>
          </li>
          <li className={styles.counter}>
            <span className={styles.counterNum}>+500</span>
            <span className={styles.counterLabel}>Empresas / Clientes</span>
          </li>
          <li className={styles.counter}>
            <span className={styles.counterNum}>+20</span>
            <span className={styles.counterLabel}>Años de Experiencia</span>
          </li>
        </ul>
      </section>

      {/* 6. Diferenciadores */}
      <section className="sp-seccion">
        <div className={`sp-inner ${styles.centered}`}>
          <p className="sp-eyebrow">
            Programas de idiomas diseñados para el mercado global
          </p>
          <h2 className={styles.heading}>
            Compruebe lo que nos diferencia de otras compañías con clases de
            idiomas para empresas
          </h2>
          <ul className={styles.differentiators}>
            {DIFERENCIADORES.map((d) => (
              <li key={d.titulo} className={styles.diffCard}>
                <img
                  className={styles.diffMedia}
                  src={`/images/home/${d.imagen}`}
                  alt={d.alt}
                  loading="lazy"
                />
                <h3 className={styles.diffTitle}>{d.titulo}</h3>
                <p className={styles.diffText}>{d.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Áreas */}
      <section className="sp-seccion">
        <div className={`sp-inner ${styles.areasGrid}`}>
          <div>
            <h2 className={styles.heading}>
              Formación diseñada para cada área de su empresa
            </h2>
            <p className={styles.lead}>
              Cada departamento tiene retos de comunicación distintos. Por eso
              nuestros programas se adaptan al rol, al contexto y al idioma que
              su equipo necesita dominar. Medimos el avance con indicadores
              reales y entregamos reportes que le permiten tomar decisiones sobre
              su inversión.
            </p>
            <BotonContacto className="sp-btn sp-btn--rojo">
              Solicite una Cotización
            </BotonContacto>
          </div>

          <div className={styles.mosaic}>
            {MOSAICO.map((columna, i) => (
              <ul
                key={columna[0].ruta}
                className={`${styles.mosaicColumn} ${
                  i === 0
                    ? styles.mosaicColumnFirst
                    : i === 1
                      ? styles.mosaicColumnSecond
                      : ""
                }`}
              >
                {columna.map((a) => (
                  <li key={a.ruta}>
                    <Link
                      className={styles.tile}
                      href={a.ruta}
                      style={{
                        backgroundImage: `url("/images/home/${a.imagen}")`,
                      }}
                    >
                      <h3 className={styles.tileLabel}>{a.nombre}</h3>
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Banda roja */}
      <section className={`sp-seccion ${styles.bandSection}`}>
        <div className={`sp-inner ${styles.band}`}>
          <div>
            <h2 className={styles.bandTitle}>El Talento se Desarrolla</h2>
            <p className={styles.bandText}>
              Elimine las barreras de comunicación que detienen el crecimiento de
              su empresa. Impulse el liderazgo de su equipo con clases diseñadas
              para resultados reales.
            </p>
          </div>
          <BotonContacto className={`sp-btn sp-btn--amarillo ${styles.bandCta}`}>
            Solicita una Cotización
          </BotonContacto>
        </div>
      </section>

      {/* 9. Casos de éxito */}
      <section className="sp-seccion sp-seccion--ancha">
        <div className={`sp-inner ${styles.centered}`}>
          <p className="sp-eyebrow">Casos de Éxito</p>
          <h2 className={styles.heading}>
            Resultados reales en equipos nacionales e internacionales
          </h2>
          <p className={styles.lead}>
            En S-Peak, el éxito no es subjetivo; se mide en números.
          </p>
        </div>

        <div className={`sp-inner sp-inner--ancho ${styles.cases}`}>
          <article
            className={styles.case}
            style={{
              backgroundImage: `url("/images/home/caso-brechas-linguisticas.jpg")`,
            }}
          >
            <div className={`${styles.caseCard} ${styles.caseCardNarrow}`}>
              <h3 className={styles.caseTitle}>
                Clases de idiomas para el cierre de brechas lingüísticas y
                técnicas
              </h3>
              <p className={styles.caseQuote}>
                El equipo de S-Peak tiene una gran actitud de servicio, sus
                cursos de idiomas son excelentes para nuestros equipos, se
                adaptan a las necesidades de sus perfiles de puesto.
              </p>
              <div className={styles.person}>
                <img
                  src="/images/home/testimonio-braskem.jpg"
                  alt=""
                  loading="lazy"
                />
                <span>
                  <span className={styles.personName}>Braskem Idesa</span>
                  <span className={styles.personRole}>Área de RRHH</span>
                </span>
              </div>
            </div>
          </article>

          <article className={`${styles.case} ${styles.caseYellow}`}>
            <div className={styles.caseCard}>
              <h3 className={styles.caseTitle}>
                Claridad y contexto corporativo en cada lección
              </h3>
              <p className={styles.caseQuote}>
                S-Peak es una organización sumamente dinámica. Su capacidad para
                entender nuestras necesidades específicas y adaptar sus mejores
                recursos a nuestros objetivos de negocio es su gran diferencial.
              </p>
              <div className={styles.person}>
                <img
                  src="/images/home/testimonio-fernanda.jpg"
                  alt=""
                  loading="lazy"
                />
                <span>
                  <span className={styles.personName}>Fernanda D.</span>
                  <span className={styles.personRole}>Alumna, Chedraui</span>
                </span>
              </div>
            </div>
          </article>

        </div>

        <div className={`sp-inner sp-inner--ancho ${styles.cases} ${styles.casesSecond}`}>
          <article
            className={`${styles.case} ${styles.caseRed} ${styles.caseOnColor}`}
          >
            <div>
              <h3 className={styles.caseTitle}>
                Adaptabilidad, seguimiento y atención
              </h3>
              <p className={styles.caseQuote}>
                S-Peak ha sido un gran aliado para nosotros, ya que se adapta a
                nuestras necesidades y cuenta con un sistema robusto de
                seguimiento en asistencias. Valoramos también que siempre nos
                brinda una buena atención tanto a la empresa como a los alumnos.
              </p>
              <div className={`${styles.person} ${styles.personNarrow}`}>
                <img
                  src="/images/home/testimonio-anabel.jpg"
                  alt=""
                  loading="lazy"
                />
                <span>
                  <span className={styles.personName}>Anabel P.</span>
                  <span className={styles.personRole}>
                    Analista de Planeación y Desarrollo de RH
                  </span>
                </span>
              </div>
            </div>
          </article>

          <article
            className={styles.case}
            style={{
              backgroundImage: `url("/images/home/caso-seguimiento-calidad.jpg")`,
            }}
          >
            <div className={`${styles.caseCard} ${styles.caseCardWide}`}>
              <h3 className={styles.caseTitle}>Seguimiento, calidad y valor</h3>
              <p className={styles.caseQuote}>
                Valoramos el seguimiento que S-Peak nos brinda, el feedback que
                piden a través de citas regulares y encuestas, así como
                reaccionan a lo que pedimos como cliente. Además, los profesores
                están muy bien preparados para asegurar el aprendizaje, y los
                precios son justos.
              </p>
              <div className={`${styles.person} ${styles.personNarrow}`}>
                <img
                  src="/images/home/testimonio-erika.jpg"
                  alt=""
                  loading="lazy"
                />
                <span>
                  <span className={styles.personName}>Erika C.</span>
                  <span className={styles.personRole}>
                    People Development, Culture and D&amp;I Expert
                  </span>
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="sp-seccion" id="faq">
        <div className={`sp-inner ${styles.faqGrid}`}>
          <div>
            <h2 className={styles.faqTitle}>
              Preguntas frecuentes sobre nuestra clases de idiomas para empresas
            </h2>
            <p className={styles.lead}>
              Hemos recopilado las dudas más comunes de nuestros clientes para
              darte claridad desde el primer momento.
            </p>
            <div className={`sp-faq-lista ${styles.faqList}`}>
              {FAQ.map((f) => (
                <details key={f.pregunta} className="sp-faq-item" name="faq-home">
                  <summary className="sp-faq-pregunta">
                    {f.pregunta}
                    <span className="sp-faq-icono">+</span>
                  </summary>
                  <div className={`sp-faq-respuesta ${styles.faqAnswer}`}>
                    {f.respuesta.map((parrafo) => (
                      <p key={parrafo}>{parrafo}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>

          <aside className="sp-cta-card">
            <h3 className={styles.faqAsideTitle}>¿Quedan Dudas?</h3>
            <p className={styles.faqAsideText}>
              Habla con un experto y resuelve tus dudas ahora.
            </p>
            <BotonContacto className="sp-btn sp-btn--rojo">
              Hablar con un Experto
            </BotonContacto>
          </aside>
        </div>
      </section>

      {/* 11. Centro de Recursos */}
      <section className={`sp-seccion sp-seccion--ancha ${styles.resources}`}>
        <div className="sp-inner sp-inner--ancho">
          <div className={styles.resourcesHead}>
            <div className={styles.resourcesIntro}>
              <h2 className={styles.resourcesTitle}>Centro de Recursos</h2>
              <p className={styles.lead}>
                Guías y Recursos sobre Clases de Idiomas para Empresas
              </p>
            </div>
            <Link className={styles.resourcesLink} href="/blog/">
              Más Información
            </Link>
          </div>

          <ul className={styles.posts}>
            {POSTS.map((p) => (
              <li key={p.url}>
                <img
                  className="sp-post-img"
                  src={`/images/home/${p.imagen}`}
                  alt={p.alt}
                  loading="lazy"
                />
                <h3 className="sp-post-titulo">
                  <Link href={p.url}>{p.titulo}</Link>
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
