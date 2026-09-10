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

/* Las anclas del header en modo landing, en el orden en que las secciones
   aparecen en el documento.

   Es una sola lista para las seis landings de idioma y no una por página
   porque las seis salen de la misma plantilla y llevan los mismos `id` en las
   mismas cuatro secciones: se comprobó en las seis páginas antes de escribir
   esto. Si una landing futura se saliera de la plantilla, esto deja de servir
   y habría que pasar la lista por prop desde la página.

   La etiqueta no repite el `id`: la sección de testimonios es `#resultados` y
   en el menú se llama Casos de éxito. El `id` viene de la página migrada y no
   se toca; el texto es el del header. */
export const ANCLAS_LANDING = [
  { nombre: "Nuestro enfoque", ancla: "#enfoque" },
  { nombre: "El método", ancla: "#metodo" },
  { nombre: "Casos de éxito", ancla: "#resultados" },
  { nombre: "Preguntas", ancla: "#faq" },
];
