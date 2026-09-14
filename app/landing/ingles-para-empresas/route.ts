import { NextResponse } from "next/server";

/* Ruta heredada que recibe el tráfico de Google Ads. Ya no pinta nada: lleva a
   /idioma/ingles-para-empresas/ en modo landing.

   POR QUÉ UN ROUTE HANDLER Y NO OTRA COSA:

   El modo landing se activa con el fragmento `#landing`. El fragmento que el
   visitante escribe nunca llega al servidor —eso es cierto—, pero un servidor
   sí puede PONER uno en la cabecera `Location` de una redirección, y el
   navegador lo aplica: si el valor de Location trae fragmento, se usa ese
   (RFC 9110, §10.2.2). Así que la redirección puede entregar el destino ya con
   `#landing` puesto.

   Se hace aquí y no con `redirects()` en next.config.ts porque hay que componer
   dos cosas a la vez: la query que llega (gclid, utm_*) y el fragmento. La
   redirección declarativa arrastra la query por su cuenta y la pegaría después
   del `#`, que la dejaría dentro del fragmento y fuera del alcance del
   `location.search` que lee lib/atribucion.ts. Construyendo la URL a mano el
   orden queda garantizado: primero la query, después el fragmento.

   SIN PARPADEO, y por partida doble: al ser una redirección de servidor el
   navegador nunca llega a pintar esta ruta, y en el destino el guion inline del
   layout lee el `#landing` y marca el <html> antes del primer pintado, así que
   tampoco se ve un frame con el header y el footer completos. Un rebote por
   JavaScript desde una página sí habría tenido ese frame intermedio.

   308 y no 302: la ruta vieja no debe quedarse en el índice; el destino la
   sustituye. Por eso esta ruta tampoco lleva noindex —una redirección
   permanente ya le dice a Google qué hacer— y por eso no está en el sitemap:
   una redirección no es una página.

   Un detalle de Ads: el 308 conserva el método y la query, así que la URL final
   de la campaña puede seguir apuntando aquí sin perder un solo parámetro. */

const DESTINO = "/idioma/ingles-para-empresas/";
const FRAGMENTO = "#landing";

export function GET(request: Request) {
  const { search, origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}${DESTINO}${search}${FRAGMENTO}`, 308);
}
