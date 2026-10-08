import Script from "next/script";

/* Píxel de medición de OpenAI Ads.

   El mismo criterio que GoogleTagManager.tsx: EL ID SALE DE UNA VARIABLE DE
   ENTORNO, NEXT_PUBLIC_OAIQ_PIXEL_ID, y si no existe este componente no pinta
   nada, ni la cola ni el SDK. Así solo mide en el entorno donde se defina.
   Lleva NEXT_PUBLIC_ por lo mismo que el de GTM: el Pixel ID viaja en el HTML.

   POR QUÉ NO BLOQUEA EL RENDERIZADO:

   - El oaiq.min.js externo lo carga `next/script` con
     strategy="afterInteractive", después de la hidratación, igual que gtm.js.
   - Lo único que corre antes es la cola: define window.oaiq como una función
     que apila sus llamadas, y encola el init. No pide red ni toca el DOM.

   Las conversiones —lib/pixelOpenAI.ts— llaman a window.oaiq. Si el SDK
   todavía está cargando, la llamada se queda en la cola y el SDK la procesa al
   arrancar. Si el píxel no está montado, window.oaiq no existe y no se mide. */

const PIXEL_ID = process.env.NEXT_PUBLIC_OAIQ_PIXEL_ID;

export default function PixelOpenAI() {
  if (!PIXEL_ID) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.oaiq=window.oaiq||function(){(window.oaiq.q=window.oaiq.q||[]).push(arguments);};oaiq("init",{pixelId:${JSON.stringify(PIXEL_ID)}});`,
        }}
      />
      <Script
        id="oaiq"
        src="https://bzrcdn.openai.com/sdk/oaiq.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}
