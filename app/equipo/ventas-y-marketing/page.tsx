"use client";

import Script from "next/script";
import "./equipo.css";

declare global {
  interface Window {
    toggleFaq: (el: Element) => void;
  }
}

// Datos estructurados, copiados del original (líneas 713-740).
const DATOS_ESTRUCTURADOS = "{\n    \"@context\": \"https://schema.org\",\n    \"@graph\": [\n      {\n        \"@type\": \"BreadcrumbList\",\n        \"itemListElement\": [\n          { \"@type\": \"ListItem\", \"position\": 1, \"name\": \"Inicio\", \"item\": \"https://s-peak.com/\" },\n          { \"@type\": \"ListItem\", \"position\": 2, \"name\": \"Soluciones por Equipo\", \"item\": \"https://s-peak.com/equipo/\" },\n          { \"@type\": \"ListItem\", \"position\": 3, \"name\": \"Ventas y Marketing\", \"item\": \"https://s-peak.com/equipo/ventas-y-marketing/\" }\n        ]\n      },\n      {\n        \"@type\": \"Service\",\n        \"name\": \"Cursos de idiomas para equipos de Ventas y Marketing\",\n        \"serviceType\": \"Capacitación corporativa de idiomas para equipos comerciales\",\n        \"provider\": { \"@type\": \"Organization\", \"name\": \"S-Peak\", \"url\": \"https://s-peak.com\" },\n        \"areaServed\": { \"@type\": \"Country\", \"name\": \"México\" },\n        \"description\": \"Inglés y otros idiomas para vendedores y equipos de marketing B2B. Vocabulario comercial, negociación internacional y presentaciones ejecutivas.\"\n      },\n      {\n        \"@type\": \"FAQPage\",\n        \"mainEntity\": [\n          { \"@type\": \"Question\", \"name\": \"¿Cuánto cuesta capacitar a un equipo de ventas en S-Peak?\", \"acceptedAnswer\": { \"@type\": \"Answer\", \"text\": \"Depende de la frecuencia, modalidad, duración y tamaño del grupo (de 1 a 10 personas; a más alumnos, menor es el costo por persona). Solicite una cotización adaptada a sus objetivos.\" } },\n          { \"@type\": \"Question\", \"name\": \"¿En cuánto tiempo mi equipo comercial estará listo para cerrar negocios en otro idioma?\", \"acceptedAnswer\": { \"@type\": \"Answer\", \"text\": \"Depende del nivel inicial. Pasar de un nivel básico (A2) a uno apto para negociar (B2) toma de 12 a 18 meses. Si el equipo ya es intermedio (B1), puede lograrlo en 6 a 9 meses con sesiones intensivas.\" } }\n        ]\n      }\n    ]\n  }";

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

    const SPEED = 0.024;   // px por milisegundo (~24 px/s)
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
    let last = null;

    const running = () => !hovering && !dragging && !touching && period > 0;

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

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { layout(); pos = car.scrollLeft; }, 150);
    });

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      requestAnimationFrame(tick);
    }
  })();

  // FAQ
  function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  }
