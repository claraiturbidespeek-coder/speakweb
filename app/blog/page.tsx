import type { Metadata } from "next";
import Link from "next/link";
import ListadoBlog from "@/app/components/ListadoBlog";
import { obtenerCategorias, obtenerPosts } from "@/lib/posts";
import styles from "./blog.module.css";

/* La descripción nombra lo que el centro de recursos tiene de verdad —26
   artículos repartidos en cinco categorías— y no guías, tutoriales ni
   plantillas descargables, que es lo que prometía antes y no existen. */
export const metadata: Metadata = {
  title: "Centro de Recursos | S-Peak",
  description:
    "Artículos sobre capacitación de idiomas en empresas: cómo diagnosticar necesidades, elegir proveedor, implementar el programa y medir sus resultados.",
  alternates: { canonical: "https://s-peak.com/blog/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "S-Peak",
    title: "Centro de Recursos | S-Peak",
    description:
      "Artículos sobre capacitación de idiomas en empresas: cómo diagnosticar necesidades, elegir proveedor, implementar el programa y medir sus resultados.",
    url: "https://s-peak.com/blog/",
    images: [
      {
        url: "https://s-peak.com/images/og-links.jpg",
        alt: "Centro de Recursos de S-Peak sobre capacitación de idiomas para empresas",
      },
    ],
  },
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
            Artículos para las áreas de Recursos Humanos y Dirección que
            evalúan, contratan o miden un programa de idiomas en su empresa.
          </p>
        </div>
      </section>

      <section className={`sp-seccion ${styles.seccionArticulos}`}>
        <div className={`sp-inner ${styles.panel}`}>
          <h2 className={styles.tituloSeccion}>Artículos</h2>

          <ListadoBlog categorias={categorias} total={posts.length}>
            {posts.map((post) => (
              <li
                key={post.slug}
                className={`sp-post-card ${styles.tarjeta}`}
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
