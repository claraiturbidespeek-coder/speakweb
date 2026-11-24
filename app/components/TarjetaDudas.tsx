import BotonContacto from "@/app/components/contacto/BotonContacto";

/* La tarjeta navy de cierre junto a las preguntas frecuentes: «¿Quedan
   Dudas?», su frase y el botón que abre el modal de contacto. Una sola pieza
   para la home, Diagnóstico, las páginas de equipo, las de idioma y el índice
   de idiomas: el texto vive aquí y un cambio se ve en todas.

   El estilo es el de patrones.css (sp-cta-card y sp-faq-bloque-tarjeta-*). */

export default function TarjetaDudas() {
  return (
    <aside className="sp-cta-card">
      <h3 className="sp-faq-bloque-tarjeta-titulo">¿Quedan Dudas?</h3>
      <p className="sp-faq-bloque-tarjeta-texto">
        Un asesor las resuelve y le prepara una cotización a la medida de su equipo.
      </p>
      <BotonContacto className="sp-btn sp-btn--rojo">Solicite una Cotización</BotonContacto>
    </aside>
  );
}
