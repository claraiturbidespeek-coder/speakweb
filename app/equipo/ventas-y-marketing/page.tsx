import type { Metadata } from "next";
import Script from "next/script";
import BotonContacto from "@/app/components/contacto/BotonContacto";
import styles from "./equipo.module.css";

export const metadata: Metadata = {
  title: "Cursos de Idiomas para Equipos de Ventas y Marketing | S-Peak",
  description:
    "Inglés y otros idiomas para vendedores y equipos de marketing B2B. Vocabulario comercial, presentaciones ejecutivas y conversación con clientes internacionales. Cotice ahora.",
  alternates: { canonical: "https://s-peak.com/equipo/ventas-y-marketing/" },
};

// Datos estructurados, copiados del original (líneas 713-740).
const DATOS_ESTRUCTURADOS = "{\n  \"@context\": \"https://schema.org\",\n  \"@graph\": [\n    {\n      \"@type\": \"BreadcrumbList\",\n      \"itemListElement\": [\n        {\n          \"@type\": \"ListItem\",\n          \"position\": 1,\n          \"name\": \"Inicio\",\n          \"item\": \"https://s-peak.com/\"\n        },\n        {\n          \"@type\": \"ListItem\",\n          \"position\": 2,\n          \"name\": \"Soluciones por Equipo\",\n          \"item\": \"https://s-peak.com/equipo/\"\n        },\n        {\n          \"@type\": \"ListItem\",\n          \"position\": 3,\n          \"name\": \"Ventas y Marketing\",\n          \"item\": \"https://s-peak.com/equipo/ventas-y-marketing/\"\n        }\n      ]\n    },\n    {\n      \"@type\": \"Service\",\n      \"name\": \"Cursos de idiomas para equipos de Ventas y Marketing\",\n      \"serviceType\": \"Capacitación corporativa de idiomas para equipos comerciales\",\n      \"provider\": {\n        \"@type\": \"Organization\",\n        \"name\": \"S-Peak\",\n        \"url\": \"https://s-peak.com\"\n      },\n      \"areaServed\": {\n        \"@type\": \"Country\",\n        \"name\": \"México\"\n      },\n      \"description\": \"Inglés y otros idiomas para vendedores y equipos de marketing B2B. Vocabulario comercial, presentaciones ejecutivas y conversación con clientes internacionales.\"\n    },\n    {\n      \"@type\": \"FAQPage\",\n      \"mainEntity\": [\n        {\n          \"@type\": \"Question\",\n          \"name\": \"¿Cuánto cuesta capacitar a un equipo de ventas y marketing?\",\n          \"acceptedAnswer\": {\n            \"@type\": \"Answer\",\n            \"text\": \"El precio se define por la modalidad (en línea o presencial) y los horarios de las sesiones. Se cotiza por grupo completo, no por persona: de 1 a 10 participantes, a mayor número, menor costo por colaborador. La frecuencia no cambia la tarifa: define el ritmo de avance y la inversión mensual. Solicite una cotización adaptada a su equipo.\"\n          }\n        },\n        {\n          \"@type\": \"Question\",\n          \"name\": \"¿En cuánto tiempo mi equipo estará listo para negociar en otro idioma?\",\n          \"acceptedAnswer\": {\n            \"@type\": \"Answer\",\n            \"text\": \"Depende del nivel de partida. En promedio, pasar de un nivel al siguiente (por ejemplo, de B1 a B2, el nivel apto para negociar) toma alrededor de 9 meses con dos sesiones semanales de hora y media. Cotice y le damos una proyección realista en el diagnóstico inicial.\"\n          }\n        },\n        {\n          \"@type\": \"Question\",\n          \"name\": \"¿Cómo miden el progreso de mi equipo?\",\n          \"acceptedAnswer\": {\n            \"@type\": \"Answer\",\n            \"text\": \"Evaluamos el desempeño real con entregables prácticos al final de cada etapa (simulaciones de llamadas, propuestas escritas o la adaptación de un texto de campaña), no con exámenes de memoria. RH recibe la evidencia evaluada por rúbrica para verificar el avance de cada colaborador.\"\n          }\n        },\n        {\n          \"@type\": \"Question\",\n          \"name\": \"¿Qué pasa si las agendas del equipo se atraviesan?\",\n          \"acceptedAnswer\": {\n            \"@type\": \"Answer\",\n            \"text\": \"Las sesiones se agendan en los horarios que mejor convengan a su operación. Si un día se cruza una junta o un viaje, la sesión se repone sin trámites y el colaborador recibe la grabación con los temas vistos, para que el avance del grupo no se detenga.\"\n          }\n        },\n        {\n          \"@type\": \"Question\",\n          \"name\": \"¿Qué idiomas ofrecen para equipos de ventas y marketing?\",\n          \"acceptedAnswer\": {\n            \"@type\": \"Answer\",\n            \"text\": \"Inglés, francés, alemán, italiano, portugués y español para extranjeros. Cada programa se alinea a su mercado: inglés para negocios globales, alemán para el sector automotriz o italiano para el Bajío industrial. Y si su empresa opera en varios países, coordinamos la capacitación simultánea desde un solo punto de contacto.\"\n          }\n        },\n        {\n          \"@type\": \"Question\",\n          \"name\": \"¿Sirve también para el equipo de marketing o solo para vendedores?\",\n          \"acceptedAnswer\": {\n            \"@type\": \"Answer\",\n            \"text\": \"Sí. Marketing trabaja el idioma en sus propias situaciones: redactar y revisar textos de campaña, dar briefs a agencias o proveedores en el extranjero, y adaptar mensajes a otro mercado sin traducir literal. El programa se arma según la función de cada colaborador. Cuéntenos cómo trabaja su equipo y lo armamos a la medida.\"\n          }\n        },\n        {\n          \"@type\": \"Question\",\n          \"name\": \"¿La capacitación tiene registro ante la STPS y es deducible?\",\n          \"acceptedAnswer\": {\n            \"@type\": \"Answer\",\n            \"text\": \"Sí a ambas. Contamos con registro oficial ante la STPS y emitimos constancia de capacitación para sus colaboradores. La inversión puede calificar para la deducción adicional del 25% del Plan México (DOF 2025); confírmelo con su área contable.\"\n          }\n        },\n        {\n          \"@type\": \"Question\",\n          \"name\": \"¿Cuál es el ROI de capacitar al equipo comercial?\",\n          \"acceptedAnswer\": {\n            \"@type\": \"Answer\",\n            \"text\": \"Se vuelve tangible cuando su equipo vende y se comunica directamente, sin traductores ni intermediarios. Para la mayoría de las empresas, asegurar un solo contrato internacional que se habría perdido cubre toda la inversión anual del programa.\"\n          }\n        }\n      ]\n    }\n  ]\n}";

