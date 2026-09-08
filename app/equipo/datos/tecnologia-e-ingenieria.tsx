import { IDIOMAS, type DatosEquipo } from "../tipos";

/* Contenido de /equipo/tecnologia-e-ingenieria/, del documento del cliente.
   Correcciones del buscar y reemplazar mal hecho y slugs canónicos: ver la
   cabecera de legal-y-juridico.tsx. */

const datos: DatosEquipo = {
  slug: "tecnologia-e-ingenieria",
  nombre: "Tecnología e Ingeniería",

  hero: {
    etiqueta: "Idioma de negocios · Tecnología e Ingeniería",
    titulo: (
      <>
        Capacitación de idiomas para equipos de{" "}
        <strong>Tecnología e Ingeniería</strong>
      </>
    ),
    sub: "Sus equipos técnicos coordinan proyectos, reuniones y entregables con casa matriz, proveedores de tecnología y equipos en otros países. Cuando el idioma se interpone —inglés, francés, alemán, italiano o portugués—, las reuniones se alargan, los proyectos pierden ritmo y el talento técnico local queda fuera de las decisiones globales. S-Peak forma a su equipo en el idioma de negocios con que coordina y comunica su trabajo.",
    cta: "Solicite una Cotización",
    prueba: (
      <>
        +<strong>500 empresas</strong> confían en S-Peak para capacitar a sus
        equipos.
      </>
    ),
    imagen: {
      // Provisional: la del mosaico del home.
      src: "/images/home/area-tecnologia-e-ingenieria.webp",
      alt: "Equipo de tecnología en capacitación de idioma de negocios",
    },
  },

  encuadre:
    "S-Peak enseña el idioma de negocios con que su equipo técnico coordina y comunica, no ingeniería ni el lenguaje ultra-técnico de cada especialidad. Su equipo ya tiene el criterio técnico. Lo que aportamos es el idioma para reuniones de proyecto, coordinación con casa matriz y comunicación con equipos globales, sin que la traducción se interponga.",

  competencias: {
    eyebrow: "Las competencias lingüísticas del equipo técnico",
    titulo:
      "El idioma de negocios que su equipo técnico necesita para coordinar sin barreras",
    sub: "No enseñamos ingeniería ni el lenguaje técnico de cada especialidad: su equipo ya tiene el criterio. Trabajamos el idioma de negocios con que coordina proyectos, participa en reuniones y se comunica con casa matriz y equipos globales.",
    tarjetas: [
      {
        icono: "diana",
        titulo: "Coordinación de proyectos",
        texto:
          "Participar en reuniones de proyecto, dar y recibir seguimiento y coordinar entregables con casa matriz o equipos en otros países, al ritmo real de la conversación.",
      },
      {
        icono: "usuarios",
        titulo: "Reuniones técnicas internacionales",
        texto:
          "Exponer avances, plantear bloqueos y aportar su criterio en reuniones de equipo global, con la soltura para no quedar fuera de la conversación.",
      },
      {
        icono: "enlace",
        titulo: "Coordinación con proveedores de tecnología",
        texto:
          "Comunicarse con proveedores de software, fabricantes de equipo y equipos de soporte extranjeros directamente, sin que un intermediario agregue tiempo ni diluya el detalle.",
      },
      {
        icono: "presentacion",
        titulo: "Comunicación de lo técnico al negocio",
        texto:
          "Explicar avances, riesgos y necesidades de un proyecto a otras áreas o al corporativo en términos claros, en el idioma de la organización.",
      },
      {
        icono: "correo",
        titulo: "Comunicación escrita de proyecto",
        texto:
          "Correos, reportes de avance, documentación de seguimiento y respuestas en canales de equipo claros y correctos en otro idioma.",
      },
      {
        icono: "lectura",
        titulo: "Lectura de documentación y comunicaciones",
        texto:
          "Leer documentación de proyecto, lineamientos y comunicaciones de casa matriz en el idioma original con la fluidez para responder con agilidad.",
      },
    ],
  },

  franja: {
    titulo: "El idioma de su proyecto, no solo inglés",
    texto:
      "La mayoría de nuestros programas técnicos son en inglés, porque es el idioma de la mayoría de los equipos globales de tecnología e ingeniería. Pero si su casa matriz está en Alemania, recibe ingeniería de Italia, coordina con un equipo francés o trabaja con un proveedor en Brasil, formamos a su equipo en el idioma con que realmente coordina. En el diagnóstico definimos cuál —o cuáles— según el origen de su corporativo, sus proveedores y sus equipos globales.",
    idiomas: IDIOMAS,
  },

  dolor: {
    eyebrow: "El costo real de la barrera del idioma",
    titulo:
      "Su equipo ya resuelve lo técnico. Le falta hacerlo en el idioma de su proyecto.",
    sub: "No es una limitación menor. Es un costo que aparece en tres frentes concretos:",
    tarjetas: [
      {
        icono: "reloj",
        titulo: "El proyecto que pierde ritmo en la coordinación",
        texto:
          "Reuniones de proyecto con casa matriz o equipos en otros países donde su equipo técnico no participa al ritmo real porque el idioma se interpone. Las decisiones se retrasan, los entregables se reprocesan y el proyecto pierde velocidad.",
      },
      {
        icono: "enlace",
        titulo:
          "El proveedor de tecnología que se coordina a través de un intermediario",
        texto:
          "Coordinar con un proveedor de software, un fabricante de equipo o un equipo de soporte extranjero a través de un traductor agrega tiempo y diluye el detalle. En proyectos técnicos, un detalle perdido en la comunicación se paga en retrabajo.",
      },
      {
        icono: "alerta",
        titulo: "El talento técnico local sin voz en las decisiones globales",
        texto:
          "Su equipo conoce la operación a fondo, pero en las reuniones globales no logra exponer su criterio al ritmo de la conversación. Las decisiones técnicas se toman sin el aporte de quien mejor conoce la realidad local.",
      },
    ],
    cta: "Solicite una Cotización",
  },

  mercado: {
    eyebrow: "Por qué urge ahora",
    titulo: "Por qué su empresa no puede esperar a formar a su equipo técnico",
    texto:
      "Cada proyecto que avanza con la coordinación a medias es tiempo y retrabajo que el idioma explica. Estos son los datos que sostienen actuar ahora.",
    etiquetaCarrusel: "Razones para capacitar al equipo técnico ahora",
    tarjetas: [
      {
        icono: "reloj",
        titulo:
          "Un proyecto que pierde ritmo en la coordinación cuesta más que cualquier programa",
        texto:
          "En proyectos técnicos, una reunión donde el equipo no participa al ritmo real o un detalle perdido con un proveedor se traduce en retrabajo, reprocesos y retrasos. Una sola incidencia evitable puede costar más que la inversión anual en formar al equipo. No es un problema de criterio técnico: es de idioma.",
      },
      {
        icono: "usuarios",
        titulo: "El talento técnico bilingüe es escaso y de los más disputados",
        texto:
          "Alrededor de 8 de cada 100 personas ocupadas en México hablan inglés, y el perfil técnico con idioma —desarrollo, ingeniería, datos— es de los más difíciles de contratar y retener. Formar al equipo que ya conoce su operación es más rentable y menos arriesgado que depender del mercado laboral.",
        fuente: "Fuente: ENOE, INEGI",
      },
      {
        icono: "globo",
        titulo:
          "El nearshoring está integrando a sus equipos en proyectos globales en otro idioma",
        texto:
          "La Secretaría de Economía proyecta 500,000 empleos nuevos y 50,000 millones de dólares de inversión en los 3 próximos años. México se consolida como centro de desarrollo de tecnología e ingeniería para corporativos globales que coordinan en inglés —y en alemán, italiano o portugués según el origen del grupo—. El equipo técnico que coordina a la altura entra a los proyectos clave; el que depende de traducción queda en tareas de ejecución.",
        fuente: "Fuente: Secretaría de Economía",
      },
      {
        icono: "grafico",
        titulo:
          "El talento local sin voz pierde en las decisiones técnicas globales",
        texto:
          "Cuando su equipo conoce la operación a fondo pero no logra exponer su criterio en las reuniones globales, las decisiones técnicas se toman sin su aporte. Cuando participa directamente en el idioma, su criterio pesa en las decisiones —y la operación local gana relevancia dentro del grupo.",
      },
    ],
  },

  diferenciadores: {
    eyebrow: "Por qué S-Peak",
    titulo:
      "Empresas como Braskem Idesa, Chedraui y +500 más eligen S-Peak para sus equipos técnicos",
    tarjetas: [
      {
        icono: "diana",
        titulo: "Idioma de negocios para equipos técnicos, no curso general",
        texto:
          "No adaptamos un curso de conversación. Trabajamos el idioma con que su equipo coordina proyectos, participa en reuniones globales y reporta al corporativo. No enseñamos ingeniería ni programación: su equipo ya tiene el criterio técnico.",
      },
      {
        icono: "reloj",
        titulo: "Horarios adaptados a la operación técnica",
        texto:
          "Programas in-company que respetan ciclos de proyecto, sprints y disponibilidad real del equipo, sin frenar las entregas.",
      },
      {
        icono: "globo",
        titulo: "El idioma de su proyecto, no solo inglés",
        texto:
          "Inglés para la mayoría de los equipos globales; alemán para ingeniería automotriz, italiano para maquinaria, francés, portugués o español para personal técnico extranjero según el origen de su corporativo y proveedores.",
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
    titulo: "Comience con una cotización para su equipo técnico",
    texto: "Cuéntenos su caso. Le responderemos en menos de 24 horas hábiles.",
    cta: "Solicite una Cotización",
  },

  testimonios: {
    titulo: "Lo que dicen los equipos que ya se capacitaron con S-Peak",
  },

  faq: {
    titulo:
      "Preguntas frecuentes sobre capacitación de idiomas para Tecnología e Ingeniería",
    texto: "Resolvemos las dudas más comunes antes de que tenga que buscarlas.",
    ctaTitulo: "¿Tiene una pregunta que no está aquí?",
    ctaBoton: "Solicite una Cotización",
    preguntas: [
      {
        pregunta:
          "¿S-Peak enseña ingeniería, programación o el lenguaje ultra-técnico de cada especialidad?",
        respuesta:
          "No. S-Peak no enseña ingeniería, programación ni el lenguaje técnico profundo de cada disciplina. Su equipo ya tiene el criterio técnico; nosotros aportamos el idioma de negocios con que coordina proyectos, participa en reuniones y se comunica con casa matriz y proveedores. Los instructores son especialistas en idioma, no ingenieros ni desarrolladores.",
        respuestaPlana:
          "No. S-Peak no enseña ingeniería, programación ni el lenguaje técnico profundo de cada disciplina. Su equipo ya tiene el criterio técnico; nosotros aportamos el idioma de negocios con que coordina proyectos, participa en reuniones y se comunica con casa matriz y proveedores. Los instructores son especialistas en idioma, no ingenieros ni desarrolladores.",
      },
      {
        pregunta: "¿Cuánto cuesta capacitar a un equipo técnico en S-Peak?",
        respuesta:
          "El costo depende de la frecuencia, la modalidad (in-company, en línea o híbrida), el tamaño del grupo y la duración. Trabajamos con grupos de 1 a 10 colaboradores; a mayor número de participantes, menor es la inversión por persona. Solicite una cotización personalizada según el tamaño de su equipo.",
        respuestaPlana:
          "El costo depende de la frecuencia, la modalidad (in-company, en línea o híbrida), el tamaño del grupo y la duración. Trabajamos con grupos de 1 a 10 colaboradores; a mayor número de participantes, menor es la inversión por persona. Solicite una cotización personalizada según el tamaño de su equipo.",
      },
      {
        pregunta:
          "¿Pueden adaptar los horarios a ciclos de proyecto o sprints?",
        respuesta:
          "Sí. Diseñamos el programa alrededor de la operación real: ciclos de proyecto, sprints y disponibilidad del equipo, para no interrumpir las entregas.",
        respuestaPlana:
          "Sí. Diseñamos el programa alrededor de la operación real: ciclos de proyecto, sprints y disponibilidad del equipo, para no interrumpir las entregas.",
      },
      {
        pregunta: "¿Enseñan vocabulario técnico específico?",
        respuesta:
          "Trabajamos el vocabulario funcional con que su equipo coordina y comunica: reuniones de proyecto, reportes de avance, coordinación con proveedores, comunicación con casa matriz. El vocabulario propio de su tecnología o disciplina lo afinamos en el diagnóstico, con el contexto que su equipo aporta. No enseñamos el contenido técnico de la especialidad, que es competencia de su equipo.",
        respuestaPlana:
          "Trabajamos el vocabulario funcional con que su equipo coordina y comunica: reuniones de proyecto, reportes de avance, coordinación con proveedores, comunicación con casa matriz. El vocabulario propio de su tecnología o disciplina lo afinamos en el diagnóstico, con el contexto que su equipo aporta. No enseñamos el contenido técnico de la especialidad, que es competencia de su equipo.",
      },
      {
        pregunta:
          "¿En cuánto tiempo mi equipo podrá coordinar proyectos en otro idioma?",
        respuesta: (
          <>
            Depende del nivel de partida. Un colaborador con nivel A2 tarda
            entre <strong>12 y 18 meses</strong> en alcanzar B2 (suficiente para
            reuniones de proyecto y coordinación). Un equipo que parte de B1
            puede llegar a B2 en 6 a 9 meses con sesiones enfocadas. Reportamos
            avance con evidencias comprobables.
          </>
        ),
        respuestaPlana:
          "Depende del nivel de partida. Un colaborador con nivel A2 tarda entre 12 y 18 meses en alcanzar B2 (suficiente para reuniones de proyecto y coordinación). Un equipo que parte de B1 puede llegar a B2 en 6 a 9 meses con sesiones enfocadas. Reportamos avance con evidencias comprobables.",
      },
      {
        pregunta: "¿Cómo miden el progreso de un perfil técnico?",
        respuesta:
          "Evaluamos desempeño lingüístico real, no exámenes de memoria. El colaborador demuestra la competencia en una situación de su función (reunión de proyecto simulada, reporte de avance, coordinación con proveedor) evaluada con rúbrica de idioma. Quien coordina recibe una Tarjeta de Resultados con los enlaces para revisar el avance.",
        respuestaPlana:
          "Evaluamos desempeño lingüístico real, no exámenes de memoria. El colaborador demuestra la competencia en una situación de su función (reunión de proyecto simulada, reporte de avance, coordinación con proveedor) evaluada con rúbrica de idioma. Quien coordina recibe una Tarjeta de Resultados con los enlaces para revisar el avance.",
      },
      {
        pregunta:
          "¿Trabajan con equipos de TI y también con equipos de ingeniería?",
        respuesta:
          "Sí. Formamos a equipos de desarrollo, datos, infraestructura y soporte, y a equipos de ingeniería de producto, proceso y proyecto. En el diagnóstico enfocamos el programa según con quién coordina cada equipo.",
        respuestaPlana:
          "Sí. Formamos a equipos de desarrollo, datos, infraestructura y soporte, y a equipos de ingeniería de producto, proceso y proyecto. En el diagnóstico enfocamos el programa según con quién coordina cada equipo.",
      },
      {
        pregunta: "¿Qué idiomas ofrecen para equipos técnicos?",
        respuesta:
          "Inglés, francés, alemán, italiano, portugués y español para extranjeros. Inglés para la mayoría de los equipos globales; alemán para ingeniería automotriz, italiano para maquinaria, los demás según el origen de su corporativo y proveedores. En el diagnóstico definimos cuál usa su equipo para coordinar.",
        respuestaPlana:
          "Inglés, francés, alemán, italiano, portugués y español para extranjeros. Inglés para la mayoría de los equipos globales; alemán para ingeniería automotriz, italiano para maquinaria, los demás según el origen de su corporativo y proveedores. En el diagnóstico definimos cuál usa su equipo para coordinar.",
      },
      {
        pregunta:
          "¿Pueden capacitar equipos técnicos distribuidos en varias sedes o países?",
        respuesta:
          "Sí. Trabajamos con equipos en México y en sedes de Latinoamérica o del mundo de forma simultánea, con gestión centralizada y estándar de calidad uniforme.",
        respuestaPlana:
          "Sí. Trabajamos con equipos en México y en sedes de Latinoamérica o del mundo de forma simultánea, con gestión centralizada y estándar de calidad uniforme.",
      },
      {
        pregunta: "¿S-Peak está registrado ante la STPS?",
        respuesta:
          "Sí. S-Peak cuenta con registro oficial ante la Secretaría del Trabajo y Previsión Social y emite constancia de capacitación a nombre de su empresa.",
        respuestaPlana:
          "Sí. S-Peak cuenta con registro oficial ante la Secretaría del Trabajo y Previsión Social y emite constancia de capacitación a nombre de su empresa.",
      },
      {
        pregunta:
          "¿Cuál es el retorno de inversión (ROI) de capacitar al equipo técnico?",
        respuesta: (
          <>
            El retorno se vuelve tangible cuando su equipo coordina un proyecto
            al ritmo real, participa en las reuniones globales con su criterio y
            se comunica con proveedores sin intermediarios. S-Peak comprueba y
            reporta la competencia lingüística con evidencias; el criterio
            técnico —que es de su equipo— se aplica sin el filtro del idioma.{" "}
            <strong>
              Para muchas empresas, evitar un solo reproceso de proyecto ya
              supera la inversión anual del programa.
            </strong>
          </>
        ),
        respuestaPlana:
          "El retorno se vuelve tangible cuando su equipo coordina un proyecto al ritmo real, participa en las reuniones globales con su criterio y se comunica con proveedores sin intermediarios. S-Peak comprueba y reporta la competencia lingüística con evidencias; el criterio técnico —que es de su equipo— se aplica sin el filtro del idioma. Para muchas empresas, evitar un solo reproceso de proyecto ya supera la inversión anual del programa.",
      },
    ],
  },

  servicio: {
    nombre: "Capacitación de idiomas para equipos de tecnología e ingeniería",
    tipo: "Capacitación corporativa de idiomas para tecnología e ingeniería",
    descripcion:
      "Inglés y otros idiomas para equipos de TI e ingeniería. El idioma de negocios con que coordinan proyectos con casa matriz y equipos globales.",
  },
};

export default datos;
