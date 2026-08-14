"use client";

import type { FormEvent, MouseEvent } from "react";
import Script from "next/script";
import "./landing.css";

// Las funciones del original viven en scope global, definidas por los <Script> de abajo.
declare global {
  interface Window {
    openModal: () => void;
    closeModal: () => void;
    overlayClose: (e: MouseEvent) => void;
    openWaModal: (e: MouseEvent) => void;
    closeWaModal: () => void;
    closeWaModalOnOverlay: (e: MouseEvent) => void;
    toggleFaq: (el: Element) => void;
    submitWaForm: (e: FormEvent) => void;
  }
}

// Scripts copiados textualmente de ingles-para-empresas.html (líneas 1633-1872, 1917-1974, 1985-1998).
const SCRIPT_PRINCIPAL = `
  // Smooth scroll (Lenis)
  (function () {
    if (typeof Lenis === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    // Mantener funcionando los anchors de scroll internos (#)
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      a.addEventListener('click', (e) => {
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80 });
        history.pushState(null, '', id);
      });
    });
    window.__lenis = lenis;
  })();

  // Modal
  function openModal() {
    // Restablece el estado inicial (formulario visible, confirmación oculta) por si se reabre.
    const form = document.getElementById('leadForm');
    const success = document.getElementById('leadSuccess');
    const head = document.getElementById('leadModalHead');
    const status = document.getElementById('leadStatus');
    if (form) form.hidden = false;
    if (head) head.hidden = false;
    if (success) success.hidden = true;
    if (status) { status.hidden = true; status.textContent = ''; status.classList.remove('is-success', 'is-error'); }
    document.getElementById('lead-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
    if (window.__lenis) window.__lenis.stop();
  }
  function closeModal() {
    document.getElementById('lead-modal').classList.remove('open');
    document.body.style.overflow = '';
    if (window.__lenis) window.__lenis.start();
  }
  function overlayClose(e) {
    if (e.target === e.currentTarget) closeModal();
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ---- Envío de leads vía función serverless (Resend) ----
  // Endpoint de la función. Si el sitio y la función viven en el mismo dominio de Vercel,
  // déjalo relativo ('/api/lead'). Si la función está en otro dominio, pon la URL absoluta aquí.
  window.LEAD_ENDPOINT = 'https://s-peak-landings.vercel.app/api/lead';

  // Etiquetas internas comunes a ambos formularios: UTMs de la URL + idioma fijo de la landing.
  window.collectLeadTags = function () {
    let params;
    try { params = new URLSearchParams(window.location.search); } catch (_) { params = null; }
    let stored = {};
    try { stored = JSON.parse(sessionStorage.getItem('speak_attribution') || '{}') || {}; } catch (_) { stored = {}; }
    // Prioridad por campo: 1) query actual en la URL, 2) valor persistido en la sesión, 3) vacío.
    const raw = function (key) {
      const live = params ? (params.get(key) || '').trim() : '';
      if (live) return live;
      return (stored[key] || '').toString().trim();
    };
    let utmSource = raw('utm_source');
    let utmMedium = raw('utm_medium');
    let utmCampaign = raw('utm_campaign');
    let utmContent = raw('utm_content');
    const gclid = raw('gclid');
    // Respaldo Google Ads: si NO hubo utm_source (ni en URL ni persistido) pero sí hay gclid,
    // marcamos origen google/cpc y guardamos el gclid en utm_content para no perder el rastro.
    // Si los UTM sí vienen, mandan ellos; el gclid es solo respaldo.
    if (!utmSource && gclid) {
      utmSource = 'google';
      if (!utmMedium) utmMedium = 'cpc';
      if (!utmContent) utmContent = 'gclid:' + gclid;
    }
    const NA = 'No especificado';
    return {
      utm_source: utmSource || NA,
      utm_medium: utmMedium || NA,
      utm_campaign: utmCampaign || NA,
      utm_content: utmContent || NA,
      idioma: 'Inglés',
      // Dirección completa de la página desde la que se envió el formulario.
      pagina: (function () { try { return window.location.href; } catch (_) { return ''; } })(),
    };
  };

  // Devuelve una promesa. Lanza si la respuesta no es ok.
  window.sendLead = function (payload) {
    return fetch(window.LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json().catch(function () { return {}; });
    });
  };

  // Formulario principal "Solicite Información": POST + estado en el modal, sin redirección.
  (function () {
    const form = document.getElementById('leadForm');
    if (!form) return;
    const btn = document.getElementById('leadSubmit');
    const status = document.getElementById('leadStatus');

    function setStatus(text, kind) {
      status.textContent = text;
      status.classList.remove('is-success', 'is-error');
      if (kind) status.classList.add(kind);
      status.hidden = false;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const payload = Object.assign({
        nombre: form.nombre.value.trim(),
        empresa: form.empresa.value.trim(),
        correo: form.correo.value.trim(),
        telefono: form.telefono.value.trim(),
        puesto: form.puesto.value.trim(),
        mensaje: form.mensaje.value.trim(),
        origen: 'Formulario principal',
      }, window.collectLeadTags());

      const originalLabel = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Enviando…';
      setStatus('Enviando su solicitud…', null);

      window.sendLead(payload)
        .then(function () {
          // Éxito: reemplaza el contenido del modal por el estado de confirmación.
          form.reset();
          form.hidden = true;
          const head = document.getElementById('leadModalHead');
          if (head) head.hidden = true;
          const success = document.getElementById('leadSuccess');
          if (success) success.hidden = false;
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: 'lead_formulario_principal' });
        })
        .catch(function () {
          setStatus('No pudimos enviar su solicitud. Inténtelo de nuevo o escríbanos por WhatsApp.', 'is-error');
          btn.disabled = false;
          btn.textContent = originalLabel;
        });
    });
  })();

  // Reveal on scroll
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Ciclo radial del método (centro muestra el paso activo, auto-rota)
  (function () {
    const nodes = document.querySelectorAll('.cycle-node');
    const numEl = document.getElementById('cycle-num');
    const titleEl = document.getElementById('cycle-title');
    const descEl = document.getElementById('cycle-desc');
    if (!nodes.length || !numEl) return;
    let active = 0, timer = null;
    function show(i) {
      active = i;
      nodes.forEach((n, j) => n.classList.toggle('active', j === i));
      const n = nodes[i];
      numEl.textContent = n.dataset.num;
      titleEl.textContent = n.dataset.title;
      descEl.textContent = n.dataset.desc;
    }
    function start() { stop(); timer = setInterval(() => show((active + 1) % nodes.length), 2000); }
    function stop() { clearInterval(timer); }
    nodes.forEach((n, i) => {
      n.addEventListener('mouseenter', () => { stop(); show(i); });
      n.addEventListener('click', () => { stop(); show(i); });
    });
    // Pausa al pasar el mouse por el círculo del método; reanuda al salir
    const cycle = document.querySelector('.cycle');
    if (cycle) {
      cycle.addEventListener('mouseenter', stop);
      cycle.addEventListener('mouseleave', start);
    }
    show(0);
    start();
  })();

  // FAQ accordion
  function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  }

  // Carrusel testimonios: avance automático tarjeta por tarjeta
  (function () {
    const track = document.querySelector('.testi-track');
    if (!track) return;
    const TOTAL = 4;          // tarjetas originales (sin el set duplicado)
    let idx = 0;
    function cardStep() {
      const card = track.children[0];
      const style = getComputedStyle(card);
      return card.offsetWidth + parseFloat(style.marginRight || 0);
    }
    function advance() {
      idx++;
      track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      track.style.transform = 'translateX(' + (-idx * cardStep()) + 'px)';
      if (idx >= TOTAL) {
        setTimeout(function () {
          track.style.transition = 'none';
          idx = 0;
          track.style.transform = 'translateX(0)';
        }, 650);
      }
    }
    setInterval(advance, 3500);
  })();
`;

