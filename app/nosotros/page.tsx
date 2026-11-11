import type { Metadata } from "next";
import type { CSSProperties } from "react";
import AnimacionesEntrada from "@/app/components/AnimacionesEntrada";
import BandaLogos from "@/app/components/BandaLogos";
import CentroDeRecursos from "@/app/components/CentroDeRecursos";
import BotonContacto from "@/app/components/contacto/BotonContacto";
import ProyectosVideo, {
  type CeldaProyecto,
  type LogoProyecto,
} from "@/app/components/proyectos/ProyectosVideo";
import { TableroProgreso } from "@/app/components/SeccionEvidencia";
import SelloSTPS from "@/app/components/SelloSTPS";
// La lista de las seis páginas de idioma vive con la plantilla de equipo.
import { IDIOMAS } from "@/app/equipo/tipos";
import Icono from "@/app/components/Icono";
import { imagenResponsiva } from "@/lib/imagenes";
import HeroVideo from "./HeroVideo";
import LineaDesplazable from "./LineaDesplazable";
import styles from "./nosotros.module.css";

/* /nosotros/: quiénes somos, contado como la historia de una gerente de RH.

   Hero de una columna, secciones sp-* y CTA final en rojo, como /diagnostico/.
   Se renderiza en el servidor: los únicos trozos de cliente son los botones de
   contacto, AnimacionesEntrada, el carrusel del Centro de Recursos, las
   flechas de la línea de tiempo (LineaDesplazable) y la rotación del tablero
   de Trazabilidad. Todos los botones abren el modal de
   contacto general. */

const URL = "https://s-peak.com/nosotros/";
const TITULO = "S-Peak, capacitación en idiomas para empresas desde 2006";
const DESCRIPCION =
  "Capacitación en idiomas para empresas desde 2006: registro STPS, constancia DC-3 y metodología PACTO con reportes mensuales. Presencial, en línea o híbrida.";

/* Página pública: indexable, en el sitemap (app/sitemap.ts), en el menú del
   header (ENLACES_SUELTOS de app/components/nav/secciones.ts) y en la columna
   Recursos del footer. */
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
        alt: "S-Peak, capacitación en idiomas para empresas desde 2006",
      },
    ],
  },
};

const CTA = "Solicite una Cotización";

/* Oculto mientras tanto: el párrafo que las presenta («Nosotros llevamos
   veinte años del otro lado de esa historia…»), la franja navy «Busco un
   proveedor confiable…» y las seis tarjetas de objeciones (DOLORES) del final
   de #origen. Para que vuelvan
   a verse, ponerlo en true: el código, los datos y los estilos siguen en su
   sitio, y el bloque de arriba recupera su separación corta (.origenTop). */
/* Ancho en que se pinta la imagen de las dos fotos del bloque de misión
   (#origen), no el de su caja: son 16:9 recortadas con object-fit: cover, así
   que la imagen siempre es más ancha que la caja. Medido en el navegador:
   - Por debajo de 960px, caja 4:3 a una columna (350px a 390, 693 a 768,
     tope de 760): la imagen mide 4/3 de la caja (468px a 390, 924 a 768).
   - Desde 960px la caja se estira al alto de su columna de texto, así que el
     ancho depende del texto y no del viewport: entre 740 y 923px en todo el
     rango medido (836/923 a 960, 755/847 a 1100, 740/876 a 1280, 837 a 1440,
     870 a 1920). Se declara el tope redondeado. */
const SIZES_MISION = "(max-width: 959px) calc(min(92vw, 760px) * 4 / 3), 900px";

const MOSTRAR_OBJECIONES = false;

/* Oculta mientras tanto: la sección «Si algo se complica, se lo avisamos
   primero» (#aviso), entre la metodología y los valores. Para que vuelva a
   verse, ponerlo en true: el código y los estilos siguen en su sitio. */
const MOSTRAR_AVISO = false;