// Scripts copiados textualmente. Quedan fuera el modal y el envío del
// formulario, que se van con el componente de contacto compartido.
const GUION = `
  // Reveal on scroll
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Carrusel mercado: auto-scroll continuo + arrastre manual
  (function () {
    const car = document.getElementById('mercadoCarousel');
    if (!car) return;

    const SPEED = 0.045;   // px por milisegundo (~45 px/s)
    const originals = Array.from(car.children);
    if (!originals.length) return;

    // Se duplican las tarjetas: al llegar al final del primer juego se resta
    // un periodo y el contenido bajo la ventana es idéntico, así el bucle no salta.
    const appendSet = () => originals.forEach(node => {
      const clone = node.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
      car.appendChild(clone);
    });

    let period = 0;
    const layout = () => {
      if (car.children.length <= originals.length) appendSet();
      period = car.children[originals.length].offsetLeft - car.children[0].offsetLeft;
      // Suficientes juegos para que un periodo completo siempre sea alcanzable.
      let guard = 0;
      while (period > 0 && car.scrollWidth - car.clientWidth < period && guard++ < 6) appendSet();
    };
    layout();

    let pos = car.scrollLeft;
    let hovering = false, dragging = false, touching = false, touchTimer = null;
    let manual = false;
    let last = null;

    const running = () => !hovering && !dragging && !touching && !manual && period > 0;

    const tick = (ts) => {
      if (last === null) last = ts;
      let dt = ts - last;
      last = ts;
      if (dt > 100) dt = 100;              // evita un salto al volver de otra pestaña
      if (running()) {
        pos += SPEED * dt;
        while (pos >= period) pos -= period;
        car.scrollLeft = pos;
      }
      requestAnimationFrame(tick);
    };

    // Si el desplazamiento no lo produjimos nosotros, fue el usuario: nos resincronizamos
    // para que el movimiento automático continúe desde donde él lo dejó.
    car.addEventListener('scroll', () => {
      if (Math.abs(car.scrollLeft - pos) > 2) pos = car.scrollLeft;
    }, { passive: true });

    car.addEventListener('mouseenter', () => { hovering = true; });
    car.addEventListener('mouseleave', () => { hovering = false; });
    car.addEventListener('focusin', () => { hovering = true; });
    car.addEventListener('focusout', () => { hovering = false; });

    // Táctil: se cede el control al gesto nativo y se reanuda tras la inercia.
    car.addEventListener('touchstart', () => {
      touching = true;
      if (touchTimer) clearTimeout(touchTimer);
    }, { passive: true });
    car.addEventListener('touchend', () => {
      if (touchTimer) clearTimeout(touchTimer);
      touchTimer = setTimeout(() => { touching = false; }, 1200);
    }, { passive: true });

    // Arrastre con mouse/pluma
    let startX = 0, startLeft = 0;
    car.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return;
      dragging = true;
      startX = e.clientX;
      startLeft = car.scrollLeft;
      car.classList.add('dragging');
    });

    car.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4 && !car.hasPointerCapture(e.pointerId)) {
        car.setPointerCapture(e.pointerId);
      }
      car.scrollLeft = startLeft - dx;
    });

    const stopDrag = (e) => {
      if (!dragging) return;
      dragging = false;
      pos = car.scrollLeft;
      car.classList.remove('dragging');
      if (e && car.hasPointerCapture(e.pointerId)) car.releasePointerCapture(e.pointerId);
    };
    car.addEventListener('pointerup', stopDrag);
    car.addEventListener('pointercancel', stopDrag);
    car.addEventListener('pointerleave', stopDrag);

    // --- Flechas de navegación ---
    const prev = document.getElementById('mercadoPrev');
    const next = document.getElementById('mercadoNext');
    const suave = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

    const paso = () => {
      const a = car.children[0], b = car.children[1];
      return b ? b.offsetLeft - a.offsetLeft : a.offsetWidth;
    };

    const actualizarFlechas = () => {
      if (!prev || !next) return;
      const max = car.scrollWidth - car.clientWidth;
      prev.disabled = car.scrollLeft <= 1;
      next.disabled = car.scrollLeft >= max - 1;
    };

    // Al usar una flecha el carrusel pasa a manual de forma permanente: se
    // retiran los clones del bucle para que tenga principio y final reales, y
    // así el estado deshabilitado de las flechas signifique algo.
    const pasarAManual = () => {
      if (manual) return;
      manual = true;
      while (car.children.length > originals.length) car.removeChild(car.lastElementChild);
      const max = car.scrollWidth - car.clientWidth;
      if (car.scrollLeft > max) car.scrollLeft = max;
      pos = car.scrollLeft;
    };

    const mover = (dir) => {
      pasarAManual();
      car.scrollBy({ left: dir * paso(), behavior: suave });
    };

    if (prev && next) {
      prev.addEventListener('click', () => mover(-1));
      next.addEventListener('click', () => mover(1));
      car.addEventListener('scroll', actualizarFlechas, { passive: true });
      actualizarFlechas();
    }

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // En manual no se vuelven a clonar tarjetas: el recorrido ya es finito.
        if (!manual) { layout(); pos = car.scrollLeft; }
        actualizarFlechas();
      }, 150);
    });

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      requestAnimationFrame(tick);
    }
  })();

`;

