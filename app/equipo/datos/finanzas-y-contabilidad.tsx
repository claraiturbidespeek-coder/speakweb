import { IDIOMAS, type DatosEquipo } from "../tipos";

/* Contenido de /equipo/finanzas-y-contabilidad/, del documento del cliente.
   Correcciones del buscar y reemplazar mal hecho y slugs canónicos: ver la
   cabecera de legal-y-juridico.tsx.

   OJO: la línea de prueba social de esta área no dice "+500 empresas" como las
   otras seis, sino "Empresas como Braskem Idesa y Chedraui". Viene así del
   documento y se respeta; queda anotado por si el cliente lo quiere alineado. */

const datos: DatosEquipo = {
  slug: "finanzas-y-contabilidad",
  nombre: "Finanzas y Contabilidad",

  hero: {
    etiqueta: "Idioma de negocios · Finanzas y Contabilidad",
    titulo: (
      <>
        Capacitación de idiomas para equipos de{" "}
        <strong>Finanzas y Contabilidad</strong>
      </>
    ),
    sub: "En finanzas, un dato mal comunicado altera decisiones corporativas. Capacitamos a su equipo en inglés, francés, alemán, italiano o portugués para reportar cierres, presentar resultados y coordinar con la casa matriz con claridad.",
    cta: "Solicitar Cotización",
    prueba: (
      <>
        Empresas como <strong>Braskem Idesa</strong> y <strong>Chedraui</strong> confían en
        S-Peak para capacitar a sus equipos.
      </>
    ),
    imagen: {
      // Provisional: la del mosaico del home.
      src: "/images/home/area-finanzas-y-contabilidad.jpg",
      alt: "Equipo de finanzas en capacitación de inglés de negocios",
    },
  },

  encuadre:
    "Su equipo ya posee el criterio contable. S-Peak aporta el idioma de negocios indispensable para reportar, presentar y coordinar con el corporativo, asegurando que sus números se comuniquen con claridad. No enseñamos contabilidad ni el lenguaje técnico de las normas: enseñamos el idioma con que su equipo comunica los resultados.",

  competencias: {
    eyebrow: "Las competencias lingüísticas de finanzas",
    titulo: "El idioma de negocios que su equipo financiero necesita para comunicar los números",
    sub: "No enseñamos contabilidad: su equipo ya la domina. Entrenamos el idioma con el que reporta, presenta y coordina ante el corporativo y los auditores.",
    tarjetas: [
      {
        icono: "grafico",
        titulo: "Reporte financiero a corporativo",
        texto: "Presentación de cierres, presupuestos y variaciones a la matriz con la soltura para responder preguntas en tiempo real.",
      },
      {
        icono: "presentacion",
        titulo: "Presentación de resultados y proyecciones",
        texto: "Comunicación clara de escenarios financieros ante el corporativo, defendiendo cifras y supuestos sin perder impacto estratégico.",
      },
      {
        icono: "lista",
        titulo: "Comunicación en auditorías",
        texto: "Capacidad para explicar soportes y responder a auditores internacionales a su mismo ritmo, eliminando retrasos en las revisiones. El criterio contable es de su equipo; nosotros quitamos la barrera del idioma.",
      },
      {
        icono: "mensaje",
        titulo: "Conversación financiera y de control",
        texto: "Coordinar con tesorería, control de gestión y el corporativo: explicar un supuesto, sustentar un número y discutir un escenario con el registro adecuado.",
      },
      {
        icono: "correo",
        titulo: "Comunicación escrita financiera",
        texto: "Redacción precisa de correos, notas explicativas y memos de cierre, garantizando mensajes claros y sin ambigüedades para la casa matriz.",
      },
      {
        icono: "lectura",
        titulo: "Lectura de directrices globales",
        texto: "Lectura fluida de reportes de grupo, lineamientos y comunicaciones del corporativo en su idioma original para agilizar la toma de decisiones locales.",
      },
    ],
  },

  franja: {
    titulo: "El idioma de su corporativo, no solo inglés",
    texto: "El inglés es el estándar de negocios global, pero si su matriz financiera está en Francia, Alemania, Italia o Brasil, capacitamos a su equipo en la lengua exacta con la que reporta y consolida. Definimos el idioma idóneo mediante un diagnóstico alineado al origen de su corporativo y sus auditores.",
    idiomas: IDIOMAS,
  },

  dolor: {
    eyebrow: "El costo real de la barrera del idioma",
    titulo: "¿Qué le cuesta a su empresa un dato bien calculado pero mal comunicado?",
    sub: "Más que un detalle de forma, la barrera del idioma genera un costo estratégico que afecta a la operación en tres frentes:",
    tarjetas: [
      {
        icono: "grafico",
        titulo: "El cierre financiero mal explicado a la matriz",
        texto: "Presentar presupuestos o variaciones sin la precisión requerida provoca interpretaciones erróneas en el corporativo. La filial local termina mal evaluada por fallas de comunicación, no por falta de resultados.",
      },
      {
        icono: "lista",
        titulo: "Auditorías internacionales retrasadas",
        texto: "No poder explicar los soportes al ritmo que exige un auditor externo o de grupo genera observaciones y requerimientos adicionales innecesarios, derivados únicamente de la limitación lingüística.",
      },
      {
        icono: "balanza",
        titulo: "Pérdida de peso estratégico en las decisiones",
        texto: "En comités globales de presupuesto y proyecciones, un equipo que no debate con fluidez cede el control. Las decisiones corporativas terminan tomándose sin considerar el criterio de la realidad local.",
      },
    ],
    cta: "Solicitar Cotización",
  },

  mercado: {
    eyebrow: "Por qué urge ahora",
    titulo: "Por qué su empresa no puede esperar para formar a su equipo de finanzas",
    texto: "Cada cierre que se explica a medias es credibilidad que la operación local cede. Estos son los datos que sostienen actuar ahora.",
    etiquetaCarrusel: "Razones para capacitar al equipo de finanzas ahora",
    tarjetas: [
      {
        icono: "alerta",
        titulo: "Un dato mal comunicado se evalúa como un mal resultado",
        texto: "Si la casa matriz no comprende la explicación de una variación o cierre, la filial queda mal calificada aunque las cifras sean correctas. Cerrar esta brecha protege la credibilidad de la operación local.",
        fuente: "Fuente: criterio de negocio S-Peak",
      },
      {
        icono: "usuarios",
        titulo: "El talento financiero bilingüe es escaso y de alta demanda",
        texto: "Menos del 15% de los profesionales en México dominan otro idioma. Desarrollar a los controllers, analistas y contadores que ya conocen sus números es más rentable que competir en el mercado laboral por estos perfiles.",
        fuente: "Fuente: Secretaría de Educación Pública",
      },
      {
        icono: "globo",
        titulo: "El nearshoring exige reportes globales inmediatos",
        texto: "Ante la proyección de 50,000 millones de dólares en inversión en los 3 próximos años, las filiales deben consolidar datos en inglés, alemán, italiano o portugués. Comunicar con fluidez asegura la autonomía ante la matriz.",
        fuente: "Fuente: Secretaría de Economía",
      },
      {
        icono: "reloj",
        titulo: "Auditorías internacionales lentas arriesgan la reputación",
        texto: "Las revisiones corporativas se realizan en el idioma de la casa matriz. No poder explicar soportes al ritmo del auditor genera observaciones innecesarias derivadas únicamente de la barrera lingüística.",
        fuente: "Fuente: criterio de negocio S-Peak",
      },
    ],
  },

  diferenciadores: {
    eyebrow: "Por qué S-Peak",
    titulo: "Por qué empresas como Braskem Idesa, Chedraui y más eligen S-Peak para su equipo de finanzas",
    tarjetas: [
      {
        icono: "diana",
        titulo: "Idioma de negocios especializado, no general",
        texto: "Sin cursos de conversación básica; entrenamos la comunicación precisa de reportes, variaciones y juntas con el corporativo. Su equipo ya domina la contabilidad, nosotros aportamos el idioma para explicarla.",
      },
      {
        icono: "reloj",
        titulo: "Flexibilidad adaptada a cierres financieros",
        texto: "Programas in-company estructurados para respetar la operación de su equipo, ajustándonos a los picos de alta carga de trabajo durante los cierres mensuales y anuales.",
      },
      {
        icono: "globo",
        titulo: "El idioma de su corporativo, no solo inglés",
        texto: "Inglés para flujos financieros globales, además de francés, alemán, italiano, portugués o español según el origen y la consolidación de su grupo corporativo.",
      },
      {
        icono: "sello",
        titulo: "Registro STPS y estímulo fiscal",
        texto: "Contamos con registro oficial ante la STPS. La inversión en capacitación puede calificar para los estímulos fiscales del Plan México (DOF); confirme la aplicación con su asesor fiscal.",
      },
    ],
  },

  banda: {
    titulo: "Comience con una cotización para su equipo de finanzas",
    texto: "Cuéntenos su caso. Le responderemos en menos de 24 horas hábiles.",
    cta: "Solicite una Cotización",
  },

  testimonios: {
    titulo: "Lo que dicen los equipos que ya se capacitaron con S-Peak",
  },

  faq: {
    titulo: "Preguntas frecuentes sobre capacitación de idiomas para Finanzas y Contabilidad",
    texto: "Resolvemos las dudas más comunes antes de que tenga que buscarlas.",
    ctaTitulo: "¿Tiene una pregunta que no está aquí?",
    ctaBoton: "Hable con un experto",
    preguntas: [
      {
        pregunta: "¿S-Peak da asesoría financiera o enseña contabilidad?",
        respuesta: "No. No enseñamos contabilidad ni normativas técnicas. Su equipo ya posee el criterio contable; nosotros aportamos el idioma de negocios necesario para reportar, presentar y coordinar con el corporativo.",
        respuestaPlana: "No. No enseñamos contabilidad ni normativas técnicas. Su equipo ya posee el criterio contable; nosotros aportamos el idioma de negocios necesario para reportar, presentar y coordinar con el corporativo.",
      },
      {
        pregunta: "¿Los instructores son contadores?",
        respuesta: "No. Son profesores especializados en idioma de negocios, nativos o bilingües certificados. Su rol es habilitar lingüísticamente al equipo para comunicar sus cifras con claridad, no asesorar financieramente.",
        respuestaPlana: "No. Son profesores especializados en idioma de negocios, nativos o bilingües certificados. Su rol es habilitar lingüísticamente al equipo para comunicar sus cifras con claridad, no asesorar financieramente.",
      },
      {
        pregunta: "¿Cuánto cuesta capacitar a un equipo de finanzas en S-Peak?",
        respuesta: "Depende de la frecuencia, la modalidad, la duración y el tamaño del grupo (de 1 a 10 personas). A mayor volumen de participantes, menor es la inversión por persona. Solicite una cotización adaptada a su área.",
        respuestaPlana: "Depende de la frecuencia, la modalidad, la duración y el tamaño del grupo (de 1 a 10 personas). A mayor volumen de participantes, menor es la inversión por persona. Solicite una cotización adaptada a su área.",
      },
      {
        pregunta: "¿Pueden adaptar los horarios al calendario de cierres?",
        respuesta: "Sí. Diseñamos el programa respetando la alta carga operativa de sus cierres mensuales y anuales para no interferir con las entregas a la matriz.",
        respuestaPlana: "Sí. Diseñamos el programa respetando la alta carga operativa de sus cierres mensuales y anuales para no interferir con las entregas a la matriz.",
      },
      {
        pregunta: "¿Enseñan vocabulario financiero específico?",
        respuesta: "Sí. Entrenamos el vocabulario funcional para presentar cierres, explicar variaciones y participar en juntas de control, enfocándonos en la comunicación del negocio —no en la teoría contable—. El vocabulario específico de su operación lo afinamos en el diagnóstico, con el contexto que su equipo aporta.",
        respuestaPlana: "Sí. Entrenamos el vocabulario funcional para presentar cierres, explicar variaciones y participar en juntas de control, enfocándonos en la comunicación del negocio —no en la teoría contable—. El vocabulario específico de su operación lo afinamos en el diagnóstico, con el contexto que su equipo aporta.",
      },
      {
        pregunta: "¿En cuánto tiempo mi equipo podrá reportar a corporativo en otro idioma?",
        respuesta: "Depende del nivel inicial. Pasar de un nivel básico (A2) a uno apto para reportes y presentaciones (B2) toma de 12 a 18 meses. Si el equipo ya es intermedio (B1), toma de 6 a 9 meses.",
        respuestaPlana: "Depende del nivel inicial. Pasar de un nivel básico (A2) a uno apto para reportes y presentaciones (B2) toma de 12 a 18 meses. Si el equipo ya es intermedio (B1), toma de 6 a 9 meses.",
      },
      {
        pregunta: "¿Cómo miden el progreso de un perfil financiero?",
        respuesta: "Evaluamos el desempeño real mediante entregables prácticos (explicación de variaciones, presentaciones de cierre o memos financieros) bajo una rúbrica lingüística. El coordinador recibe reportes mensuales con las evidencias correspondientes.",
        respuestaPlana: "Evaluamos el desempeño real mediante entregables prácticos (explicación de variaciones, presentaciones de cierre o memos financieros) bajo una rúbrica lingüística. El coordinador recibe reportes mensuales con las evidencias correspondientes.",
      },
      {
        pregunta: "¿Trabajan con el área de contabilidad, control y tesorería?",
        respuesta: "Sí. Capacitamos a colaboradores de contabilidad, contraloría, tesorería y planeación financiera. El enfoque es el idioma de negocios con que se comunican y reportan, no el lenguaje técnico de cada especialidad. En el diagnóstico ajustamos el vocabulario según con quién interactúa cada equipo: corporativo, auditores o casa matriz.",
        respuestaPlana: "Sí. Capacitamos a colaboradores de contabilidad, contraloría, tesorería y planeación financiera. El enfoque es el idioma de negocios con que se comunican y reportan, no el lenguaje técnico de cada especialidad. En el diagnóstico ajustamos el vocabulario según con quién interactúa cada equipo: corporativo, auditores o casa matriz.",
      },
      {
        pregunta: "¿Qué idiomas ofrecen para finanzas?",
        respuesta: "Inglés, francés, alemán, italiano, portugués y español para extranjeros. Definimos el idioma idóneo en el diagnóstico según el origen de su corporativo o grupo.",
        respuestaPlana: "Inglés, francés, alemán, italiano, portugués y español para extranjeros. Definimos el idioma idóneo en el diagnóstico según el origen de su corporativo o grupo.",
      },
      {
        pregunta: "¿Pueden capacitar equipos financieros distribuidos en varias sedes o países?",
        respuesta: "Sí. Coordinamos el entrenamiento simultáneo de equipos en México y sedes internacionales de forma centralizada y bajo un mismo estándar de calidad. (Las sesiones en línea se imparten en cualquier sede; la modalidad presencial aplica en México.)",
        respuestaPlana: "Sí. Coordinamos el entrenamiento simultáneo de equipos en México y sedes internacionales de forma centralizada y bajo un mismo estándar de calidad. (Las sesiones en línea se imparten en cualquier sede; la modalidad presencial aplica en México.)",
      },
      {
        pregunta: "¿S-Peak está registrado ante la STPS?",
        respuesta: "Sí. Contamos con registro oficial ante la Secretaría del Trabajo y Previsión Social y emitimos las constancias de capacitación correspondientes.",
        respuestaPlana: "Sí. Contamos con registro oficial ante la Secretaría del Trabajo y Previsión Social y emitimos las constancias de capacitación correspondientes.",
      },
      {
        pregunta: "¿Cuál es el retorno de inversión (ROI) de capacitar al equipo de finanzas?",
        respuesta: "Se vuelve tangible al eliminar interpretaciones erróneas en la presentación de cifras corporativas y al agilizar las auditorías internacionales. Asegurar que el criterio de su equipo se transmita sin el filtro del idioma protege la reputación de la filial.",
        respuestaPlana: "Se vuelve tangible al eliminar interpretaciones erróneas en la presentación de cifras corporativas y al agilizar las auditorías internacionales. Asegurar que el criterio de su equipo se transmita sin el filtro del idioma protege la reputación de la filial.",
      },
    ],
  },

  servicio: {
    nombre: "Capacitación de idiomas para equipos de finanzas y contabilidad",
    tipo: "Capacitación corporativa de idiomas para finanzas y contabilidad",
    descripcion:
      "Inglés y otros idiomas para equipos de finanzas y contabilidad. El idioma con que su equipo reporta y presenta cifras al corporativo.",
  },
};

export default datos;
