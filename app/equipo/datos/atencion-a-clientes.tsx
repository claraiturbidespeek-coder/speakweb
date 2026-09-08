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
        Capacitación de idiomas para equipos de{" "}
        <strong>Atención a Clientes</strong>
      </>
    ),
    sub: "Su equipo de atención es la voz posventa de la empresa. Capacitamos a soporte, posventa y contact centers en inglés, francés, alemán, italiano o portugués para resolver dudas sin fricciones y evitar la pérdida de clientes internacionales.",
    cta: "Solicite una Cotización",
    prueba: (
      <>
        +<strong>500 empresas</strong> confían en S-Peak para capacitar a sus
        equipos de atención.
      </>
    ),
    imagen: {
      // Provisional: la del mosaico del home.
      src: "/images/home/area-atencion-a-clientes.webp",
      alt: "Agente de soporte resolviendo en otro idioma con cliente internacional",
    },
  },

  competencias: {
    eyebrow: "Las competencias lingüísticas del equipo de atención a clientes",
    titulo:
      "Las competencias lingüísticas que su equipo necesita para resolver en cualquier idioma",
    sub: "No formamos a un agente de soporte como a un vendedor: entrenamos las situaciones reales donde se define la confianza del cliente en la posventa.",
    tarjetas: [
      {
        icono: "diadema",
        titulo: "Llamadas y videollamadas",
        texto: (
          <>
            Entender a un cliente con acento, con ruido o hablando rápido, y
            responder en el momento. Sin pedir que repita tres veces ni pasar la
            llamada a un compañero que traduzca:{" "}
            <strong>cada repetición se paga en tiempo de atención.</strong>
          </>
        ),
      },
      {
        icono: "mensaje",
        titulo: "Chat y mensajería",
        texto: (
          <>
            Resolver por escrito y en vivo, con varias conversaciones abiertas a
            la vez, sin que la prisa produzca un mensaje que el cliente no
            entiende.{" "}
            <strong>Es el canal más barato, y solo si no rebota.</strong>
          </>
        ),
      },
      {
        icono: "lista",
        titulo: "Datos y confirmaciones",
        texto: (
          <>
            Deletrear y confirmar nombres, correos, direcciones y números de
            orden a la primera.{" "}
            <strong>
              Un dígito mal tomado es un pedido a otra ciudad y un caso que se
              vuelve a abrir.
            </strong>
          </>
        ),
      },
      {
        icono: "lectura",
        titulo: "Vocabulario y explicación técnica",
        texto: (
          <>
            El nombre real de su producto, sus procesos y sus fallas en el
            idioma del cliente, y la capacidad de explicarlos sin jerga y sin
            perder exactitud.{" "}
            <strong>
              Es lo que decide si se resuelve en el primer contacto.
            </strong>
          </>
        ),
      },
      {
        icono: "escudo",
        titulo: "Quejas y clientes molestos",
        texto: (
          <>
            Desactivar la tensión, validar la incidencia y sostener la política
            cuando la respuesta es no, con el tono adecuado a la cultura del
            cliente.{" "}
            <strong>Ahí se retiene o se pierde la cuenta.</strong>
          </>
        ),
      },
      {
        icono: "enlace",
        titulo: "Espera y transferencia",
        texto: (
          <>
            Avisar antes de poner en espera, dar un tiempo estimado y transferir
            con contexto, para que el cliente no cuente su historia otra vez.{" "}
            <strong>Es la diferencia entre cerrar y escalar.</strong>
          </>
        ),
      },
      {
        icono: "correo",
        titulo: "Correos y tickets",
        texto: (
          <>
            Redactar sin ambigüedades y entender el mensaje del cliente
            extranjero aunque venga mal escrito.{" "}
            <strong>
              Cada malentendido es un segundo contacto que nadie presupuestó.
            </strong>
          </>
        ),
      },
      {
        icono: "apreton",
        titulo: "Seguimiento y cuenta",
        texto: (
          <>
            Confirmar que quedó resuelto, anticipar lo siguiente y presentar
            resultados a la cuenta.{" "}
            <strong>Es la conversación donde se decide la renovación.</strong>
          </>
        ),
      },
    ],
  },

  franja: {
    titulo: "El idioma de su cliente, no solo inglés",
    texto: (
      <>
        La mayoría de nuestros programas de atención son en inglés, porque es el
        idioma de la mayoría de las cuentas internacionales. Pero si su equipo
        atiende clientes en Brasil, Alemania, Francia o Italia, lo capacitamos
        en <strong>la lengua que realmente retiene la cuenta</strong>. En el
        diagnóstico definimos cuál, según el origen de sus clientes y las
        operaciones que maneja.
      </>
    ),
    idiomas: IDIOMAS,
  },

  dolor: {
    eyebrow: "El costo real de la barrera del idioma",
    titulo:
      "Su equipo ya sabe resolver. Le falta hacerlo en el idioma de su cliente.",
    sub: "Más que una molestia operativa, es un costo financiero directo, y se refleja en tres frentes:",
    tarjetas: [
      {
        icono: "alerta",
        titulo: "El cliente que no renueva",
        texto:
          "Un problema simple mal resuelto por la barrera del idioma provoca que el cliente extranjero no renueve. Retener a un cliente cuesta entre 5 y 7 veces menos que adquirir uno nuevo; la raíz de la pérdida suele ser la última conversación de soporte, no el producto.",
      },
      {
        icono: "reloj",
        titulo: "El nivel de servicio incumplido",
        texto: (
          <>
            Para contact centers o BPOs, las llamadas mal comprendidas elevan el
            tiempo de resolución y reducen la satisfacción. Un indicador de
            calidad (SLA) fuera de rango{" "}
            <strong>pone en riesgo contratos y cuentas completas</strong>.
          </>
        ),
      },
      {
        icono: "balanza",
        titulo: "La queja que escala innecesariamente",
        texto: (
          <>
            Incidentes que un agente capacitado cerraría en la primera
            interacción se transfieren a supervisores o a{" "}
            <strong>bilingües internos saturados</strong>. Esto consume tiempo
            costoso y le enseña al cliente que su empresa no puede resolverle
            sola.
          </>
        ),
      },
    ],
    cta: "Solicite una Cotización",
  },

  mercado: {
    eyebrow: "Por qué urge ahora",
    titulo:
      "Por qué su empresa no puede esperar para formar a su equipo de atención",
    texto:
      "Cada conversación de soporte que no resuelve por el idioma es una cuenta que se acerca a la puerta. Estos son los datos que sostienen actuar ahora.",
    etiquetaCarrusel: "Razones para capacitar al equipo de atención ahora",
    tarjetas: [
      {
        icono: "diana",
        titulo: "Retener cuesta menos que adquirir un nuevo cliente",
        texto: (
          <>
            Adquirir un cliente nuevo cuesta varias veces más que conservar uno.{" "}
            <strong>La renovación se define en la posventa</strong>: capacitar
            al equipo que ya conoce su producto es la vía más rentable para
            asegurar la permanencia de las cuentas.
          </>
        ),
        fuente: "Fuente: Harvard Business Review (Bain & Company)",
      },
      {
        icono: "usuarios",
        titulo: "El talento bilingüe es escaso y de alta rotación",
        texto: (
          <>
            Alrededor de 8 de cada 100 personas ocupadas en México hablan
            inglés, y en centros de contacto es de los perfiles más
            disputados.{" "}
            <strong>
              Desarrollar a su personal actual reduce la dependencia del mercado
              laboral
            </strong>{" "}
            y protege la continuidad del servicio.
          </>
        ),
        fuente: "Fuente: ENOE, INEGI",
      },
      {
        icono: "globo",
        titulo: "El nearshoring exige soporte multilingüe inmediato",
        texto:
          "Con 50,000 millones de dólares en inversión proyectados para los 3 próximos años, se requieren equipos listos para dar soporte en inglés, alemán, italiano o portugués. Las empresas preparadas conservan las cuentas; las demás las pierden en la primera auditoría de calidad.",
        fuente: "Fuente: Secretaría de Economía",
      },
      {
        icono: "alerta",
        titulo: "Un nivel de servicio incumplido arriesga contratos enteros",
        texto: (
          <>
            Los contratos con niveles de servicio incluyen{" "}
            <strong>
              créditos por incumplimiento y derecho de terminación cuando las
              fallas se repiten
            </strong>.
            Las barreras de idioma elevan los tiempos de resolución y deterioran
            esos indicadores, exponiendo a la operación a{" "}
            <strong>
              penalizaciones o a la pérdida de la cuenta completa
            </strong>.
          </>
        ),
      },
    ],
  },

  diferenciadores: {
    eyebrow: "Por qué S-Peak",
    titulo:
      "Empresas como Braskem Idesa, Chedraui y +500 más eligen S-Peak para su equipo de atención",
    tarjetas: [
      {
        icono: "diana",
        titulo: "Diseñado para la operación de atención",
        texto:
          "Sin cursos genéricos; entrenamos llamadas, soporte técnico, seguimiento y gestión de quejas, que son los escenarios donde realmente se retiene al cliente.",
      },
      {
        icono: "reloj",
        titulo: "Horarios adaptados a turnos operativos",
        texto:
          "Nos ajustamos a picos de demanda y turnos rotativos para capacitar al personal sin interrumpir la continuidad del servicio.",
      },
      {
        icono: "globo",
        titulo: "El idioma de su cliente, no solo inglés",
        texto:
          "Inglés para soporte global, además de francés, alemán, italiano, portugués o español para extranjeros según el origen de sus cuentas.",
      },
      {
        icono: "sello",
        titulo: "Registro STPS y beneficio fiscal",
        texto:
          "Contamos con registro oficial ante la STPS. La inversión aplica para la deducción adicional del 25% bajo el decreto del Plan México (DOF 2023 y 2025).",
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
    titulo:
      "Preguntas frecuentes sobre capacitación de idiomas para Atención a Clientes",
    texto: "Resolvemos las dudas más comunes antes de que tenga que buscarlas.",
    ctaTitulo: "¿Tiene una pregunta que no está aquí?",
    ctaBoton: "Solicite una Cotización",
    preguntas: [
      {
        pregunta: "¿Cuánto cuesta capacitar a un equipo de atención en S-Peak?",
        respuesta:
          "Depende de la frecuencia, modalidad, duración y tamaño del grupo (de 1 a 10 personas). A mayor volumen de participantes, menor es la inversión por persona. Solicite una cotización adaptada a su operación.",
        respuestaPlana:
          "Depende de la frecuencia, modalidad, duración y tamaño del grupo (de 1 a 10 personas). A mayor volumen de participantes, menor es la inversión por persona. Solicite una cotización adaptada a su operación.",
      },
      {
        pregunta:
          "¿Pueden adaptar los horarios a una operación por turnos o de contact center?",
        respuesta:
          "Sí. Diseñamos el programa ajustándonos a turnos rotativos, picos de demanda y disponibilidad de los agentes para no interrumpir el servicio al cliente.",
        respuestaPlana:
          "Sí. Diseñamos el programa ajustándonos a turnos rotativos, picos de demanda y disponibilidad de los agentes para no interrumpir el servicio al cliente.",
      },
      {
        pregunta:
          "¿En cuánto tiempo mi equipo de atención podrá resolver en otro idioma?",
        respuesta:
          "Depende del nivel inicial. Pasar de un nivel básico (A2) a uno apto para resolver incidencias y quejas (B2) toma de 12 a 18 meses. Si el equipo ya es intermedio (B1), toma de 6 a 9 meses.",
        respuestaPlana:
          "Depende del nivel inicial. Pasar de un nivel básico (A2) a uno apto para resolver incidencias y quejas (B2) toma de 12 a 18 meses. Si el equipo ya es intermedio (B1), toma de 6 a 9 meses.",
      },
      {
        pregunta: "¿Cómo miden el progreso de los agentes?",
        respuesta:
          "Evaluamos el desempeño real mediante entregables prácticos (llamadas simuladas, gestión de quejas o tickets de soporte) con una rúbrica profesional. El coordinador recibe reportes mensuales con enlaces para verificar este avance.",
        respuestaPlana:
          "Evaluamos el desempeño real mediante entregables prácticos (llamadas simuladas, gestión de quejas o tickets de soporte) con una rúbrica profesional. El coordinador recibe reportes mensuales con enlaces para verificar este avance.",
      },
      {
        pregunta:
          "¿Trabajan tanto con áreas de soporte de empresas como con contact center y BPO?",
        respuesta:
          "Sí. Capacitamos tanto a equipos internos de soporte y posventa como a operaciones de contact center y BPO que gestionan cuentas de clientes finales de terceros.",
        respuestaPlana:
          "Sí. Capacitamos tanto a equipos internos de soporte y posventa como a operaciones de contact center y BPO que gestionan cuentas de clientes finales de terceros.",
      },
      {
        pregunta: "¿Qué idiomas ofrecen para atención a clientes?",
        respuesta:
          "Inglés, francés, alemán, italiano, portugués y español para extranjeros. El inglés se enfoca en soporte global, mientras que los demás idiomas se alinean al origen de las cuentas internacionales que opera.",
        respuestaPlana:
          "Inglés, francés, alemán, italiano, portugués y español para extranjeros. El inglés se enfoca en soporte global, mientras que los demás idiomas se alinean al origen de las cuentas internacionales que opera.",
      },
      {
        pregunta:
          "¿Pueden capacitar equipos de atención distribuidos en varias sedes o países?",
        respuesta:
          "Sí. Coordinamos el entrenamiento simultáneo en México y filiales internacionales de forma centralizada y bajo un mismo estándar de calidad.",
        respuestaPlana:
          "Sí. Coordinamos el entrenamiento simultáneo en México y filiales internacionales de forma centralizada y bajo un mismo estándar de calidad.",
      },
      {
        pregunta: "¿S-Peak está registrado ante la STPS?",
        respuesta:
          "Sí. Contamos con registro oficial ante la Secretaría del Trabajo y Previsión Social y emitimos las constancias de capacitación correspondientes para su empresa.",
        respuestaPlana:
          "Sí. Contamos con registro oficial ante la Secretaría del Trabajo y Previsión Social y emitimos las constancias de capacitación correspondientes para su empresa.",
      },
      {
        pregunta:
          "¿Cuál es el retorno de inversión (ROI) de capacitar al equipo de atención?",
        respuesta:
          "Se traduce en mayor resolución en el primer contacto, menos escalaciones y cumplimiento de los niveles de servicio (SLAs). Retener una sola cuenta internacional en riesgo cubre la inversión anual del programa.",
        respuestaPlana:
          "Se traduce en mayor resolución en el primer contacto, menos escalaciones y cumplimiento de los niveles de servicio (SLAs). Retener una sola cuenta internacional en riesgo cubre la inversión anual del programa.",
      },
      {
        pregunta:
          "¿Cómo garantizan que los colaboradores realmente aprendan y no solo asistan?",
        respuesta:
          "Sustituimos los exámenes teóricos por evidencias de desempeño aplicables (una llamada real grabada, un ticket o una resolución por chat). Al cierre, entregamos resultados con pruebas verificables del avance.",
        respuestaPlana:
          "Sustituimos los exámenes teóricos por evidencias de desempeño aplicables (una llamada real grabada, un ticket o una resolución por chat). Al cierre, entregamos resultados con pruebas verificables del avance.",
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
