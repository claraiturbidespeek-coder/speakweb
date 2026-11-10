import type { Metadata } from "next";
import AnimacionesEntrada from "@/app/components/AnimacionesEntrada";
import BandaLogos from "@/app/components/BandaLogos";
import CentroDeRecursos from "@/app/components/CentroDeRecursos";
import BotonContacto from "@/app/components/contacto/BotonContacto";
import ProyectosVideo, { type CeldaProyecto } from "@/app/components/proyectos/ProyectosVideo";
import { TableroProgreso } from "@/app/components/SeccionEvidencia";
import SelloSTPS from "@/app/components/SelloSTPS";
// La lista de las seis páginas de idioma vive con la plantilla de equipo.
import { IDIOMAS } from "@/app/equipo/tipos";
import HeroVideo from "./HeroVideo";
import styles from "./nosotros.module.css";

/* /nosotros/: quiénes somos, contado como la historia de una gerente de RH.

   Hero de una columna, secciones sp-* y CTA final en rojo, como /diagnostico/.
   Se renderiza en el servidor: los únicos trozos de cliente son los botones de
   contacto, AnimacionesEntrada, el carrusel del Centro de Recursos y la
   rotación del tablero de Trazabilidad. Todos los botones abren el modal de
   contacto general. */

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

/* Sección de proyectos: nueve celdas, una por área del mosaico (el esquema
   está en app/components/proyectos/ProyectosVideo.module.css), en el orden de
   lectura. Las cifras son datos reales de proyectos del cliente, literales.
   Las citas son literales: la de la celda alta (D), completa; las demás,
   fragmentos del testimonio original. Cada video lleva su ID de YouTube, su
   título (el de YouTube, tal cual), un clip de preview en public/video/ y su
   portada en public/images/proyectos/. */
