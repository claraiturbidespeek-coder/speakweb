import type { Metadata } from "next";
import { notFound } from "next/navigation";

/* Los cinco listados por categoría son esqueletos: noindex y fuera del sitemap
   hasta que estén construidos. Al terminarlos, quitar este bloque y darlos de
   alta en app/sitemap.ts. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const SLUGS_VALIDOS = [
  "diagnostico-de-necesidades",
  "seleccion-de-proveedor",
  "implementacion-del-programa",
  "resultados-y-roi",
  "nearshoring-y-expansion",
];

export default async function Page(props: PageProps<"/category/[slug]">) {
  const { slug } = await props.params;

  if (!SLUGS_VALIDOS.includes(slug)) {
    notFound();
  }

  return (
    <main className="contenedor">
      <h1>Categoría</h1>
      <p>/category/{slug}/</p>
    </main>
  );
}
