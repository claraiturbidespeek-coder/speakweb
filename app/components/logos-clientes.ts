/* Los 11 logos de la franja de confianza, compartidos por las páginas que la
   llevan. Los nombres de archivo son los que existen hoy en disco, typo de
   "reanult.webp" incluido: no se renombra el archivo desde aquí. */

/* `ancho` y `alto` son las dimensiones intrínsecas del archivo, para que la
   <img> reserve su sitio y la marquesina no salte al cargar los logos.

   Van escritas aquí, y no leídas del archivo al renderizar como en el resto del
   sitio (lib/dimensiones.ts), porque BandaLogos lo montan también las seis
   landings de idioma, que son componentes de cliente: ahí no hay `fs`.

   OJO: si se reexporta o se cambia un logo, hay que actualizar sus dos números.
   Una proporción vieja es peor que ninguna: el hueco reservado no coincidiría. */
export type LogoCliente = {
  marca: string;
  archivo: string;
  ancho: number;
  alto: number;
};

export const LOGOS_CLIENTES: LogoCliente[] = [
  { marca: "AXA", archivo: "axa.webp", ancho: 600, alto: 300 },
  { marca: "Club Med", archivo: "club med.webp", ancho: 600, alto: 300 },
  { marca: "GBM", archivo: "gbm.webp", ancho: 600, alto: 300 },
  { marca: "KIO", archivo: "kio.webp", ancho: 600, alto: 300 },
  { marca: "L'Oréal", archivo: "loreal.webp", ancho: 600, alto: 300 },
  { marca: "Naturgy", archivo: "naturgy.webp", ancho: 600, alto: 300 },
  { marca: "Paramount", archivo: "paramount.webp", ancho: 600, alto: 300 },
  { marca: "PepsiCo", archivo: "pepsico.webp", ancho: 600, alto: 300 },
  { marca: "Renault", archivo: "reanult.webp", ancho: 600, alto: 300 },
  { marca: "Santander", archivo: "santander.webp", ancho: 600, alto: 300 },
  { marca: "Walmart", archivo: "walmart.webp", ancho: 600, alto: 300 },
];
