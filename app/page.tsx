import type { Metadata } from "next";
import Link from "next/link";
import BandaLogos from "@/app/components/BandaLogos";
import CentroDeRecursos from "@/app/components/CentroDeRecursos";
import BotonContacto from "@/app/components/contacto/BotonContacto";
import Icono from "@/app/components/Icono";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Cursos de Idiomas para Empresas | ROI y Resultados - S-Peak",
  description:
    "Transforme el dominio de idiomas en métricas de negocio. Capacitación para empresas con evidencias de desempeño y reportes para RRHH.",
};

const IDIOMAS = [
  "🇬🇧 Inglés",
  "🇫🇷 Francés",
  "🇩🇪 Alemán",
  "🇵🇹 Portugués",
  "🇮🇹 Italiano",
  "🇪🇸 Español",
];

const FEATURES = [
  { texto: "Evidencias Demostrables", icono: "usuarioCheck" },
  { texto: "Métricas de Asistencia", icono: "reloj" },
  { texto: "Reportes de Desempeño", icono: "graficoArea" },
];

const DIFERENCIADORES = [
  {
    titulo: "Expansión Global y comunicación estratégica",
    texto:
      "Prepare a sus líderes para negociar, vender y operar en cualquier parte del mundo. Eliminamos las barreras de comunicación para que su empresa pueda cerrar tratos con clientes y socios globales sin fricciones.",
    imagen: "diferenciador-expansion-global.webp",
    alt: "Equipo directivo revisando una estrategia comercial en una oficina",
  },
  {
    titulo: "Retención de Talento mediante planes de carrera",
    texto:
      "El desarrollo profesional es el beneficio más valorado hoy en día. Ofrezca un programa de idiomas de alto nivel que aumente el sentido de pertenencia, fortalezca el liderazgo de su equipo y reduzca la rotación de personal.",
    imagen: "diferenciador-retencion-talento.webp",
    alt: "Colaboradores aprendiendo un nuevo idioma en su lugar de trabajo",
  },
  {
    titulo: "Agilidad Operativa y fluidez empresarial",
    texto:
      "Evite retrasos causados por malentendidos al dotar a su equipo de la fluidez que su industria exige, optimiza tiempos de respuesta, agiliza procesos internos y elimina los cuellos de botella en la comunicación diaria.",
    imagen: "diferenciador-agilidad-operativa.webp",
    alt: "Sesión de formación intercultural con empleados de mercados internacionales",
  },
];

/* Tres columnas con reparto 3/2/2. El original repartía 3/3/2 con ocho áreas;
   Recursos Humanos salió de Soluciones por Equipo —no es un área que aprenda
   idiomas, es quien compra el programa— y las siete restantes se reequilibran
   para que ninguna columna quede coja. */
