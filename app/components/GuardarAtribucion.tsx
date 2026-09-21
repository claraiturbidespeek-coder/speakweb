"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { guardarAtribucion } from "@/lib/atribucion";

/* Persiste gclid y UTM al cargar cualquier página y al navegar dentro del
   sitio. No pinta nada. Lee window.location y no useSearchParams para no
   obligar al layout raíz a renderizarse en cliente. */
export default function GuardarAtribucion() {
  const ruta = usePathname();
  useEffect(() => {
    guardarAtribucion();
  }, [ruta]);
  return null;
}