const SCRIPT_WHATSAPP = `
  (function () {
    const overlay = document.getElementById('waModal');

    window.openWaModal = function (e) {
      if (e) e.preventDefault();
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      const first = document.getElementById('waNombre');
      if (first) setTimeout(function () { first.focus(); }, 50);
    };

    window.closeWaModal = function () {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    window.closeWaModalOnOverlay = function (e) {
      if (e.target === overlay) window.closeWaModal();
    };

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) window.closeWaModal();
    });

    window.submitWaForm = function (e) {
      e.preventDefault();
      const nombre = document.getElementById('waNombre').value.trim();
      const correo = document.getElementById('waCorreo').value.trim();
      const telefono = document.getElementById('waTelefono').value.trim();

      const msg = 'Hola, soy ' + nombre + ' (' + telefono + '). Me interesa conocer más sobre los programas de inglés para empresas de S-Peak. Mi correo es ' + correo + '.';
      const url = 'https://wa.me/525585265520?text=' + encodeURIComponent(msg);

      // Registro del lead por correo (fire-and-forget): NO se espera para no retrasar WhatsApp.
      try {
        const payload = Object.assign({
          nombre: nombre,
          empresa: '',
          correo: correo,
          telefono: telefono,
          puesto: '',
          mensaje: '',
          origen: 'WhatsApp',
        }, window.collectLeadTags());
        window.sendLead(payload).catch(function () {});
      } catch (_) {}

      // Conversión de WhatsApp → la recoge GTM (trigger: Custom Event "conversion_whatsapp")
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'conversion_whatsapp' });

      window.open(url, '_blank', 'noopener,noreferrer');

      window.closeWaModal();
      document.getElementById('waForm').reset();
      return false;
    };
  })();
`;

const SCRIPT_VOLVER_ARRIBA = `
  (function () {
    var btn = document.getElementById('backToTop');
    if (!btn) return;
    function onScroll() {
      if (window.pageYOffset > 400) btn.classList.add('is-visible');
      else btn.classList.remove('is-visible');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', function () {
      if (window.__lenis) window.__lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();
`;

