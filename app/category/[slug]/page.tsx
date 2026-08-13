import { notFound } from "next/navigation";

const SLUGS_VALIDOS = ["categoria-de-ejemplo"];

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
