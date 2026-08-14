import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import type { Root, Element } from "hast";

const DIR_CONTENIDO = path.join(process.cwd(), "content/blog");
const DIR_APP = path.join(process.cwd(), "app");

export type Encabezado = { id: string; texto: string; nivel: 2 | 3 };

export type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt?: string;
  category: string;
  categorySlug: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  seoTitle?: string;
  seoDescription?: string;
  readingTime?: number;
  hasLeadForm?: boolean;
};

export type PostRenderizado = Post & {
  html: string;
  encabezados: Encabezado[];
};

// Los posts se sirven desde la raíz del dominio, así que un slug que coincida con
// una carpeta de primer nivel de app/ queda tapado por ella sin error de build.
// Esto convierte ese fallo silencioso en uno ruidoso.
function verificarColisiones(slugs: string[]) {
  const rutas = fs
    .readdirSync(DIR_APP, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name !== "components")
    .map((e) => e.name);
  const choques = slugs.filter((s) => rutas.includes(s));
  if (choques.length > 0) {
    throw new Error(
      `Colisión de rutas: ${choques.join(", ")} existe(n) como carpeta en app/ y como post. ` +
        `La carpeta gana y el post quedaría inalcanzable. Renombra uno de los dos.`
    );
  }
}

// Yoast guarda variables de plantilla en los campos SEO y las resuelve al
// renderizar. El frontmatter conserva el token tal como vino de WordPress y la
// expansión ocurre aquí, en la capa de presentación.
const TOKENS_YOAST: Record<string, string> = {
  "%%sitename%%": "S-Peak",
};

function expandirTokens(valor: string): string {
  return valor.replace(/%%[^%\s]+%%/g, (token) => {
    const equivalencia = TOKENS_YOAST[token];
    if (equivalencia === undefined) {
      throw new Error(
        `Token de Yoast sin equivalencia: ${token}. Añádelo a TOKENS_YOAST en lib/posts.ts ` +
          `o se renderizaría literal en la página.`
      );
    }
    return equivalencia;
  });
}

function expandirCampos<T extends Record<string, unknown>>(datos: T): T {
  const salida: Record<string, unknown> = {};
  for (const [clave, valor] of Object.entries(datos)) {
    salida[clave] = typeof valor === "string" ? expandirTokens(valor) : valor;
  }
  return salida as T;
}

function leerArchivo(slug: string): Post {
  const crudo = fs.readFileSync(path.join(DIR_CONTENIDO, `${slug}.md`), "utf8");
  const { data } = matter(crudo);
  return { ...expandirCampos(data as Omit<Post, "slug">), slug };
}

let cache: Post[] | null = null;

export function obtenerPosts(): Post[] {
  if (cache) return cache;
  const slugs = fs
    .readdirSync(DIR_CONTENIDO)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
  verificarColisiones(slugs);
  cache = slugs
    .map(leerArchivo)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return cache;
}

// Recoge los encabezados del mismo árbol que produce el HTML, después de
// rehype-slug: los id del índice y los del artículo son los mismos por
// construcción, no por recalcularlos con otro slugificador.
function recogerEncabezados(destino: Encabezado[]) {
  return () => (arbol: Root) => {
    const visitar = (nodo: Root | Element) => {
      for (const hijo of nodo.children) {
        if (hijo.type !== "element") continue;
        if (hijo.tagName === "h2" || hijo.tagName === "h3") {
          const id = String(hijo.properties?.id ?? "");
          const texto = textoDe(hijo);
          if (id && texto) {
            destino.push({ id, texto, nivel: hijo.tagName === "h2" ? 2 : 3 });
          }
        }
        visitar(hijo);
      }
    };
    visitar(arbol);
  };
}

function textoDe(nodo: Element): string {
  let salida = "";
  for (const hijo of nodo.children) {
    if (hijo.type === "text") salida += hijo.value;
    else if (hijo.type === "element") salida += textoDe(hijo);
  }
  return salida.trim();
}

export async function renderizarPost(slug: string): Promise<PostRenderizado | null> {
  const ruta = path.join(DIR_CONTENIDO, `${slug}.md`);
  if (!fs.existsSync(ruta)) return null;

  const { data, content } = matter(fs.readFileSync(ruta, "utf8"));
  const encabezados: Encabezado[] = [];

  const archivo = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(recogerEncabezados(encabezados))
    .use(rehypeStringify)
    .process(content);

  return {
    ...expandirCampos(data as Omit<Post, "slug">),
    slug,
    html: String(archivo),
    encabezados,
  };
}

// Tres de la misma categoría, sin el actual. Si no llegan a tres,
// se completa con los más recientes de cualquier categoría.
export function obtenerRelacionados(slug: string, categorySlug: string): Post[] {
  const todos = obtenerPosts().filter((p) => p.slug !== slug);
  const mismos = todos.filter((p) => p.categorySlug === categorySlug);
  if (mismos.length >= 3) return mismos.slice(0, 3);
  const yaElegidos = new Set(mismos.map((p) => p.slug));
  const relleno = todos.filter((p) => !yaElegidos.has(p.slug));
  return [...mismos, ...relleno].slice(0, 3);
}

export function formatearFecha(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  return `${meses[m - 1]} ${d}, ${y}`;
}
