import { notFound } from "next/navigation";

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
    <main>
      <h1>Categoría</h1>
      <p>/category/{slug}/</p>
    </main>
  );
}
