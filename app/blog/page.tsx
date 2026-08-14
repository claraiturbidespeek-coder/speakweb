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
      <section className={styles.cabecera}>
        <h1 className={styles.titulo}>Centro de Recursos</h1>
        <p className={styles.subtitulo}>
          Explora nuestra biblioteca completa de guías, tutoriales, y plantillas
          descargables.
        </p>
      </section>

      <section className={styles.cuerpo}>
        <div className={styles.panel}>
          <h2 className={styles.tituloSeccion}>Artículos</h2>

          <ListadoBlog categorias={categorias} total={posts.length}>
            {posts.map((post) => (
              <li
                key={post.slug}
                className={styles.tarjeta}
                data-categoria={post.categorySlug}
              >
                <Link className={styles.enlace} href={`/${post.slug}/`}>
                  {post.featuredImage ? (
                    <span className={styles.marco}>
                      <img
                        className={styles.imagen}
                        src={post.featuredImage}
                        alt={post.featuredImageAlt ?? ""}
                        loading="lazy"
                      />
                    </span>
                  ) : null}
                  <h3 className={styles.tarjetaTitulo}>{post.title}</h3>
                </Link>
                <p className={styles.tarjetaResumen}>{post.resumen}</p>
              </li>
            ))}
          </ListadoBlog>
        </div>
      </section>
    </main>
  );
}
