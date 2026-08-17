"use client";

import { createContext, useContext } from "react";

/* El hook lleva el prefijo `use` y no `usar` como el resto del vocabulario del
   proyecto: no es estilo, es el contrato de React. Es lo que permite a
   react-hooks/rules-of-hooks verificar cada sitio donde se llama. */

type Contacto = { abrir: () => void };

export const ContextoContacto = createContext<Contacto | null>(null);

export function useContacto(): Contacto {
  const contexto = useContext(ContextoContacto);
  if (!contexto) {
    throw new Error(
      "useContacto() necesita estar dentro de <ProveedorContacto>, que monta el layout raíz."
    );
  }
  return contexto;
}
