import type { Metadata } from "next";

/* Página oculta: se retiró del menú del header y del footer, y aquí se le
   añade robots noindex/nofollow. No se borró nada — ni el archivo, ni la ruta,
   ni el contenido. Para reactivarla: quitar este bloque de metadata y
   descomentar las dos entradas de enlace (ENLACES_SUELTOS en
   app/components/nav/secciones.ts y el <li> de "Casos de éxito" en
   app/components/Footer.tsx). El proyecto no tiene sitemap ni robots.txt, así
   que no hay nada más de donde sacarla. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="contenedor">
      <h1>Clientes</h1>
      <p>/clientes/</p>
    </main>
  );
}
