import { IDIOMAS, type DatosEquipo } from "../tipos";

/* Contenido de /equipo/operaciones-y-logistica/, del documento del cliente.
   Correcciones del buscar y reemplazar mal hecho y slugs canónicos: ver la
   cabecera de legal-y-juridico.tsx.

   Esta área no trae nota de encuadre en el documento: no se le inventa una. */

const datos: DatosEquipo = {
  slug: "operaciones-y-logistica",
  nombre: "Operaciones y Logística",

  hero: {
    etiqueta: "Idioma técnico · Operaciones y Logística",
    titulo: (
      <>
        Capacitación de idiomas para equipos de{" "}
        <strong>Operaciones y Logística</strong>
      </>
    ),
    sub: "En la planta o cadena de suministro, un malentendido cuesta retrasos, embarques detenidos o auditorías perdidas. Capacitamos a sus equipos en inglés, francés, alemán, italiano o portugués para comunicarse con precisión y eliminar el margen de error.",
    cta: "Solicite una Cotización",
    prueba: (
      <>
        +<strong>500 empresas</strong> confían en S-Peak para capacitar a sus
        equipos de operaciones.
      </>
    ),
    imagen: {
      // Provisional: la del mosaico del home.
      src: "/images/home/area-operaciones-y-logistica.webp",
      alt: "Equipo de planta en capacitación de inglés técnico",
    },
  },

  competencias: {
    eyebrow: "Las competencias lingüísticas del equipo de operaciones",
    titulo:
      "Las competencias lingüísticas que su equipo de operaciones necesita para trabajar sin error",
    sub: "No necesita más gramática: necesita el idioma dentro de las situaciones que ya maneja, de la instrucción en planta al embarque en aduana. En inglés o en el idioma de su operación.",
    tarjetas: [
      {
        icono: "documento",
        titulo: "Comunicación técnica de planta",
        texto:
          "Comprensión exacta de especificaciones, instrucciones de trabajo, cambios de ingeniería y procedimientos en su idioma original, eliminando interpretaciones erróneas en el piso de producción.",
      },
      {
        icono: "diadema",
        titulo: "Escucha en piso y en llamada",
        texto:
          "Entender una instrucción con ruido de máquina, por radio o en una llamada con la matriz, y confirmar que se entendió antes de ejecutar.",
      },
      {
        icono: "lista",
        titulo: "Auditorías y aseguramiento de calidad",
        texto:
          "Capacidad para sustentar procesos, responder a auditores internacionales y dominar la terminología técnica (no conformidades, planes de acción) bajo los estándares del cliente o del corporativo.",
      },
      {
        icono: "fabrica",
        titulo: "Incidencias y paros de línea",
        texto:
          "Explicar qué pasó, qué se hizo y qué se necesita, en el momento y sin ambigüedad. Un paro se alarga cuando la explicación no llega clara a quien decide.",
      },
      {
        icono: "enlace",
        titulo: "Logística y cadena de suministro",
        texto:
          "Coordinación precisa y sin ambigüedades con forwarders, navieras y transportistas, manejando con fluidez términos de comercio internacional, instrucciones de embarque y documentación de transporte.",
      },
      {
        icono: "globo",
        titulo: "Comercio exterior y aduanas",
        texto:
          "Comunicación efectiva con agentes aduanales, además de la revisión y discusión de documentación de importación y exportación, reglas de origen y clasificación arancelaria directamente en el idioma en que fueron redactadas.",
      },
      {
        icono: "usuarios",
        titulo: "Relación con proveedores y corporativo",
        texto:
          "Conducción de juntas de seguimiento, reportes operativos y enlace directo con proveedores globales o casa matriz, evitando intermediarios que diluyan datos críticos de la operación.",
      },
      {
        icono: "lectura",
        titulo: "Documentos de operación",
        texto:
          "Lectura, análisis y discusión crítica de manuales técnicos, contratos de suministro, fichas de especificaciones y procedimientos operativos en su idioma original.",
      },
    ],
  },

  franja: {
    titulo: "El idioma de su operación, no solo inglés",
    texto: (
      <>
        La mayoría de nuestros programas son en inglés, porque es el idioma
        técnico estándar. Pero si su planta reporta a una matriz alemana, opera
        maquinaria italiana o exporta a Brasil, capacitamos a su equipo en{" "}
        <strong>la lengua exacta que evita el error</strong>. En el diagnóstico
        definimos cuál.
      </>
    ),
    idiomas: IDIOMAS,
  },

  dolor: {
    eyebrow: "El costo real de la barrera del idioma",
    titulo:
      "Su equipo ya sabe producir y entregar. Le falta hacerlo en el idioma de su operación.",
    sub: "Más que un malentendido aislado, es un costo operativo crítico que impacta directamente en tres frentes:",
    tarjetas: [
      {
        icono: "alerta",
        titulo: "La instrucción técnica mal interpretada",
        texto:
          "Especificaciones, cambios de ingeniería o procedimientos de calidad entendidos a medias provocan retrabajos, desperdicio de material o paros de línea. Un error lingüístico en el piso de producción cuesta horas de fabricación no recuperables.",
      },
      {
        icono: "reloj",
        titulo: "El embarque detenido por documentación",
        texto:
          "Fallas de comunicación con forwarders, navieras o agentes aduanales retrasan cargamentos y acumulan costos por almacenaje o penalizaciones. Una demora logística evitable que la empresa termina pagando por completo.",
      },
      {
        icono: "escudo",
        titulo: "La auditoría o certificación en riesgo",
        texto:
          "Al recibir auditorías internacionales de calidad o procesos, no poder sustentar los procedimientos debido al idioma genera no conformidades y observaciones. Esto arriesga certificaciones clave y contratos de proveeduría esenciales.",
      },
    ],
    cta: "Solicite una Cotización",
  },

  mercado: {
    eyebrow: "Por qué urge ahora",
    titulo:
      "Por qué su empresa no puede esperar para formar a su equipo de operaciones",
    texto:
      "Cada instrucción entendida a medias es un costo que aparece después, en scrap, en almacenaje o en una no conformidad. Estos son los datos que sostienen actuar ahora.",
    etiquetaCarrusel: "Razones para capacitar al equipo de operaciones ahora",
    tarjetas: [
      {
        icono: "alerta",
        titulo: "Un error técnico cuesta más que cualquier capacitación",
        texto: (
          <>
            Malinterpretar especificaciones o instrucciones de embarque genera{" "}
            <strong>
              retrabajo, scrap, costos de almacenaje o penalizaciones
            </strong>.
            Una sola incidencia operativa evitable supera por mucho el costo
            anual de formar al equipo.
          </>
        ),
      },
      {
        icono: "usuarios",
        titulo: "El talento técnico bilingüe es escaso y difícil de reemplazar",
        texto: (
          <>
            Alrededor de 8 de cada 100 personas ocupadas en México hablan
            inglés, y el perfil técnico con idioma es de los más difíciles de
            reclutar.{" "}
            <strong>Desarrollar al personal que ya conoce sus procesos</strong>{" "}
            es la estrategia más rentable y más segura.
          </>
        ),
        fuente: "Fuente: ENOE, INEGI",
      },
      {
        icono: "globo",
        titulo: "El nearshoring exige integración técnica multilingüe",
        texto:
          "Ante la proyección de 50,000 millones de dólares en inversión en los 3 próximos años, las nuevas cadenas operan bajo estándares en inglés, alemán, italiano o portugués. Los equipos preparados aseguran la proveeduría aprobada; los que dependen de traductores quedan fuera.",
        fuente: "Fuente: Secretaría de Economía",
      },
      {
        icono: "lista",
        titulo: "Auditorías mal sustentadas arriesgan contratos clave",
        texto: (
          <>
            En sectores como el automotriz, aeroespacial, farmacéutico o
            alimentario, las auditorías globales se realizan en el idioma de la
            casa matriz. No poder explicar un proceso genera{" "}
            <strong>no conformidades</strong> que ponen en riesgo
            certificaciones críticas y cuentas completas.
          </>
        ),
      },
    ],
  },

  diferenciadores: {
    eyebrow: "Por qué S-Peak",
    titulo:
      "Empresas como Braskem Idesa, Chedraui y +500 más eligen S-Peak para su equipo de operaciones",
    tarjetas: [
      {
        icono: "diana",
        titulo: "Diseñado para la operación real",
        texto:
          "Sin cursos genéricos; entrenamos la lectura de especificaciones, preparación de auditorías, gestión de embarques y enlace con proveedores, reduciendo errores costosos.",
      },
      {
        icono: "reloj",
        titulo: "Flexibilidad para turnos operativos",
        texto:
          "Programas in-company adaptados a turnos de planta, picos de demanda logística y disponibilidad del equipo, garantizando la continuidad de la cadena.",
      },
      {
        icono: "globo",
        titulo: "El idioma de su operación, no solo inglés",
        texto:
          "Inglés para flujos globales, alemán para el sector automotriz, italiano para maquinaria, o francés, portugués y español según el origen de sus proveedores o corporativo.",
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
    titulo: "Comience con una cotización para su equipo de operaciones",
    texto: "Cuéntenos su caso. Le responderemos en menos de 24 horas hábiles.",
    cta: "Solicite una Cotización",
  },

  testimonios: {
    titulo: "Lo que dicen los equipos que ya se capacitaron con S-Peak",
  },

  faq: {
    titulo:
      "Preguntas frecuentes sobre capacitación de idiomas para Operaciones y Logística",
    texto: "Resolvemos las dudas más comunes antes de que tenga que buscarlas.",
    ctaTitulo: "¿Tiene una pregunta que no está aquí?",
    ctaBoton: "Solicite una Cotización",
    preguntas: [
      {
        pregunta:
          "¿Cuánto cuesta capacitar a un equipo de operaciones en S-Peak?",
        respuesta:
          "Depende de la frecuencia, la modalidad, la duración y el tamaño del grupo (de 1 a 10 personas). A mayor volumen de participantes, menor es la inversión por persona. Solicite una cotización adaptada a su planta u operación.",
        respuestaPlana:
          "Depende de la frecuencia, la modalidad, la duración y el tamaño del grupo (de 1 a 10 personas). A mayor volumen de participantes, menor es la inversión por persona. Solicite una cotización adaptada a su planta u operación.",
      },
      {
        pregunta:
          "¿Pueden adaptar los horarios a turnos de planta o a una operación logística continua?",
        respuesta:
          "Sí. Nos ajustamos a turnos rotativos, picos de demanda y disponibilidad de los equipos para garantizar la continuidad de la producción y de la cadena de suministro.",
        respuestaPlana:
          "Sí. Nos ajustamos a turnos rotativos, picos de demanda y disponibilidad de los equipos para garantizar la continuidad de la producción y de la cadena de suministro.",
      },
      {
        pregunta:
          "¿Enseñan vocabulario técnico específico (calidad, automotriz, comercio exterior, aduanas)?",
        respuesta:
          "Sí. Sustituimos los libros genéricos por terminología específica de su proceso: estándares de calidad, sector automotriz, comercio internacional y documentación aduanal.",
        respuestaPlana:
          "Sí. Sustituimos los libros genéricos por terminología específica de su proceso: estándares de calidad, sector automotriz, comercio internacional y documentación aduanal.",
      },
      {
        pregunta:
          "¿En cuánto tiempo mi equipo podrá sustentar una auditoría o coordinar un embarque en otro idioma?",
        respuesta:
          "Depende del nivel inicial. Avanzar de un nivel básico (A2) a uno apto para auditorías y coordinación técnica (B2) toma de 12 a 18 meses. Si parten de un nivel intermedio (B1), el plazo es de 6 a 9 meses.",
        respuestaPlana:
          "Depende del nivel inicial. Avanzar de un nivel básico (A2) a uno apto para auditorías y coordinación técnica (B2) toma de 12 a 18 meses. Si parten de un nivel intermedio (B1), el plazo es de 6 a 9 meses.",
      },
      {
        pregunta: "¿Cómo miden el progreso de un perfil técnico?",
        respuesta:
          "Evaluamos el desempeño práctico mediante entregables reales (lectura de especificaciones, auditorías simuladas o logística de embarques) bajo una rúbrica profesional, no con exámenes teóricos. El coordinador recibe reportes de avance mensuales.",
        respuestaPlana:
          "Evaluamos el desempeño práctico mediante entregables reales (lectura de especificaciones, auditorías simuladas o logística de embarques) bajo una rúbrica profesional, no con exámenes teóricos. El coordinador recibe reportes de avance mensuales.",
      },
      {
        pregunta:
          "¿Trabajan tanto con plantas de manufactura como con áreas de logística y comercio exterior?",
        respuesta:
          "Sí. Capacitamos a personal de planta, calidad y producción, así como a equipos de cadena de suministro, logística y comercio exterior, alineando el programa tras el diagnóstico inicial.",
        respuestaPlana:
          "Sí. Capacitamos a personal de planta, calidad y producción, así como a equipos de cadena de suministro, logística y comercio exterior, alineando el programa tras el diagnóstico inicial.",
      },
      {
        pregunta: "¿Qué idiomas ofrecen para operaciones?",
        respuesta:
          "Inglés, francés, alemán, italiano, portugués y español para extranjeros. El inglés atiende flujos globales, mientras que los demás se seleccionan según el origen de la maquinaria, proveedores o casa matriz.",
        respuestaPlana:
          "Inglés, francés, alemán, italiano, portugués y español para extranjeros. El inglés atiende flujos globales, mientras que los demás se seleccionan según el origen de la maquinaria, proveedores o casa matriz.",
      },
      {
        pregunta:
          "¿Pueden capacitar equipos de operaciones distribuidos en varias plantas o países?",
        respuesta:
          "Sí. Coordinamos el entrenamiento simultáneo en múltiples plantas de México o filiales internacionales, manteniendo una gestión centralizada y un estándar de calidad uniforme.",
        respuestaPlana:
          "Sí. Coordinamos el entrenamiento simultáneo en múltiples plantas de México o filiales internacionales, manteniendo una gestión centralizada y un estándar de calidad uniforme.",
      },
      {
        pregunta: "¿S-Peak está registrado ante la STPS?",
        respuesta:
          "Sí. Contamos con registro oficial ante la Secretaría del Trabajo y Previsión Social y emitimos las constancias de capacitación correspondientes.",
        respuestaPlana:
          "Sí. Contamos con registro oficial ante la Secretaría del Trabajo y Previsión Social y emitimos las constancias de capacitación correspondientes.",
      },
      {
        pregunta:
          "¿Cuál es el retorno de inversión (ROI) de capacitar al equipo de operaciones?",
        respuesta:
          "Se vuelve tangible al eliminar traductores en auditorías, comprender fichas técnicas a la primera y evitar retrasos logísticos. Prevenir un solo paro de línea o una penalización en aduanas cubre con creces la inversión anual del programa.",
        respuestaPlana:
          "Se vuelve tangible al eliminar traductores en auditorías, comprender fichas técnicas a la primera y evitar retrasos logísticos. Prevenir un solo paro de línea o una penalización en aduanas cubre con creces la inversión anual del programa.",
      },
    ],
  },

  servicio: {
    nombre: "Capacitación de idiomas para equipos de operaciones y logística",
    tipo: "Capacitación corporativa de idiomas para operaciones y logística",
    descripcion:
      "Inglés y otros idiomas para equipos de planta, calidad, cadena de suministro y comercio exterior. Comunicación técnica sin errores.",
  },
};

export default datos;
