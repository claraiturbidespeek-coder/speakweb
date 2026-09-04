import { IDIOMAS, type DatosEquipo } from "../tipos";

/* Contenido de /equipo/ventas-y-marketing/, la referencia de diseño.

   Transcrito literalmente de la página que ya estaba construida y aprobada, sin
   tocar una coma: esta conversión mueve el contenido de JSX a datos, no lo
   reescribe.

   Una diferencia con las otras seis áreas, del propio original:
   - Ocho tarjetas de competencias en vez de seis.

   La franja de idiomas se agregó después para igualar a las otras seis. El
   texto que lleva es el del cliente: no estaba en el documento original y lo
   entregó más tarde, así que sustituyó al párrafo provisional que se había
   escrito con el criterio de las áreas hermanas.

   También es la única con imagen de hero propia; las otras seis usan de momento
   la del mosaico del home. */

const datos: DatosEquipo = {
  slug: "ventas-y-marketing",
  nombre: "Ventas y Marketing",

  hero: {
    etiqueta: "Inglés corporativo · Ventas y Marketing",
    titulo: (
      <>
        Cursos de idiomas para equipos de <strong>Ventas y Marketing</strong>
      </>
    ),
    sub: (
      <>
        Negocie, presente y comunique con confianza en el idioma de su cliente,
        y <strong>que nunca sea la razón de una oportunidad perdida</strong>:
        una sola cuesta más que todo un programa anual de capacitación. Inglés,
        francés, alemán, italiano, portugués o español: su equipo es la cara de
        la empresa.
      </>
    ),
    cta: "Solicite una Cotización",
    prueba: (
      <>
        +<strong>500 empresas</strong> confían en S-Peak para capacitar a sus
        equipos comerciales
      </>
    ),
    imagen: {
      src: "/images/equipo/hero-ventas-y-marketing.webp",
      alt: "Equipo comercial en cursos de inglés de negocios",
    },
  },

  competencias: {
    eyebrow: "Las competencias lingüísticas del equipo de ventas y marketing",
    titulo:
      "Su equipo ya sabe su trabajo. Le falta hacerlo en el idioma de su cliente.",
    sub: "No necesita más gramática: necesita el idioma dentro de las situaciones que ya maneja, del primer contacto al seguimiento. En inglés o en el idioma de su mercado.",
    tarjetas: [
      {
        icono: "grafico",
        titulo: "Eventos y ferias",
        texto:
          "Interacción natural en encuentros internacionales: iniciar y sostener diálogos de valor con desconocidos.",
      },
      {
        icono: "lapiz",
        titulo: "Llamadas y videollamadas",
        texto:
          "Entender a un cliente con acento y responder en el momento, sin pedir que repita ni depender de un compañero que traduzca.",
      },
      {
        icono: "presentacion",
        titulo: "Correos y propuestas",
        texto:
          "Correos de ventas, propuestas y mensajes de prospección redactados con claridad, sin errores y con el tono correcto.",
      },
      {
        icono: "usuarios",
        titulo: "Presentaciones ejecutivas",
        texto:
          "Exposición ante directivos, comités de compra o socios comerciales, con respuestas fluidas a preguntas en tiempo real.",
      },
      {
        icono: "apreton",
        titulo: "Negociación y objeciones",
        texto:
          "Frases y estructuras para proponer condiciones, contraofertar, manejar pausas y responder resistencias (precio, tiempo, autoridad, riesgo) sin perder fluidez ni tono.",
      },
      {
        icono: "escudo",
        titulo: "Posventa y seguimiento",
        texto:
          "Comunicación de seguimiento y resolución de problemas en el idioma del cliente, cuando la precisión importa más.",
      },
      {
        icono: "bloques",
        titulo: "Materiales y campañas",
        texto:
          "Briefs a agencias y proveedores en el extranjero, revisión de textos de campaña y adaptación de mensajes sin traducir literal.",
      },
      {
        icono: "diadema",
        titulo: "Vocabulario de su industria",
        texto:
          "Terminología de ventas y marketing del día a día (embudo, métricas, CAC, LTV, CTR), en el idioma en que su cliente la usa.",
      },
    ],
  },

  franja: {
    titulo: "El idioma de su cliente, no solo inglés",
    texto:
      "La mayoría de nuestros programas son en inglés, porque es el idioma de la mayoría de los negocios internacionales. Pero si su equipo vende en Brasil, Alemania, Francia o Italia, lo capacitamos en la lengua en que su cliente decide la compra. En el diagnóstico definimos cuál.",
    idiomas: IDIOMAS,
  },

  dolor: {
    eyebrow: "El costo real de la barrera del idioma",
    titulo:
      "Su equipo ya sabe vender. Le falta hacerlo en el idioma de su cliente.",
    sub: "No es una métrica abstracta; es un costo medible y silencioso que se refleja en tres escenarios:",
    tarjetas: [
      {
        icono: "documentoX",
        titulo: "La propuesta que no se cerró",
        texto:
          "Su mejor vendedor tiene la solución y los números, pero si no fluye en el idioma, el cliente duda y la competencia entra. Un solo contrato internacional perdido al año cuesta más que todo un programa anual de capacitación.",
      },
      {
        icono: "correoX",
        titulo: "El correo de prospección sin respuesta",
        texto:
          "Su equipo envía 200 correos al mes a Estados Unidos, Europa o Latinoamérica, pero la tasa de respuesta es del 1%. Un correo con errores de gramática o tono se descarta en el primer párrafo.",
      },
      {
        icono: "usuarioX",
        titulo: "La feria internacional sin contactos reales",
        texto:
          "Una inversión de 50,000 dólares en un stand en HANNOVER MESSE o CES se pierde si las conversaciones no pasan del “nice to meet you”. Sin un segundo contacto, no hay negocio.",
      },
    ],
    cta: "Solicite una Cotización",
  },

  mercado: {
    eyebrow: "Por qué urge ahora",
    titulo:
      "Por qué su empresa no puede esperar el año próximo para capacitar al equipo comercial",
    texto:
      "Cada mes que su equipo comercial opera sin el idioma correcto es una ventana que se cierra frente a la competencia. Estos son los datos que explican por qué actuar ahora, no en el próximo trimestre, marca la diferencia.",
    etiquetaCarrusel: "Razones para capacitar al equipo comercial ahora",
    tarjetas: [
      {
        icono: "birrete",
        titulo: "El talento bilingüe es escaso y caro de retener",
        texto: (
          <>
            Alrededor de 8 de cada 100 personas ocupadas en México hablan
            inglés.{" "}
            <strong>
              Capacitar al equipo que ya conoce su operación y su cartera
            </strong>{" "}
            reduce la dependencia de un solo vendedor bilingüe.
          </>
        ),
        fuente: "Fuente: ENOE, INEGI",
      },
      {
        icono: "flecha",
        titulo:
          "Su mercado más grande exige inglés ($534,874 M en exportaciones a EE.UU.)",
        texto:
          "México es el primer socio comercial de Estados Unidos desde 2023. Depender de un solo colaborador bilingüe crea un cuello de botella.",
        fuente: "Fuente: Secretaría de Economía e INEGI",
      },
      {
        icono: "fabrica",
        titulo:
          "El nearshoring trae a sus próximos clientes y no hablan español",
        texto:
          "Se proyectan 500,000 empleos y 50,000 millones en inversión en 3 años. El proveedor que negocia directamente en el idioma del inversionista entra primero.",
        fuente: "Fuente: Secretaría de Economía",
      },
      {
        icono: "alerta",
        titulo: "Un error de interpretación en el T-MEC cuesta millones",
        texto:
          "Desde 2025, EE.UU. aplica aranceles del 25% a productos que incumplan reglas de origen. Comprender estas normativas en inglés técnico protege los márgenes del negocio.",
        fuente: "Fuente: USTR y DOF 2025",
      },
    ],
  },

  diferenciadores: {
    eyebrow: "Por qué S-Peak",
    titulo: "Empresas como Braskem Idesa, Chedraui y +500 más eligen S-Peak",
    tarjetas: [
      {
        icono: "diana",
        titulo: "Programa diseñado por sector",
        texto:
          "Adaptamos el vocabulario, casos y simulaciones a su industria (manufactura, retail, servicios financieros, tecnología o farmacéutica). Sin cursos genéricos.",
      },
      {
        icono: "tendencia",
        titulo: "Medición real de avance",
        texto:
          "Tarjeta de Resultados mensual para Dirección con evidencias comprobables. No reportamos solo asistencia, sino competencias adquiridas.",
      },
      {
        icono: "globo",
        titulo: "El idioma de su cliente, no solo inglés",
        texto:
          "Inglés para Norteamérica y negocios globales, así como francés, alemán, italiano, portugués o español según sus metas estratégicas.",
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
    titulo: "Comience con una cotización para su equipo de ventas y marketing",
    texto: "Cuéntenos su caso. Le responderemos en menos de 24 horas hábiles.",
    cta: "Solicite una Cotización",
  },

  testimonios: {
    titulo:
      "Lo que dicen los equipos de ventas que ya se capacitaron con S-Peak",
  },

  faq: {
    titulo:
      "Preguntas frecuentes sobre capacitación para equipos de ventas y marketing",
    texto: "Resolvemos las dudas más comunes antes de que tenga que buscarlas.",
    ctaTitulo: "¿Tiene una pregunta que no está aquí?",
    ctaBoton: "Solicite una Cotización",
    preguntas: [
      {
        pregunta: "¿Cuánto cuesta capacitar a un equipo de ventas y marketing?",
        respuesta: (
          <>
            El precio se define por la modalidad (en línea o presencial) y los
            horarios de las sesiones. Se cotiza{" "}
            <strong>por grupo completo, no por persona:</strong> de 1 a 10
            participantes, a mayor número, menor costo por colaborador. La
            frecuencia no cambia la tarifa: define el ritmo de avance y la
            inversión mensual.{" "}
            <strong>Solicite una cotización adaptada a su equipo.</strong>
          </>
        ),
        respuestaPlana:
          "El precio se define por la modalidad (en línea o presencial) y los horarios de las sesiones. Se cotiza por grupo completo, no por persona: de 1 a 10 participantes, a mayor número, menor costo por colaborador. La frecuencia no cambia la tarifa: define el ritmo de avance y la inversión mensual. Solicite una cotización adaptada a su equipo.",
      },
      {
        pregunta:
          "¿En cuánto tiempo mi equipo estará listo para negociar en otro idioma?",
        respuesta: (
          <>
            Depende del nivel de partida. En promedio, pasar de un nivel al
            siguiente (por ejemplo, de B1 a B2, el nivel apto para negociar)
            toma <strong>alrededor de 9 meses</strong> con dos sesiones
            semanales de hora y media.{" "}
            <strong>
              Cotice y le damos una proyección realista en el diagnóstico
              inicial.
            </strong>
          </>
        ),
        respuestaPlana:
          "Depende del nivel de partida. En promedio, pasar de un nivel al siguiente (por ejemplo, de B1 a B2, el nivel apto para negociar) toma alrededor de 9 meses con dos sesiones semanales de hora y media. Cotice y le damos una proyección realista en el diagnóstico inicial.",
      },
      {
        pregunta: "¿Cómo miden el progreso de mi equipo?",
        respuesta:
          "Evaluamos el desempeño real con entregables prácticos al final de cada etapa (simulaciones de llamadas, propuestas escritas o la adaptación de un texto de campaña), no con exámenes de memoria. RH recibe la evidencia evaluada por rúbrica para verificar el avance de cada colaborador.",
        respuestaPlana:
          "Evaluamos el desempeño real con entregables prácticos al final de cada etapa (simulaciones de llamadas, propuestas escritas o la adaptación de un texto de campaña), no con exámenes de memoria. RH recibe la evidencia evaluada por rúbrica para verificar el avance de cada colaborador.",
      },
      {
        pregunta: "¿Qué pasa si las agendas del equipo se atraviesan?",
        respuesta: (
          <>
            Las sesiones se agendan en los horarios que mejor convengan a su
            operación. Si un día se cruza una junta o un viaje,{" "}
            <strong>la sesión se repone sin trámites</strong> y el colaborador
            recibe la grabación con los temas vistos, para que el avance del
            grupo no se detenga.
          </>
        ),
        respuestaPlana:
          "Las sesiones se agendan en los horarios que mejor convengan a su operación. Si un día se cruza una junta o un viaje, la sesión se repone sin trámites y el colaborador recibe la grabación con los temas vistos, para que el avance del grupo no se detenga.",
      },
      {
        pregunta: "¿Qué idiomas ofrecen para equipos de ventas y marketing?",
        respuesta: (
          <>
            <strong>
              Inglés, francés, alemán, italiano, portugués y español para
              extranjeros.
            </strong>{" "}
            Cada programa se alinea a su mercado: inglés para negocios globales,
            alemán si le vende a la cadena automotriz, italiano si su mercado es
            el Bajío industrial. Y si su empresa opera en varios países,
            coordinamos la capacitación simultánea desde un solo punto de
            contacto.
          </>
        ),
        respuestaPlana:
          "Inglés, francés, alemán, italiano, portugués y español para extranjeros. Cada programa se alinea a su mercado: inglés para negocios globales, alemán si le vende a la cadena automotriz, italiano si su mercado es el Bajío industrial. Y si su empresa opera en varios países, coordinamos la capacitación simultánea desde un solo punto de contacto.",
      },
      {
        pregunta:
          "¿Sirve también para el equipo de marketing o solo para vendedores?",
        respuesta: (
          <>
            Sí. Marketing trabaja el idioma en sus propias situaciones: redactar
            y revisar textos de campaña, dar briefs a agencias o proveedores en
            el extranjero, y adaptar mensajes a otro mercado sin traducir
            literal. El programa se arma{" "}
            <strong>según la función de cada colaborador.</strong>{" "}
            <strong>
              Cuéntenos cómo trabaja su equipo y lo armamos a la medida.
            </strong>
          </>
        ),
        respuestaPlana:
          "Sí. Marketing trabaja el idioma en sus propias situaciones: redactar y revisar textos de campaña, dar briefs a agencias o proveedores en el extranjero, y adaptar mensajes a otro mercado sin traducir literal. El programa se arma según la función de cada colaborador. Cuéntenos cómo trabaja su equipo y lo armamos a la medida.",
      },
      {
        pregunta:
          "¿La capacitación tiene registro ante la STPS y es deducible?",
        respuesta: (
          <>
            Sí a ambas. Contamos con{" "}
            <strong>registro oficial ante la STPS</strong> y emitimos constancia
            de capacitación para sus colaboradores. La inversión{" "}
            <strong>puede calificar</strong> para la deducción adicional del 25%
            del Plan México (DOF 2025); confírmelo con su área contable.
          </>
        ),
        respuestaPlana:
          "Sí a ambas. Contamos con registro oficial ante la STPS y emitimos constancia de capacitación para sus colaboradores. La inversión puede calificar para la deducción adicional del 25% del Plan México (DOF 2025); confírmelo con su área contable.",
      },
      {
        pregunta: "¿Cuál es el ROI de capacitar al equipo comercial?",
        respuesta: (
          <>
            Se vuelve tangible cuando su equipo vende y se comunica
            directamente, sin traductores ni intermediarios. Para la mayoría de
            las empresas,{" "}
            <strong>
              asegurar un solo contrato internacional que se habría perdido
              cubre toda la inversión anual del programa.
            </strong>
          </>
        ),
        respuestaPlana:
          "Se vuelve tangible cuando su equipo vende y se comunica directamente, sin traductores ni intermediarios. Para la mayoría de las empresas, asegurar un solo contrato internacional que se habría perdido cubre toda la inversión anual del programa.",
      },
    ],
  },

  servicio: {
    nombre: "Cursos de idiomas para equipos de Ventas y Marketing",
    tipo: "Capacitación corporativa de idiomas para equipos comerciales",
    descripcion:
      "Inglés y otros idiomas para vendedores y equipos de marketing B2B. Vocabulario comercial, presentaciones ejecutivas y conversación con clientes internacionales.",
  },
};

export default datos;
