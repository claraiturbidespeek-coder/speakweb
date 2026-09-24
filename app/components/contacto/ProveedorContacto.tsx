"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

  /* #landing-contacto en una página de /idioma/: modo landing (lo pone el
     guion del layout) y el modal abierto al cargar. Se lee una sola vez, al
     montar: el proveedor vive en el layout raíz y no se vuelve a montar al
     navegar, así que si el visitante lo cierra no se reabre. */
  useEffect(() => {
    const { pathname, hash } = window.location;
    const abrirAlCargar = () => {
      if (pathname.startsWith("/idioma/") && hash === "#landing-contacto") abrir();
    };
    abrirAlCargar();
  }, [abrir]);

  /* Las notas del blog traen enlaces `[...](#contacto)` escritos en Markdown:
     llegan al DOM como HTML crudo (`dangerouslySetInnerHTML` en
     `app/[slug]/page.tsx`), nunca pasan por el árbol de React y por lo tanto
     no pueden llevar un onClick propio. Sin este listener, el navegador solo
     intenta un scroll a un id que no existe. Delegado en `document` porque el
     proveedor se monta una sola vez en el layout raíz, antes de que exista
     ninguna nota. */
  useEffect(() => {
    const alHacerClic = (evento: MouseEvent) => {
      const objetivo = evento.target;
      if (!(objetivo instanceof Element)) return;
      const enlace = objetivo.closest("a");
      if (!enlace?.getAttribute("href")?.endsWith("#contacto")) return;
      evento.preventDefault();
      abrir();
    };
    document.addEventListener("click", alHacerClic);
    return () => document.removeEventListener("click", alHacerClic);
  }, [abrir]);

  return (
    <ContextoContacto.Provider value={valor}>
      {children}
      <ModalContacto abierto={abierto} alCerrar={cerrar} />
    </ContextoContacto.Provider>
  );
}
