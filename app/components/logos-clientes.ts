/* Los 11 logos de la franja de confianza, compartidos por las páginas que la
   llevan. Los nombres de archivo son los que existen hoy en disco, typo de
   "reanult.webp" incluido: no se renombra el archivo desde aquí. */

export type LogoCliente = { marca: string; archivo: string };

export const LOGOS_CLIENTES: LogoCliente[] = [
  { marca: "AXA", archivo: "axa.webp" },
  { marca: "Club Med", archivo: "club med.webp" },
  { marca: "GBM", archivo: "gbm.webp" },
  { marca: "KIO", archivo: "kio.webp" },
  { marca: "L'Oréal", archivo: "loreal.webp" },
  { marca: "Naturgy", archivo: "naturgy.webp" },
  { marca: "Paramount", archivo: "paramount.webp" },
  { marca: "PepsiCo", archivo: "pepsico.webp" },
  { marca: "Renault", archivo: "reanult.webp" },
  { marca: "Santander", archivo: "santander.webp" },
  { marca: "Walmart", archivo: "walmart.webp" },
];
