"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/* Modo landing.

   Una página de /idioma/ a la que se llega con el fragmento #landing deja el
   header sin menú: ni la navegación en línea ni el botón del panel completo,
   solo el logotipo y el botón de contacto. Es para el tráfico de campaña, que
   no debe tener rutas de salida de la página.

   El fragmento no viaja al servidor, así que esto solo se puede decidir ya en
   cliente: el primer pintado sale con el menú y el modo entra al hidratar.

   Se lee una sola vez por ruta y se queda guardado. No se puede mirar
   `location.hash` en cada render: las anclas de la propia página reescriben el
   hash —ScrollSuave hace pushState al #id de la sección—, así que al primer
   clic el modo se apagaría. Releer al cambiar de ruta es, al revés, lo que
   evita que se quede pegado: el header vive en el layout y no se vuelve a
   montar al navegar.

   Es un hook y no un contexto porque no hay estado que compartir entre las
   islas que lo consumen, sino la misma lectura hecha en cada una. */

export default function useModoLanding() {
  const ruta = usePathname();
  const [landing, setLanding] = useState(false);

  useEffect(() => {
    const activo =
      ruta.startsWith("/idioma/") && window.location.hash === "#landing";
    const leerFragmento = () => setLanding(activo);
    leerFragmento();

    /* El mismo atributo que pone el guion inline del layout. Ahí se marca el
       primer pintado; aquí se mantiene al navegar dentro del sitio, donde ese
       guion ya no vuelve a correr. Sin esto, salir de una landing dejaría el
       atributo puesto y el menú escondido en la página siguiente. */
    document.documentElement.toggleAttribute("data-landing", activo);
  }, [ruta]);

  return landing;
}
