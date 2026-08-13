import { notFound } from "next/navigation";

const SLUGS_VALIDOS = ["post-de-ejemplo"];

export default async function Page(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;

  if (!SLUGS_VALIDOS.includes(slug)) {
    notFound();
  }

  return (
    <main>
      <h1>Blog post</h1>
      <p>/blog/{slug}/</p>
    </main>
  );
}
