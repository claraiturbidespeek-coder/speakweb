/* Los seis programas de idioma, por ruta: el título y la línea de cada tarjeta
   del índice, /idioma/. El mismo título nombra el programa en los datos
   estructurados —el OfferCatalog del índice y el último escalón del
   BreadcrumbList de cada página de idioma—, así que vive aquí y no en el
   componente, que es de cliente y no se puede leer desde el servidor.

   La ruta y el orden siguen saliendo de ENLACES_IDIOMAS. */
export const PROGRAMAS: Record<string, { titulo: string; linea: string }> = {
  "/idioma/ingles-para-empresas/": {
    titulo: "Inglés para empresas",
    linea: "El estándar de la operación internacional, con casa matriz, clientes y proveedores.",
  },
  "/idioma/frances-para-empresas/": {
    titulo: "Francés para empresas",
    linea: "Para equipos que operan con Francia y Canadá.",
  },
  "/idioma/aleman-para-empresas/": {
    titulo: "Alemán para empresas",
    linea: "Para plantas del sector automotriz, aeroespacial y manufacturero.",
  },
  "/idioma/italiano-para-empresas/": {
    titulo: "Italiano para empresas",
    linea: "Para operaciones con matriz, socio o maquinaria italiana.",
  },
  "/idioma/portugues-para-empresas/": {
    titulo: "Portugués para empresas",
    linea: "Portugués de Brasil para exportadores, filiales y equipos regionales.",
  },
  "/idioma/espanol-para-empresas/": {
    titulo: "Español para extranjeros",
    linea: "Para el personal extranjero que se integra a su operación en México.",
  },
};

/* El BreadcrumbList de una página de idioma: Inicio > Idiomas > el programa. */
export function migasIdioma(ruta: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://s-peak.com/" },
      { "@type": "ListItem", position: 2, name: "Idiomas", item: "https://s-peak.com/idioma/" },
      {
        "@type": "ListItem",
        position: 3,
        name: PROGRAMAS[ruta].titulo,
        item: `https://s-peak.com${ruta}`,
      },
    ],
  };
}