const CELDAS_PROYECTOS: CeldaProyecto[] = [
  {
    area: "A",
    tipo: "testimonio",
    cita: "Se adaptan a las necesidades de sus perfiles de puesto.",
    nombre: "Braskem Idesa",
    rol: "Área de RRHH",
  },
  {
    area: "B",
    tipo: "cifra",
    icono: "fabrica",
    cifra: "10 plantas",
    descriptor: "a la vez",
    cliente: "PepsiCo",
  },
  /* Video A: Kering. Clip de 6 s del segundo 66 (Rocío Barajas hablando a
     cámara); la portada es su primer fotograma. */
  {
    area: "C",
    tipo: "video",
    id: "mR5DD5LEfEU",
    titulo:
      "Mejorando el desempeño profesional a través del aprendizaje de idiomas en Kering con S-Peak",
    portada: "/images/proyectos/proyectos-kering-poster.webp",
    clip: "/video/proyectos-kering.mp4",
    /* Ancho de la portada recortada con cover, medido: 350px en móvil; en
       dos columnas la celda es alta (comparte fila con la cita larga de D) y
       la portada mide 883px a 600, 660 a 768 y 564 a 960; desde 1200px, de
       369 a 427px. */
    sizes:
      "(max-width: 599px) calc(100vw - 40px), (max-width: 767px) 884px, (max-width: 959px) 660px, (max-width: 1199px) 564px, 430px",
  },
  {
    area: "D",
    tipo: "testimonio",
    cita: "S-Peak ha sido un gran aliado para nosotros, ya que se adapta a nuestras necesidades y cuenta con un sistema robusto de seguimiento en asistencias. Valoramos también que siempre nos brinda una buena atención tanto a la empresa como a los alumnos.",
    nombre: "Anabel P.",
    rol: "Analista de Planeación y Desarrollo de RH",
  },
  {
    area: "E",
    tipo: "cifra",
    icono: "globo",
    cifra: "5 países",
    descriptor: "al mismo tiempo, en línea en vivo",
    cliente: "Bolloré Logistics",
  },
  /* F es la celda destacada (navy), sea cual sea su contenido. */
  {
    area: "F",
    tipo: "cifra",
    icono: "usuarioCheck",
    cifra: "+1,000",
    descriptor: "personas evaluadas en su nivel de idioma",
    cliente: "Grupo Modelo",
  },
  /* Video B: Covestro. Clip de 6 s del segundo 32 (Erika Cárdenas hablando
     a cámara); la portada es su primer fotograma. */
  {
    area: "G",
    tipo: "video",
    id: "a5CFZDmtNN8",
    titulo: "Eficiencia en la capacitación de idiomas de S-Peak: Covestro",
    portada: "/images/proyectos/proyectos-covestro-poster.webp",
    clip: "/video/proyectos-covestro.mp4",
    /* Medido: a lo ancho en dos columnas (92% de la ventana) y, desde
       1200px, el 45% de la ventana hasta topar en 670px. */
    sizes: "(max-width: 599px) calc(100vw - 40px), (max-width: 1199px) 92vw, min(46vw, 670px)",
  },
  {
    area: "H",
    tipo: "testimonio",
    cita: "Valoramos el seguimiento que S-Peak nos brinda, el feedback que piden a través de citas regulares y encuestas…",
    nombre: "Erika C.",
    rol: "People Development, Culture & D&I Expert",
  },
  {
    area: "I",
    tipo: "cifra",
    icono: "usuarios",
    cifra: "50",
    descriptor: "grupos presenciales simultáneos",
    cliente: "Braskem Idesa",
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
            <div className="sp-etiqueta">Quiénes somos</div>
            <h1>20 años preparando compañías para operar en varios idiomas</h1>
            <p className="sp-hero-sub">
              Trabajamos para que el idioma deje de ser una frontera dentro de las
              empresas: que quien tenga algo que decir pueda decirlo, y que ninguna
              compañía crezca menos de lo que podría por un idioma que no habla.
            </p>
            <SelloSTPS />
          </div>
          {/* Fuera de .heroInner: la caja va casi a todo lo ancho, no al del
              texto. La banda de logos se monta sobre su borde superior.
              Ruta del video y del poster cuando el equipo pase el archivo:
                video="/video/hero-nosotros.mp4"
                poster="/images/nosotros/hero-nosotros-poster.webp" */}
          <div className={styles.heroMedia}>
            <BandaLogos className={styles.logosSobreVideo} />
            <HeroVideo />
          </div>
        </section>

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

        {/* S-PEAK NACIÓ DE UNA INCONFORMIDAD: el bloque de misión, con un solo
            encabezado. La primera sub-sección conserva el fondo de la página y el
            resto el off-white de .origen. */}
        <section id="origen">
          <div className="sp-seccion">
            <div className={styles.dosColumnas}>
              <div className={`${styles.lectura} reveal`}>
                <h2>S-Peak nació de una inconformidad</h2>
                <p>
                  En 2006 lo normal era que la empresa se acomodara a su proveedor: sus
                  horarios, su sede, su temario. A nosotros nos parecía al revés. Quien
                  contrata la capacitación es quien tiene el problema que resolver;
                  quien debe acomodarse es quien cobra por resolverlo.
                </p>
                <p>
                  Por eso fuimos de los primeros en México en llevar al instructor
                  dentro de la empresa y en dar clases por videoconferencia, cuando las
                  dos cosas sonaban raras. No lo hicimos por modernos: era la única
                  forma de que el programa cupiera en la operación de nuestros
                  clientes.
                </p>
              </div>
              {/* PLACEHOLDER: aquí va la imagen definitiva de la primera
                  sub-sección. */}
              <div className={`${styles.placeholderImagen} reveal`} aria-hidden="true">
                Imagen
              </div>
            </div>
          </div>

          <div className={styles.origen}>
            <div className={`sp-seccion ${styles.origenTop}`}>
              <div className={`${styles.dosColumnas} ${styles.dosColumnasInvertido}`}>
                <div className={`${styles.lectura} reveal`}>
                  <p>
                    Veinte años después, esto es lo que seguimos encontrando cuando una
                    empresa nos llama.
                  </p>
                  <p>
                    Imagine a una gerente de Recursos Humanos. Dirección le pide que, en
                    un año, sus gerentes dirijan las juntas con la casa matriz en inglés.
                  </p>
                  <p>
                    Contrata a un proveedor y se acomoda a él: sus horarios, su sede, su
                    temario. Llegan los cierres de mes y los viajes, y las sesiones
                    perdidas no se reponen. Ella pasa las semanas persiguiendo
                    asistencias.
                  </p>
                  <p>
                    Al cerrar el año, Dirección le pregunta qué se logró. Ella solo tiene
                    listas de asistencia.
                  </p>
                  <p className={styles.remate}>
                    El problema no fue el inglés. Fue que nadie se hizo cargo del
                    programa.
                  </p>
                </div>
                {/* PLACEHOLDER: aquí va la imagen definitiva de la segunda
                    sub-sección. */}
                <div className={`${styles.placeholderImagen} reveal`} aria-hidden="true">
                  Imagen
                </div>
              </div>

              <div className={`sp-seccion-top ${styles.origenEntrada} reveal`}>
                <p>
                  Nosotros llevamos veinte años del otro lado de esa historia. Esto es lo
                  que escuchamos de Recursos Humanos, y lo que hacemos con cada cosa:
                </p>
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
          </div>
        </section>

        {/* PROYECTOS */}
        <ProyectosVideo
          id="proyectos"
          className={styles.proyectos}
          titulo="Orgullosos del trabajo que nos confían"
          bajada="Algunos de los programas más retadores que hemos operado, contados también por ellos."
          celdas={CELDAS_PROYECTOS}
        />

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

            {/* Los pasos son la lista ordenada: el contenido real. Desde 960px
                los nombres de la lista se ocultan a la vista (no al lector de
                pantalla) y encima va la escalera, un dibujo oculto para
                lectores de pantalla con la letra y el nombre de cada paso.
                Por debajo de 960px no hay escalera: la lista se ve completa. */}
            <div className={`${styles.pacto} reveal`}>
              <div className={styles.escalera} aria-hidden="true">
                {PACTO.map((p) => (
                  <div key={p.letra} className={styles.escalon}>
                    <span className={styles.escalonLetra}>{p.letra}</span>
                    <span className={styles.escalonNombre}>{p.nombre}</span>
                  </div>
                ))}
                <span className={styles.marcador} />
              </div>
              <ol className={styles.pasos}>
                {PACTO.map((p) => (
                  <li key={p.letra} className={styles.paso}>
                    <span className={styles.pasoLetra} aria-hidden="true">
                      {p.letra}
                    </span>
                    <h3 className={styles.pasoNombre}>{p.nombre}</h3>
                    <p>{p.descripcion}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Con `rotativo` el tablero no pinta su etiqueta de ejemplo: va
                aquí, encabezando la columna de texto. */}
            <div className={styles.dosColumnas}>
              <div className={`${styles.panelCierre} reveal`}>
                <p className={`sp-etiqueta-ejemplo ${styles.ejemplo}`}>
                  Ejemplo de reporte · Datos ilustrativos
                </p>
                <h3>
                  ¿Así quiere ver el avance de su equipo? Le proponemos un programa a la
                  medida.
                </h3>
                <BotonContacto className="sp-btn sp-btn--rojo">{CTA}</BotonContacto>
              </div>
              <TableroProgreso
                amplio
                rotativo
                className={styles.panel}
                titulo="Así se ve la Trazabilidad"
                etiqueta="Ejemplo de reporte de Trazabilidad de S-Peak, con datos ilustrativos"
                tablero={TABLERO}
              />
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
