import type { ReactNode } from "react";
import BotonContacto from "@/app/components/contacto/BotonContacto";

/* El bloque de preguntas frecuentes de la home: el acordeón a la izquierda y,
   a la derecha, la tarjeta navy de cierre con su título, su texto y su botón
   de contacto. Nació en la home; con /nosotros/ como segunda página pasó a
   componente compartido, con su estilo en patrones.css (sp-faq-bloque-*).

   El acordeón son las piezas sp-faq-* de siempre. Los <details> comparten
   `name`, así que abrir uno cierra el anterior.

   No pinta datos estructurados: cada página decide si lleva FAQPage. */

export type PreguntaFrecuente = {
  pregunta: string;
  /* Varios párrafos como lista de textos, o uno solo, que puede llevar
     enlaces. */
  respuesta: string[] | ReactNode;
};

type Props = {
  titulo: string;
  bajada?: string;
  preguntas: PreguntaFrecuente[];
  /* El `name` de los <details>: uno por página. */
  nombre: string;
  tarjeta: { titulo: string; texto: string; boton: string };
  id?: string;
  className?: string;
};

export default function PreguntasFrecuentes({
  titulo,
  bajada,
  preguntas,
  nombre,
  tarjeta,
  id,
  className,
}: Props) {
  return (
    <section className={`sp-seccion${className ? ` ${className}` : ""}`} id={id}>
      <div className="sp-inner sp-faq-bloque">
        <div>
          <h2 className="sp-faq-bloque-titulo">{titulo}</h2>
          {bajada ? <p className="sp-faq-bloque-bajada">{bajada}</p> : null}
          <div className="sp-faq-lista sp-faq-bloque-lista">
            {preguntas.map((f) => (
              <details key={f.pregunta} className="sp-faq-item" name={nombre}>
                <summary className="sp-faq-pregunta">
                  {f.pregunta}
                  <span className="sp-faq-icono">+</span>
                </summary>
                <div className="sp-faq-respuesta sp-faq-bloque-respuesta">
                  {Array.isArray(f.respuesta) ? (
                    f.respuesta.map((parrafo: string) => <p key={parrafo}>{parrafo}</p>)
                  ) : (
                    <p>{f.respuesta}</p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>

        <aside className="sp-cta-card">
          <h3 className="sp-faq-bloque-tarjeta-titulo">{tarjeta.titulo}</h3>
          <p className="sp-faq-bloque-tarjeta-texto">{tarjeta.texto}</p>
          <BotonContacto className="sp-btn sp-btn--rojo">{tarjeta.boton}</BotonContacto>
        </aside>
      </div>
    </section>
  );
}
