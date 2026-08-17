"use client";

import type { ReactNode } from "react";
import { useContacto } from "./useContacto";

/* El botón que abre el modal de contacto. Existe para que una página que se
   renderiza en el servidor pueda tener un botón interactivo sin volverse
   componente de cliente: solo cruza la frontera este botón, no la página. */
export default function BotonContacto({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { abrir } = useContacto();
  return (
    <button type="button" className={className} onClick={abrir}>
      {children}
    </button>
  );
}
