"use client";

import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import ModalContacto from "./ModalContacto";
import { ContextoContacto } from "./useContacto";

/* Monta el modal de contacto una sola vez, en el layout raíz, y da a cualquier
   página la forma de abrirlo.

   Esto NO convierte las páginas en componentes de cliente: `children` llega
   como prop desde un Server Component, así que React lo renderiza en el
   servidor y lo pasa ya resuelto a través de esta frontera. */
export default function ProveedorContacto({ children }: { children: ReactNode }) {
  const [abierto, setAbierto] = useState(false);

  const abrir = useCallback(() => setAbierto(true), []);
  const cerrar = useCallback(() => setAbierto(false), []);
  const valor = useMemo(() => ({ abrir }), [abrir]);

  return (
    <ContextoContacto.Provider value={valor}>
      {children}
      <ModalContacto abierto={abierto} alCerrar={cerrar} />
    </ContextoContacto.Provider>
  );
}
