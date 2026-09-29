import type { Metadata, Viewport } from "next";
import { ENLACES_IDIOMAS } from "@/app/components/nav/secciones";
import IndiceIdiomas from "./IndiceIdiomas";
import { PROGRAMAS } from "./programas";

/* El índice de idiomas. La página es componente de cliente, como las seis de
   idioma, y Next no permite exportar metadata desde uno: por eso este archivo
   la declara y monta IndiceIdiomas. No va en un layout.tsx de /idioma/ porque
   ese layout envolvería también a las seis páginas y les heredaría su metadata.

   Se indexa y está en app/sitemap.ts. Su búsqueda es "idiomas para empresas";
   "cursos de idiomas para empresas" es la del home, y el title y el H1 de esta
   página no la repiten.

   Sustituye a /idiomas-para-empresas/, que ahora redirige aquí. */
const URL = "https://s-peak.com/idioma/";
const TITULO = "Idiomas para Empresas: Inglés, Francés, Alemán y Más | S-Peak";
const DESCRIPCION =
  "Cursos de inglés, francés, alemán, italiano, portugués y español para empresas en México, por puesto, con avance medible y evidencia para Dirección.";

/* La imagen para redes es la apaisada del home: la del héroe es vertical y se
   recortaba mal en la vista previa. */
const IMAGEN = {
  url: "https://s-peak.com/images/og-links.jpg",
  width: 1920,
  height: 1080,
  alt: "Capacitación de idiomas para empresas de S-Peak",
};

/* Las preguntas frecuentes en texto plano, para el FAQPage. Son el texto
   visible de IndiceIdiomas.tsx sin el marcado: si cambia una pregunta allí,
   cambia aquí, porque Google pide que el FAQPage coincida con lo que se ve. */
const FAQ = [
  {
    pregunta: "¿Cómo sé qué idioma necesita mi equipo?",
    respuesta:
      "Lo definimos juntos en el diagnóstico: revisamos con quién se comunica cada área, en qué situaciones y con qué mercados. Por ejemplo, un área que reporta a una casa matriz en Alemania se capacita en alemán, y una que exporta a Brasil, en portugués. Cuéntenos con quién se comunica su equipo.",
  },
  {
    pregunta: "¿Qué idiomas ofrece S-Peak?",
    respuesta:
      "Seis: inglés, francés, alemán, italiano, portugués y español para extranjeros. Cada uno tiene su propio programa para empresas, con la misma metodología por puesto, seguimiento continuo y evidencia de avance para Dirección. En la página de cada idioma encontrará el detalle de su enfoque.",
  },
  {
    pregunta: "¿En qué cambia el programa de un idioma a otro?",
    respuesta:
      "El método es el mismo; lo que cambia es el contexto. Cada programa se ancla a las situaciones reales en que su equipo usa ese idioma: la casa matriz, los clientes, los proveedores o la planta con la que trabaja. Por eso el diagnóstico define tanto el idioma como el contenido de cada Sprint.",
  },
  {
    pregunta: "¿Cómo sé que de verdad funciona? ¿Qué recibe Recursos Humanos?",
    respuesta:
      "Cada programa avanza por Sprints, 26 horas enfocadas en un dominio del puesto, que cierran con evidencia real (una simulación, un correo, una presentación), evaluada con rúbrica y documentada en una Tarjeta de Resultados que usted presenta a Dirección. Su equipo avanza por dominio comprobado, no por horas cursadas. Solicite una propuesta y le mostramos un ejemplo de Tarjeta.",
  },
  {
    pregunta: "¿En cuánto tiempo veo un cambio real?",
    respuesta:
      "Depende del idioma, del punto de partida y de la constancia del equipo. En el diagnóstico inicial le damos una proyección realista para su caso. Cotice y le estimamos el plan.",
  },
  {
    pregunta: "¿Adaptan el idioma a mi industria y manejan equipos en varios países?",
    respuesta:
      "Sí. Anclamos cada Sprint al lenguaje de su sector y a la función de cada equipo: comercial, operaciones, finanzas, atención a clientes, coordinación con casa matriz, con foco en que comuniquen y reporten en el idioma de trabajo en situaciones reales. Para multinacionales capacitamos México y filiales en simultáneo, con gestión central y resultados consolidados. Indíquenos su industria y el alcance.",
  },
  {
    pregunta: "¿Quién imparte y qué respaldo tienen?",
    respuesta:
      "Instructores especialistas en idioma de negocios, nativos o bilingües, con experiencia en entornos corporativos, no profesores de escuela. Cada uno se asigna según el dominio y el puesto de su equipo, y si alguno no resulta el adecuado, lo cambiamos. La calidad no se deja al azar. Pregúntenos por el perfil de quienes trabajarían con su equipo.",
  },
  {
    pregunta: "¿Qué pasa si un colaborador falta, se rezaga o deja la empresa?",
    respuesta:
      "Cubierto en los tres casos. Si falta, le enviamos la grabación y los temas para que no pierda el ritmo. Si se rezaga, lo detectamos a tiempo y ajustamos. Y si deja la empresa, reasignamos su lugar a otro colaborador del mismo dominio, sin perder lo invertido. Lo dejamos definido en la propuesta desde el inicio.",
  },
  {
    pregunta: "¿Cómo encaja el programa sin frenar la operación?",
    respuesta:
      "Las sesiones se agendan en los horarios que le convengan a su equipo, en la modalidad que elija: en sus instalaciones, en línea en vivo o híbrida. Y como la operación trae imprevistos, manejamos reposición ágil: si se atraviesa una junta o una urgencia, la sesión se repone sin trámites, para que el avance no se detenga. Cuéntenos cómo opera su equipo.",
  },
  {
    pregunta: "¿Cuánto cuesta y cómo se cobra?",
    respuesta:
      "Se cotiza por grupo completo, no por persona. Cada grupo es de 1 a 10 colaboradores; si son más, armamos varios grupos. A más participantes, menor el costo por colaborador. La frecuencia (sesiones por semana) define el ritmo de avance y la inversión mensual; más sesiones significan avanzar más rápido, no pagar más caro por hora. Por eso no manejamos precio de lista: armamos la propuesta según cómo opere su empresa. Solicite su cotización y le damos el número para su caso.",
  },
  {
    pregunta: "¿Tienen registro ante la STPS y es deducible de impuestos?",
    respuesta:
      "Sí a ambas. Contamos con registro oficial ante la STPS y firmamos como agente capacitador externo la constancia de capacitación (DC-3) de cada colaborador. Además es deducible, y según el decreto del Plan México (DOF) pueden existir estímulos adicionales para la formación de personal; le entregamos la documentación de soporte y le recomendamos confirmar la aplicación a su caso con su área contable. Solicite la información para su expediente.",
  },
];

