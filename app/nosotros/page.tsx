import type { Metadata } from "next";

/* Página oculta: robots noindex/nofollow. No se borró nada — ni el archivo, ni
   la ruta, ni el contenido. No hubo enlaces que retirar: no la enlazaban ni el
   header, ni el footer, ni el mosaico de la home, ni ninguna otra página.
   Para reactivarla basta con quitar este bloque de metadata y su import; si
   además se le quiere dar entrada de menú, habría que añadirla —no existía—.
   El proyecto no tiene sitemap ni robots.txt, así que no hay nada más de donde
   sacarla. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="contenedor">
      <h1>Nosotros</h1>
      <p>/nosotros/</p>
    </main>
  );
}
