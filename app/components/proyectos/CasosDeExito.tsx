import ProyectosVideo, { type CeldaProyecto, type LogoProyecto } from "./ProyectosVideo";
import styles from "./ProyectosVideo.module.css";

/* La sección de casos de éxito, completa: encabezado, fondo y la cuadrícula
   con sus nueve celdas. La comparten el home y /nosotros/, así que un cambio
   aquí (o en ProyectosVideo) se ve en las dos. ProyectosVideo es la pieza
   genérica (rejilla, tarjetas y videos); esto es su contenido.

   Los `sizes` de las portadas de video se midieron en /nosotros/; el home
   pone la sección en el mismo contenedor, así que valen igual. */

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
  /* F es la celda destacada (navy), sea cual sea su contenido. El
     testimonio de Fernanda D. es el del home (sección de casos), con su
     título y su foto. */
  {
    area: "F",
    tipo: "testimonio",
    titulo: "Claridad y contexto corporativo en cada sesión",
    cita: "S-Peak es una organización sumamente dinámica. Su capacidad para entender nuestras necesidades específicas y adaptar sus mejores recursos a nuestros objetivos de negocio es su gran diferencial.",
    nombre: "Fernanda D.",
    rol: "Alumna, Chedraui",
    foto: "/images/home/testimonio-fernanda.webp",
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
       1200px, según el corte de la fila de abajo: 38.5% de la ventana hasta
       1269px, 36.6% hasta 1319px y 34.7% desde ahí, hasta topar en 513px. */
    sizes:
      "(max-width: 599px) calc(100vw - 40px), (max-width: 1199px) 92vw, (max-width: 1269px) 39vw, (max-width: 1319px) 37vw, min(35vw, 513px)",
  },
  {
    area: "H",
    tipo: "testimonio",
    cita: "Valoramos el seguimiento que S-Peak nos brinda, el feedback que piden a través de citas regulares y encuestas, así como reaccionan a lo que pedimos como cliente. Además, los profesores están muy bien preparados para asegurar el aprendizaje, y los precios son justos.",
    nombre: "Erika C.",
    empresa: "Covestro",
    /* Circular como el de Grupo Modelo: se recortó a su mismo cuadro. */
    logo: { src: "/images/logos/covestro.webp", caja: [210, 60, 180, 180] },
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


/* `id` es el ancla de la sección. Por defecto `proyectos`, el del home y
   /nosotros/. Las páginas de equipo y de idioma la montan con `resultados`,
   el id de la sección de testimonios a la que sustituye: a él apunta
   «Casos de éxito» en el menú de anclas del modo landing (nav/secciones.ts). */
export default function CasosDeExito({ id = "proyectos" }: { id?: string }) {
  return (
    <ProyectosVideo
      id={id}
      casosExito
      className={styles.seccionCasos}
      eyebrow="Casos de Éxito"
      titulo="Orgullosos del trabajo que nos confían"
      bajada="Estos son algunos de los programas que hemos operado, contados también por quienes los vivieron."
      celdas={CELDAS_PROYECTOS}
    />
  );
}
