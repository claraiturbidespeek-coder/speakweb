import Script from "next/script";

/* Google Tag Manager.

   EL ID SALE DE UNA VARIABLE DE ENTORNO, NEXT_PUBLIC_GTM_ID, y no está escrito
   aquí. Si la variable no existe, este componente no pinta nada: ni el guion,
   ni el dataLayer, ni el noscript. Eso es lo que permite tenerlo solo en
   producción y dejar limpias las vistas previas y el desarrollo local, sin
   ninguna bandera extra: basta con definir la variable en un entorno y no en
   los otros.

   Lleva el prefijo NEXT_PUBLIC_ porque el identificador del contenedor no es un
   secreto —viaja en el HTML de todas formas, cualquiera lo ve con inspeccionar
   elemento—, al contrario que RESEND_API_KEY o KOMMO_TOKEN, que se leen solo en
   el servidor. Ver la cabecera de app/api/lead/route.ts.

   POR QUÉ NO BLOQUEA EL RENDERIZADO:

   - El gtm.js externo lo carga `next/script` con strategy="afterInteractive":
     Next lo inyecta después de la hidratación, así que no compite por el hilo
     principal durante el primer pintado y no entra en la ruta crítica. Es la
     estrategia que Next recomienda para los gestores de etiquetas.
   - El único guion que corre antes es el inicializador del dataLayer, de una
     línea: crea el array y nada más. No pide red ni toca el DOM.
   - El <noscript> es un iframe que solo existe para navegadores sin
     JavaScript; los demás lo ignoran por completo.

   EL DATALAYER EXISTE ANTES QUE CUALQUIER CONVERSIÓN, por partida doble: este
   inicializador corre al parsear el <body>, mucho antes de que se pueda abrir
   un modal; y además los tres sitios que empujan eventos —ModalContacto.tsx y
   FlotanteWhatsApp.tsx— hacen `window.dataLayer = window.dataLayer || []` antes
   de su push. Si un evento llegara con el contenedor todavía cargando, se queda
   encolado en el array y GTM lo procesa al arrancar: ese es el contrato del
   dataLayer y por eso no se pierde ninguna conversión. */

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function GoogleTagManager() {
  if (!GTM_ID) return null;

  return (
    <>
      {/* Para navegadores sin JavaScript. No ejecuta nada en los demás. */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>

      {/* El array, disponible desde el primer momento. Es lo único que corre
          antes de la hidratación y no hace más que esto. */}
      <script
        dangerouslySetInnerHTML={{
          __html: "window.dataLayer = window.dataLayer || [];",
        }}
      />

      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
    </>
  );
}
