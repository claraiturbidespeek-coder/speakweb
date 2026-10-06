"use client";

import { createContext, useContext } from "react";

/* El hook lleva el prefijo `use` y no `usar` como el resto del vocabulario del
   proyecto: no es estilo, es el contrato de React. Es lo que permite a
   react-hooks/rules-of-hooks verificar cada sitio donde se llama. */

/* `abrirConIdioma` es para un botón que ya sabe qué idioma le interesa al
   visitante: el modal se salta el paso de idioma. `abrir` queda sin argumento
   a propósito, porque muchas páginas lo pasan tal cual a onClick y recibiría
   el evento. */
type Contacto = { abrir: () => void; abrirConIdioma: (idioma: string) => void };

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