export default function VentasYMarketing() {
  return (
    <>
      <main>

{/* BREADCRUMB */}
<div className={styles.breadcrumb}>
  <div className={styles.breadcrumbInner}>
    <a href="https://s-peak.com">Inicio</a>
    <span aria-hidden="true">›</span>
    <a href="https://s-peak.com/equipo/">Soluciones por Equipo</a>
    <span aria-hidden="true">›</span>
    <span>Ventas y Marketing</span>
  </div>
</div>

{/* HERO */}
<section className={styles.hero}>
  <img style={{ position: "absolute", top: "20px", right: "20px", width: "60px", opacity: "0.06", transform: "rotate(15deg)", pointerEvents: "none" }} src="/images/isotype.svg" alt="" aria-hidden="true" loading="lazy" />
  <div className={styles.heroInner}>
    <div className="reveal">
      <div className="sp-etiqueta">Inglés corporativo · Ventas y Marketing</div>
      <h1>Cursos de idiomas para equipos de <strong>Ventas y Marketing</strong></h1>
      <p className="sp-hero-sub">Negocie, presente y comunique con confianza en el idioma de su cliente, y que el idioma nunca sea la razón de una oportunidad perdida: una sola cuesta más que todo un programa anual de capacitación. Inglés, francés, alemán, italiano, portugués o español: su equipo es la cara de la empresa.</p>
      <BotonContacto className="sp-btn sp-btn--rojo">Solicite una Cotización</BotonContacto>
      <div className="sp-hero-social">
        <div className="sp-avatares">
          <span className="sp-avatar-apilado">MG</span>
          <span className="sp-avatar-apilado">FH</span>
          <span className="sp-avatar-apilado">AV</span>
          <span className="sp-avatar-apilado">RC</span>
        </div>
        <div>
          <div className="sp-estrellas">★★★★★</div>
          <p>+<strong>500 empresas</strong> confían en S-Peak para capacitar a sus equipos comerciales</p>
        </div>
      </div>
    </div>
    <div className={`${styles.heroVisual} reveal`}>
      <div className={styles.heroImgWrap}>
        <img src="/images/equipo/hero-ventas-y-marketing.webp" alt="Equipo comercial en cursos de inglés de negocios" width="600" height="420" loading="eager" />
      </div>
      <div className="sp-stats-row">
        <div className="sp-stat">
          <span className="sp-icono sp-icono--sm sp-icono--rojo">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
          </span>
          <span className="sp-stat-num">+40K</span>
          <span className="sp-stat-label">Profesionales formados</span>
        </div>
        <div className="sp-stat">
          <span className="sp-icono sp-icono--sm sp-icono--rojo">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
          </span>
          <span className="sp-stat-num">+500</span>
          <span className="sp-stat-label">Empresas atendidas</span>
        </div>
        <div className="sp-stat">
          <span className="sp-icono sp-icono--sm sp-icono--rojo">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
          </span>
          <span className="sp-stat-num">+20</span>
          <span className="sp-stat-label">Años de experiencia</span>
        </div>
      </div>
    </div>
  </div>
</section>

{/* LOGOS */}
<div className="sp-logos">
  <div className="sp-logos-card">
    <p className="sp-logos-label">Más de 500 empresas confían en <strong>S-Peak</strong></p>
    <div className="sp-marquesina">
      <div className="sp-marquesina-track">
        <img src="/images/logos/axa.webp" alt="AXA" height="44" loading="lazy" />
        <img src="/images/logos/gbm.webp" alt="GBM" height="44" loading="lazy" />
        <img src="/images/logos/loreal.webp" alt="L'Oréal" height="44" loading="lazy" />
        <img src="/images/logos/naturgy.webp" alt="Naturgy" height="44" loading="lazy" />
        <img src="/images/logos/pepsico.webp" alt="PepsiCo" height="44" loading="lazy" />
        <img src="/images/logos/santander.webp" alt="Santander" height="44" loading="lazy" />
        <img src="/images/logos/walmart.webp" alt="Walmart" height="44" loading="lazy" />
        <img src="/images/logos/axa.webp" alt="" aria-hidden="true" height="44" loading="lazy" />
        <img src="/images/logos/gbm.webp" alt="" aria-hidden="true" height="44" loading="lazy" />
        <img src="/images/logos/loreal.webp" alt="" aria-hidden="true" height="44" loading="lazy" />
        <img src="/images/logos/naturgy.webp" alt="" aria-hidden="true" height="44" loading="lazy" />
        <img src="/images/logos/pepsico.webp" alt="" aria-hidden="true" height="44" loading="lazy" />
        <img src="/images/logos/santander.webp" alt="" aria-hidden="true" height="44" loading="lazy" />
        <img src="/images/logos/walmart.webp" alt="" aria-hidden="true" height="44" loading="lazy" />
      </div>
    </div>
  </div>
</div>

{/* COMPETENCIAS */}
<section className={`sp-seccion ${styles.competencias}`} id="competencias">
  <div className="sp-inner">
    <div className="sp-seccion-top reveal">
      <div className="sp-eyebrow" style={{ justifyContent: "center" }}>Las habilidades lingüísticas del equipo de ventas y marketing</div>
      <h2>Su equipo ya sabe su trabajo. Le falta hacerlo en el idioma de su cliente.</h2>
      <p>No necesita más gramática: necesita el idioma dentro de las situaciones que ya maneja, del primer contacto al seguimiento. En inglés o en el idioma de su mercado.</p>
    </div>
    <div className={`${styles.compGrid} reveal stagger`}>
      <div className={`sp-tarjeta sp-barra ${styles.compCard}`}>
        <div className="sp-icono sp-icono--xl sp-icono--rojo">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
        </div>
        <h3>Eventos y ferias</h3>
        <p>Interacción natural en encuentros internacionales: iniciar y sostener diálogos de valor con desconocidos.</p>
      </div>
      <div className={`sp-tarjeta sp-barra ${styles.compCard}`}>
        <div className="sp-icono sp-icono--xl sp-icono--rojo">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
        </div>
        <h3>Llamadas y videollamadas</h3>
        <p>Entender a un cliente con acento y responder en el momento, sin pedir que repita ni depender de un compañero que traduzca.</p>
      </div>
      <div className={`sp-tarjeta sp-barra ${styles.compCard}`}>
        <div className="sp-icono sp-icono--xl sp-icono--rojo">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/></svg>
        </div>
        <h3>Correos y propuestas</h3>
        <p>Correos de ventas, propuestas y mensajes de prospección redactados con claridad, sin errores y con el tono correcto.</p>
      </div>
      <div className={`sp-tarjeta sp-barra ${styles.compCard}`}>
        <div className="sp-icono sp-icono--xl sp-icono--rojo">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <h3>Presentaciones ejecutivas</h3>
        <p>Exposición ante directivos, comités o inversionistas, con respuestas fluidas a preguntas en tiempo real.</p>
      </div>
      <div className={`sp-tarjeta sp-barra ${styles.compCard}`}>
        <div className="sp-icono sp-icono--xl sp-icono--rojo">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>
        </div>
        <h3>Negociación y objeciones</h3>
        <p>Frases y estructuras para proponer condiciones, contraofertar, manejar pausas y responder resistencias (precio, tiempo, autoridad, riesgo) sin perder fluidez ni tono.</p>
      </div>
      <div className={`sp-tarjeta sp-barra ${styles.compCard}`}>
        <div className="sp-icono sp-icono--xl sp-icono--rojo">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <h3>Posventa y seguimiento</h3>
        <p>Comunicación de seguimiento y resolución de problemas en el idioma del cliente, cuando la precisión importa más.</p>
      </div>
      <div className={`sp-tarjeta sp-barra ${styles.compCard}`}>
        <div className="sp-icono sp-icono--xl sp-icono--rojo">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>
        </div>
        <h3>Materiales y campañas</h3>
        <p>Briefs a agencias y proveedores en el extranjero, revisión de textos de campaña y adaptación de mensajes sin traducir literal.</p>
      </div>
      <div className={`sp-tarjeta sp-barra ${styles.compCard}`}>
        <div className="sp-icono sp-icono--xl sp-icono--rojo">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a9 9 0 0 1 18 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>
        </div>
        <h3>Vocabulario de su industria</h3>
        <p>Terminología de ventas y marketing del día a día (embudo, métricas, CAC, LTV, CTR), en el idioma en que su cliente la usa.</p>
      </div>
    </div>
  </div>
</section>

{/* DOLOR */}
<section className={`sp-seccion ${styles.dolor}`} id="dolor">
  <div className="sp-inner">
    <div className="sp-seccion-top reveal">
      <div className="sp-eyebrow" style={{ justifyContent: "center" }}>El costo real de la barrera del idioma</div>
      <h2>¿Cuántas oportunidades comerciales pierde su empresa por la <em>barrera del idioma</em>?</h2>
      <p>No es una métrica abstracta; es un costo medible y silencioso que se refleja en tres escenarios:</p>
    </div>
    <div className={`${styles.dolorGrid} reveal stagger`}>
      <div className={`sp-tarjeta sp-barra ${styles.dolorCard}`}>
        <div className="sp-icono sp-icono--lg sp-icono--claro">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m14.5 12.5-5 5"/><path d="m9.5 12.5 5 5"/></svg>
        </div>
        <h3>La propuesta que no se cerró</h3>
        <p>Su mejor vendedor tiene la solución y los números, pero si no fluye en el idioma, el cliente duda y la competencia entra. Un solo contrato internacional perdido al año cuesta más que todo un programa anual de capacitación.</p>
      </div>
      <div className={`sp-tarjeta sp-barra ${styles.dolorCard}`}>
        <div className="sp-icono sp-icono--lg sp-icono--claro">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m17 17 4 4"/><path d="m21 17-4 4"/></svg>
        </div>
        <h3>El correo de prospección sin respuesta</h3>
        <p>Su equipo envía 200 correos al mes a Estados Unidos, Europa o Latinoamérica, pero la tasa de respuesta es del 1%. Un correo con errores de gramática o tono se descarta en el primer párrafo.</p>
      </div>
      <div className={`sp-tarjeta sp-barra ${styles.dolorCard}`}>
        <div className="sp-icono sp-icono--lg sp-icono--claro">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" x2="22" y1="8" y2="13"/><line x1="22" x2="17" y1="8" y2="13"/></svg>
        </div>
        <h3>La feria internacional sin contactos reales</h3>
        <p>Una inversión de 50,000 dólares en un stand en HANNOVER MESSE o CES se pierde si las conversaciones no pasan del "nice to meet you". Sin un segundo contacto, no hay negocio.</p>
      </div>
    </div>
    <div className={`${styles.dolorCta} reveal`}>
      <BotonContacto className="sp-btn sp-btn--rojo">Solicite una Cotización</BotonContacto>
    </div>
  </div>
</section>

{/* MERCADO */}
<section className="sp-seccion" id="mercado">
  <div className={`sp-inner ${styles.mercadoInner}`}>
    <div className={`${styles.mercadoLeft} reveal`}>
      <div className="sp-eyebrow">Por qué urge ahora</div>
      <h2>Por qué su empresa no puede esperar el año próximo para capacitar al equipo comercial</h2>
      <p>Cada mes que su equipo comercial opera sin el idioma correcto es una ventana que se cierra frente a la competencia. Estos son los datos que explican por qué actuar ahora, no en el próximo trimestre, marca la diferencia.</p>
    </div>
    <div className={`${styles.mercadoRight} reveal`}>
      <div className={styles.mercadoNav}>
        <button type="button" className={styles.mercadoArrow} id="mercadoPrev" aria-controls="mercadoCarousel" aria-label="Ver tarjetas anteriores">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button type="button" className={styles.mercadoArrow} id="mercadoNext" aria-controls="mercadoCarousel" aria-label="Ver tarjetas siguientes">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
      <div className={`${styles.mercadoCarousel} stagger`} id="mercadoCarousel" tabIndex={0} role="region" aria-label="Razones para capacitar al equipo comercial ahora">
        <article className={`sp-tarjeta sp-barra ${styles.mercadoCard}`}>
          <div className="sp-icono sp-icono--md sp-icono--rojo">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
          </div>
          <h3>El talento bilingüe es escaso y caro de retener</h3>
          <p>Menos del 15% de los profesionales en México son verdaderamente bilingües. Capacitar al equipo que ya conoce su operación reduce la dependencia externa.</p>
          <span className={styles.mercadoCardSource}>Fuente: SEP</span>
        </article>
        <article className={`sp-tarjeta sp-barra ${styles.mercadoCard}`}>
          <div className="sp-icono sp-icono--md sp-icono--rojo">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/></svg>
          </div>
          <h3>Su mercado más grande exige inglés ($534,874 M en exportaciones a EE.UU.)</h3>
          <p>México es el primer socio comercial de Estados Unidos desde 2023. Depender de un solo colaborador bilingüe crea un cuello de botella.</p>
          <span className={styles.mercadoCardSource}>Fuente: Secretaría de Economía e INEGI</span>
        </article>
        <article className={`sp-tarjeta sp-barra ${styles.mercadoCard}`}>
          <div className="sp-icono sp-icono--md sp-icono--rojo">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>
          </div>
          <h3>El nearshoring trae a sus próximos clientes y no hablan español</h3>
          <p>Se proyectan 500,000 empleos y 50,000 millones en inversión en 3 años. El proveedor que negocia directamente en el idioma del inversionista entra primero.</p>
          <span className={styles.mercadoCardSource}>Fuente: Secretaría de Economía</span>
        </article>
        <article className={`sp-tarjeta sp-barra ${styles.mercadoCard}`}>
          <div className="sp-icono sp-icono--md sp-icono--rojo">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          </div>
          <h3>Un error de interpretación en el T-MEC cuesta millones</h3>
          <p>Desde 2025, EE.UU. aplica aranceles del 25% a productos que incumplan reglas de origen. Comprender estas normativas en inglés técnico protege los márgenes del negocio.</p>
          <span className={styles.mercadoCardSource}>Fuente: USTR y DOF 2025</span>
        </article>
      </div>
    </div>
  </div>
</section>

{/* DIFERENCIADORES */}
<section className={`sp-seccion ${styles.diferenciadores}`}>
  <div className="sp-inner">
    <div className="sp-seccion-top reveal">
      <div className="sp-eyebrow" style={{ justifyContent: "center" }}>Por qué S-Peak</div>
      <h2>Por qué empresas como Braskem Idesa, Chedraui y +500 más eligen S-Peak</h2>
    </div>
    <div className={`${styles.difGrid} reveal stagger`}>
      <div className={`sp-tarjeta sp-barra-lateral ${styles.difCard}`}>
        <div className="sp-icono sp-icono--lg sp-icono--navy">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        </div>
        <div>
          <h3>Programa diseñado por sector</h3>
          <p>Adaptamos el vocabulario, casos y simulaciones a su industria (manufactura, retail, servicios financieros, tecnología o farmacéutica). Sin cursos genéricos.</p>
        </div>
      </div>
      <div className={`sp-tarjeta sp-barra-lateral ${styles.difCard}`}>
        <div className="sp-icono sp-icono--lg sp-icono--navy">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/></svg>
        </div>
        <div>
          <h3>Medición real de avance</h3>
          <p>Tarjeta de Resultados mensual para Dirección con evidencias comprobables. No reportamos solo asistencia, sino competencias adquiridas.</p>
        </div>
      </div>
      <div className={`sp-tarjeta sp-barra-lateral ${styles.difCard}`}>
        <div className="sp-icono sp-icono--lg sp-icono--navy">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
        </div>
        <div>
          <h3>El idioma de su mercado, no solo inglés</h3>
          <p>Inglés para Norteamérica y negocios globales, así como francés, alemán, italiano, portugués o español según sus metas estratégicas.</p>
        </div>
      </div>
      <div className={`sp-tarjeta sp-barra-lateral ${styles.difCard}`}>
        <div className="sp-icono sp-icono--lg sp-icono--navy">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <div>
          <h3>Registro STPS y deducción fiscal</h3>
          <p>Contamos con registro oficial ante la STPS. La inversión puede calificar para la deducción adicional del 25% del Plan México (DOF 2025); confírmelo con su área contable.</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* CTA BANDA */}
<section className={`sp-banda ${styles.ctaBanda}`}>
  <img style={{ position: "absolute", top: "50%", right: "40px", width: "120px", opacity: "0.08", transform: "translateY(-50%) rotate(30deg)", pointerEvents: "none" }} src="/images/isotype.svg" alt="" aria-hidden="true" />
  <h2>Comience con una cotización para su equipo de ventas y marketing</h2>
  <p>Cuéntenos su caso. Le responderemos en menos de 24 horas hábiles.</p>
  <BotonContacto className="sp-btn sp-btn--blanco">Solicite una Cotización</BotonContacto>
</section>

{/* TESTIMONIOS */}
<section className={`sp-seccion ${styles.testimonials}`} id="resultados">
  <div className="sp-testi-top reveal">
    <div className="sp-eyebrow" style={{ color: "rgba(255,255,255,0.4)", justifyContent: "center" }}>Lo que dicen los equipos</div>
    <h2>Lo que dicen los equipos de ventas que ya se capacitaron con S-Peak</h2>
    <p>En S-Peak, el éxito no se supone: se mide en números.</p>
  </div>
  <div className={`${styles.testiGrid} reveal stagger`}>
    <div className="sp-testi-card sp-barra">
      <div className="sp-estrellas">★★★★★</div>
      <p className="sp-testi-quote">"El equipo de S-Peak tiene una gran actitud de servicio, sus cursos de idiomas son excelentes para nuestros equipos, se adaptan a las necesidades de sus perfiles de puesto."</p>
      <div className="sp-testi-autor">
        <div className="sp-avatar">BI</div>
        <div>
          <div className="sp-autor-nombre">Braskem Idesa</div>
          <div className="sp-autor-rol">Área de RRHH</div>
        </div>
      </div>
    </div>
    <div className="sp-testi-card sp-testi-card--acento sp-barra">
      <div className="sp-estrellas" style={{ color: "var(--color-navy)" }}>★★★★★</div>
      <p className="sp-testi-quote">"S-Peak es una organización sumamente dinámica. Su capacidad para entender nuestras necesidades específicas y adaptar sus mejores recursos a nuestros objetivos de negocio es su gran diferencial."</p>
      <div className="sp-testi-autor">
        <div className="sp-avatar">FD</div>
        <div>
          <div className="sp-autor-nombre">Fernanda D.</div>
          <div className="sp-autor-rol">Alumna · Chedraui</div>
        </div>
      </div>
    </div>
    <div className="sp-testi-card sp-barra">
      <div className="sp-estrellas">★★★★★</div>
      <p className="sp-testi-quote">"Valoramos el seguimiento que S-Peak nos brinda, el feedback que piden a través de citas regulares y encuestas, así como su reacción a lo que pedimos como cliente."</p>
      <div className="sp-testi-autor">
        <div className="sp-avatar">EC</div>
        <div>
          <div className="sp-autor-nombre">Erika C.</div>
          <div className="sp-autor-rol">People Development &amp; D&amp;I Expert</div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* FAQ */}