export default function Page() {
  return (
    <>
{/* HERO */}
<section className="hero">
  <img className="deco deco-hero" src="/images/isotype.svg" alt="" aria-hidden="true" width="1587" height="907" loading="lazy" />
  <div className="hero-inner">
    {/* COLUMNA IZQUIERDA (60%) */}
    <div className="hero-content reveal">
      <div className="hero-tag">Inglés corporativo · México</div>
      <h1><strong>Cursos de inglés para empresas</strong> que transforman la operación de su equipo.</h1>
      <p className="hero-sub">Sus colaboradores necesitan comunicarse con seguridad en inglés: <strong>hablar, presentar, negociar y colaborar</strong> en situaciones reales de trabajo. En <strong>S-Peak</strong> diseñamos programas de inglés para empresas por puesto, con seguimiento continuo, reportes claros y evidencia verificable del avance de cada colaborador.</p>
      <div className="fake-form" onClick={() => window.openModal()} role="button" tabIndex={0}>
        <span className="fake-form-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>
        </span>
        <span className="fake-form-text">¿Cuántos colaboradores necesitan capacitación?</span>
        <button className="fake-form-btn" type="button">Solicite Información</button>
      </div>
      <div className="hero-social">
        <div className="hero-avatars">
          <span className="hero-avatar">MG</span>
          <span className="hero-avatar">FH</span>
          <span className="hero-avatar">AV</span>
          <span className="hero-avatar">RC</span>
        </div>
        <div className="hero-social-text">
          <div className="stars">★★★★★</div>
          <p>Más de <strong>500 empresas</strong> capacitan a sus equipos con <strong>S-Peak</strong></p>
        </div>
      </div>
    </div>

    {/* COLUMNA DERECHA (40%) */}
    <div className="hero-visual reveal">
      <div className="hero-circle" aria-hidden="true"></div>
      <div className="hero-photo">
        <img src="/images/ejecutiva-hero.webp" alt="Ejecutiva en un curso de inglés para empresas de S-Peak" width="1300" height="1898" loading="eager" fetchPriority="high" />
      </div>
      <div className="hero-stats-row">
        <div className="hero-stat">
          <span className="float-icon">🎓</span>
          <span className="float-num">+40K</span>
          <span className="float-label">Profesionales formados</span>
        </div>
        <div className="hero-stat">
          <span className="float-icon">🏢</span>
          <span className="float-num">+500</span>
          <span className="float-label">Empresas atendidas</span>
        </div>
        <div className="hero-stat">
          <span className="float-icon">🌐</span>
          <span className="float-num">+30</span>
          <span className="float-label">Industrias</span>
        </div>
      </div>
    </div>
  </div>
</section>

{/* LOGOS */}
<div className="logos">
  <img className="deco deco-logos" src="/images/isotype.svg" alt="" aria-hidden="true" width="1587" height="907" loading="lazy" />
  <div className="logos-card">
    <p className="logos-label">Más de 500 empresas confían en <strong>S-Peak</strong></p>
    <div className="logos-track-wrap">
      <div className="logos-track">
      {/* Set 1 */}
      <img src="/images/logos/axa.webp" alt="Logo de AXA" width="600" height="300" loading="lazy" />
      <img src="/images/logos/club%20med.webp" alt="Logo de Club Med" width="600" height="300" loading="lazy" />
      <img src="/images/logos/gbm.webp" alt="Logo de GBM" width="600" height="300" loading="lazy" />
      <img src="/images/logos/kio.webp" alt="Logo de KIO" width="600" height="300" loading="lazy" />
      <img src="/images/logos/loreal.webp" alt="Logo de L'Oréal" width="600" height="300" loading="lazy" />
      <img src="/images/logos/naturgy.webp" alt="Logo de Naturgy" width="600" height="300" loading="lazy" />
      <img src="/images/logos/paramount.webp" alt="Logo de Paramount" width="600" height="300" loading="lazy" />
      <img src="/images/logos/pepsico.webp" alt="Logo de PepsiCo" width="600" height="300" loading="lazy" />
      <img src="/images/logos/reanult.webp" alt="Logo de Renault" width="600" height="300" loading="lazy" />
      <img src="/images/logos/santander.webp" alt="Logo de Santander" width="600" height="300" loading="lazy" />
      <img src="/images/logos/walmart.webp" alt="Logo de Walmart" width="600" height="300" loading="lazy" />
      {/* Set 2 (duplicado para loop infinito) */}
      <img src="/images/logos/axa.webp" alt="" aria-hidden="true" width="600" height="300" loading="lazy" />
      <img src="/images/logos/club%20med.webp" alt="" aria-hidden="true" width="600" height="300" loading="lazy" />
      <img src="/images/logos/gbm.webp" alt="" aria-hidden="true" width="600" height="300" loading="lazy" />
      <img src="/images/logos/kio.webp" alt="" aria-hidden="true" width="600" height="300" loading="lazy" />
      <img src="/images/logos/loreal.webp" alt="" aria-hidden="true" width="600" height="300" loading="lazy" />
      <img src="/images/logos/naturgy.webp" alt="" aria-hidden="true" width="600" height="300" loading="lazy" />
      <img src="/images/logos/paramount.webp" alt="" aria-hidden="true" width="600" height="300" loading="lazy" />
      <img src="/images/logos/pepsico.webp" alt="" aria-hidden="true" width="600" height="300" loading="lazy" />
      <img src="/images/logos/reanult.webp" alt="" aria-hidden="true" width="600" height="300" loading="lazy" />
      <img src="/images/logos/santander.webp" alt="" aria-hidden="true" width="600" height="300" loading="lazy" />
      <img src="/images/logos/walmart.webp" alt="" aria-hidden="true" width="600" height="300" loading="lazy" />
      </div>
    </div>
  </div>
</div>

{/* ÁREAS */}
<section className="areas">
  <div className="areas-inner">
    <div className="areas-right reveal">
      <div className="areas-media">
        <img src="/images/imagen-ejecutivo.webp" alt="Ejecutivo en un programa de inglés para empresas de S-Peak" width="1024" height="768" loading="lazy" />
      </div>
    </div>
    <div className="areas-left reveal">
      <div className="eyebrow">Inglés de negocios</div>
      <h2>Prepare a su talento con un programa de inglés para el mercado global</h2>
      <p>Cada departamento enfrenta retos distintos en inglés: ventas negocia, finanzas reporta a casa matriz, operaciones coordina con proveedores. Por eso cada programa de inglés empresarial <strong>se adapta al rol y al contexto real del puesto</strong>. Medimos el avance con <strong>indicadores verificables</strong> y entregamos reportes que le permiten <strong>decidir sobre su inversión</strong>.</p>
      <button className="btn-red" onClick={() => window.openModal()}>Solicite Información</button>
    </div>
  </div>
</section>

{/* EVIDENCIA */}
<section className="evidencia" id="enfoque">
  <div className="evidencia-inner">
    <div className="evidencia-left reveal">
      <div className="eyebrow">Nuestro enfoque</div>
      <h2>No le entregamos listas de asistencia.<br /><em>Le entregamos evidencia.</em></h2>
      <p>A la dirección de <strong>Recursos Humanos</strong> le entregamos <strong>tableros</strong> que detallan el <strong>avance, la adopción y el impacto real</strong> del programa, para una <strong>decisión basada en datos</strong> y la optimización de su presupuesto.</p>
      <div className="evidencia-tags">
        <span className="evidencia-tag">Evidencias demostrables</span>
        <span className="evidencia-tag">Métricas de avance y asistencia</span>
        <span className="evidencia-tag">Reportes de desempeño</span>
      </div>
      <button className="btn-red" onClick={() => window.openModal()}>Solicite Información</button>
    </div>
    <div className="evidencia-right reveal">
      <div className="dash" role="img" aria-label="Panel de progreso del equipo en el programa de inglés para empresas de S-Peak">
        <div className="dash-topbar">
          <div className="dash-topbar-title">
            <span className="dash-dots"><i></i><i></i><i></i></span>
            Panel de Progreso del Equipo
          </div>
          <span className="dash-topbar-tag">S-Peak Analytics</span>
        </div>
        <div className="dash-content">
          <div className="dash-chips">
            <span className="dash-chip"><b>+18%</b> mejora</span>
            <span className="dash-chip"><b>12</b> colaboradores activos</span>
            <span className="dash-chip"><b>26</b> sesiones</span>
          </div>
          <div className="dash-grid">
            {/* Métrica destacada */}
            <div className="dash-widget dash-metric">
              <div className="w-metric">92<span>%</span></div>
              <div className="w-metric-label">Evidencias aprobadas con rúbrica</div>
              <div className="w-metric-sub">↑ 4 pts vs. trimestre anterior</div>
            </div>
            {/* Gráfica de línea */}
            <div className="dash-widget dash-chart">
              <div className="w-title">Progreso del equipo · Trimestre</div>
              <svg viewBox="0 0 300 86" preserveAspectRatio="none" aria-hidden="true">
                <polygon fill="#B51E40" fillOpacity="0.08" points="0,68 50,60 100,63 150,46 200,40 250,28 300,18 300,86 0,86"/>
                <polyline fill="none" stroke="#B51E40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" points="0,68 50,60 100,63 150,46 200,40 250,28 300,18"/>
                <circle cx="300" cy="18" r="4" fill="#B51E40"/>
              </svg>
              <div className="dash-chart-x"><span>Mes 1</span><span>Mes 2</span><span>Mes 3</span></div>
            </div>
            {/* Competencias del equipo */}
            <div className="dash-widget dash-skills">
              <div className="w-title">Competencias del equipo</div>
              <div className="w-skill">
                <div className="w-skill-top"><span>Comunicación oral</span><span className="w-skill-pct">76%</span></div>
                <div className="w-bar"><span style={{ width: "76%" }}></span></div>
              </div>
              <div className="w-skill">
                <div className="w-skill-top"><span>Comprensión auditiva</span><span className="w-skill-pct">81%</span></div>
                <div className="w-bar"><span style={{ width: "81%" }}></span></div>
              </div>
              <div className="w-skill">
                <div className="w-skill-top"><span>Redacción corporativa</span><span className="w-skill-pct">69%</span></div>
                <div className="w-bar"><span style={{ width: "69%" }}></span></div>
              </div>
              <div className="w-skill">
                <div className="w-skill-top"><span>Negociación</span><span className="w-skill-pct">73%</span></div>
                <div className="w-bar"><span style={{ width: "73%" }}></span></div>
              </div>
            </div>
            {/* Lista de colaboradores */}
            <div className="dash-widget dash-people">
              <div className="w-title">Colaboradores</div>
              <div className="w-person">
                <span className="w-person-av">CM</span>
                <span className="w-person-name">Carlos Mendoza</span>
                <span className="w-person-lvl">B1</span>
                <span className="w-person-pct">78%</span>
              </div>
              <div className="w-person">
                <span className="w-person-av">AT</span>
                <span className="w-person-name">Ana Torres</span>
                <span className="w-person-lvl">B2</span>
                <span className="w-person-pct">85%</span>
              </div>
              <div className="w-person">
                <span className="w-person-av">LR</span>
                <span className="w-person-name">Luis Ramírez</span>
                <span className="w-person-lvl">A2</span>
                <span className="w-person-pct">64%</span>
              </div>
              <div className="w-person">
                <span className="w-person-av">MG</span>
                <span className="w-person-name">María Gómez</span>
                <span className="w-person-lvl">B1</span>
                <span className="w-person-pct">72%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* PROCESO INFOGRAFÍA */}
<section className="proceso" id="metodo">
  <img className="deco deco-proceso" src="/images/isotype.svg" alt="" aria-hidden="true" width="1587" height="907" loading="lazy" />
  <div className="proceso-inner">
    <div className="proceso-left reveal">
      <div className="eyebrow">El método S‑Peak</div>
      <h2>5 razones por las que las empresas líderes en México eligen S‑Peak</h2>
      <p className="proceso-intro">México ocupa el puesto 87 de 116 en dominio del inglés. Esta brecha lingüística representa hoy la mayor desventaja competitiva nacional. Así es como <strong>S-Peak</strong> la cierra.</p>
    </div>
    <div className="proceso-right reveal">
      <div className="cycle">
        <div className="cycle-center">
          <div className="cycle-num" id="cycle-num">01</div>
          <div className="cycle-title" id="cycle-title">Diagnóstico antes de proponer nada.</div>
          <div className="cycle-desc" id="cycle-desc">Evaluamos el nivel real de cada colaborador y las situaciones concretas en que usa el inglés en su puesto. No asumimos, medimos.</div>
        </div>
        <button className="cycle-node" aria-label="Diagnóstico antes de proponer nada" style={{ left: "13.9%", top: "61.7%" }} data-num="01" data-title="Diagnóstico antes de proponer nada." data-desc="Evaluamos el nivel real de cada colaborador y las situaciones concretas en que usa el inglés en su puesto. No asumimos, medimos.">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="20" x2="6" y2="14"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="18" y1="20" x2="18" y2="10"/></svg>
        </button>
        <button className="cycle-node" aria-label="Programa por rol y por nivel" style={{ left: "50%", top: "88%" }} data-num="02" data-title="Programa por rol y por nivel." data-desc="Un director financiero no aprende lo mismo que un ejecutivo de ventas, ni al mismo ritmo. Cada programa se diseña según el puesto, el nivel actual y los retos reales del día a día.">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="3"/><path d="M3.5 20a6.5 6.5 0 0 1 10-5.4"/><circle cx="17.5" cy="16.5" r="2.5"/><path d="M17.5 12.9v-1.4M17.5 21.5v-1.4M21.3 16.5h-1.4M15.1 16.5h-1.4"/></svg>
        </button>
        <button className="cycle-node" aria-label="Inglés aplicado, no inglés teórico" style={{ left: "86.1%", top: "61.7%" }} data-num="03" data-title="Inglés aplicado, no inglés teórico." data-desc="Cada sesión replica situaciones reales: una junta con casa matriz, un correo de negociación, una presentación ante inversores. Sus colaboradores practican lo que van a usar al día siguiente.">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8A8.5 8.5 0 0 1 12.5 20a8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.4 8.4 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8z"/></svg>
        </button>
        <button className="cycle-node" aria-label="Evidencia para tomar decisiones" style={{ left: "72.3%", top: "19.3%" }} data-num="04" data-title="Evidencia para tomar decisiones." data-desc="Entregamos reportes de asistencia, progreso y nivel a la Dirección de RH. Usted sabe exactamente en qué está invirtiendo y qué resultados está obteniendo.">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </button>
        <button className="cycle-node" aria-label="Flexibilidad que respeta la operación" style={{ left: "27.7%", top: "19.3%" }} data-num="05" data-title="Flexibilidad que respeta la operación." data-desc="Nos adaptamos a la agenda de su equipo. Cancelaciones, reposiciones y material compartido después de cada sesión. Sin fricciones, sin excusas.">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="0"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </button>
      </div>
    </div>
  </div>
  <div className="proceso-quote reveal">
    <span className="pq-mark" aria-hidden="true">&ldquo;</span>
    <p>La asistencia se cuida sola cuando el colaborador entiende que lo que aprende hoy lo ocupa mañana.</p>
  </div>
</section>

{/* TESTIMONIOS */}
<section className="testimonials" id="resultados">
  <div className="testi-top reveal">
    <div className="eyebrow" style={{ color: "rgba(255,255,255,0.4)", justifyContent: "center" }}>Casos de éxito</div>
    <h2>Resultados reales en equipos nacionales e internacionales</h2>
    <p>En <strong>S-Peak</strong>, el éxito no se supone: se mide en números.</p>
  </div>
  <div className="testi-carousel reveal">
    <div className="testi-track">
      {/* Set 1 */}
      <div className="testi-card">
        <div className="stars">★★★★★</div>
        <p className="testi-quote">"El equipo de <strong>S-Peak</strong> tiene una gran actitud de servicio, sus cursos de idiomas son excelentes para nuestros equipos, se adaptan a las necesidades de sus perfiles de puesto."</p>
        <div className="testi-author">
          <div className="avatar">BI</div>
          <div>
            <div className="author-name">Braskem Idesa</div>
            <div className="author-role">Área de RRHH</div>
          </div>
        </div>
      </div>
      <div className="testi-card accent">
        <div className="stars">★★★★★</div>
        <p className="testi-quote">"<strong>S-Peak</strong> es una organización sumamente dinámica. Su capacidad para entender nuestras necesidades específicas y adaptar sus mejores recursos a nuestros objetivos de negocio es su gran diferencial."</p>
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
        <p className="testi-quote">"<strong>S-Peak</strong> ha sido un gran aliado para nosotros, ya que se adapta a nuestras necesidades y cuenta con un sistema robusto de seguimiento en asistencias. Valoramos también que siempre nos brinda una buena atención tanto a la empresa como a los alumnos."</p>
        <div className="testi-author">
          <div className="avatar">AP</div>
          <div>
            <div className="author-name">Anabel P.</div>
            <div className="author-role">Analista de Planeación y Desarrollo de RH</div>
          </div>
        </div>
      </div>
      <div className="testi-card">
        <div className="stars">★★★★★</div>
        <p className="testi-quote">"Valoramos el seguimiento que <strong>S-Peak</strong> nos brinda, el feedback que piden a través de citas regulares y encuestas, así como reaccionan a lo que pedimos como cliente. Además, los profesores están muy bien preparados para asegurar el aprendizaje, y los precios son justos."</p>
        <div className="testi-author">
          <div className="avatar">EC</div>
          <div>
            <div className="author-name">Erika C.</div>
            <div className="author-role">People Development, Culture &amp; D&amp;I Expert</div>
          </div>
        </div>
      </div>
      {/* Set 2 (duplicado para loop infinito) */}
      <div className="testi-card" aria-hidden="true">
        <div className="stars">★★★★★</div>
        <p className="testi-quote">"El equipo de <strong>S-Peak</strong> tiene una gran actitud de servicio, sus cursos de idiomas son excelentes para nuestros equipos, se adaptan a las necesidades de sus perfiles de puesto."</p>
        <div className="testi-author">
          <div className="avatar">BI</div>
          <div>
            <div className="author-name">Braskem Idesa</div>
            <div className="author-role">Área de RRHH</div>
          </div>
        </div>
      </div>
      <div className="testi-card accent" aria-hidden="true">
        <div className="stars">★★★★★</div>
        <p className="testi-quote">"<strong>S-Peak</strong> es una organización sumamente dinámica. Su capacidad para entender nuestras necesidades específicas y adaptar sus mejores recursos a nuestros objetivos de negocio es su gran diferencial."</p>
        <div className="testi-author">
          <div className="avatar">FD</div>
          <div>
            <div className="author-name">Fernanda D.</div>
            <div className="author-role">Alumna · Chedraui</div>
          </div>
        </div>
      </div>
      <div className="testi-card" aria-hidden="true">
        <div className="stars">★★★★★</div>
        <p className="testi-quote">"<strong>S-Peak</strong> ha sido un gran aliado para nosotros, ya que se adapta a nuestras necesidades y cuenta con un sistema robusto de seguimiento en asistencias. Valoramos también que siempre nos brinda una buena atención tanto a la empresa como a los alumnos."</p>
        <div className="testi-author">
          <div className="avatar">AP</div>
          <div>
            <div className="author-name">Anabel P.</div>
            <div className="author-role">Analista de Planeación y Desarrollo de RH</div>
          </div>
        </div>
      </div>
      <div className="testi-card" aria-hidden="true">
        <div className="stars">★★★★★</div>
        <p className="testi-quote">"Valoramos el seguimiento que <strong>S-Peak</strong> nos brinda, el feedback que piden a través de citas regulares y encuestas, así como reaccionan a lo que pedimos como cliente. Además, los profesores están muy bien preparados para asegurar el aprendizaje, y los precios son justos."</p>
        <div className="testi-author">
          <div className="avatar">EC</div>
          <div>
            <div className="author-name">Erika C.</div>
            <div className="author-role">People Development, Culture &amp; D&amp;I Expert</div>
          </div>
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
      <h2>Resolvamos sus dudas</h2>
      <p>Hemos recopilado las dudas más comunes de nuestros clientes para brindarle claridad desde el primer momento.</p>
      <div className="faq-cta-card">
        <p>¿Tiene una pregunta que no está aquí?</p>
        <button className="btn-red" onClick={() => window.openModal()}>Solicite Información</button>
      </div>
    </div>
    <div className="faq-list reveal">
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget)}>
          1. ¿Cómo sé que de verdad funciona? ¿Qué recibe Recursos Humanos?
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-a">Cada programa avanza por Sprints, 26 horas enfocadas en un dominio del puesto, que cierran con evidencia real (una simulación, un correo, una presentación), evaluada con rúbrica y documentada en una <strong>Tarjeta de Resultados</strong> que usted presenta a Dirección. Su equipo avanza por dominio comprobado, no por horas cursadas. <em>Solicite una propuesta y le mostramos un ejemplo de Tarjeta.</em></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget)}>
          2. ¿En cuánto tiempo veo un cambio real?
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-a">Depende del punto de partida y la constancia del equipo. Como referencia, pasar de un dominio al siguiente (de B1 a B2) toma <strong>alrededor de 9 meses</strong> con dos sesiones semanales de hora y media. En el diagnóstico inicial le damos una proyección realista para su caso. <em>Cotice y le estimamos el plan.</em></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget)}>
          3. ¿Adaptan el inglés a mi industria y manejan equipos en varios países?
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-a">Sí. Anclamos cada Sprint al lenguaje de su sector y a la función de cada equipo: comercial, operaciones, finanzas, atención a clientes, coordinación con casa matriz, con foco en que comuniquen y reporten en inglés en situaciones reales. Para multinacionales capacitamos <strong>México y filiales en simultáneo</strong>, con gestión central y resultados consolidados. <em>Indíquenos su industria y el alcance.</em></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget)}>
          4. ¿Quién imparte y qué respaldo tienen?
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-a">Instructores certificados con experiencia en entornos corporativos, no profesores de escuela. Cada uno se asigna según el dominio y el puesto de su equipo, y si alguno no resulta el adecuado, <strong>lo cambiamos.</strong> La calidad no se deja al azar. <em>Pregúntenos por el perfil de quienes trabajarían con su equipo.</em></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget)}>
          5. ¿Qué pasa si un colaborador falta, se rezaga o deja la empresa?
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-a">Cubierto en los tres casos. Si falta, le enviamos la grabación y los temas para que no pierda el ritmo. Si se rezaga, lo detectamos a tiempo y ajustamos. Y si deja la empresa, reasignamos su lugar a otro colaborador del mismo dominio, <strong>sin perder lo invertido</strong>. <em>Lo dejamos definido en la propuesta desde el inicio.</em></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget)}>
          6. ¿Cómo encaja el programa sin frenar la operación?
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-a">Las sesiones se agendan en los horarios que le convengan a su equipo, en la modalidad que elija: en sus instalaciones, en línea en vivo o híbrida. Y como la operación trae imprevistos, manejamos reposición ágil: si se atraviesa una junta o una urgencia, <strong>la sesión se repone sin trámites</strong>, para que el avance no se detenga. <em>Cuéntenos cómo opera su equipo.</em></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget)}>
          7. ¿Cuánto cuesta y cómo se cobra?
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-a">Se cotiza <strong>por grupo completo, no por persona</strong>, de 1 a 10 colaboradores: a más participantes, menor el costo por colaborador. La frecuencia (sesiones por semana) define el ritmo de avance y la inversión mensual; más sesiones es avanzar más rápido, no pagar más caro por hora. Por eso no manejamos precio de lista: armamos la propuesta según cómo opere su empresa. <em>Solicite su cotización y le damos el número para su caso.</em></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget)}>
          8. ¿Tiene registro ante la STPS y es deducible de impuestos?
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-a"><strong>Sí a ambas.</strong> El programa cuenta con registro oficial ante la STPS y emitimos la constancia de capacitación de cada colaborador. Además es deducible, y según el decreto del Plan México (DOF) pueden existir estímulos adicionales para la formación de personal; le entregamos la documentación de soporte y le recomendamos confirmar la aplicación a su caso con su área contable. <em>Solicite la información para su expediente.</em></div>
      </div>
    </div>
  </div>
