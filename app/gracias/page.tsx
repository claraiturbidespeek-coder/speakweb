import type { Metadata } from "next";

/* Página sin terminar: hoy es un esqueleto sin contenido ni metadata propia.
   Lleva robots noindex/nofollow y queda fuera del sitemap para que Google no
   indexe una página vacía. Al completarla, quitar este bloque y darla de alta
   en app/sitemap.ts. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="contenedor">
      <h1>Gracias</h1>
      <p>/gracias/</p>
    </main>
  );
}
