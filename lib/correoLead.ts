/* Plantilla del correo de lead que app/api/lead/route.ts manda por Resend.

   Solo presentación: recibe los valores ya normalizados por la ruta (con sus
   "No proporcionado" y "No especificado") y devuelve el cuerpo en HTML y en
   texto plano, en el mismo orden. Qué se manda, a quién y cuándo sigue en la
   ruta.

   POR QUÉ ESTÁ ESCRITA ASÍ: los clientes de correo no son navegadores.
   - Tablas y estilos en línea: Outlook de escritorio pinta con el motor de
     Word, que ignora flexbox, márgenes de bloque y casi todo el <style>.
   - Ancho fluido con tope de 600 px, y una tabla fija de 600 solo para
     Outlook, dentro de un comentario condicional, porque no entiende
     max-width.
   - El logo va en PNG con URL absoluta, a doble resolución (220 px para
     110 de ancho): Gmail y Outlook no muestran SVG.
   - Modo oscuro: se declara color-scheme para que Apple Mail use las reglas
     de @media de abajo; Gmail y Outlook invierten por su cuenta, y los
     colores están elegidos para que la inversión siga siendo legible (el
     header ya es oscuro y el texto nunca depende solo del color).
   - Montserrat se pide a Google Fonts; donde el cliente no la carga, cae a
     Arial, Helvetica. */

export const LOGO_CORREO = "https://s-peak.com/brand/logo_white.png";

const NAVY = "#1A3C4D";
const ROJO = "#B51E40";
const TINTA = "#1F2937";
const GRIS = "#6B7280";
const ATENUADO = "#A3AAB5";
const FONDO = "#F3F5F7";
const BLOQUE = "#F5F7FA";
const FILETE = "#E5E7EB";
const FUENTE = "Montserrat, Arial, Helvetica, sans-serif";
const NO_ESPECIFICADO = "No especificado";

export type DatosCorreoLead = {
  origen: string;
  pagina: string;
  nombre: string;
  empresa: string;
  puesto: string;
  correo: string;
  telefono: string;
  mensaje: string;
  idioma: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  gclid: string;
  fecha: Date;
  // El mismo asunto del envío, como <title> del documento.
  asunto: string;
  /* Solo para la vista previa local, donde la URL de producción todavía no
     sirve el PNG. La ruta no lo pasa. */
  logo?: string;
};

