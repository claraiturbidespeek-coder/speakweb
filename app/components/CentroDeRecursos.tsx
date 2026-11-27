import Link from "next/link";
import { CarruselFlechas, CarruselProvider, CarruselTrack } from "@/app/components/Carrusel";
import TarjetaArticulo from "@/app/components/TarjetaArticulo";

/* Compartida por la home, /nosotros/, las páginas de Soluciones por Equipo,
   el índice /idioma/ y las landings de idioma. Al usarla varias páginas deja
   de ser "propia de una página": el estilo vive en patrones.css como
   vocabulario sp-recursos-*, igual que ya hace BandaLogos con sp-logos. Las
   tarjetas son TarjetaArticulo, la misma del índice del blog. */

/* `categoria` es el `categorySlug` del frontmatter de cada nota y decide el
   color de la tarjeta (ver TarjetaArticulo.tsx). Va escrita aquí, y no leída
   de content/blog/, porque este componente lo montan también las landings de
   idioma, que son componentes de cliente: ahí no hay `fs`. OJO: si una nota
   cambia de categoría, hay que cambiarla también aquí.

   `resumen` es el `excerpt` del frontmatter, copiado tal cual por la misma
   razón; la tarjeta lo recorta a 15 palabras. Si se reescribe el excerpt de
   una de estas notas, hay que copiarlo de nuevo aquí.

   El orden no es casual: amarillo, rojo, navy, rojo, amarillo, rojo, navy,
   rojo. Así ninguna tarjeta tiene al lado otra de su color —tampoco entre la
   última y la primera, que el carrusel junta al dar la vuelta— y cualquier
   tramo de cuatro seguidas lleva los tres. Si se cambia una nota o su
   categoría, hay que revisar que el orden lo siga cumpliendo. */
const POSTS = [
  {
    titulo:
      "Aprender idiomas en la era del nearshoring: Las lenguas más demandadas en México",
    url: "/aprender-idiomas-nearshoring-mexico/",
    categoria: "nearshoring-y-expansion",
    resumen:
      "El inglés ya no es suficiente para la alta competencia en México. Conozca los idiomas más demandados por las empresas globales y acelere su negocio.",
  },
  {
    titulo:
      "Inglés para ejecutivos: 6 situaciones clave donde urge una evaluación de inglés",
    url: "/evaluacion-de-ingles-ejecutivos/",
    categoria: "diagnostico-de-necesidades",
    resumen:
      "El liderazgo global exige comunicación impecable. Conozca las situaciones cotidianas donde se evidencia la falta de dominio y cómo medir a sus líderes.",
  },
  {
    titulo:
      "Capacitación de personal: cómo diseñar un programa de idiomas que sí completen",
    url: "/capacitacion-personal-programa-idiomas/",
    categoria: "implementacion-del-programa",
    resumen:
      "Gamificación, métricas de avance y una comparación de modelos para que el seguimiento de un programa de idiomas motive al equipo a terminarlo.",
  },
  {
    titulo:
      "¿Por qué su equipo abandonó el curso de idiomas de la empresa?",
    url: "/blog-capacitacion-en-ingles-programa-fantasma/",
    categoria: "resultados-y-roi",
    resumen:
      "Seis causas por las que un programa de capacitación en inglés termina vacío y las señales que su área de RH puede detectar a tiempo para corregirlo.",
  },
  {
    titulo:
      "5 errores de comunicación en su primer año de Nearshoring",
    url: "/errores-comunicacion-nearshoring-en-mexico/",
    categoria: "nearshoring-y-expansion",
    resumen:
      "Cinco errores de comunicación que suelen aparecer en el primer año de nearshoring, del inglés técnico al seguimiento de objetivos.",
  },
  {
    titulo:
      "Inglés para empresas: ¿Qué nivel necesita cada área de su organización?",
    url: "/blog-nivel-ingles-empresas-areas/",
    categoria: "diagnostico-de-necesidades",
    resumen:
      "Cada área usa el inglés para tareas distintas. Conozca los niveles del MCER, qué nivel necesita Ventas, TI y Dirección y cómo diagnosticarlo paso a paso.",
  },
  {
    titulo:
      "Cómo implementar una capacitación en inglés en su empresa: 5 pasos para que su equipo no la abandone",
    url: "/como-implementar-capacitacion-en-ingles-empresas/",
    categoria: "implementacion-del-programa",
    resumen:
      "Cinco pasos para implementar una capacitación en inglés en su empresa: necesidades, nivel real, modalidad, indicadores y participación.",
  },
  {
    titulo:
      "¿Alemán, francés o inglés? Cómo identificar qué idiomas para empresas necesita su equipo",
    url: "/mejores-idiomas-para-empresas/",
    categoria: "diagnostico-de-necesidades",
    resumen:
      "Datos de exportaciones e inversión extranjera en México y un método de tres pasos para decidir qué idiomas para empresas conviene capacitar además del inglés.",
  },
];

export default function CentroDeRecursos({
  className,
}: {
  className?: string;
}) {
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
                Ver todos los artículos
              </Link>
              <CarruselFlechas />
            </div>
          </div>

          <CarruselTrack etiqueta="Artículos del blog" className="sp-recursos-track">
            {POSTS.map((p, i) => (
              <TarjetaArticulo
                key={p.url}
                className="sp-recursos-tarjeta"
                titulo={p.titulo}
                href={p.url}
                categoria={p.categoria}
                resumen={p.resumen}
                indice={i}
              />
            ))}
          </CarruselTrack>
        </CarruselProvider>
      </div>
    </section>
  );
}
