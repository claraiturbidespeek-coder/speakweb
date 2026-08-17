import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import IndiceContenidos from "@/app/components/IndiceContenidos";
import {
  formatearFecha,
  obtenerPosts,
  obtenerRelacionados,
  renderizarPost,
} from "@/lib/posts";
import styles from "./nota.module.css";

const SITIO = "https://s-peak.com";

export function generateStaticParams() {
  return obtenerPosts().map((p) => ({ slug: p.slug }));
}

// Cierra el conjunto de rutas: sin esto, /[slug] respondería 200 a cualquier
// URL y se tragaría todos los 404 del sitio.
export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await renderizarPost(slug);
  if (!post) return {};

  const url = `${SITIO}/${post.slug}/`;
  const imagen = post.featuredImage ? `${SITIO}${post.featuredImage}` : undefined;

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription,
    authors: post.author ? [{ name: post.author }] : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "es_MX",
      siteName: "S-Peak",
      title: post.seoTitle ?? post.title,
      description: post.seoDescription,
      url,
      publishedTime: post.date,
      images: imagen
        ? [{ url: imagen, alt: post.featuredImageAlt ?? post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle ?? post.title,
      description: post.seoDescription,
      images: imagen ? [imagen] : undefined,
    },
  };
}

export default async function Nota(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const post = await renderizarPost(slug);
  if (!post) notFound();

  const relacionados = obtenerRelacionados(post.slug, post.categorySlug);

  return (
    <main>
      <article>
        <header className={`sp-seccion ${styles.cabecera}`}>
          <div className={`sp-inner ${styles.cabeceraInner}`}>
            <p className={styles.meta}>
              <span className={styles.metaItem}>
                <svg
                  className={styles.icono}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 7h6l2 3h10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                <Link
                  className={styles.metaEnlace}
                  href={`/category/${post.categorySlug}/`}
                >
                  {post.category}
                </Link>
              </span>
              <span className={styles.metaItem}>
                <svg
                  className={styles.icono}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="16" />
                  <path d="M3 10h18M8 3v4M16 3v4" />
                </svg>
                <time dateTime={post.date}>{formatearFecha(post.date)}</time>
              </span>
            </p>

            <h1 className={styles.titulo}>{post.title}</h1>

            {post.excerpt ? (
              <p className={styles.extracto}>{post.excerpt}</p>
            ) : null}
          </div>
        </header>

        {post.featuredImage ? (
          <img
            className={styles.destacada}
            src={post.featuredImage}
            alt={post.featuredImageAlt ?? ""}
            fetchPriority="high"
          />
        ) : null}

        <div className="sp-seccion">
          <div className={`sp-inner ${styles.cuerpoInner}`}>
            <div className={styles.columnaPrincipal}>
              {post.readingTime ? (
                <p className={styles.lectura}>
                  <svg
                    className={styles.icono}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  Tiempo estimado de lectura: {post.readingTime} minutos
                </p>
              ) : null}

              <div
                className={styles.contenido}
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>

            <aside className={styles.lateral}>
              <div className={styles.lateralSticky}>
                <IndiceContenidos encabezados={post.encabezados} />

                <div className="sp-cta-card">
                  <p className={styles.ctaTitulo}>¿Necesita un programa a la medida?</p>
                  <p className={styles.ctaTexto}>
                    Un asesor le responde en menos de 24 horas, sin compromiso.
                  </p>
                  {/* TODO: abre el modal de contacto — se implementa en fase posterior */}
                  <button type="button" className="sp-btn sp-btn--rojo">
                    Solicite Información
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {relacionados.length > 0 ? (
        <section className={`sp-seccion ${styles.relacionados}`}>
          <div className="sp-inner">
            <h2 className={styles.relacionadosTitulo}>Artículos Relacionados</h2>
            <ul className={styles.relacionadosLista}>
              {relacionados.map((r) => (
                <li key={r.slug}>
                  <Link className="sp-post-enlace" href={`/${r.slug}/`}>
                    {r.featuredImage ? (
                      <img
                        className="sp-post-img"
                        src={r.featuredImage}
                        alt={r.featuredImageAlt ?? ""}
                        loading="lazy"
                      />
                    ) : null}
                    <h3 className="sp-post-titulo">{r.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </main>
  );
}
