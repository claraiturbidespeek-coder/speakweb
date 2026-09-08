import type { Metadata } from "next";
import localFont from "next/font/local";
import ProveedorContacto from "./components/contacto/ProveedorContacto";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollSuave from "./components/ScrollSuave";
import VolverArriba from "./components/VolverArriba";
import FlotanteWhatsApp from "./components/whatsapp/FlotanteWhatsApp";
import "./globals.css";

const montserrat = localFont({
  src: "../public/fonts/montserrat-latin.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-montserrat",
});

/* Organization y LocalBusiness son datos del sitio, no de una página: van una
   sola vez, aquí, y no repetidos en cada ruta. Cada página aporta lo suyo
   —Breadcrumb, Service, FAQPage— desde su propio marcado. */
const DATOS_SITIO = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://s-peak.com/#organizacion",
      name: "S-Peak",
      url: "https://s-peak.com",
      logo: "https://s-peak.com/brand/logo_white.svg",
      sameAs: ["https://www.linkedin.com/company/s-peak"],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://s-peak.com/#negocio",
      name: "S-Peak",
      url: "https://s-peak.com",
      image: "https://s-peak.com/images/og-links.jpg",
      parentOrganization: { "@id": "https://s-peak.com/#organizacion" },
      areaServed: { "@type": "Country", name: "México" },
    },
  ],
});

export const metadata: Metadata = {
  title: "S-Peak",
  icons: {
    icon: "/brand/favicon.png",
  },
  openGraph: {
    locale: "es_MX",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body>
        {/* Modo landing, antes del primer pintado.

            El fragmento no viaja al servidor, así que el HTML sale siempre con
            el menú: si el modo se decidiera solo al hidratar, el menú se vería
            —y sería clicable— durante ese frame, que es justo lo que una
            landing de campaña no puede permitirse. Este guion marca el <html>
            mientras el navegador todavía no ha parseado el header, y la regla
            de interacciones.css lo esconde desde el primer pintado.

            Va inline y como primer hijo del <body> a propósito: un <Script> de
            Next se carga después y llegaría tarde. useModoLanding.ts mantiene
            el atributo al navegar dentro del sitio. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(location.pathname.indexOf('/idioma/')===0&&location.hash==='#landing'){document.documentElement.setAttribute('data-landing','')}}catch(e){}",
          }}
        />
        {/* Etiqueta nativa: con next/script el JSON-LD se inyectaría desde el
            cliente y no estaría en el HTML que lee Google. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: DATOS_SITIO }}
        />
        {/* El proveedor monta el modal de contacto una sola vez para todo el
            sitio. `children` cruza esta frontera como prop, así que las páginas
            siguen renderizándose en el servidor. */}
        <ScrollSuave />
        <ProveedorContacto>
          <Header />
          {children}
          <Footer />
        </ProveedorContacto>
        <VolverArriba />
        {/* El flotante de WhatsApp, global: antes lo montaba cada una de las
            seis landings de idioma. Montado aquí una vez aparece en todo el
            sitio, y sigue leyendo el contexto de cada página por su cuenta
            —la URL de origen y, cuando la ruta es una de /idioma/, el idioma—
            porque lo resuelve al enviar con usePathname y lib/atribucion.ts. */}
        <FlotanteWhatsApp />
      </body>
    </html>
  );
}
