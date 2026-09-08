import type { ReactNode } from "react";

/* La franja de idiomas: el texto de "no solo inglés" y las píldoras a las seis
   páginas de idioma.

   Nació dentro de la plantilla de /equipo/ y ahora la pide también la landing
   de inglés. Como son dos sitios, el markup sube a este componente en vez de
   duplicarse, igual que se hizo con SelloSTPS. El estilo no se mueve: ya vivía
   en patrones.css como vocabulario compartido (.sp-franja*, .sp-pill).

   `className` existe para que quien la monta pueda añadir sus propias clases
   —hoy la landing le pone la que la esconde en modo landing— sin que este
   componente sepa nada de eso. */

type Idioma = { nombre: string; ruta: string };

export default function FranjaIdiomas({
  titulo,
  texto,
  idiomas,
  className,
}: {
  titulo: string;
  texto: ReactNode;
  idiomas: Idioma[];
  className?: string;
}) {
  return (
    <section className={className ? `sp-franja ${className}` : "sp-franja"}>
      <div className="sp-franja-inner">
        <div className="sp-franja-texto reveal">
          <h2>{titulo}</h2>
          <p>{texto}</p>
        </div>
        <div className="sp-franja-idiomas reveal">
          {idiomas.map((i) => (
            <a key={i.ruta} className="sp-pill" href={i.ruta}>
              {i.nombre}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