/* Oculto mientras tanto: el bloque del tablero de Trazabilidad al final de
   #metodologia (la columna de texto con la etiqueta de ejemplo, el h3 y su
   botón, y el panel rotativo). Para que vuelva a verse, ponerlo en true: el
   código, los datos (TABLERO) y los estilos siguen en su sitio, y la escalera
   recupera su margen de abajo (.pactoSinTablero deja de aplicarse). */
const MOSTRAR_TABLERO = false;

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
/* Braskem Idesa sale dos veces: en el testimonio de A y en la cifra de I. Las
   cajas de los logos son la marca dentro de su lienzo de 600×300 (ver
   LogoProyecto en ProyectosVideo.tsx). */
/* Su marca es muy alargada: a la escala común quedaba de 16px de alto frente a
   los 25 a 34 de las demás. Con 1.35 queda de unos 22px, al peso de PepsiCo. */
const LOGO_BRASKEM: LogoProyecto = {
  src: "/images/logos/braskem.webp",
  caja: [80, 107, 439, 86],
  escala: 1.35,
};

const CELDAS_PROYECTOS: CeldaProyecto[] = [
  {
    area: "A",
    tipo: "testimonio",
    cita: "Se adaptan a las necesidades de nuestros perfiles de puesto.",
    nombre: "Braskem Idesa",
    logo: LOGO_BRASKEM,
    rol: "Área de RRHH",
  },
  {
    area: "B",
    tipo: "cifra",
    icono: "fabrica",
    cifra: "9 plantas",
    descriptor: "a la vez",
    cliente: "PepsiCo",
    logo: { src: "/images/logos/pepsico.webp", caja: [82, 84, 435, 133] },
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
    logo: { src: "/images/logos/bollore.webp", caja: [81, 60, 438, 180] },
  },
  /* F es la celda destacada (navy), sea cual sea su contenido. */
  {
    area: "F",
    tipo: "cifra",
    icono: "usuarioCheck",
    cifra: "+1,000",
    descriptor: "personas evaluadas en su nivel de idioma",
    cliente: "Grupo Modelo",
    /* La celda F es navy: este logo se lee sobre oscuro por su disco dorado. */
    logo: { src: "/images/logos/grupo-modelo.webp", caja: [210, 60, 180, 180] },
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
    logo: LOGO_BRASKEM,
  },
];

/* Los cinco pasos de la metodología, en orden: cada uno es un escalón más
   alto que el anterior. */
