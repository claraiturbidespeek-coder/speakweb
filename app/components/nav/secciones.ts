/* Qué menú lleva cada ruta.

   Un mapa aquí, y no un registro desde cada página, porque registrar hacia
   arriba exige un efecto y eso hace parpadear el menú general en la primera
   pintura.

   Solo entran las rutas que tienen secciones de verdad. Las cinco páginas de
   idioma que siguen siendo placeholder, y las tres rutas de landing que se van
   a eliminar, no están aquí: reciben el menú general, que es lo correcto para
   una página sin secciones. Las de idioma entran cuando se construyan. */

export type Seccion = { id: string; etiqueta: string };

/* Las siete páginas de equipo comparten plantilla, así que comparten anclas.

   Cuatro entradas, no seis. Las secciones #dolor y #diferenciadores conservan
   su id y se puede enlazar a ellas desde donde sea, pero no están en el menú a
   propósito: no son destinos que alguien busque, y con seis el header quedaba
   cargado. No las devuelvas sin decidirlo. */
const EQUIPO: Seccion[] = [
  { id: "competencias", etiqueta: "Competencias" },
  { id: "mercado", etiqueta: "Por qué ahora" },
  { id: "resultados", etiqueta: "Testimonios" },
  { id: "faq", etiqueta: "Preguntas" },
];

const INGLES: Seccion[] = [
  { id: "enfoque", etiqueta: "Nuestro enfoque" },
  { id: "metodo", etiqueta: "El método" },
  { id: "resultados", etiqueta: "Casos de éxito" },
  { id: "faq", etiqueta: "Preguntas" },
];

export function seccionesDe(ruta: string): Seccion[] | null {
  const limpia = ruta.replace(/\/+$/, "");
  if (limpia.startsWith("/equipo/")) return EQUIPO;
  if (limpia === "/idioma/ingles-para-empresas") return INGLES;
  return null;
}

/* ---------- El menú general ---------- */

export const ENLACES_IDIOMAS = [
  { nombre: "Alemán", ruta: "/idioma/aleman-para-empresas/" },
  { nombre: "Español", ruta: "/idioma/espanol-para-empresas/" },
  { nombre: "Francés", ruta: "/idioma/frances-para-empresas/" },
  { nombre: "Inglés", ruta: "/idioma/ingles-para-empresas/" },
  { nombre: "Italiano", ruta: "/idioma/italiano-para-empresas/" },
  { nombre: "Portugués", ruta: "/idioma/portugues-para-empresas/" },
];

/* En el orden del mosaico del home, no alfabético: el sitio cuenta la misma
   historia en los dos sitios y Ventas y Marketing abre en ambos. */
export const ENLACES_EQUIPOS = [
  { nombre: "Ventas y Marketing", ruta: "/equipo/ventas-y-marketing/" },
  { nombre: "Atención a Clientes", ruta: "/equipo/atencion-a-clientes/" },
  { nombre: "Directivos", ruta: "/equipo/directivos/" },
  { nombre: "Finanzas y Contabilidad", ruta: "/equipo/finanzas-y-contabilidad/" },
  { nombre: "Legal y Jurídico", ruta: "/equipo/legal-y-juridico/" },
  { nombre: "Operaciones y Logística", ruta: "/equipo/operaciones-y-logistica/" },
  { nombre: "Tecnología e Ingeniería", ruta: "/equipo/tecnologia-e-ingenieria/" },
];

export const ENLACES_SUELTOS = [
  { nombre: "Clientes", ruta: "/clientes/" },
  { nombre: "Recursos", ruta: "/blog/" },
];
