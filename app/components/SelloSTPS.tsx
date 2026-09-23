import { imagenResponsiva } from "@/lib/imagenes";

/* Sello de registro ante la STPS: el logotipo y la línea de constancia que van
   bajo el CTA del hero.

   Nació en la plantilla de /equipo/ y ahora lo pide también el hero de la home.
   Como son dos, el markup sube a este componente y el estilo a patrones.css
   (.sp-sello-stps), en vez de duplicarse en los dos sitios.

   El texto es fijo: no es contenido de página, es el mismo dato legal en todo
   el sitio. Si algún día cambia por plantilla, entra aquí como prop. */

export default function SelloSTPS() {
  return (
    <div className="sp-sello-stps">
      <img
        className="sp-sello-stps-logo"
        {...imagenResponsiva("/images/stps-logo.webp", "101px")}
        alt="Secretaría del Trabajo y Previsión Social"
        width="101"
        height="28"
        /* Carga inmediata a propósito, aunque no sea el LCP: el sello va en el
           hero, bajo el botón principal, dentro de la primera pantalla. Diferir
           una imagen que ya está a la vista es contraproducente —el navegador
           la descubre tarde y la pinta después que el resto del hero—. */
        loading="eager"
        decoding="async"
      />
      <p>Registro oficial ante la STPS · Entregamos constancia DC-3</p>
    </div>
  );
}