const MOSAICO = [
  [
    {
      nombre: "Ventas y Marketing",
      ruta: "/equipo/ventas-y-marketing/",
      imagen: "area-ventas-y-marketing.webp",
    },
    {
      nombre: "Atención a Clientes",
      ruta: "/equipo/atencion-a-clientes/",
      imagen: "area-atencion-a-clientes.webp",
    },
    {
      nombre: "Directivos",
      ruta: "/equipo/directivos/",
      imagen: "area-directivos.webp",
    },
  ],
  [
    {
      nombre: "Finanzas y Contabilidad",
      ruta: "/equipo/finanzas-y-contabilidad/",
      imagen: "area-finanzas-y-contabilidad.webp",
    },
    {
      nombre: "Legal y Jurídico",
      ruta: "/equipo/legal-y-juridico/",
      imagen: "area-legal-y-juridico.webp",
    },
  ],
  [
    {
      nombre: "Operaciones y Logística",
      ruta: "/equipo/operaciones-y-logistica/",
      imagen: "area-operaciones-y-logistica.webp",
    },
    {
      nombre: "Tecnología e Ingeniería",
      ruta: "/equipo/tecnologia-e-ingenieria/",
      imagen: "area-tecnologia-e-ingenieria.webp",
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
      "Tenemos una política clara de seguimiento proactivo. Si un colaborador falta, nuestro equipo de coordinación lo detecta de inmediato y lo reportamos a RH en tiempo real. No dejamos que el programa se pierda por falta de uso; buscamos recuperar al colaborador o ajustar el grupo para que su inversión no se desperdicie.",
    ],
  },
  {
    pregunta: "¿Qué idiomas tienen disponibles?",
    respuesta: [
      "Contamos con programas de Inglés, Francés, Alemán, Italiano, Portugués y Español para extranjeros. Nos enfocamos en los idiomas que su empresa necesita para conectar con el mundo.",
    ],
  },
  {
    pregunta:
      "¿S-Peak está registrado y tiene constancia ante la Secretaría del Trabajo y Previsión Social (STPS)?",
    respuesta: [
      "Sí, el programa S-Peak cuenta con registro oficial ante la Secretaría del Trabajo y Previsión Social (STPS). Actualmente, S-Peak puede emitir una constancia de que lo capacitamos para el aprendizaje de un idioma.",
    ],
  },
  {
    pregunta: "¿Pueden manejar proyectos masivos en varios países?",
    respuesta: [
      "Sí. Estamos especializados en gestionar proyectos complejos y de gran escala para multinacionales.",
      "Alcance: Gracias a nuestra operación, eliminamos las barreras geográficas. Podemos capacitar a sus equipos en México y en cualquier otra filial de Latinoamérica o el mundo de forma simultánea.",
      "Gestión Centralizada: Aunque el proyecto sea masivo, usted mantiene el control desde un solo punto. Nosotros nos encargamos de la logística y el seguimiento de cada grupo, sin importar el país donde se encuentren.",
      "Uniformidad: Garantizamos que todos los colaboradores, sin importar su ubicación, reciban el mismo estándar de calidad y evaluación bajo nuestra metodología, entregándole resultados consolidados de toda su operación regional.",
    ],
  },
  {
    pregunta:
      "¿Cuál es el retorno de inversión (ROI) de capacitar en idiomas con S-Peak?",
    respuesta: [
      "El ROI de S-Peak se mide en eficiencia y ahorro operativo. Al entrenar a su equipo en tareas específicas, reducimos el tiempo perdido por errores de comunicación y el costo de retrabajo, permitiéndoles enfocarse en lo estratégico mientras nosotros garantizamos que el presupuesto se convierta en capacidades reales.",
    ],
  },
  {
    pregunta: "¿Cómo garantizan que los colaboradores realmente aprendan?",
    respuesta: [
      "Cambiamos los exámenes por evidencias de desempeño. En S-Peak, el colaborador no solo memoriza reglas, sino que debe producir algo real (como una presentación o una negociación) que se califica con una rúbrica profesional. Al final, le entregamos una Tarjeta de Resultados con pruebas del avance.",
    ],
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero nuevo — en construcción */}
      <section className={`sp-seccion ${styles.heroNuevo}`}>
        <div className={`sp-inner ${styles.heroNuevoInner}`}>
          <div className={styles.heroNuevoText}>
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

          <div className={styles.heroNuevoMedia}>
            <video
              className={styles.heroNuevoVideo}
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
      <BandaLogos />

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
            src="/images/home/programa-metricas.webp"
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
              {FEATURES.map((f) => (
                <li key={f.texto}>
                  <span className="sp-icono sp-icono--sm">
                    <Icono nombre={f.icono} />
                  </span>
                  {f.texto}
                </li>
              ))}
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
            <span className={styles.counterLabel}>Profesionales formados</span>
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
            <BotonContacto className={`sp-btn sp-btn--rojo ${styles.areasCta}`}>
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
            Solicite una Cotización
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
              backgroundImage: `url("/images/home/caso-brechas-linguisticas.webp")`,
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
                  src="/images/home/testimonio-braskem.webp"
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
                  src="/images/home/testimonio-fernanda.webp"
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
                  src="/images/home/testimonio-anabel.webp"
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
              backgroundImage: `url("/images/home/caso-seguimiento-calidad.webp")`,
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
                  src="/images/home/testimonio-erika.webp"
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
              Hable con un experto y resuelva sus dudas ahora.
            </p>
            <BotonContacto className="sp-btn sp-btn--rojo">
              Hablar con un Experto
            </BotonContacto>
          </aside>
        </div>
      </section>

      {/* 11. Centro de Recursos */}
      <CentroDeRecursos className={styles.recursosCompacto} />
    </main>
  );
}
