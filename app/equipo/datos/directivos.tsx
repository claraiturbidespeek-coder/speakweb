import { IDIOMAS, type DatosEquipo } from "../tipos";

/* Contenido de /equipo/directivos/, del documento del cliente.
   Correcciones del buscar y reemplazar mal hecho y slugs canónicos: ver la
   cabecera de legal-y-juridico.tsx. En esta área los enlaces del documento
   estaban rotos del todo ("/idioma/cursos de-frances-empresas/").

   OJO: el documento trae DOS H1 distintos para esta página. El bloque de SEO
   dice "cursos de de idiomas para Directivos y Gerencia" y el del hero dice
   "Idiomas para Directivos y Gerencia". Se usa el del bloque de SEO, que es el
   que marca como "H1 único", corregido. Queda anotado para que el cliente lo
   confirme.

   Esta área no trae nota de encuadre en el documento: no se le inventa una. */

const datos: DatosEquipo = {
  slug: "directivos",
  nombre: "Directivos",

  hero: {
    etiqueta: "Idioma de negocios · Dirección y Gerencia",
    titulo: (
      <>
        Capacitación de idiomas para <strong>Directivos y Gerencia</strong>
      </>
    ),
    sub: "Cuando un líder no comunica con soltura en inglés, francés, alemán, italiano, portugués o español, las decisiones se retrasan y la relación con casa matriz se debilita. S-Peak ofrece un programa confidencial, a la medida y adaptado a las exigentes agendas de la alta dirección.",
    cta: "Solicitar Cotización",
    prueba: (
      <>
        +<strong>500 empresas</strong> confían en S-Peak.
      </>
    ),
    imagen: {
      // Provisional: la del mosaico del home.
      src: "/images/home/area-directivos.jpg",
      alt: "Directivo en capacitación de inglés ejecutivo",
    },
  },

  competencias: {
    eyebrow: "Las competencias del directivo",
    titulo: "Las competencias lingüísticas que su dirección necesita para liderar en cualquier idioma",
    sub: "No formamos a un líder como a un perfil junior: entrenamos las situaciones reales donde un ejecutivo se juega la influencia de la empresa.",
    tarjetas: [
      {
        icono: "usuarios",
        titulo: "Juntas de dirección y comités",
        texto: "Participación activa en comités y reuniones corporativas globales, interviniendo con precisión técnica en lugar de solo escuchar de forma pasiva.",
      },
      {
        icono: "balanza",
        titulo: "Negociación de alto nivel",
        texto: "Acuerdos estratégicos con socios, clientes y proveedores clave. Manejo de concesiones, silencios y matices culturales sin ceder la postura de la empresa.",
      },
      {
        icono: "presentacion",
        titulo: "Vocería y representación",
        texto: "Conducción de foros, paneles y encuentros con medios internacionales, comunicando la visión y estrategia de la compañía con total autoridad.",
      },
      {
        icono: "grafico",
        titulo: "Relación con casa matriz y corporativo",
        texto: "Reporte de resultados y defensa de presupuestos de forma directa, eliminando intermediarios que diluyan el mensaje o su liderazgo.",
      },
      {
        icono: "mensaje",
        titulo: "Conversación ejecutiva y relación institucional",
        texto: "Construcción de redes de networking con pares internacionales, dominando el contexto cultural y el registro formal idóneo.",
      },
      {
        icono: "documento",
        titulo: "Documentos de decisión",
        texto: "Lectura, análisis y discusión crítica de contratos, reportes financieros y planes estratégicos directamente en su idioma original.",
      },
    ],
  },

  franja: {
    titulo: "El idioma correcto para su tablero directivo",
    texto: "El inglés domina los consejos internacionales, pero si su casa matriz está en Francia, Alemania, Italia o Brasil, o si su empresa atrae inversión y talento extranjero a México, formamos a su dirección en la lengua que realmente mueve al negocio. A través de un diagnóstico previo, definimos el idioma ideal según el origen de su corporativo, socios y mercados estratégicos.",
    idiomas: IDIOMAS,
  },

  dolor: {
    eyebrow: "El costo real de la barrera del idioma",
    titulo: "¿Qué le cuesta a su empresa que un directivo no domine el idioma del negocio?",
    sub: "Más que una incomodidad personal, es un costo estratégico que afecta a la organización en tres frentes:",
    tarjetas: [
      {
        icono: "reloj",
        titulo: "La decisión que se retrasa",
        texto: "Al perder el ritmo en juntas globales, el líder aporta menos y responde con cautela. La empresa pierde peso e influencia en las mesas donde se toman las decisiones clave.",
      },
      {
        icono: "globo",
        titulo: "La relación con casa matriz se enfría",
        texto: "Depender de traductores con sedes en Detroit, Múnich, Milán o São Paulo proyecta una imagen secundaria. Los proyectos y presupuestos se asignan a quien comunica directo.",
      },
      {
        icono: "balanza",
        titulo: "La negociación de alto nivel se delega",
        texto: "Por la barrera lingüística, el directivo delega acuerdos con socios o proveedores estratégicos. El criterio de quien más conoce el negocio queda fuera de la sala en el momento decisivo.",
      },
    ],
    cta: "Solicitar Cotización",
  },

  mercado: {
    eyebrow: "Por qué urge ahora",
    titulo: "Por qué su empresa no puede esperar a formar a su dirección",
    texto: "Cada junta global en la que su dirección no interviene al ritmo real es peso que la operación local cede. Estos son los datos que sostienen actuar ahora.",
    etiquetaCarrusel: "Razones para formar a la dirección ahora",
    tarjetas: [
      {
        icono: "usuarios",
        titulo: "El directivo bilingüe es escaso y su reemplazo es costoso",
        texto: "Menos del 15% de los profesionales en México son verdaderamente bilingües, una proporción que se reduce aún más en puestos de alta gerencia. Reemplazar a un líder debido a la barrera del idioma es un proceso lento, costoso y arriesgado; desarrollar al ejecutivo que ya conoce la operación y la cultura interna es la decisión más rentable.",
        fuente: "Fuente: Secretaría de Educación Pública",
      },
      {
        icono: "grafico",
        titulo: "La casa matriz asigna autonomía a quien comunica directamente",
        texto: "México es el primer socio comercial de Estados Unidos desde 2023. Las organizaciones cuya dirección negocia y reporta sin intermediarios obtienen mayor presupuesto, más proyectos y mayor autonomía. La barrera del idioma de un solo directivo limita el peso estratégico de toda la operación local.",
        fuente: "Fuente: Secretaría de Economía e INEGI",
      },
      {
        icono: "globo",
        titulo: "El nearshoring exige interlocución directa en otros idiomas",
        texto: "Con proyecciones de 500,000 nuevos empleos y 50,000 millones de dólares en inversión en los 3 próximos años, las decisiones de corporativos extranjeros se toman en inglés y, según su origen, en alemán, italiano o portugués. La empresa cuya dirección participa activamente en esa conversación define las reglas; la que depende de traductores, las acata.",
        fuente: "Fuente: Secretaría de Economía",
      },
      {
        icono: "alerta",
        titulo: "Una negociación mal interpretada cuesta más que cualquier programa",
        texto: "Un matiz perdido en un acuerdo con un socio internacional o con el corporativo puede traducirse en pérdida de margen o en cláusulas desfavorables. Cuando su directivo entiende y negocia directamente, protege decisiones financieras que valen mucho más que la inversión en su formación.",
        fuente: "Fuente: criterio de negocio S-Peak",
      },
    ],
  },

  diferenciadores: {
    eyebrow: "Por qué S-Peak",
    titulo: "Por qué empresas como Braskem Idesa, Chedraui y +500 más eligen S-Peak para su dirección",
    tarjetas: [
      {
        icono: "diana",
        titulo: "Programa diseñado para el rol directivo",
        texto: "Evitamos cursos generales. Entrenamos los escenarios reales de representación ejecutiva: juntas de dirección, comunicación con casa matriz, negociaciones y vocería.",
      },
      {
        icono: "escudo",
        titulo: "Confidencialidad y flexibilidad de agenda",
        texto: "Esquema confidencial con horarios adaptados a la alta dirección y reportes con el nivel de detalle que el propio ejecutivo autorice.",
      },
      {
        icono: "globo",
        titulo: "El idioma de su corporativo, no solo inglés",
        texto: "Inglés para consejos internacionales, además de francés, alemán, italiano, portugués o español para extranjeros, alineados al origen de su casa matriz o socios.",
      },
      {
        icono: "sello",
        titulo: "Registro STPS y deducción fiscal",
        texto: "Contamos con registro oficial ante la STPS. La inversión califica para la deducción adicional del 25% estipulada en el decreto del Plan México (DOF 2023 y 2025).",
      },
    ],
  },

  banda: {
    titulo: "Comience con una cotización para su dirección",
    texto: "Cuéntenos su caso. Le responderemos en menos de 24 horas hábiles.",
    cta: "Solicite una Cotización",
  },

  testimonios: {
    titulo: "Lo que dicen los equipos que ya se capacitaron con S-Peak",
  },

  faq: {
    titulo: "Preguntas frecuentes sobre capacitación de idiomas para Directivos",
    texto: "Resolvemos las dudas más comunes antes de que tenga que buscarlas.",
    ctaTitulo: "¿Tiene una pregunta que no está aquí?",
    ctaBoton: "Hable con un experto",
    preguntas: [
      {
        pregunta: "¿Cuánto cuesta formar a un director o a un grupo de mandos directivos en S-Peak?",
        respuesta: "El costo depende de la frecuencia, modalidad y duración. Ofrecemos formatos de coaching ejecutivo individual (1-a-1) o sesiones grupales de hasta 10 participantes. Solicite una cotización adaptada a las necesidades de su equipo.",
        respuestaPlana: "El costo depende de la frecuencia, modalidad y duración. Ofrecemos formatos de coaching ejecutivo individual (1-a-1) o sesiones grupales de hasta 10 participantes. Solicite una cotización adaptada a las necesidades de su equipo.",
      },
      {
        pregunta: "¿El programa respeta la confidencialidad y la agenda de un directivo?",
        respuesta: "Sí. Ofrecemos horarios altamente flexibles, un esquema estrictamente confidencial y reportes de avance con el nivel de detalle que el propio directivo autorice.",
        respuestaPlana: "Sí. Ofrecemos horarios altamente flexibles, un esquema estrictamente confidencial y reportes de avance con el nivel de detalle que el propio directivo autorice.",
      },
      {
        pregunta: "¿En cuánto tiempo un director estará listo para conducir reuniones en otro idioma?",
        respuesta: "Depende del nivel inicial. Avanzar de un nivel intermedio (B1) a uno apto para juntas y negociaciones (B2) toma de 6 a 9 meses. Desde un nivel básico (A2), el plazo requerido es de 12 a 18 meses.",
        respuestaPlana: "Depende del nivel inicial. Avanzar de un nivel intermedio (B1) a uno apto para juntas y negociaciones (B2) toma de 6 a 9 meses. Desde un nivel básico (A2), el plazo requerido es de 12 a 18 meses.",
      },
      {
        pregunta: "¿Cómo miden el progreso de un ejecutivo de alto nivel?",
        respuesta: "Evaluamos el desempeño real mediante entregables prácticos aplicados a su rol (juntas simuladas, negociaciones o presentaciones corporativas), no con exámenes de memoria. El área coordinadora recibe los reportes con el detalle previamente autorizado.",
        respuestaPlana: "Evaluamos el desempeño real mediante entregables prácticos aplicados a su rol (juntas simuladas, negociaciones o presentaciones corporativas), no con exámenes de memoria. El área coordinadora recibe los reportes con el detalle previamente autorizado.",
      },
      {
        pregunta: "¿Pueden trabajar con un solo directivo o solo con grupos?",
        respuesta: "Ambos. Diseñamos programas de coaching ejecutivo individual (1-a-1) o cursos grupales para mandos directivos con un límite de 10 participantes por sesión.",
        respuestaPlana: "Ambos. Diseñamos programas de coaching ejecutivo individual (1-a-1) o cursos grupales para mandos directivos con un límite de 10 participantes por sesión.",
      },
      {
        pregunta: "¿Qué idiomas ofrecen para la dirección?",
        respuesta: "Inglés, francés, alemán, italiano, portugués y español para extranjeros. El inglés se enfoca en comités globales, mientras que los demás idiomas se alinean al origen de su casa matriz o socios estratégicos.",
        respuestaPlana: "Inglés, francés, alemán, italiano, portugués y español para extranjeros. El inglés se enfoca en comités globales, mientras que los demás idiomas se alinean al origen de su casa matriz o socios estratégicos.",
      },
      {
        pregunta: "¿Pueden formar a directivos distribuidos en varias sedes o países?",
        respuesta: "Sí. Coordinamos la capacitación simultánea para líderes en México y filiales internacionales, centralizando la gestión y garantizando un estándar de calidad uniforme.",
        respuestaPlana: "Sí. Coordinamos la capacitación simultánea para líderes en México y filiales internacionales, centralizando la gestión y garantizando un estándar de calidad uniforme.",
      },
      {
        pregunta: "¿S-Peak está registrado ante la STPS?",
        respuesta: "Sí, contamos con registro oficial ante la Secretaría del Trabajo y Previsión Social y emitimos las constancias de capacitación correspondientes para su empresa.",
        respuestaPlana: "Sí, contamos con registro oficial ante la Secretaría del Trabajo y Previsión Social y emitimos las constancias de capacitación correspondientes para su empresa.",
      },
      {
        pregunta: "¿Cuál es el retorno de inversión (ROI) de formar a la dirección?",
        respuesta: "Se vuelve tangible cuando sus directivos reportan sin intermediarios, eliminan traductores y defienden presupuestos con autoridad. Una sola negociación internacional o acuerdo clave bien conducido cubre la inversión anual del programa.",
        respuestaPlana: "Se vuelve tangible cuando sus directivos reportan sin intermediarios, eliminan traductores y defienden presupuestos con autoridad. Una sola negociación internacional o acuerdo clave bien conducido cubre la inversión anual del programa.",
      },
      {
        pregunta: "¿Cómo garantizan que un directivo con poco tiempo realmente avance?",
        respuesta: "Diseñamos el plan en torno a su agenda con monitoreo proactivo. Ante ausencias consecutivas, notificamos a la empresa para reajustar las sesiones y proteger la inversión. El enfoque práctico en su día a día asegura un avance constante.",
        respuestaPlana: "Diseñamos el plan en torno a su agenda con monitoreo proactivo. Ante ausencias consecutivas, notificamos a la empresa para reajustar las sesiones y proteger la inversión. El enfoque práctico en su día a día asegura un avance constante.",
      },
    ],
  },

  servicio: {
    nombre: "Capacitación de idiomas para directivos y gerencia",
    tipo: "Capacitación corporativa de idiomas para directivos",
    descripcion:
      "Programas de idiomas para directores, gerentes y dueños de empresa. Negociación, juntas de dirección y relación con casa matriz. Confidencial y a la medida.",
  },
};

export default datos;