</section>

{/* FINAL CTA */}
<section className="final-cta">
  <img className="deco deco-cta" src="/images/isotype.svg" alt="" aria-hidden="true" width="1587" height="907" loading="lazy" />
  <h2>Lleve a su equipo al nivel que<br />su operación necesita</h2>
  <p>Permítanos diseñar un programa de inglés que su equipo sí termine, con avance medible y evidencia para Dirección.</p>
  <button className="btn-white" onClick={() => window.openModal()}>Solicite Información</button>
</section>
{/* MODAL FORMULARIO */}
<div className="modal-overlay" id="lead-modal" onClick={(e) => window.overlayClose(e)}>
  <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div className="modal-header">
      <div id="leadModalHead">
        <h2 id="modal-title">Hable con un Experto</h2>
        <p>Un asesor se pondrá en contacto en menos de 24 horas.</p>
      </div>
      <button className="modal-close" type="button" onClick={() => window.closeModal()} aria-label="Cerrar">&times;</button>
    </div>
    <div className="lead-success" id="leadSuccess" role="status" aria-live="polite" hidden>
      <svg className="lead-success-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="11"></circle>
        <path d="M7 12.5l3.5 3.5L17 9"></path>
      </svg>
      <h3>¡Solicitud enviada!</h3>
      <p>Nuestro equipo está atendiendo su solicitud. Le contactaremos muy pronto.</p>
    </div>
    <form className="form-body" id="leadForm" noValidate>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="leadNombre">Nombre y Apellido *</label>
          <input type="text" id="leadNombre" name="nombre" autoComplete="name" placeholder="María González" required />
        </div>
        <div className="form-group">
          <label htmlFor="leadEmpresa">Empresa *</label>
          <input type="text" id="leadEmpresa" name="empresa" autoComplete="organization" placeholder="Grupo Industrial SA" required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="leadCorreo">Correo Electrónico *</label>
          <input type="email" id="leadCorreo" name="correo" autoComplete="email" placeholder="maria@empresa.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="leadTelefono">Teléfono</label>
          <input type="tel" id="leadTelefono" name="telefono" autoComplete="tel" placeholder="+52 55 0000 0000" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="leadPuesto">Puesto que desempeña</label>
        <input type="text" id="leadPuesto" name="puesto" autoComplete="organization-title" placeholder="Ej. Directora de Recursos Humanos" />
      </div>
      <div className="form-group">
        <label htmlFor="leadMensaje">Cuéntenos su necesidad</label>
        <textarea id="leadMensaje" name="mensaje" placeholder="Número de colaboradores, área, nivel actual de inglés…"></textarea>
      </div>
      <button className="form-submit" type="submit" id="leadSubmit">Solicite Información</button>
      <p className="form-status" id="leadStatus" role="status" aria-live="polite" hidden></p>
      <p className="form-note">Al enviar acepto recibir comunicaciones de <strong>S-Peak</strong>. Consulte nuestro <a href="https://s-peak.com/aviso-de-privacidad/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)", textDecoration: "underline" }}>Aviso de privacidad</a>.</p>
    </form>
  </div>
