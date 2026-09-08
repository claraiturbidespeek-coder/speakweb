import { IDIOMAS, type DatosEquipo } from "../tipos";

/* Contenido de /equipo/legal-y-juridico/, del documento del cliente.

   Correcciones aplicadas sobre el original, todas del mismo buscar y reemplazar
   mal hecho ("Capacitación" → "cursos de"):
   - H1 y title: "cursos de de idiomas" → "Capacitación de idiomas".
   - Categoría del schema: "cursos de corporativa" → "Capacitación corporativa".
   Y los enlaces de idioma van a los slugs canónicos, no a las redirecciones.

   Añadidos por la plantilla, porque el documento no los trae para ninguna área:
   antetítulos de dolor, diferenciadores y testimonios, y el texto de la banda
   de CTA, adaptados de la referencia de ventas y marketing. */

const datos: DatosEquipo = {
  slug: "legal-y-juridico",
  nombre: "Legal y Jurídico",

  hero: {
    etiqueta: "Idioma de negocios · Legal y Cumplimiento",
    titulo: (
      <>
        Capacitación de idiomas para equipos{" "}
        <strong>Legales y de Cumplimiento</strong>
      </>
    ),
    sub: "Su área legal coordina con el corporativo, la matriz legal y despachos en otros países. Cuando el idioma se interpone —inglés, francés, alemán, italiano o portugués—, las reuniones se alargan, los acuerdos internos se diluyen y su equipo pierde agilidad. S-Peak forma a su equipo legal en el idioma de negocios con que se comunica y coordina, para que esa interacción fluya sin intermediarios.",
    cta: "Solicite una Cotización",
    prueba: (
      <>
        +<strong>500 empresas</strong> confían en S-Peak para capacitar a sus
        equipos.
      </>
    ),
    imagen: {
      // Provisional: la del mosaico del home. No existe una imagen de hero
      // propia para esta área.
      src: "/images/home/area-legal-y-juridico.webp",
      alt: "Equipo legal en capacitación de inglés de negocios",
    },
  },

  encuadre:
    "S-Peak enseña el idioma de negocios con que su equipo legal se comunica y coordina, no derecho ni el lenguaje técnico-jurídico de los contratos. Su equipo ya tiene el criterio legal. Lo que aportamos es el idioma para reuniones, coordinación con corporativo y despachos, y comunicación del día a día —no la redacción ni la negociación de cláusulas en registro jurídico, que es competencia de su equipo y de su asesoría especializada.",

  competencias: {
    eyebrow: "Las competencias lingüísticas del área legal",
    titulo:
      "El idioma de negocios que su equipo legal necesita para coordinar sin barreras",
    sub: "No enseñamos derecho ni el lenguaje técnico de los contratos: eso es competencia de su equipo. Trabajamos el idioma de negocios con que se comunica y coordina con el corporativo, la matriz legal y los despachos.",
    tarjetas: [
      {
        icono: "usuarios",
        titulo: "Coordinación con el corporativo y la matriz legal",
        texto:
          "Participar en reuniones, dar y recibir seguimiento y coordinar acuerdos internos con el corporativo en su idioma, al ritmo real de la conversación.",
      },
      {
        icono: "apreton",
        titulo: "Negociación de cláusulas",
        texto:
          "Objetar, proponer una redacción alterna y sostener una posición en la llamada, sin depender de mandar todo por escrito después.",
      },
      {
        icono: "enlace",
        titulo: "Relación con despachos internacionales",
        texto:
          "Instruir, dar seguimiento y coordinar con despachos extranjeros directamente, sin que un intermediario agregue tiempo ni diluya el mensaje.",
      },
      {
        icono: "lista",
        titulo: "Vocabulario contractual",
        texto:
          "Los términos que cambian el riesgo de un contrato, indemnity, warranty, liability cap, governing law, en el idioma en que se firma.",
      },
      {
        icono: "mensaje",
        titulo: "Conversación profesional e institucional",
        texto:
          "Sostener conversaciones de trabajo con pares legales y contrapartes en el idioma del interlocutor, con el registro profesional adecuado.",
      },
      {
        icono: "presentacion",
        titulo: "Comunicación de temas legales al negocio",
        texto:
          "Explicar implicaciones y estatus de temas legales a otras áreas o al corporativo en términos claros, en el idioma de la organización.",
      },
      {
        icono: "correo",
        titulo: "Comunicación escrita de negocios",
        texto:
          "Correos, seguimientos y comunicaciones de coordinación claros y correctos en otro idioma —comunicación de negocios, no redacción de documentos jurídicos.",
      },
      {
        icono: "lectura",
        titulo: "Lectura de comunicaciones del corporativo",
        texto:
          "Leer lineamientos, requerimientos y comunicaciones del corporativo en el idioma original con la fluidez para responder con agilidad.",
      },
    ],
  },

  franja: {
    titulo: "El idioma de su corporativo, no solo inglés",
    texto:
      "La mayoría de nuestros programas son en inglés, porque es el idioma de la mayoría de los corporativos. Pero si su matriz legal está en Francia, Alemania, Italia o Brasil, formamos a su equipo en el idioma con que realmente coordina. En el diagnóstico definimos cuál —o cuáles— según el origen de su corporativo y sus despachos.",
    idiomas: IDIOMAS,
  },

  dolor: {
    eyebrow: "El costo real de la barrera del idioma",
    titulo:
      "Su equipo ya domina el derecho. Le falta coordinarlo en el idioma de su corporativo.",
    sub: "No es una limitación menor. Es un costo que aparece en tres frentes concretos:",
    tarjetas: [
      {
        icono: "reloj",
        titulo: "La coordinación con el corporativo que se hace lenta",
        texto:
          "Reuniones con la matriz legal o el corporativo donde su equipo no participa al ritmo real porque el idioma se interpone. Las decisiones se alargan, los acuerdos internos se diluyen y la operación legal local pierde agilidad.",
      },
      {
        icono: "balanza",
        titulo:
          "La relación con despachos internacionales que depende de un intermediario",
        texto:
          "Coordinar a un despacho extranjero a través de un traductor agrega tiempo, costo y pérdida de matiz en la instrucción. El despacho cobra por hora; cada ida y vuelta evitable por el idioma se paga.",
      },
      {
        icono: "documento",
        titulo: "El requerimiento del corporativo que se atiende tarde",
        texto:
          "Una solicitud, un lineamiento o una política del corporativo que llega en otro idioma y su equipo tarda en procesar. Lo que debía resolverse en una conversación directa se convierte en correos, traducciones y demoras.",
      },
    ],
    cta: "Solicite una Cotización",
  },

  mercado: {
    eyebrow: "Por qué urge ahora",
    titulo: "Por qué su empresa no puede esperar a formar a su equipo legal",
    texto:
      "Cada mes que su área legal coordina a través de un intermediario es tiempo y presupuesto que se van en algo que el idioma resuelve. Estos son los datos que explican por qué actuar ahora.",
    etiquetaCarrusel: "Razones para capacitar al equipo legal ahora",
    tarjetas: [
      {
        icono: "reloj",
        titulo: "Coordinar a través de un intermediario cuesta tiempo y dinero",
        texto: (
          <>
            Cuando el área legal depende de un traductor para coordinar con el
            corporativo o instruir a un despacho extranjero,{" "}
            <strong>cada interacción se alarga y encarece</strong>. Cerrar esa
            brecha de idioma libera agilidad en un área donde el tiempo es
            costo.
          </>
        ),
      },
      {
        icono: "usuarios",
        titulo: "El perfil legal bilingüe es escaso y caro de reemplazar",
        texto: (
          <>
            Alrededor de 8 de cada 100 personas ocupadas en México hablan
            inglés, y el perfil legal con dominio real del idioma es de los más
            difíciles de contratar.{" "}
            <strong>Formar al equipo que ya conoce su negocio</strong> cuesta
            menos que buscarlo afuera.
          </>
        ),
        fuente: "Fuente: ENOE, INEGI",
      },
      {
        icono: "globo",
        titulo:
          "El nearshoring multiplica la coordinación legal con corporativos extranjeros",
        texto:
          "La Secretaría de Economía proyecta 500,000 empleos nuevos y 50,000 millones de dólares de inversión en los 3 próximos años. Más inversión extranjera significa más coordinación del área legal con corporativos que operan en inglés —y en alemán, italiano o portugués según el origen del grupo—. El equipo legal que coordina con fluidez sostiene la relación; el que depende de traducción reacciona tarde.",
        fuente: "Fuente: Secretaría de Economía",
      },
      {
        icono: "alerta",
        titulo: "Un contrato mal entendido se firma igual",
        texto: (
          <>
            Cuando el área legal revisa en un idioma que no domina del todo, el
            riesgo no aparece:{" "}
            <strong>se firma sin verlo y se descubre cuando ya obliga</strong>.
            Leer y objetar directamente, sin intermediario, es lo que evita que
            una cláusula pase inadvertida.
          </>
        ),
      },
    ],
  },

  diferenciadores: {
    eyebrow: "Por qué S-Peak",
    titulo: "Empresas como Braskem Idesa, Chedraui y +500 más eligen S-Peak",
    tarjetas: [
      {
        icono: "diana",
        titulo: "Idioma de negocios, no curso general",
        texto:
          "No adaptamos un curso de conversación. Trabajamos el idioma con que su equipo legal coordina con corporativo y despachos. No enseñamos derecho ni redacción jurídica: su equipo ya tiene el criterio legal.",
      },
      {
        icono: "escudo",
        titulo: "Confidencialidad",
        texto:
          "Esquema confidencial para áreas sensibles y el grado de detalle de reporte que el área autorice.",
      },
      {
        icono: "globo",
        titulo: "El idioma de su corporativo, no solo inglés",
        texto:
          "Inglés para la mayoría de los corporativos; francés, alemán, italiano, portugués o español para personal legal extranjero según el origen de su grupo.",
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
    titulo: "Comience con una cotización para su equipo legal",
    texto: "Cuéntenos su caso. Le responderemos en menos de 24 horas hábiles.",
    cta: "Solicite una Cotización",
  },

  testimonios: {
    titulo: "Lo que dicen los equipos que ya se capacitaron con S-Peak",
  },

  faq: {
    titulo:
      "Preguntas frecuentes sobre capacitación de idiomas para equipos Legales",
    texto: "Resolvemos las dudas más comunes antes de que tenga que buscarlas.",
    ctaTitulo: "¿Tiene una pregunta que no está aquí?",
    ctaBoton: "Solicite una Cotización",
    preguntas: [
      {
        pregunta: "¿S-Peak enseña inglés jurídico o derecho?",
        respuesta:
          "No. S-Peak no enseña derecho ni el lenguaje técnico-jurídico de los contratos (redacción de cláusulas, registro legal especializado). Su equipo ya tiene el criterio legal; nosotros aportamos el idioma de negocios con que ese equipo se comunica y coordina con el corporativo, la matriz legal y los despachos.",
        respuestaPlana:
          "No. S-Peak no enseña derecho ni el lenguaje técnico-jurídico de los contratos (redacción de cláusulas, registro legal especializado). Su equipo ya tiene el criterio legal; nosotros aportamos el idioma de negocios con que ese equipo se comunica y coordina con el corporativo, la matriz legal y los despachos.",
      },
      {
        pregunta: "¿Los instructores son abogados?",
        respuesta:
          "No. Son profesores especializados en idioma de negocios, nativos o bilingües certificados. No asesoran ni sustituyen al área jurídica: la habilitan en el idioma para coordinar y comunicarse.",
        respuestaPlana:
          "No. Son profesores especializados en idioma de negocios, nativos o bilingües certificados. No asesoran ni sustituyen al área jurídica: la habilitan en el idioma para coordinar y comunicarse.",
      },
      {
        pregunta:
          "Si necesito que mi equipo redacte y negocie contratos en otro idioma, ¿pueden ayudar?",
        respuesta:
          "Ese es un lenguaje jurídico ultra-especializado que está fuera de nuestro alcance: lo honesto es decirlo. S-Peak forma a su equipo en el idioma de negocios para coordinar, reunirse y dar seguimiento; la redacción y negociación de cláusulas en registro jurídico es competencia de su equipo y de su asesoría especializada.",
        respuestaPlana:
          "Ese es un lenguaje jurídico ultra-especializado que está fuera de nuestro alcance: lo honesto es decirlo. S-Peak forma a su equipo en el idioma de negocios para coordinar, reunirse y dar seguimiento; la redacción y negociación de cláusulas en registro jurídico es competencia de su equipo y de su asesoría especializada.",
      },
      {
        pregunta: "¿Cuánto cuesta capacitar a un equipo legal en S-Peak?",
        respuesta:
          "El costo depende de la frecuencia, la modalidad (in-company, en línea o híbrida), el tamaño del grupo y la duración. Trabajamos con grupos de 1 a 10 colaboradores; a mayor número de participantes, menor es la inversión por persona. Solicite una cotización personalizada según el tamaño de su área.",
        respuestaPlana:
          "El costo depende de la frecuencia, la modalidad (in-company, en línea o híbrida), el tamaño del grupo y la duración. Trabajamos con grupos de 1 a 10 colaboradores; a mayor número de participantes, menor es la inversión por persona. Solicite una cotización personalizada según el tamaño de su área.",
      },
      {
        pregunta: "¿El programa respeta la confidencialidad de un área legal?",
        respuesta:
          "Sí. El esquema es confidencial y el nivel de detalle de los reportes lo autoriza el área. Para un director jurídico o un abogado clave, el programa se estructura como coaching individual confidencial.",
        respuestaPlana:
          "Sí. El esquema es confidencial y el nivel de detalle de los reportes lo autoriza el área. Para un director jurídico o un abogado clave, el programa se estructura como coaching individual confidencial.",
      },
      {
        pregunta:
          "¿En cuánto tiempo mi equipo podrá coordinar con el corporativo en otro idioma?",
        respuesta: (
          <>
            Depende del nivel de partida. Un colaborador con nivel A2 tarda
            entre <strong>12 y 18 meses</strong> en alcanzar B2 (suficiente para
            coordinación y reuniones). Un equipo que parte de B1 puede llegar a
            B2 en 6 a 9 meses con sesiones enfocadas. Reportamos avance con
            evidencias comprobables.
          </>
        ),
        respuestaPlana:
          "Depende del nivel de partida. Un colaborador con nivel A2 tarda entre 12 y 18 meses en alcanzar B2 (suficiente para coordinación y reuniones). Un equipo que parte de B1 puede llegar a B2 en 6 a 9 meses con sesiones enfocadas. Reportamos avance con evidencias comprobables.",
      },
      {
        pregunta: "¿Cómo miden el progreso?",
        respuesta:
          "Evaluamos desempeño lingüístico real, no exámenes de memoria. El colaborador demuestra la competencia en una situación de coordinación (reunión simulada, instrucción a despacho, correo de seguimiento) evaluada con rúbrica de idioma. Quien coordina recibe una Tarjeta de Resultados con los enlaces para revisar el avance.",
        respuestaPlana:
          "Evaluamos desempeño lingüístico real, no exámenes de memoria. El colaborador demuestra la competencia en una situación de coordinación (reunión simulada, instrucción a despacho, correo de seguimiento) evaluada con rúbrica de idioma. Quien coordina recibe una Tarjeta de Resultados con los enlaces para revisar el avance.",
      },
      {
        pregunta: "¿Qué idiomas ofrecen?",
        respuesta:
          "Inglés, francés, alemán, italiano, portugués y español para extranjeros. Inglés para la mayoría de los corporativos; los demás según el origen de su grupo y sus despachos.",
        respuestaPlana:
          "Inglés, francés, alemán, italiano, portugués y español para extranjeros. Inglés para la mayoría de los corporativos; los demás según el origen de su grupo y sus despachos.",
      },
      {
        pregunta:
          "¿Pueden capacitar equipos distribuidos en varias sedes o países?",
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
    ],
  },

  servicio: {
    nombre: "Capacitación de idiomas para equipos legales y de cumplimiento",
    tipo: "Capacitación corporativa de idiomas para equipos legales",
    descripcion:
      "Inglés y otros idiomas para áreas legales y de cumplimiento. El idioma de negocios con que su equipo coordina con corporativo, matriz legal y despachos.",
  },
};

export default datos;
