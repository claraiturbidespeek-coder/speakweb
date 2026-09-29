/* Los enlaces del menú del header, compartidos por la navegación en línea y
   por el panel a pantalla completa. */

export const ENLACES_IDIOMAS = [
  { nombre: "Alemán", ruta: "/idioma/aleman-para-empresas/" },
  { nombre: "Español", ruta: "/idioma/espanol-para-empresas/" },
  { nombre: "Francés", ruta: "/idioma/frances-para-empresas/" },
  { nombre: "Inglés", ruta: "/idioma/ingles-para-empresas/" },
  { nombre: "Italiano", ruta: "/idioma/italiano-para-empresas/" },
  { nombre: "Portugués", ruta: "/idioma/portugues-para-empresas/" },
];

/* El índice de idiomas. Abre el desplegable de Idiomas y su columna en el panel
   móvil, antes de los seis; no va dentro de ENLACES_IDIOMAS porque esa lista la
   leen también el sitemap, el footer y las tarjetas del índice, que son solo
   los seis idiomas. */
export const ENLACE_INDICE_IDIOMAS = { nombre: "Todos los idiomas", ruta: "/idioma/" };

/* En el orden del mosaico del home, no alfabético: el sitio cuenta la misma
   historia en los dos sitios y Ventas y Marketing abre en ambos. */
export const ENLACES_EQUIPOS = [
  { nombre: "Ventas y Marketing", ruta: "/equipo/ventas-y-marketing/" },
  { nombre: "Atención a Clientes", ruta: "/equipo/atencion-a-clientes/" },
  { nombre: "Directivos", ruta: "/equipo/directivos/" },
  { nombre: "Finanzas y Contabilidad", ruta: "/equipo/finanzas-y-contabilidad/" },
  { nombre: "Legal y Cumplimiento", ruta: "/equipo/legal-y-juridico/" },
  { nombre: "Operaciones y Logística", ruta: "/equipo/operaciones-y-logistica/" },
  { nombre: "Tecnología e Ingeniería", ruta: "/equipo/tecnologia-e-ingenieria/" },
];

export const ENLACES_SUELTOS = [
  // Clientes, oculta. La página sigue en app/clientes/ y en pie; solo se retiró
  // del menú. Para reactivarla, descomentar esta línea: la consumen a la vez la
  // navegación en línea y el panel a pantalla completa.
  // { nombre: "Clientes", ruta: "/clientes/" },
  { nombre: "Recursos", ruta: "/blog/" },
];

/* Las anclas del header en modo landing, en el orden en que las secciones
   aparecen en el documento.

   Es una sola lista para las seis landings de idioma y no una por página
   porque las seis salen de la misma plantilla y llevan los mismos `id` en las
   mismas cuatro secciones: se comprobó en las seis páginas antes de escribir
   esto. El índice de idiomas, /idioma/, sí se sale: suma su sección de idiomas
   y lleva su propia lista, ANCLAS_INDICE. Qué lista toca lo decide
   anclasDeRuta, porque el header vive en el layout raíz y no recibe props de
   la página.

   La etiqueta no repite el `id`: la sección de testimonios es `#resultados` y
   en el menú se llama Casos de éxito. El `id` viene de la página migrada y no
   se toca; el texto es el del header. */
export const ANCLAS_LANDING = [
  { nombre: "Nuestro enfoque", ancla: "#enfoque" },
  { nombre: "El método", ancla: "#metodo" },
  { nombre: "Casos de éxito", ancla: "#resultados" },
  { nombre: "Preguntas", ancla: "#faq" },
];

/* Las anclas del índice de idiomas: su sección de idiomas, que va justo
   después de los logos, y detrás las cuatro de la plantilla. */
export const ANCLAS_INDICE = [
  { nombre: "Idiomas", ancla: "#idiomas" },
  ...ANCLAS_LANDING,
];

export function anclasDeRuta(ruta: string) {
  // El sitio usa trailingSlash, así que la ruta puede llegar con barra o sin ella.
  return ruta.replace(/\/+$/, "") === "/idioma" ? ANCLAS_INDICE : ANCLAS_LANDING;
}
