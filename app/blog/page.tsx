import type { Metadata } from "next";
import ListadoBlog from "@/app/components/ListadoBlog";
import TarjetaArticulo from "@/app/components/TarjetaArticulo";
import { obtenerCategorias, obtenerPosts } from "@/lib/posts";
import styles from "./blog.module.css";

/* La descripción nombra lo que el centro de recursos tiene de verdad —22
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
            {posts.map((post, i) => (
              <TarjetaArticulo
                key={post.slug}
                como="li"
                className={styles.tarjeta}
                titulo={post.title}
                href={`/${post.slug}/`}
                categoria={post.categorySlug}
                resumen={post.excerpt ?? post.resumen}
                indice={i}
              />
            ))}
          </ListadoBlog>
        </div>
      </section>
    </main>
  );
}
