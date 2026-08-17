import type { Metadata } from "next";
import Link from "next/link";
import ListadoBlog from "@/app/components/ListadoBlog";
import { obtenerCategorias, obtenerPosts } from "@/lib/posts";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Centro de Recursos | S-Peak",
  description:
    "Explora nuestra biblioteca completa de guías, tutoriales, y plantillas descargables.",
  alternates: { canonical: "https://s-peak.com/blog/" },
};

export default function Blog() {
  const posts = obtenerPosts();
  const categorias = obtenerCategorias();

  return (
    <main>
      <section className={`sp-seccion ${styles.cabecera}`}>
        <div className="sp-inner">
          <h1 className={styles.titulo}>Centro de Recursos</h1>
          <p className={styles.subtitulo}>
            Explora nuestra biblioteca completa de guías, tutoriales, y
            plantillas descargables.
          </p>
        </div>
      </section>

      <section className="sp-seccion">
        <div className={`sp-inner ${styles.panel}`}>
          <h2 className={styles.tituloSeccion}>Artículos</h2>

          <ListadoBlog categorias={categorias} total={posts.length}>
            {posts.map((post) => (
              <li
                key={post.slug}
                className={styles.tarjeta}
                data-categoria={post.categorySlug}
              >
                <Link className="sp-post-enlace" href={`/${post.slug}/`}>
                  {post.featuredImage ? (
                    <img
                      className="sp-post-img"
                      src={post.featuredImage}
                      alt={post.featuredImageAlt ?? ""}
                      loading="lazy"
                    />
                  ) : null}
                  <h3 className="sp-post-titulo">{post.title}</h3>
                </Link>
                <p className="sp-post-resumen">{post.resumen}</p>
              </li>
            ))}
          </ListadoBlog>
        </div>
      </section>
    </main>
  );
}