`;

export default function VentasYMarketing() {
  return (
    <>
      <main>

{/* BREADCRUMB */}
<div className="breadcrumb">
  <div className="breadcrumb-inner">
    <a href="https://s-peak.com">Inicio</a>
    <span aria-hidden="true">›</span>
    <a href="https://s-peak.com/equipo/">Soluciones por Equipo</a>
    <span aria-hidden="true">›</span>
    <span>Ventas y Marketing</span>
  </div>
</div>

{/* HERO */}
<section className="hero">
  <img style={{ position: "absolute", top: "20px", right: "20px", width: "60px", opacity: "0.06", transform: "rotate(15deg)", pointerEvents: "none" }} src="/images/isotype.svg" alt="" aria-hidden="true" loading="lazy" />
  <div className="hero-inner">
    <div className="hero-content reveal">
      <div className="hero-tag">Inglés corporativo · Ventas y Marketing</div>
      <h1>Cursos de idiomas para equipos de <strong>Ventas y Marketing</strong></h1>
      <p className="hero-sub">Cierre más negocios y conecte con clientes internacionales en inglés, francés, alemán, italiano, portugués o español. Su equipo es la cara de la empresa: cuando el idioma no está a la altura, una sola oportunidad perdida cuesta más que todo un programa anual de capacitación.</p>
      <button className="btn-red" type="button">Solicitar Cotización</button>
      <div className="hero-social">
        <div className="hero-avatars">
          <span className="hero-avatar">MG</span>
          <span className="hero-avatar">FH</span>
          <span className="hero-avatar">AV</span>
          <span className="hero-avatar">RC</span>
        </div>
        <div className="hero-social-text">
          <div className="stars">★★★★★</div>
          <p>+<strong>500 empresas</strong> confían en S-Peak para capacitar a sus equipos comerciales</p>
        </div>
      </div>
    </div>
    <div className="hero-visual reveal">
      <div className="hero-img-wrap">
        <img src="/images/equipo/hero-ventas-y-marketing.webp" alt="Equipo comercial en cursos de inglés de negocios" width="600" height="420" loading="eager" />
      </div>
      <div className="hero-stats-row">
        <div className="hero-stat">
          <span className="float-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
          </span>
          <span className="float-num">+40K</span>
          <span className="float-label">Profesionales formados</span>
        </div>
        <div className="hero-stat">
          <span className="float-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
          </span>
          <span className="float-num">+500</span>
          <span className="float-label">Empresas atendidas</span>
        </div>
        <div className="hero-stat">
          <span className="float-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
          </span>
          <span className="float-num">+20</span>
          <span className="float-label">Años de experiencia</span>
        </div>
      </div>
    </div>
  </div>
</section>

{/* LOGOS */}
<div className="logos">
  <div className="logos-card">
    <p className="logos-label">Más de 500 empresas confían en <strong>S-Peak</strong></p>
    <div className="logos-track-wrap">
      <div className="logos-track">
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
<section className="competencias" id="competencias">
  <div className="competencias-inner">
    <div className="section-top reveal">
      <div className="eyebrow" style={{ justifyContent: "center" }}>Las habilidades que cierran negocios</div>
      <h2>Las habilidades que su equipo comercial necesita para cerrar en cualquier idioma</h2>
      <p>Desarrollamos las competencias lingüísticas que su equipo aplica en situaciones reales de negocio. No enseñamos gramática aislada: entrenamos para que cierren, presenten y negocien con confianza.</p>
    </div>
    <div className="comp-grid reveal stagger">
      <div className="comp-card">
        <div className="comp-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
        </div>
        <div className="comp-num">01</div>
        <h3>Vocabulario técnico comercial</h3>
        <p>Terminología específica de ventas, marketing digital, embudo de conversión y métricas clave (CAC, LTV, CTR).</p>
      </div>
      <div className="comp-card">
        <div className="comp-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
        </div>
        <div className="comp-num">02</div>
        <h3>Redacción profesional</h3>
        <p>Correos de ventas, propuestas por escrito y mensajes de prospección en LinkedIn que generan respuestas.</p>
      </div>
      <div className="comp-card">
        <div className="comp-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/></svg>
        </div>
        <div className="comp-num">03</div>
        <h3>Presentaciones ejecutivas</h3>
        <p>Pitches ante directivos, comités o inversionistas con manejo de diapositivas y respuestas fluidas en tiempo real.</p>
      </div>
      <div className="comp-card">
        <div className="comp-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div className="comp-num">04</div>
        <h3>Conversación y networking</h3>
        <p>Interacción natural en eventos y ferias internacionales, iniciando y sosteniendo diálogos de valor.</p>
      </div>
      <div className="comp-card">
        <div className="comp-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>
        </div>
        <div className="comp-num">05</div>
        <h3>Negociación internacional</h3>
        <p>Estructuras para negociar condiciones, precios y plazos. Aprenden a proponer contraofertas y manejar silencios estratégicos.</p>
      </div>
      <div className="comp-card">
        <div className="comp-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <div className="comp-num">06</div>
        <h3>Manejo de objeciones</h3>
        <p>Respuestas fluidas ante las resistencias típicas del entorno B2B (precio, tiempo, autoridad, riesgo).</p>
      </div>
      <div className="comp-card">
        <div className="comp-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>
        </div>
        <div className="comp-num">07</div>
        <h3>Comunicación comercial integral</h3>
        <p>Aplicación de marcos de venta consultiva (descubrimiento, propuesta y cierre) en dos idiomas.</p>
      </div>
      <div className="comp-card">
        <div className="comp-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a9 9 0 0 1 18 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>
        </div>
        <div className="comp-num">08</div>
        <h3>Atención a clientes internacionales</h3>
        <p>Comunicación de posventa, seguimiento y resolución de problemas. La retención se define en la primera queja bien resuelta.</p>
      </div>
    </div>
  </div>
</section>

{/* DOLOR */}
<section className="dolor" id="dolor">
  <div className="dolor-inner">
    <div className="dolor-top reveal">
      <div className="eyebrow" style={{ justifyContent: "center" }}>El costo real de la barrera del idioma</div>
      <h2>¿Cuántas oportunidades comerciales pierde su empresa por la <em>barrera del idioma</em>?</h2>
      <p>No es una métrica abstracta; es un costo medible y silencioso que se refleja en tres escenarios:</p>
    </div>
    <div className="dolor-grid reveal stagger">
      <div className="dolor-card">
        <div className="dolor-card-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m14.5 12.5-5 5"/><path d="m9.5 12.5 5 5"/></svg>
        </div>
        <h3>La propuesta que no se cerró</h3>
        <p>Su mejor vendedor tiene la solución y los números, pero si no fluye en el idioma, el cliente duda y la competencia entra. Un solo contrato internacional perdido al año cuesta más que todo un programa anual de capacitación.</p>
      </div>
      <div className="dolor-card">
        <div className="dolor-card-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m17 17 4 4"/><path d="m21 17-4 4"/></svg>
        </div>
        <h3>El correo de prospección sin respuesta</h3>
        <p>Su equipo envía 200 correos al mes a Estados Unidos, Europa o Latinoamérica, pero la tasa de respuesta es del 1%. Un correo con errores de gramática o tono se descarta en el primer párrafo.</p>
      </div>
      <div className="dolor-card">
        <div className="dolor-card-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" x2="22" y1="8" y2="13"/><line x1="22" x2="17" y1="8" y2="13"/></svg>
        </div>
        <h3>La feria internacional sin contactos reales</h3>
        <p>Una inversión de 50,000 dólares en un stand en HANNOVER MESSE o CES se pierde si las conversaciones no pasan del "nice to meet you". Sin un segundo contacto, no hay negocio.</p>
      </div>
    </div>
    <div className="dolor-cta reveal">
      <button className="btn-red" type="button">Solicitar cotización</button>
    </div>
  </div>
</section>

{/* MERCADO */}
<section className="mercado" id="mercado">
  <div className="mercado-inner">
    <div className="mercado-left reveal">
      <div className="eyebrow">Por qué urge ahora</div>
      <h2>Por qué su empresa no puede esperar el año próximo para capacitar al equipo comercial</h2>
      <p>Cada mes que su equipo comercial opera sin el idioma correcto es una ventana que se cierra frente a la competencia. Estos son los datos que explican por qué actuar ahora, no en el próximo trimestre, marca la diferencia.</p>
    </div>
    <div className="mercado-right reveal">
      <div className="mercado-carousel stagger" id="mercadoCarousel" tabIndex={0} role="region" aria-label="Razones para capacitar al equipo comercial ahora">
        <article className="mercado-card">
          <div className="mercado-item-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
          </div>
          <h3>El talento bilingüe es escaso y caro de retener</h3>
          <p>Menos del 15% de los profesionales en México son verdaderamente bilingües. Capacitar al equipo que ya conoce su operación reduce la dependencia externa.</p>
          <span className="mercado-card-source">Fuente: SEP</span>
        </article>
        <article className="mercado-card">
          <div className="mercado-item-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/></svg>
          </div>
          <h3>Su mercado más grande exige inglés ($534,874 M en exportaciones a EE.UU.)</h3>
          <p>México es el primer socio comercial de Estados Unidos desde 2023. Depender de un solo colaborador bilingüe crea un cuello de botella.</p>
          <span className="mercado-card-source">Fuente: Secretaría de Economía e INEGI</span>
        </article>
        <article className="mercado-card">
          <div className="mercado-item-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>
          </div>
          <h3>El nearshoring trae a sus próximos clientes y no hablan español</h3>
          <p>Se proyectan 500,000 empleos y 50,000 millones en inversión en 3 años. El proveedor que negocia directamente en el idioma del inversionista entra primero.</p>
          <span className="mercado-card-source">Fuente: Secretaría de Economía</span>
        </article>
        <article className="mercado-card">
          <div className="mercado-item-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          </div>
          <h3>Un error de interpretación en el T-MEC cuesta millones</h3>
          <p>Desde 2025, EE.UU. aplica aranceles del 25% a productos que incumplan reglas de origen. Comprender estas normativas en inglés técnico protege los márgenes del negocio.</p>
          <span className="mercado-card-source">Fuente: USTR y DOF 2025</span>
        </article>
      </div>
    </div>
  </div>
</section>

{/* DIFERENCIADORES */}
<section className="diferenciadores">
  <div className="dif-inner">
    <div className="section-top reveal">
      <div className="eyebrow" style={{ justifyContent: "center" }}>Por qué S-Peak</div>
      <h2>Por qué empresas como Braskem Idesa, Chedraui y +500 más eligen S-Peak</h2>
    </div>
    <div className="dif-grid reveal stagger">
      <div className="dif-card">
        <div className="dif-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        </div>
        <div>
          <h3>Programa diseñado por sector</h3>
          <p>Adaptamos el vocabulario, casos y simulaciones a su industria (manufactura, retail, servicios financieros, tecnología o farmacéutica). Sin cursos genéricos.</p>
        </div>
      </div>
      <div className="dif-card">
        <div className="dif-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/></svg>
        </div>
        <div>
          <h3>Medición real de avance</h3>
          <p>Tarjeta de Resultados mensual para Dirección con evidencias comprobables. No reportamos solo asistencia, sino competencias adquiridas.</p>
        </div>
      </div>
      <div className="dif-card">
        <div className="dif-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
        </div>
        <div>
          <h3>El idioma de su mercado, no solo inglés</h3>
          <p>Inglés para Norteamérica y negocios globales, así como francés, alemán, italiano, portugués o español según sus metas estratégicas.</p>
        </div>
      </div>
      <div className="dif-card">
        <div className="dif-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <div>
          <h3>Registro STPS y deducción fiscal</h3>
          <p>Contamos con registro oficial ante la STPS. La inversión califica para la deducción adicional del 25% bajo el decreto del Plan México (DOF 2023 y 2025).</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* CTA BANDA */}
<section className="cta-banda">
  <img style={{ position: "absolute", top: "50%", right: "40px", width: "120px", opacity: "0.08", transform: "translateY(-50%) rotate(30deg)", pointerEvents: "none" }} src="/images/isotype.svg" alt="" aria-hidden="true" />
  <h2>Comience con una cotización para su equipo comercial</h2>
  <p>Cuéntenos su caso. Le responderemos en menos de 24 horas hábiles.</p>
  <button className="btn-white" type="button">Solicitar Cotización</button>
</section>

{/* TESTIMONIOS */}
<section className="testimonials" id="resultados">
  <div className="testi-top reveal">
    <div className="eyebrow" style={{ color: "rgba(255,255,255,0.4)", justifyContent: "center" }}>Lo que dicen los equipos</div>
    <h2>Lo que dicen los equipos de ventas que ya tomaron clases con S-Peak</h2>
    <p>En S-Peak, el éxito no se supone: se mide en números.</p>
  </div>
  <div className="testi-grid reveal stagger">
    <div className="testi-card">
      <div className="stars">★★★★★</div>
      <p className="testi-quote">"El equipo de S-Peak tiene una gran actitud de servicio, sus cursos de idiomas son excelentes para nuestros equipos, se adaptan a las necesidades de sus perfiles de puesto."</p>
      <div className="testi-author">
        <div className="avatar">BI</div>
        <div>
          <div className="author-name">Braskem Idesa</div>
          <div className="author-role">Área de RRHH</div>
        </div>
      </div>
    </div>
    <div className="testi-card accent">
      <div className="stars" style={{ color: "var(--navy)" }}>★★★★★</div>
      <p className="testi-quote">"S-Peak es una organización sumamente dinámica. Su capacidad para entender nuestras necesidades específicas y adaptar sus mejores recursos a nuestros objetivos de negocio es su gran diferencial."</p>
      <div className="testi-author">
        <div className="avatar">FD</div>
        <div>
          <div className="author-name">Fernanda D.</div>
          <div className="author-role">Alumna · Chedraui</div>
        </div>
      </div>
    </div>
    <div className="testi-card">
      <div className="stars">★★★★★</div>
      <p className="testi-quote">"Valoramos el seguimiento que S-Peak nos brinda, el feedback que piden a través de citas regulares y encuestas, así como su reacción a lo que pedimos como cliente."</p>
      <div className="testi-author">
        <div className="avatar">EC</div>
        <div>
          <div className="author-name">Erika C.</div>
          <div className="author-role">People Development &amp; D&amp;I Expert</div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* FAQ */}
<section className="faq" id="faq">
  <div className="faq-inner">
    <div className="faq-left reveal">
      <div className="eyebrow">Preguntas frecuentes</div>
      <h2>Preguntas frecuentes sobre capacitación para equipos de ventas y marketing</h2>
      <p>Resolvemos las dudas más comunes antes de que tenga que buscarlas.</p>
      <div className="faq-cta-card">
        <p>¿Tiene una pregunta que no está aquí?</p>
        <button className="btn-red" type="button">Hable con un experto</button>
      </div>
    </div>
    <div className="faq-list reveal">
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget)}>
          ¿Cuánto cuesta capacitar a un equipo de ventas en S-Peak?
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-a">Depende de la frecuencia, modalidad, duración y tamaño del grupo (de 1 a 10 personas; a más alumnos, menor es el costo por persona). Solicite una cotización adaptada a sus objetivos.</div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget)}>
          ¿En cuánto tiempo mi equipo estará listo para cerrar negocios en otro idioma?
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-a">Depende del nivel inicial. Pasar de un nivel básico (A2) a uno apto para negociar (B2) toma de 12 a 18 meses. Si el equipo ya es intermedio (B1), puede lograrlo en <strong>6 a 9 meses</strong> con sesiones intensivas. En el diagnóstico inicial le damos una proyección realista.</div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget)}>
          ¿Cómo miden el progreso de mis colaboradores?
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-a">Evaluamos el desempeño real con entregables prácticos (grabaciones, propuestas escritas o simulaciones de llamadas) al final de cada etapa, no con exámenes de memoria. RH recibe un <strong>reporte mensual</strong> con enlaces para verificar el avance.</div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget)}>
          ¿Qué pasa si mis vendedores tienen agendas ocupadas y faltan a clases?
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-a">Monitoreamos la asistencia de forma proactiva. Si un colaborador falta, lo reportamos a RH en tiempo real para buscar su recuperación o ajustar el grupo, protegiendo así su inversión.</div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget)}>
          ¿Qué idiomas ofrecen para equipos comerciales?
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-a">Inglés, francés, alemán, italiano, portugués y español para extranjeros. Cada programa se alinea a su mercado: inglés para negocios globales, alemán para el sector automotriz o italiano para el Bajío industrial, según el diagnóstico inicial.</div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget)}>
          ¿Pueden capacitar equipos comerciales en varios países?
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-a">Sí. Coordinamos la capacitación simultánea en México y filiales de Latinoamérica o el mundo, centralizando la gestión en un solo punto de contacto y bajo un estándar de calidad uniforme.</div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget)}>
          ¿S-Peak está registrado ante la STPS?
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-a">Sí, contamos con registro oficial ante la Secretaría del Trabajo y Previsión Social y emitimos las constancias de capacitación correspondientes para su empresa.</div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget)}>
          ¿Cuál es el ROI de capacitar al equipo comercial?
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-a">Se vuelve tangible cuando su equipo vende directamente sin traductores ni intermediarios. Para la mayoría de las empresas, <strong>asegurar un solo contrato internacional</strong> que se habría perdido cubre toda la inversión anual del programa.</div>
      </div>
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