</div>
{/* Botón flotante de WhatsApp */}
<a href="https://wa.me/525585265520"
   className="whatsapp-float"
   target="_blank"
   rel="noopener noreferrer"
   aria-label="Escríbenos por WhatsApp"
   aria-haspopup="dialog"
   onClick={(e) => window.openWaModal(e)}>
  <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>

{/* Modal de pre-registro WhatsApp */}
<div className="wa-modal-overlay" id="waModal" role="dialog" aria-modal="true" aria-labelledby="waModalTitle" onClick={(e) => window.closeWaModalOnOverlay(e)}>
  <div className="wa-modal">
    <div className="wa-modal-head">
      <button type="button" className="wa-modal-close" aria-label="Cerrar" onClick={() => window.closeWaModal()}>&times;</button>
      <h3 id="waModalTitle">Un paso antes de conectar</h3>
      <p>Le atenderemos de inmediato</p>
    </div>
    <div className="wa-modal-body">
      <form id="waForm" onSubmit={(e) => window.submitWaForm(e)}>
        <div className="wa-form-group">
          <label htmlFor="waNombre">Nombre *</label>
          <input type="text" id="waNombre" name="nombre" autoComplete="name" required />
        </div>
        <div className="wa-form-group">
          <label htmlFor="waCorreo">Correo electrónico *</label>
          <input type="email" id="waCorreo" name="correo" autoComplete="email" required />
        </div>
        <div className="wa-form-group">
          <label htmlFor="waTelefono">Teléfono *</label>
          <input type="tel" id="waTelefono" name="telefono" autoComplete="tel" required />
        </div>
        <button type="submit" className="wa-submit">Continuar a WhatsApp &rarr;</button>
      </form>
    </div>
  </div>
</div>
{/* Botón volver al inicio */}
<button type="button" className="back-to-top" id="backToTop" aria-label="Volver al inicio">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 19V5"></path>
    <path d="M5 12l7-7 7 7"></path>
  </svg>
</button>

      <Script src="/js/lenis-1.1.13.min.js" strategy="afterInteractive" />
      <Script
        id="lp-ingles-principal"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: SCRIPT_PRINCIPAL }}
      />
      <Script
        id="lp-ingles-whatsapp"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: SCRIPT_WHATSAPP }}
      />
      <Script
        id="lp-ingles-volver-arriba"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: SCRIPT_VOLVER_ARRIBA }}
      />
    </>
  );
}