<section className="sp-seccion" id="faq">
  <div className={`sp-inner ${styles.faqInner}`}>
    <div className={`${styles.faqLeft} reveal`}>
      <div className="sp-eyebrow">Preguntas frecuentes</div>
      <h2>Preguntas frecuentes sobre capacitación para equipos de ventas y marketing</h2>
      <p>Resolvemos las dudas más comunes antes de que tenga que buscarlas.</p>
      <div className={`sp-cta-card ${styles.faqCtaCard}`}>
        <p>¿Tiene una pregunta que no está aquí?</p>
        <BotonContacto className="sp-btn sp-btn--rojo">Hable con un experto</BotonContacto>
      </div>
    </div>
    <div className="sp-faq-lista reveal">
      <details className="sp-faq-item" name="faq-equipo">
        <summary className="sp-faq-pregunta">
          ¿Cuánto cuesta capacitar a un equipo de ventas y marketing?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">El precio se define por la modalidad (en línea o presencial) y los horarios de las sesiones. Se cotiza <strong>por grupo completo, no por persona:</strong> de 1 a 10 participantes, a mayor número, menor costo por colaborador. La frecuencia no cambia la tarifa: define el ritmo de avance y la inversión mensual. <strong>Solicite una cotización adaptada a su equipo.</strong></div>
      </details>
      <details className="sp-faq-item" name="faq-equipo">
        <summary className="sp-faq-pregunta">
          ¿En cuánto tiempo mi equipo estará listo para negociar en otro idioma?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Depende del nivel de partida. En promedio, pasar de un nivel al siguiente (por ejemplo, de B1 a B2, el nivel apto para negociar) toma <strong>alrededor de 9 meses</strong> con dos sesiones semanales de hora y media. <strong>Cotice y le damos una proyección realista en el diagnóstico inicial.</strong></div>
      </details>
      <details className="sp-faq-item" name="faq-equipo">
        <summary className="sp-faq-pregunta">
          ¿Cómo miden el progreso de mi equipo?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Evaluamos el desempeño real con entregables prácticos al final de cada etapa (simulaciones de llamadas, propuestas escritas o la adaptación de un texto de campaña), no con exámenes de memoria. RH recibe la evidencia evaluada por rúbrica para verificar el avance de cada colaborador.</div>
      </details>
      <details className="sp-faq-item" name="faq-equipo">
        <summary className="sp-faq-pregunta">
          ¿Qué pasa si las agendas del equipo se atraviesan?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Las sesiones se agendan en los horarios que mejor convengan a su operación. Si un día se cruza una junta o un viaje, <strong>la sesión se repone sin trámites</strong> y el colaborador recibe la grabación con los temas vistos, para que el avance del grupo no se detenga.</div>
      </details>
      <details className="sp-faq-item" name="faq-equipo">
        <summary className="sp-faq-pregunta">
          ¿Qué idiomas ofrecen para equipos de ventas y marketing?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta"><strong>Inglés, francés, alemán, italiano, portugués y español para extranjeros.</strong> Cada programa se alinea a su mercado: inglés para negocios globales, alemán para el sector automotriz o italiano para el Bajío industrial. Y si su empresa opera en varios países, coordinamos la capacitación simultánea desde un solo punto de contacto.</div>
      </details>
      <details className="sp-faq-item" name="faq-equipo">
        <summary className="sp-faq-pregunta">
          ¿Sirve también para el equipo de marketing o solo para vendedores?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Sí. Marketing trabaja el idioma en sus propias situaciones: redactar y revisar textos de campaña, dar briefs a agencias o proveedores en el extranjero, y adaptar mensajes a otro mercado sin traducir literal. El programa se arma <strong>según la función de cada colaborador.</strong> <strong>Cuéntenos cómo trabaja su equipo y lo armamos a la medida.</strong></div>
      </details>
      <details className="sp-faq-item" name="faq-equipo">
        <summary className="sp-faq-pregunta">
          ¿La capacitación tiene registro ante la STPS y es deducible?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Sí a ambas. Contamos con <strong>registro oficial ante la STPS</strong> y emitimos constancia de capacitación para sus colaboradores. La inversión <strong>puede calificar</strong> para la deducción adicional del 25% del Plan México (DOF 2025); confírmelo con su área contable.</div>
      </details>
      <details className="sp-faq-item" name="faq-equipo">
        <summary className="sp-faq-pregunta">
          ¿Cuál es el ROI de capacitar al equipo comercial?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Se vuelve tangible cuando su equipo vende y se comunica directamente, sin traductores ni intermediarios. Para la mayoría de las empresas, <strong>asegurar un solo contrato internacional que se habría perdido cubre toda la inversión anual del programa.</strong></div>
      </details>
    </div>
  </div>
</section>

{/* FOOTER */}
      </main>

      {/* Etiqueta nativa, no next/script: con `afterInteractive` el JSON-LD se
          inyectaría desde el cliente y no estaría en el HTML que lee Google. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: DATOS_ESTRUCTURADOS }}
      />
      <Script
        id="vm-interaccion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: GUION }}
      />
    </>
  );
}