/* Organization va una sola vez en el layout raíz; aquí se referencia por su
   @id. Lo propio de la ruta: la miga, el Service con el catálogo de los seis
   programas y el FAQPage. */
function datosEstructurados() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://s-peak.com/" },
          { "@type": "ListItem", position: 2, name: "Idiomas", item: URL },
        ],
      },
      {
        "@type": "Service",
        name: "Programas de idiomas para empresas",
        serviceType: "Capacitación en idiomas para empresas",
        url: URL,
        provider: { "@id": "https://s-peak.com/#organizacion" },
        areaServed: { "@type": "Country", name: "México" },
        description: DESCRIPCION,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Programas de idiomas para empresas",
          itemListElement: ENLACES_IDIOMAS.map((e) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: PROGRAMAS[e.ruta].titulo,
              description: PROGRAMAS[e.ruta].linea,
              url: `https://s-peak.com${e.ruta}`,
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.pregunta,
          acceptedAnswer: { "@type": "Answer", text: f.respuesta },
        })),
      },
    ],
    // Escapa `<` para que ningún texto pueda cerrar la etiqueta <script>: es
    // la recomendación de la guía de JSON-LD de Next.
  }).replace(/</g, "\\u003c");
}

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  authors: [{ name: "S-Peak" }],
  robots: { index: true, follow: true },
  alternates: {
    canonical: URL,
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "S-Peak",
    title: TITULO,
    description: DESCRIPCION,
    url: URL,
    images: [IMAGEN],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
    images: [IMAGEN],
  },
};

export const viewport: Viewport = {
  themeColor: "#1A3C4D",
};

export default function Page() {
  return (
    <>
      {/* Etiqueta nativa: con next/script el JSON-LD se inyectaría desde el
          cliente y no estaría en el HTML que lee Google. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: datosEstructurados() }}
      />
      <IndiceIdiomas />
    </>
  );
}
