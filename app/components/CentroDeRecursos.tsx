import Link from "next/link";
import { CarruselFlechas, CarruselProvider, CarruselTrack } from "@/app/components/Carrusel";

/* Compartida por la home y las siete páginas de Soluciones por Equipo. Con
   ocho páginas deja de ser "propia de una página": el estilo vive en
   patrones.css como vocabulario sp-recursos-*, igual que ya hace BandaLogos
   con sp-logos. Las imágenes siguen en /images/home/ porque ahí es donde
   viven de verdad — no se movieron al promover el componente. */

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
    imagen: "blog-evaluacion-ingles.webp",
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
    imagen: "blog-ingles-de-negocios.webp",
    alt: "Ejecutiva participando en una videollamada internacional y aplicando su inglés de negocios con un equipo de trabajo.",
  },
  {
    titulo:
      "¿Alemán, francés o inglés? Cómo identificar qué idiomas para empresas necesita su equipo",
    url: "/mejores-idiomas-para-empresas/",
    imagen: "blog-idiomas-para-empresas.webp",
    alt: "os ejecutivos corporativos analizando la estrategia de idiomas para empresas frente a un mapa mundial.",
  },
  {
    titulo:
      "De cero a bilingüe: Cómo estructurar una capacitación en inglés que su equipo no abandone",
    url: "/como-implementar-capacitacion-en-ingles-empresas/",
    imagen: "blog-capacitacion-en-ingles.webp",
    alt: "Capacitación en inglés empresarial para equipos de trabajo en una mesa de negociación con banderas internacionales.",
  },
  {
    titulo: "5 errores de comunicación en tu primer año de Nearshoring",
    url: "/errores-comunicacion-nearshoring-en-mexico/",
    imagen: "blog-errores-nearshoring.webp",
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
                Más Información
              </Link>
              <CarruselFlechas />
            </div>
          </div>

          <CarruselTrack etiqueta="Artículos del blog" className="sp-recursos-track">
            {POSTS.map((p) => (
              <article key={p.url} className="sp-recursos-tarjeta">
                <img
                  className="sp-post-img"
                  src={`/images/home/${p.imagen}`}
                  alt={p.alt}
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