function esc(valor: unknown): string {
  return String(valor == null ? "" : valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* Número para tel: y wa.me. Diez dígitos es un número mexicano sin lada de
   país: se le antepone 52. Con más dígitos se asume que ya la trae. */
function numeroInternacional(telefono: string): string {
  const digitos = telefono.replace(/\D/g, "");
  if (!digitos) return "";
  return digitos.length === 10 ? `52${digitos}` : digitos;
}

/* "Nuevo lead de {origen}: {nombre}, {empresa}". El formulario principal se
   nombra solo "Formulario". Sin empresa, se omiten la coma y la empresa.
   Los saltos de línea que pudieran venir en los campos se aplanan: un asunto
   es una sola línea. */
export function asuntoCorreoLead(
  origen: string,
  nombre: string,
  empresa: string
): string {
  const plano = (v: string) => v.replace(/\s+/g, " ").trim();
  const fuente = origen === "Formulario principal" ? "Formulario" : plano(origen);
  const quien = plano(empresa) ? `${plano(nombre)}, ${plano(empresa)}` : plano(nombre);
  return `Nuevo lead de ${fuente}: ${quien}`;
}

// La ruta legible de la página de origen; si no es una URL, el valor tal cual.
function rutaLegible(pagina: string): string {
  try {
    return new URL(pagina).pathname;
  } catch {
    return pagina;
  }
}

function fechaLegible(fecha: Date): string {
  const dia = new Intl.DateTimeFormat("es-MX", {
    timeZone: "America/Mexico_City",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(fecha);
  const hora = new Intl.DateTimeFormat("es-MX", {
    timeZone: "America/Mexico_City",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(fecha);
  return `${dia}, ${hora} h (hora del centro de México)`;
}

export function plantillaCorreoLead(d: DatosCorreoLead): {
  html: string;
  texto: string;
} {
  const numero = numeroInternacional(d.telefono);
  const fecha = fechaLegible(d.fecha);
  const paginaEsUrl = /^https?:\/\//i.test(d.pagina);

  const enlace = (href: string, texto: string) =>
    `<a class="enlace" href="${esc(href)}" style="color:${NAVY}; font-weight:600; text-decoration:underline;">${esc(texto)}</a>`;

  // Fila etiqueta / valor del bloque de contacto y de los datos secundarios.
  const fila = (etiqueta: string, valorHtml: string) => `
                <tr>
                  <td class="etiqueta" style="padding:6px 16px 6px 0; width:96px; font-family:${FUENTE}; font-size:12px; font-weight:bold; text-transform:uppercase; letter-spacing:0.04em; color:${GRIS}; vertical-align:top;">${esc(etiqueta)}</td>
                  <td class="texto" style="padding:6px 0; font-family:${FUENTE}; font-size:15px; line-height:1.5; color:${TINTA}; vertical-align:top; word-break:break-word;">${valorHtml}</td>
                </tr>`;

  // Atribución: pequeña y gris; "No especificado" más tenue y en cursiva.
  const filaAtribucion = (etiqueta: string, valor: string) => {
    const vacio = valor === NO_ESPECIFICADO;
    return `
                <tr>
                  <td style="padding:3px 16px 3px 0; width:96px; font-family:${FUENTE}; font-size:12px; color:${GRIS}; vertical-align:top;">${esc(etiqueta)}</td>
                  <td class="${vacio ? "atenuado" : "gris"}" style="padding:3px 0; font-family:${FUENTE}; font-size:12px; color:${vacio ? ATENUADO : GRIS};${vacio ? " font-style:italic;" : ""} vertical-align:top; word-break:break-all;">${esc(valor)}</td>
                </tr>`;
  };

  const telefonoHtml = numero
    ? `${enlace(`tel:+${numero}`, d.telefono)}<br>${enlace(`https://wa.me/${numero}`, "Escribir por WhatsApp")}`
    : esc(d.telefono);

  const html = `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${esc(d.asunto)}</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap" rel="stylesheet">
<!--[if mso]><style>* { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
<style>
  body { margin:0; padding:0; }
  a { color:${NAVY}; }
  @media (prefers-color-scheme: dark) {
    .fondo { background:#111827 !important; }
    .tarjeta { background:#1F2933 !important; }
    .bloque { background:#243441 !important; border-color:#34495A !important; }
    .titulo, .texto { color:#F3F4F6 !important; }
    .enlace { color:#8FC7E0 !important; }
    .etiqueta, .gris { color:#AAB4BF !important; }
    .atenuado { color:#6B7682 !important; }
    .filete { border-color:#34495A !important; }
  }
</style>
</head>
<body class="fondo" style="margin:0; padding:0; background:${FONDO};">
<table role="presentation" class="fondo" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${FONDO}; border-radius:0;">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
      <table role="presentation" class="tarjeta" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background:#FFFFFF; border-radius:0;">
        <tr>
          <td valign="middle" style="background:${NAVY}; padding:26px 28px; vertical-align:middle; border-radius:0;">
            <img src="${esc(d.logo || LOGO_CORREO)}" width="110" height="30" alt="S-Peak" style="display:block; border:0; outline:none; width:110px; height:auto; border-radius:0;">
          </td>
        </tr>
        <tr>
          <td style="background:${ROJO}; height:4px; line-height:4px; font-size:0;">&nbsp;</td>
        </tr>

        <!-- 1. Título, origen y página -->
        <tr>
          <td style="padding:28px 28px 8px;">
            <p style="margin:0 0 10px; font-family:${FUENTE}; font-size:11px; font-weight:bold; text-transform:uppercase; letter-spacing:0.08em; color:${ROJO};">${esc(d.origen)}</p>
            <h1 class="titulo" style="margin:0 0 8px; font-family:${FUENTE}; font-size:26px; line-height:1.2; font-weight:800; color:${NAVY};">Nuevo lead</h1>
            <p class="gris" style="margin:0; font-family:${FUENTE}; font-size:13px; line-height:1.5; color:${GRIS}; word-break:break-all;">Llegó desde ${paginaEsUrl ? enlace(d.pagina, rutaLegible(d.pagina)) : esc(d.pagina)}</p>
          </td>
        </tr>

        <!-- 2. Datos para contactar -->
        <tr>
          <td style="padding:20px 28px 8px;">
            <table role="presentation" class="bloque" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BLOQUE}; border:1px solid ${FILETE}; border-left:4px solid ${NAVY}; border-radius:0;">
              <tr>
                <td style="padding:16px 20px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${fila("Nombre", `<strong>${esc(d.nombre)}</strong>`)}${fila("Empresa", esc(d.empresa))}${fila("Puesto", esc(d.puesto))}${fila("Correo", enlace(`mailto:${d.correo}`, d.correo))}${fila("Teléfono", telefonoHtml)}
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- 3. Mensaje -->
        <tr>
          <td style="padding:20px 28px 8px;">
            <p class="etiqueta" style="margin:0 0 8px; font-family:${FUENTE}; font-size:12px; font-weight:bold; text-transform:uppercase; letter-spacing:0.04em; color:${GRIS};">Mensaje</p>
            <p class="texto" style="margin:0; font-family:${FUENTE}; font-size:15px; line-height:1.6; color:${TINTA}; word-break:break-word;">${esc(d.mensaje).replace(/\n/g, "<br>")}</p>
          </td>
        </tr>

        <!-- 4. Datos secundarios -->
        <tr>
          <td style="padding:20px 28px 8px;">
            <table role="presentation" class="filete" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${FILETE};">
              <tr><td style="height:12px; line-height:12px; font-size:0;">&nbsp;</td></tr>
            </table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${fila("Idioma", esc(d.idioma))}
            </table>
          </td>
        </tr>

        <!-- 5. Atribución -->
        <tr>
          <td style="padding:16px 28px 24px;">
            <table role="presentation" class="filete" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${FILETE};">
              <tr><td style="height:12px; line-height:12px; font-size:0;">&nbsp;</td></tr>
            </table>
            <p class="gris" style="margin:0 0 6px; font-family:${FUENTE}; font-size:11px; font-weight:bold; text-transform:uppercase; letter-spacing:0.06em; color:${GRIS};">Atribución</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${filaAtribucion("UTM Source", d.utmSource)}${filaAtribucion("UTM Medium", d.utmMedium)}${filaAtribucion("UTM Campaign", d.utmCampaign)}${filaAtribucion("UTM Content", d.utmContent)}${filaAtribucion("GCLID", d.gclid)}
            </table>
          </td>
        </tr>

        <!-- 6. Pie -->
        <tr>
          <td class="filete" style="padding:16px 28px 20px; border-top:1px solid ${FILETE};">
            <p class="gris" style="margin:0; font-family:${FUENTE}; font-size:11px; line-height:1.5; color:${GRIS};">Recibido el ${esc(fecha)}</p>
          </td>
        </tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td>
  </tr>
</table>
</body>
</html>`;

  const texto = [
    "NUEVO LEAD",
    `Origen: ${d.origen}`,
    `Página: ${d.pagina}`,
    "",
    "DATOS PARA CONTACTAR",
    `Nombre: ${d.nombre}`,
    `Empresa: ${d.empresa}`,
    `Puesto: ${d.puesto}`,
    `Correo: ${d.correo}`,
    `Teléfono: ${d.telefono}`,
    ...(numero ? [`WhatsApp: https://wa.me/${numero}`] : []),
    "",
    "MENSAJE",
    d.mensaje,
    "",
    "OTROS DATOS",
    `Idioma: ${d.idioma}`,
    "",
    "ATRIBUCIÓN",
    `UTM Source: ${d.utmSource}`,
    `UTM Medium: ${d.utmMedium}`,
    `UTM Campaign: ${d.utmCampaign}`,
    `UTM Content: ${d.utmContent}`,
    `GCLID: ${d.gclid}`,
    "",
    `Recibido el ${fecha}`,
  ].join("\n");

  return { html, texto };
}
