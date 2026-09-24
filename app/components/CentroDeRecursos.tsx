import Link from "next/link";
import { CarruselFlechas, CarruselProvider, CarruselTrack } from "@/app/components/Carrusel";
import { imagenResponsiva } from "@/lib/imagenes";

/* Compartida por las 14 páginas que la llevan: la home, las siete de
   Soluciones por Equipo y las seis landings de idioma. Con catorce páginas
   deja de ser "propia de una página": el estilo vive en patrones.css como
   vocabulario sp-recursos-*, igual que ya hace BandaLogos con sp-logos. Las imágenes siguen en /images/home/ porque ahí es donde
   viven de verdad — no se movieron al promover el componente. */

/* `ancho` y `alto` son las dimensiones intrínsecas de cada portada, para que la
   <img> reserve su sitio y el carrusel no salte al cargar.

   Van escritas aquí, y no leídas del archivo al renderizar como en el resto del
   sitio (lib/dimensiones.ts), porque este componente lo montan también las seis
   landings de idioma, que son componentes de cliente: ahí no hay `fs`. Es el
   mismo criterio que logos-clientes.ts.

   OJO: si se reexporta o se cambia una portada, hay que actualizar sus dos
   números. Una proporción vieja es peor que ninguna: el hueco reservado no
   coincidiría. */
const POSTS = [
  {
    titulo:
      "Aprender idiomas en la era del nearshoring: Las lenguas más demandadas en México",
    url: "/aprender-idiomas-nearshoring-mexico/",
    imagen: "blog-nearshoring-idiomas.webp",
    ancho: 1024,
    alto: 683,
    alt: "Ejecutivos bilingües en México planeando estrategias comerciales para aprender idiomas corporativos.",
  },
  {
    titulo:
      "Capacitación de personal: cómo diseñar un programa de idiomas que sí completen",
    url: "/capacitacion-personal-programa-idiomas/",
    imagen: "blog-capacitacion-personal.webp",
    ancho: 1024,
    alto: 683,
    alt: "Capacitación de personal corporativo participando activamente en un taller de idiomas dinámico.",
  },
  {
    titulo:
      "Inglés para ejecutivos: 6 situaciones clave donde urge una evaluación de inglés",
    url: "/evaluacion-de-ingles-ejecutivos/",
    imagen: "blog-evaluacion-ingles.webp",
    ancho: 1024,
    alto: 549,
    alt: "Evaluación de inglés corporativa para ejecutivos y directores en una junta de negocios.",
  },
  {
    titulo:
      "Por qué el 70% de los programas de capacitación en idiomas fracasan antes de los 6 meses",
    url: "/negocios-en-ingles-porque-fracasan-cursos/",
    imagen: "blog-negocios-en-ingles.webp",
    ancho: 700,
    alto: 369,
    alt: "Grupo de profesionales en una oficina moderna colaborando y preparándose para hacer negocios en inglés con éxito.",
  },
  {
    titulo: "Inglés para empresas: ¿Qué nivel necesita cada área de su organización?",
    url: "/blog-nivel-ingles-empresas-areas/",
    // Excepción al resto de la lista: no hay copia propia en /images/home/
    // para esta nota (antes apuntaba a otra, ya retirada), así que usa
    // directamente la imagen destacada real del artículo.
    imagen: "/images/blog/blog-nivel-ingles-empresas-areas-portada.webp",
    ancho: 1600,
    alto: 1068,
    alt: "Dos mujeres frente a un pizarrón blanco comparando ortografía de inglés británico y americano en una clase de idiomas.",
  },
  {
    titulo:
      "¿Alemán, francés o inglés? Cómo identificar qué idiomas para empresas necesita su equipo",
    url: "/mejores-idiomas-para-empresas/",
    imagen: "blog-idiomas-para-empresas.webp",
    ancho: 1024,
    alto: 683,
    alt: "Dos ejecutivos corporativos analizando la estrategia de idiomas para empresas frente a un mapa mundial.",
  },
  {
    titulo:
      "De cero a bilingüe: Cómo estructurar una capacitación en inglés que su equipo no abandone",
    url: "/como-implementar-capacitacion-en-ingles-empresas/",
    imagen: "blog-capacitacion-en-ingles.webp",
    ancho: 1024,
    alto: 683,
    alt: "Capacitación en inglés empresarial para equipos de trabajo en una mesa de negociación con banderas internacionales.",
  },
  {
    titulo: "5 errores de comunicación en su primer año de Nearshoring",
    url: "/errores-comunicacion-nearshoring-en-mexico/",
    imagen: "blog-errores-nearshoring.webp",
    ancho: 1024,
    alto: 683,
    alt: "Directivo analizando mapas de comercio global y estrategias de nearshoring en mexico usando una tableta en su oficina.",
  },
];

export default function CentroDeRecursos({ className }: { className?: string }) {
  return (
    <section
      className={`sp-seccion sp-seccion--ancha sp-recursos${className ? ` ${className}` : ""}`}
    >
      <div className="sp-inner sp-inner--ancho">
        <CarruselProvider>
          <div className="sp-recursos-head">
            <div className="sp-recursos-intro">
              <h2 className="sp-recursos-titulo">Centro de Recursos</h2>
              <p className="sp-recursos-lead">
                Guías y Recursos sobre Capacitación en Idiomas para Empresas
              </p>
            </div>
            <div className="sp-recursos-acciones">
              <Link className="sp-recursos-link" href="/blog/">
                Centro de Recursos
              </Link>
              <CarruselFlechas />
            </div>
          </div>

          <CarruselTrack etiqueta="Artículos del blog" className="sp-recursos-track">
            {POSTS.map((p) => (
              <article
                key={p.url}
                className="sp-recursos-tarjeta sp-post-card"
              >
                <img
                  className="sp-post-img"
                  {...imagenResponsiva(
                    p.imagen.startsWith("/") ? p.imagen : `/images/home/${p.imagen}`,
                    "(max-width: 960px) 270px, (max-width: 1440px) 17vw, 18vw",
                    5 / 4,
                  )}
                  alt={p.alt}
                  width={p.ancho}
                  height={p.alto}
                  loading="lazy"
                />
                <h3 className="sp-post-titulo">
                  <Link href={p.url}>{p.titulo}</Link>
                </h3>
              </article>
            ))}
          </CarruselTrack>
        </CarruselProvider>
      </div>
    </section>
  );
}