const PACTO = [
  {
    letra: "P",
    nombre: "Planificación",
    descripcion:
      "Medimos el nivel de cada colaborador y acordamos con usted qué necesita poder hacer en el idioma dentro de su puesto.",
  },
  {
    letra: "A",
    nombre: "Arranque",
    descripcion:
      "Reunimos al grupo para acordar el calendario, las reglas del programa y la meta de cada persona.",
  },
  {
    letra: "C",
    nombre: "Competencias",
    descripcion:
      "Avanzamos por etapas de 26 horas. Cada una trabaja una situación del puesto con práctica real: juntas, correos y presentaciones.",
  },
  {
    letra: "T",
    nombre: "Trazabilidad",
    descripcion:
      "Le entregamos reportes por mes, trimestre y año, y por nivel. Evaluamos con rúbrica la evidencia de cada persona. Cada etapa cierra con su Tarjeta de Resultados y la constancia DC-3.",
  },
  {
    letra: "O",
    nombre: "Optimización",
    descripcion:
      "Con esos resultados, decidimos con usted la siguiente etapa y ajustamos el programa.",
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

/* La línea de tiempo de Nuestra Historia (#historia), en orden cronológico.
   La posición la da el orden: los hitos alternan arriba y abajo del eje, el
   primero arriba. La categoría solo cambia el color de la tarjeta: `cliente`,
   las primeras veces con un cliente, en rojo; `propio`, lo que construimos,
   en navy. */
const HITOS: {
  anio: string;
  categoria: "cliente" | "propio";
  icono: string;
  texto: string;
}[] = [
  { anio: "2006", categoria: "propio", icono: "bandera", texto: "30 de junio: empezamos a operar" },
  {
    anio: "2009",
    categoria: "propio",
    icono: "baseDatos",
    texto: "Nuestro primer sistema de información",
  },
  {
    anio: "2010",
    categoria: "cliente",
    icono: "pinesMapa",
    texto: "Un mismo cliente con clases presenciales a la vez en CDMX y Monterrey",
  },
  {
    anio: "2012",
    categoria: "cliente",
    icono: "video",
    texto: "Primera clase por videoconferencia (Cisco Webex)",
  },
  {
    anio: "2013",
    categoria: "cliente",
    icono: "portapapelesCheck",
    texto: "Evaluación automática de más de 1,000 personas",
  },
  {
    anio: "2013",
    categoria: "cliente",
    icono: "globo",
    texto: "Clases por videoconferencia en varios países",
  },
  { anio: "2017", categoria: "propio", icono: "baseDatos", texto: "Segundo sistema de información" },
  {
    anio: "2018",
    categoria: "cliente",
    icono: "fabrica",
    texto: "Clases presenciales en 9 sedes a la vez",
  },
  { anio: "2019", categoria: "cliente", icono: "usuarios", texto: "50 grupos presenciales a la vez" },
  { anio: "2019", categoria: "propio", icono: "movil", texto: "App móvil para profesores" },
  { anio: "2026", categoria: "propio", icono: "baseDatos", texto: "Tercer sistema de información" },
];

/* Las marcas de año del eje horizontal: una por año. Los hitos seguidos del
   mismo año (2013 y 2019) comparten marca, a medio camino entre los dos. */
const ANIOS_EJE = HITOS.reduce<{ anio: string; primero: number; ultimo: number }[]>(
  (marcas, hito, i) => {
    const ultima = marcas[marcas.length - 1];
    if (ultima && ultima.anio === hito.anio) ultima.ultimo = i;
    else marcas.push({ anio: hito.anio, primero: i, ultimo: i });
    return marcas;
  },
  []
);

/* Los valores (#valores): icono, título y párrafo de cada tarjeta. Los
   iconos son del registro de Icono.tsx y no repiten ninguno de la página. */
const VALORES = [
  {
    icono: "tendencia",
    titulo: "Le mostramos cómo va",
    texto:
      "Usted ve en datos cómo avanza cada grupo y qué conviene ajustar para que su equipo le saque más provecho al programa.",
  },
  {
    icono: "escudo",
    titulo: "Nos hacemos cargo del programa",
    texto:
      "No entregamos clases y desaparecemos. Alguien de nuestro equipo responde por su programa, le da seguimiento cada mes y le dice qué hace falta para que el avance se sostenga.",
  },
  {
    icono: "reloj",
    titulo: "Nos adaptamos a su operación",
    texto:
      "Los turnos cambian, la gente viaja y los proyectos se atraviesan. El programa se reacomoda a esos cambios para que su equipo no tenga que elegir entre trabajar y aprender.",
  },
  {
    icono: "mensaje",
    titulo: "Hablamos claro",
    texto:
      "Si un grupo se está quedando atrás o una sede dejó de avanzar, se lo decimos antes de que usted lo descubra en el reporte, aunque la conversación no sea cómoda.",
  },
];

/* Los tres del Centro de Recursos, por su url en CentroDeRecursos.tsx. */
const ARTICULOS = [
  "/blog-capacitacion-en-ingles-programa-fantasma/",
  "/blog-nivel-ingles-empresas-areas/",
  "/capacitacion-personal-programa-idiomas/",
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
      <main className={styles.pagina}>
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
              empresas: que quien tenga algo que aportar no se quede callado, y que
              ninguna empresa crezca menos de lo que podría por un idioma que no
              habla.
            </p>
            <SelloSTPS />
          </div>
          {/* Fuera de .heroInner: la caja va casi a todo lo ancho, no al del
              texto. La banda de logos se monta sobre su borde inferior. */}
          <div className={styles.heroMedia}>
            <HeroVideo
              video="/video/hero-nosotros.mp4"
              poster="/images/nosotros/hero-nosotros-poster.webp"
            />
            <BandaLogos className={styles.logosSobreVideo} />
          </div>
        </section>

        {/* PRESENTACIÓN E IDIOMAS */}
        <section className={`sp-seccion ${styles.presentacion}`} id="presentacion">
          <div className={`${styles.presentacionInner} reveal`}>
            <h2 className={styles.presentacionLinea}>
              Desde 2006 capacitamos en seis idiomas
              <br className={styles.corte} /> a equipos de empresas en México
            </h2>
            <p className={styles.modalidades}>
              <strong>Presencial</strong>, <strong>en línea en vivo</strong> o{" "}
              <strong>híbrida</strong>, en una o varias sedes en cualquier parte de
              México.
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
          </div>
        </section>

        {/* S-PEAK NACIÓ DE UNA INCONFORMIDAD: el bloque de misión, con un solo
            encabezado. La primera sub-sección conserva el fondo de la página y el
            resto el off-white de .origen. */}
        <section id="origen">
          <div className="sp-seccion">
            <div className={styles.dosColumnas}>
              <div className={`${styles.lectura} reveal`}>
                <div className="sp-eyebrow">Nuestro Origen</div>
                <h2>En S-Peak nacimos de una inconformidad</h2>
                <p>
                  En 2006, lo normal era que la empresa se acomodara a su proveedor: sus
                  horarios, su sede, su temario. A nosotros nos parecía al revés: quien
                  contrata la capacitación tiene un problema que resolver, y es el
                  proveedor quien debe acomodarse a él.
                </p>
                <p>
                  Por eso fuimos de los primeros en México en llevar al instructor dentro
                  de la empresa y en dar clases por videoconferencia, cuando ninguna de
                  las dos era común. No lo hicimos por modernos: era la forma de que el
                  programa cupiera en la operación de nuestros clientes.
                </p>
              </div>
              <img
                className={`${styles.fotoMision} ${styles.fotoInstructor} reveal`}
                {...imagenResponsiva("/images/nosotros/nosotros-uno.webp", SIZES_MISION)}
                alt="Un instructor explica frente a un rotafolio a un grupo de colaboradores sentados alrededor de una mesa con laptops y cuadernos"
                width="2048"
                height="1152"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className={styles.origen}>
            {/* Con las objeciones ocultas, el bloque cierra con el relleno normal
                de sección: no hay franja que lo siga dentro del off-white. */}
            <div
              className={`sp-seccion${MOSTRAR_OBJECIONES ? ` ${styles.origenTop}` : ""}`}
            >
              <div className={`${styles.dosColumnas} ${styles.dosColumnasInvertido}`}>
                <div className={`${styles.lectura} reveal`}>
                  <h3>
                    Más de veinte años después, esto es lo que seguimos encontrando cuando
                    una empresa nos llama
                  </h3>
                  <p>
                    Imagine a una gerente de Recursos Humanos. Dirección le pide que, en
                    un año, los gerentes de la empresa dirijan en inglés las juntas con la
                    casa matriz.
                  </p>
                  <p>
                    Contrata a un proveedor y es ella quien se ajusta: a sus horarios, su
                    sede, su temario. Llegan los cierres de mes y los viajes, y las
                    sesiones perdidas no se reponen. Ella pasa las semanas persiguiendo
                    asistencias.
                  </p>
                  <p>
                    Al cerrar el año, Dirección le pregunta qué se logró. Ella solo tiene
                    listas de asistencia.
                  </p>
                  <p className={styles.remate}>
                    El problema no fue el idioma. Fue que nadie se hizo cargo del
                    programa.
                  </p>
                </div>
                <img
                  className={`${styles.fotoMision} ${styles.fotoGerente} reveal`}
                  {...imagenResponsiva("/images/nosotros/nosotros-dos.webp", SIZES_MISION)}
                  alt="Una gerente, con la mano en la frente, revisa en su escritorio una pila de listas de asistencia junto a su laptop"
                  width="2048"
                  height="1152"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* La entrada a las objeciones: se oculta con ellas. */}
              {MOSTRAR_OBJECIONES ? (
                <div className={`sp-seccion-top ${styles.origenEntrada} reveal`}>
                  <p>
                    Nosotros llevamos veinte años del otro lado de esa historia. Esto es
                    lo que escuchamos de Recursos Humanos, y lo que hacemos con cada cosa:
                  </p>
                </div>
              ) : null}
            </div>

            {MOSTRAR_OBJECIONES ? (
              <>
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
              </>
            ) : null}
          </div>
        </section>

        {/* PROYECTOS */}
        <ProyectosVideo
          id="proyectos"
          className={styles.proyectos}
          eyebrow="Casos de Éxito"
          titulo="Orgullosos del trabajo que nos confían"
          bajada="Estos son algunos de los programas que hemos operado, contados también por quienes los vivieron."
          celdas={CELDAS_PROYECTOS}
        />

        {/* METODOLOGÍA PACTO */}
        <section className="sp-seccion" id="metodologia">
          <div className="sp-inner">
            <div className="sp-seccion-top reveal">
              <div className={`sp-eyebrow ${styles.eyebrowCentrado}`}>Nuestra Metodología</div>
              <h2>Cómo trabajamos: la metodología PACTO</h2>
              <p>
                PACTO son cinco pasos para que su inversión se vea en el puesto, no
                solo en la lista de asistencia.
              </p>
            </div>

            {/* Los pasos son la lista ordenada: el contenido real. Desde 960px
                cada paso es una columna con su peldaño (un dibujo oculto para
                lectores de pantalla, con solo la letra), su nombre y su
                párrafo, y cada columna sube un escalón más que la anterior.
                El isotipo que brinca va fuera de la lista, sobre las columnas. Por debajo
                de 960px no hay peldaños: la lista lleva la letra al lado. */}
            {/* Sin el tablero, la escalera cierra la sección: sin margen de
                abajo, para que solo quede el relleno de la sección. */}
            <div
              className={`${styles.pacto}${MOSTRAR_TABLERO ? "" : ` ${styles.pactoSinTablero}`} reveal`}
            >
              <ol className={styles.pasos}>
                {PACTO.map((p) => (
                  <li key={p.letra} className={styles.paso}>
                    <div className={styles.escalon} aria-hidden="true">
                      {p.letra}
                    </div>
                    <span className={styles.pasoLetra} aria-hidden="true">
                      {p.letra}
                    </span>
                    <h3 className={styles.pasoNombre}>{p.nombre}</h3>
                    <p>{p.descripcion}</p>
                  </li>
                ))}
              </ol>
              <span className={styles.marcador} aria-hidden="true">
                <span className={styles.bolita}>
                  <img
                    className={styles.isotipo}
                    src="/images/isotype.svg"
                    alt=""
                    width="1587"
                    height="907"
                  />
                </span>
              </span>
            </div>

            {/* Con `rotativo` el tablero no pinta su etiqueta de ejemplo: va
                aquí, encabezando la columna de texto. */}
            {MOSTRAR_TABLERO ? (
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
            ) : null}
          </div>
        </section>

        {/* SI ALGO SE COMPLICA */}
        {MOSTRAR_AVISO ? (
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
        ) : null}

        {/* NUESTRA HISTORIA: línea de tiempo. Desde 960px es horizontal: una
            rejilla de N + 1 columnas (N hitos) con tres filas, el carril de
            arriba, el eje con los años y el carril de abajo. El hito i ocupa
            las columnas i + 1 e i + 2, así que su centro cae en un punto del
            eje y los hitos de un mismo carril quedan pegados con solo el hueco
            de la rejilla entre ellos. Se ven como mucho seis hitos a la vez;
            el resto se desplaza en lateral, solo y con las flechas de
            LineaDesplazable. Por debajo de 960px es vertical: una columna con
            el eje a la izquierda.

            Se construye al entrar en pantalla con la misma clase .visible de
            .reveal (AnimacionesEntrada): avanza el eje y cada hito aparece
            cuando el eje llega a él. Una sola vez. */}
        <section className={`sp-seccion ${styles.historia}`} id="historia">
          <div className="sp-inner">
            <div className="sp-seccion-top reveal">
              <div className={`sp-eyebrow ${styles.eyebrowCentrado}`}>Nuestra Historia</div>
              <h2>Lo que hemos ido construyendo</h2>
            </div>

            <ul className={`${styles.historiaLeyenda} reveal`}>
              <li className={styles.leyendaCliente}>Primeras veces con un cliente</li>
              <li className={styles.leyendaPropio}>Lo que construimos</li>
            </ul>
          </div>

          <div className="sp-inner">
            <LineaDesplazable
              className={styles.historiaPista}
              claseNav={styles.historiaNav}
              etiqueta="Línea de tiempo de S-Peak, de 2006 a 2026"
            >
              <div
                className={`${styles.historiaLinea} reveal`}
                style={{ "--hitos": HITOS.length, "--columnas": HITOS.length + 1 } as CSSProperties}
              >
                <div className={styles.eje} data-eje aria-hidden="true" />
                {ANIOS_EJE.map((m) => (
                  <span
                    key={m.anio}
                    className={styles.ejeAnio}
                    aria-hidden="true"
                    style={
                      {
                        gridColumn: `${m.primero + 1} / ${m.ultimo + 3}`,
                        "--i": (m.primero + m.ultimo) / 2,
                      } as CSSProperties
                    }
                  >
                    {m.anio}
                  </span>
                ))}
                {/* role="list": con display: contents algunos lectores de
                    pantalla dejan de anunciar la lista. */}
                <ol className={styles.hitos} role="list">
                  {HITOS.map((h, i) => (
                    <li
                      key={`${h.anio}-${i}`}
                      className={`${styles.hito} ${i % 2 === 0 ? styles.hitoArriba : styles.hitoAbajo} ${
                        h.categoria === "cliente" ? styles.hitoCliente : styles.hitoPropio
                      }`}
                      style={{ gridColumn: `${i + 1} / span 2`, "--i": i } as CSSProperties}
                    >
                      <div className={styles.hitoCabeza}>
                        <span
                        className={`sp-icono sp-icono--sm ${
                          h.categoria === "cliente" ? "sp-icono--rojo" : "sp-icono--navy"
                        }`}
                      >
                          <Icono nombre={h.icono} />
                        </span>
                        <span className={styles.hitoAnio}>{h.anio}</span>
                      </div>
                      <p>{h.texto}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </LineaDesplazable>
          </div>
        </section>

        {/* VALORES: fondo navy a todo lo ancho, encabezado centrado y cuatro
            tarjetas en el contenedor de la página. */}
        <section className={`sp-seccion ${styles.valores}`} id="valores">
          <div className="sp-inner">
            <div className={`sp-seccion-top ${styles.valoresTop} reveal`}>
              <div className={`sp-eyebrow ${styles.valoresEyebrow}`}>Nuestros Valores</div>
              <h2>En qué creemos</h2>
            </div>
            <ul className={`${styles.valoresLista} reveal stagger`}>
              {VALORES.map((v) => (
                <li key={v.titulo} className={styles.valor}>
                  <span className="sp-icono sp-icono--md sp-icono--claro">
                    <Icono nombre={v.icono} />
                  </span>
                  <h3>{v.titulo}</h3>
                  <p>{v.texto}</p>
                </li>
              ))}
            </ul>
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
            <h2>Ahora imagine a esa misma gerente, con nosotros</h2>
            <p>
              Esta vez el proveedor trabaja para ella. Al cerrar el año no llega a
              Dirección con listas de asistencia: llega con el avance de cada gerente en
              la escala del Marco Común Europeo y su Tarjeta de Resultados.
            </p>
            <BotonContacto className="sp-btn sp-btn--blanco">{CTA}</BotonContacto>
          </div>
        </section>

        {/* CENTRO DE RECURSOS: aquí sigue a la franja roja del cierre, no a una
            sección blanca, y necesita su propio aire arriba. */}
        <CentroDeRecursos articulos={ARTICULOS} className={styles.recursosTrasCierre} />
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
