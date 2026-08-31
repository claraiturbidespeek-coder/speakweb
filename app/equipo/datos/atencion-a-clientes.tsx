import { IDIOMAS, type DatosEquipo } from "../tipos";

/* Contenido de /equipo/atencion-a-clientes/, del documento del cliente.
   Correcciones del buscar y reemplazar mal hecho y slugs canónicos: ver la
   cabecera de legal-y-juridico.tsx. En esta área el reemplazo había entrado
   también en el cuerpo del texto ("cursos de a soporte, posventa y contact
   centers", "¿Cuánto cuesta cursos de a un equipo de atención?").

   Esta área no trae nota de encuadre en el documento: no se le inventa una. */

const datos: DatosEquipo = {
  slug: "atencion-a-clientes",
  nombre: "Atención a Clientes",

  hero: {
    etiqueta: "Idioma de negocios · Atención y Contact Center",
    titulo: (
      <>
        Capacitación de idiomas para equipos de <strong>Atención a Clientes</strong>
      </>
    ),
    sub: "Su equipo de atención es la voz posventa de la empresa. Capacitamos a soporte, posventa y contact centers en inglés, francés, alemán, italiano o portugués para resolver dudas sin fricciones y evitar la pérdida de clientes internacionales.",
    cta: "Solicitar Cotización",
    prueba: (
      <>
        +<strong>500 empresas</strong> confían en S-Peak para capacitar a sus equipos de
        atención.
      </>
    ),
    imagen: {
      // Provisional: la del mosaico del home.
      src: "/images/home/area-atencion-a-clientes.webp",
      alt: "Agente de soporte resolviendo en otro idioma con cliente internacional",
    },
  },

  competencias: {
    eyebrow: "Las competencias de atención",
    titulo: "Las competencias lingüísticas que su equipo necesita para resolver en cualquier idioma",
    sub: "No formamos a un agente de soporte como a un vendedor: entrenamos las situaciones reales donde se define la confianza del cliente en la posventa.",
    tarjetas: [
      {
        icono: "mensaje",
        titulo: "Atención y resolución en vivo",
        texto: "Comprensión del problema a la primera, formulación de preguntas correctas y resolución por teléfono, chat o videollamada sin alargar la interacción por barreras lingüísticas.",
      },
      {
        icono: "enlace",
        titulo: "Soporte técnico claro",
        texto: "Explicación precisa de pasos, configuraciones y soluciones. Capacidad para traducir procesos técnicos complejos a un lenguaje accesible sin perder exactitud.",
      },
      {
        icono: "escudo",
        titulo: "Manejo de quejas y clientes molestos",
        texto: "Técnicas para desactivar la tensión, validar la incidencia y guiar la conversación con el tono adecuado a la cultura del cliente, asegurando la retención de la cuenta.",
      },
      {
        icono: "correo",
        titulo: "Comunicación escrita de soporte",
        texto: "Redacción clara de correos, tickets y mensajes de seguimiento, evitando ambigüedades que generen segundos contactos innecesarios.",
      },
      {
        icono: "diana",
        titulo: "Seguimiento y posventa",
        texto: "Confirmación de soluciones y anticipación de necesidades. Mantener el contacto en su idioma es lo que transforma una incidencia operativa en una renovación.",
      },
      {
        icono: "usuarios",
        titulo: "Comunicación interna y de cuenta",
        texto: "Reporte de incidencias, escalación correcta y coordinación fluida con equipos globales o el cliente final, evitando que la información se pierda entre niveles.",
      },
    ],
  },

  franja: {
    titulo: "El idioma de su cliente, no solo inglés",
    texto: "El inglés domina el soporte global y las cuentas internacionales, pero no siempre es suficiente. Si su empresa atiende a clientes en Brasil, da soporte a usuarios alemanes o gestiona cuentas con consumidores franceses o italianos, capacitamos a su equipo en la lengua que realmente retiene la cuenta. A través de un diagnóstico previo, definimos el idioma idóneo según el origen de sus clientes y las operaciones que maneja.",
    idiomas: IDIOMAS,
  },

  dolor: {
    eyebrow: "El costo real de la barrera del idioma",
    titulo: "¿Qué le cuesta a su empresa una atención que no resuelve en el idioma del cliente?",
    sub: "Más que una molestia operativa, es un costo financiero directo que se refleja en tres frentes, tanto en cuentas propias como de terceros:",
    tarjetas: [
      {
        icono: "alerta",
        titulo: "El cliente que no renueva",
        texto: "Un problema simple mal resuelto por la barrera del idioma provoca que el cliente extranjero no renueve. Retener a un cliente cuesta entre 5 y 7 veces menos que adquirir uno nuevo; la raíz de la pérdida suele ser la última conversación de soporte, no el producto.",
      },
      {
        icono: "reloj",
        titulo: "El nivel de servicio incumplido",
        texto: "Para contact centers o BPOs, las llamadas mal comprendidas elevan el tiempo de resolución y reducen la satisfacción. Un indicador de calidad (SLA) fuera de rango pone en riesgo contratos y cuentas completas.",
      },
      {
        icono: "balanza",
        titulo: "La queja que escala innecesariamente",
        texto: "Incidentes que un agente capacitado cerraría en la primera interacción se transfieren a supervisores o a bilingües internos saturados. Esto consume tiempo costoso y daña la percepción del cliente sobre la capacidad de resolución de la empresa.",
      },
    ],
    cta: "Solicitar Cotización",
  },

  mercado: {
    eyebrow: "Por qué urge ahora",
    titulo: "Por qué su empresa no puede esperar para formar a su equipo de atención",
    texto: "Cada conversación de soporte que no resuelve por el idioma es una cuenta que se acerca a la puerta. Estos son los datos que sostienen actuar ahora.",
    etiquetaCarrusel: "Razones para capacitar al equipo de atención ahora",
    tarjetas: [
      {
        icono: "diana",
        titulo: "Retener cuesta menos que adquirir un nuevo cliente",
        texto: "Captar un cliente es entre 5 y 7 veces más costoso que mantenerlo. La renovación se define en la posventa; capacitar al equipo que ya conoce su producto es la opción más rentable para asegurar la permanencia de las cuentas.",
        fuente: "Fuente: criterio de negocio S-Peak",
      },
      {
        icono: "usuarios",
        titulo: "El talento bilingüe es escaso y de alta rotación",
        texto: "Menos del 15% de los profesionales en México son bilingües, un perfil crítico y muy disputado en centros de contacto. Desarrollar a su personal actual reduce la dependencia del mercado laboral y protege la continuidad del servicio.",
        fuente: "Fuente: Secretaría de Educación Pública",
      },
      {
        icono: "globo",
        titulo: "El nearshoring exige soporte multilingüe inmediato",
        texto: "Con 50,000 millones de dólares en inversión proyectados para los 3 próximos años, se requieren equipos listos para dar soporte en inglés, alemán, italiano o portugués. Las empresas preparadas conservan las cuentas; las demás las pierden en la primera auditoría de calidad.",
        fuente: "Fuente: Secretaría de Economía",
      },
      {
        icono: "alerta",
        titulo: "Un nivel de servicio incumplido arriesga contratos enteros",
        texto: "Las barreras de idioma elevan los tiempos de resolución y deterioran los indicadores de calidad (SLAs), exponiendo a la operación a penalizaciones o a la pérdida de la cuenta completa. Resolver directamente protege los ingresos del negocio.",
        fuente: "Fuente: criterio de negocio S-Peak",
      },
    ],
  },

  diferenciadores: {
    eyebrow: "Por qué S-Peak",
    titulo: "Empresas como Braskem Idesa, Chedraui y +500 más eligen S-Peak para su equipo de atención",
    tarjetas: [
      {
        icono: "diana",
        titulo: "Diseñado para la operación de atención",
        texto: "Sin cursos genéricos; entrenamos llamadas, soporte técnico, seguimiento y gestión de quejas, que son los escenarios donde realmente se retiene al cliente.",
      },
      {
        icono: "reloj",
        titulo: "Horarios adaptados a turnos operativos",
        texto: "Nos ajustamos a picos de demanda y turnos rotativos para capacitar al personal sin interrumpir la continuidad del servicio.",
      },
      {
        icono: "globo",
        titulo: "El idioma de su cliente, no solo inglés",
        texto: "Inglés para soporte global, además de francés, alemán, italiano, portugués o español para extranjeros según el origen de sus cuentas.",
      },
      {
        icono: "sello",
        titulo: "Registro STPS y beneficio fiscal",
        texto: "Contamos con registro oficial ante la STPS. La inversión aplica para la deducción adicional del 25% bajo el decreto del Plan México (DOF 2023 y 2025).",
      },
    ],
  },

  banda: {
    titulo: "Comience con una cotización para su equipo de atención",
    texto: "Cuéntenos su caso. Le responderemos en menos de 24 horas hábiles.",
    cta: "Solicite una Cotización",
  },

  testimonios: {
    titulo: "Lo que dicen los equipos que ya se capacitaron con S-Peak",
  },

  faq: {
    titulo: "Preguntas frecuentes sobre capacitación de idiomas para Atención a Clientes",
    texto: "Resolvemos las dudas más comunes antes de que tenga que buscarlas.",
    ctaTitulo: "¿Tiene una pregunta que no está aquí?",
    ctaBoton: "Hable con un experto",
    preguntas: [
      {
        pregunta: "¿Cuánto cuesta capacitar a un equipo de atención en S-Peak?",
        respuesta: "Depende de la frecuencia, modalidad, duración y tamaño del grupo (de 1 a 10 personas). A mayor volumen de participantes, menor es la inversión por persona. Solicite una cotización adaptada a su operación.",
        respuestaPlana: "Depende de la frecuencia, modalidad, duración y tamaño del grupo (de 1 a 10 personas). A mayor volumen de participantes, menor es la inversión por persona. Solicite una cotización adaptada a su operación.",
      },
      {
        pregunta: "¿Pueden adaptar los horarios a una operación por turnos o de contact center?",
        respuesta: "Sí. Diseñamos el programa ajustándonos a turnos rotativos, picos de demanda y disponibilidad de los agentes para no interrumpir el servicio al cliente.",
        respuestaPlana: "Sí. Diseñamos el programa ajustándonos a turnos rotativos, picos de demanda y disponibilidad de los agentes para no interrumpir el servicio al cliente.",
      },
      {
        pregunta: "¿En cuánto tiempo mi equipo de atención podrá resolver en otro idioma?",
        respuesta: "Depende del nivel inicial. Pasar de un nivel básico (A2) a uno apto para resolver incidencias y quejas (B2) toma de 12 a 18 meses. Si el equipo ya es intermedio (B1), toma de 6 a 9 meses.",
        respuestaPlana: "Depende del nivel inicial. Pasar de un nivel básico (A2) a uno apto para resolver incidencias y quejas (B2) toma de 12 a 18 meses. Si el equipo ya es intermedio (B1), toma de 6 a 9 meses.",
      },
      {
        pregunta: "¿Cómo miden el progreso de los agentes?",
        respuesta: "Evaluamos el desempeño real mediante entregables prácticos (llamadas simuladas, gestión de quejas o tickets de soporte) con una rúbrica profesional. El coordinador recibe reportes mensuales con enlaces para verificar este avance.",
        respuestaPlana: "Evaluamos el desempeño real mediante entregables prácticos (llamadas simuladas, gestión de quejas o tickets de soporte) con una rúbrica profesional. El coordinador recibe reportes mensuales con enlaces para verificar este avance.",
      },
      {
        pregunta: "¿Trabajan tanto con áreas de soporte de empresas como con contact center y BPO?",
        respuesta: "Sí. Capacitamos tanto a equipos internos de soporte y posventa como a operaciones de contact center y BPO que gestionan cuentas de clientes finales de terceros.",
        respuestaPlana: "Sí. Capacitamos tanto a equipos internos de soporte y posventa como a operaciones de contact center y BPO que gestionan cuentas de clientes finales de terceros.",
      },
      {
        pregunta: "¿Qué idiomas ofrecen para atención a clientes?",
        respuesta: "Inglés, francés, alemán, italiano, portugués y español para extranjeros. El inglés se enfoca en soporte global, mientras que los demás idiomas se alinean al origen de las cuentas internacionales que opera.",
        respuestaPlana: "Inglés, francés, alemán, italiano, portugués y español para extranjeros. El inglés se enfoca en soporte global, mientras que los demás idiomas se alinean al origen de las cuentas internacionales que opera.",
      },
      {
        pregunta: "¿Pueden capacitar equipos de atención distribuidos en varias sedes o países?",
        respuesta: "Sí. Coordinamos el entrenamiento simultáneo en México y filiales internacionales de forma centralizada y bajo un mismo estándar de calidad.",
        respuestaPlana: "Sí. Coordinamos el entrenamiento simultáneo en México y filiales internacionales de forma centralizada y bajo un mismo estándar de calidad.",
      },
      {
        pregunta: "¿S-Peak está registrado ante la STPS?",
        respuesta: "Sí. Contamos con registro oficial ante la Secretaría del Trabajo y Previsión Social y emitimos las constancias de capacitación correspondientes para su empresa.",
        respuestaPlana: "Sí. Contamos con registro oficial ante la Secretaría del Trabajo y Previsión Social y emitimos las constancias de capacitación correspondientes para su empresa.",
      },
      {
        pregunta: "¿Cuál es el retorno de inversión (ROI) de capacitar al equipo de atención?",
        respuesta: "Se traduce en mayor resolución en el primer contacto, menos escalaciones y cumplimiento de los niveles de servicio (SLAs). Retener una sola cuenta internacional en riesgo cubre la inversión anual del programa.",
        respuestaPlana: "Se traduce en mayor resolución en el primer contacto, menos escalaciones y cumplimiento de los niveles de servicio (SLAs). Retener una sola cuenta internacional en riesgo cubre la inversión anual del programa.",
      },
      {
        pregunta: "¿Cómo garantizan que los colaboradores realmente aprendan y no solo asistan?",
        respuesta: "Sustituimos los exámenes teóricos por evidencias de desempeño aplicables (una llamada real grabada, un ticket o una resolución por chat). Al cierre, entregamos resultados con pruebas verificables del avance.",
        respuestaPlana: "Sustituimos los exámenes teóricos por evidencias de desempeño aplicables (una llamada real grabada, un ticket o una resolución por chat). Al cierre, entregamos resultados con pruebas verificables del avance.",
      },
    ],
  },

  servicio: {
    nombre: "Capacitación de idiomas para equipos de atención a clientes",
    tipo: "Capacitación corporativa de idiomas para atención a clientes",
    descripcion:
      "Inglés y otros idiomas para equipos de soporte, posventa y contact center. Atención sin fricción, retención de clientes y cumplimiento de niveles de servicio.",
  },
};

export default datos;
