"use client";

import type { ReactNode } from "react";
import { useContacto } from "./useContacto";

/* El botón que abre el modal de contacto. Existe para que una página que se
   renderiza en el servidor pueda tener un botón interactivo sin volverse
   componente de cliente: solo cruza la frontera este botón, no la página.

   `idioma`, con uno de los valores de OPCIONES_IDIOMA, hace que el modal se
   salte el paso de idioma y envíe ese. */
export default function BotonContacto({
  className,
  idioma,
  children,
}: {
  className?: string;
  idioma?: string;
  children: ReactNode;
}) {
  const { abrir, abrirConIdioma } = useContacto();
  return (
    <button
      type="button"
      className={className}
      onClick={idioma ? () => abrirConIdioma(idioma) : abrir}
    >
      {children}
    </button>
  );
}
