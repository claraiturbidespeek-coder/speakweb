"use client";

import type { FormEvent, MouseEvent } from "react";
import Script from "next/script";
import AnimacionesEntrada from "@/app/components/AnimacionesEntrada";
import BandaLogos from "@/app/components/BandaLogos";
import FranjaIdiomas from "@/app/components/FranjaIdiomas";
import Icono from "@/app/components/Icono";
import SelloSTPS from "@/app/components/SelloSTPS";
import { useContacto } from "@/app/components/contacto/useContacto";
// La lista de las seis páginas de idioma vive con la plantilla de equipo.
import { IDIOMAS } from "@/app/equipo/tipos";
import styles from "../landing.module.css";

// Las funciones del original viven en scope global, definidas por los <Script> de abajo.
declare global {
  interface Window {
    openWaModal: (e: MouseEvent) => void;
    closeWaModal: () => void;
    closeWaModalOnOverlay: (e: MouseEvent) => void;
    submitWaForm: (e: FormEvent) => void;
  }
}

// Misma pareja de guiones que el resto de las landings de idioma: el ciclo
// radial del método, el carrusel de testimonios y el modal de WhatsApp. Lo
// único que cambia entre páginas es el idioma que se manda en la atribución
// del lead y el texto del mensaje de WhatsApp.
const SCRIPT_PRINCIPAL = `
  // ---- Envío de leads vía función serverless (Resend) ----
  // Endpoint de la función. Si el sitio y la función viven en el mismo dominio de Vercel,
  // déjalo relativo ('/api/lead'). Si la función está en otro dominio, pon la URL absoluta aquí.
  window.LEAD_ENDPOINT = 'https://s-peak-landings.vercel.app/api/lead';

  // Atribución del lead: UTMs de la URL más el idioma de esta página.
  //
  // OJO: ESTA LÓGICA ESTÁ DUPLICADA, A PROPÓSITO.
  // La copia buena vive en lib/atribucion.ts y la usa el modal de contacto
  // compartido. Esta se queda porque el formulario del modal de WhatsApp, que
  // sigue siendo un guion inline, no puede importar un módulo. Exponer las
  // funciones de React en window crearía una dependencia de orden de carga que
  // enviaría leads sin atribución sin que nada lo delatara.
  // Las dos copias tienen que cambiar juntas, y esta desaparece el día que el
  // modal de WhatsApp pase a React.
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
      idioma: 'Español',
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

  // Carrusel testimonios: avance automático tarjeta por tarjeta.
  // Mientras la sección de testimonios de español esté pendiente de casos
  // reales no hay .testi-track en el documento y este bloque no hace nada.
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

      const msg = 'Hola, soy ' + nombre + ' (' + telefono + '). Me interesa conocer más sobre los programas de español para empresas de S-Peak. Mi correo es ' + correo + '.';
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

export default function Page() {
  const { abrir } = useContacto();

  return (
    <>
<AnimacionesEntrada />
<main>
{/* HERO */}
<section className={styles.hero}>
  <img className={`${styles.deco} ${styles.decoHero}`} src="/images/isotype.svg" alt="" aria-hidden="true" width="1587" height="907" loading="lazy" />
  <div className={styles.heroInner}>
    {/* COLUMNA IZQUIERDA (60%) */}
    <div className="reveal">
      <div className="sp-etiqueta">Español para extranjeros · México</div>
      <h1><strong>Cursos de español para empresas</strong> con personal extranjero en México.</h1>
      <p className="sp-hero-sub">Su director de planta llegó de Alemania, su gerente de calidad de Corea y su equipo de arranque de Estados Unidos. Todos dirigen personal mexicano, tratan con proveedores locales y responden ante autoridades, y todo eso ocurre en español. En <strong>S-Peak</strong> diseñamos programas de español para empresas por puesto, para que su personal extranjero <strong>dirija, entienda y resuelva</strong> sin intermediarios, con seguimiento continuo y evidencia verificable del avance.</p>
      <div className={styles.fakeForm} onClick={abrir} role="button" tabIndex={0}>
        <span className={styles.fakeFormIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>
        </span>
        <span className={styles.fakeFormText}>¿Cuántos colaboradores necesitan capacitación?</span>
        <button className={styles.fakeFormBtn} type="button">Solicite una Cotización</button>
      </div>
      <SelloSTPS />
    </div>

    {/* COLUMNA DERECHA (40%) */}
    <div className={`${styles.heroVisual} reveal`}>
      <div className={styles.heroCircle} aria-hidden="true"></div>
      <div className={styles.heroPhoto}>
        <img src="/images/ejecutiva-hero.webp" alt="Ejecutiva en un curso de español para personal extranjero de S-Peak" width="1300" height="1898" loading="eager" fetchPriority="high" />
      </div>
      <div className="sp-stats-row">
        <div className="sp-stat">
          <span className="sp-icono sp-icono--sm sp-icono--rojo">
            <Icono nombre="birrete" />
          </span>
          <span className="sp-stat-num">+40K</span>
          <span className="sp-stat-label">Profesionales formados</span>
        </div>
        <div className="sp-stat">
          <span className="sp-icono sp-icono--sm sp-icono--rojo">
            <Icono nombre="edificio" />
          </span>
          <span className="sp-stat-num">+500</span>
          <span className="sp-stat-label">Empresas atendidas</span>
        </div>
        <div className="sp-stat">
          <span className="sp-icono sp-icono--sm sp-icono--rojo">
            <Icono nombre="globo" />
          </span>
          <span className="sp-stat-num">+30</span>
          <span className="sp-stat-label">Industrias</span>
        </div>
      </div>
    </div>
  </div>
</section>

{/* LOGOS */}
<BandaLogos
  decorativo
  className={styles.logos}
  claseTarjeta={styles.logosCard}
  claseDecorativo={`${styles.deco} ${styles.decoLogos}`}
/>

{/* ÁREAS */}
<section className="sp-seccion">
  <div className={styles.areasInner}>
    <div className="reveal">
      <div className={styles.areasMedia}>
        <img src="/images/imagen-ejecutivo.webp" alt="Ejecutivo extranjero en un programa de español de S-Peak" width="1024" height="768" loading="lazy" />
      </div>
    </div>
    <div className={`${styles.areasLeft} reveal`}>
      <div className="sp-eyebrow">Español para extranjeros</div>
      <h2>Prepare a su personal extranjero para operar en México</h2>
      <p>Cada asignación enfrenta una situación distinta: el director dirige a un equipo que no habla su idioma, el gerente de planta necesita entender lo que se dice en piso y no lo que alguien decide traducirle, el técnico de arranque coordina con contratistas y proveedores locales, y todos, tarde o temprano, tratan con una autoridad. Su gente ya sabe hacer su trabajo: <strong>no enseñamos su operación ni la normativa mexicana, enseñamos el español con el que la ejerce aquí</strong>. Cada programa se adapta al rol y al contexto real del puesto, con <strong>indicadores verificables</strong> y reportes que le permiten <strong>decidir sobre su inversión</strong>.</p>
      <button className="sp-btn sp-btn--rojo" onClick={abrir}>Solicite una Cotización</button>
    </div>
  </div>
</section>

{/* FRANJA DE IDIOMAS — se esconde en modo landing */}
<FranjaIdiomas
  className="sp-oculto-landing"
  titulo="Las dos direcciones"
  texto={
    <>
      Si nos busca por español es porque tiene personal extranjero al frente de
      su operación en México. Ese mismo corporativo casi siempre necesita el
      camino inverso: su equipo mexicano reportando a la matriz en inglés,
      alemán, francés, italiano o portugués. Capacitamos{" "}
      <strong>las dos direcciones de la misma relación</strong>. En el
      diagnóstico definimos cuáles.
    </>
  }
  idiomas={IDIOMAS}
/>

{/* EVIDENCIA */}
<section className="sp-seccion" id="enfoque">
  <div className={styles.evidenciaInner}>
    <div className={`${styles.evidenciaLeft} reveal`}>
      <div className="sp-eyebrow">Nuestro enfoque</div>
      <h2>No le entregamos listas de asistencia.<br /><em>Le entregamos evidencia.</em></h2>
      <p>A la dirección de <strong>Recursos Humanos</strong> le entregamos <strong>tableros</strong> que detallan el <strong>avance, la adopción y el impacto real</strong> del programa, para una <strong>decisión basada en datos</strong> y la optimización de su presupuesto.</p>
      <div className={styles.evidenciaTags}>
        <span className={styles.evidenciaTag}>Evidencias demostrables</span>
        <span className={styles.evidenciaTag}>Métricas de avance y asistencia</span>
        <span className={styles.evidenciaTag}>Reportes de desempeño</span>
      </div>
      <button className="sp-btn sp-btn--rojo" onClick={abrir}>Solicite una Cotización</button>
    </div>
    <div className={`${styles.evidenciaRight} reveal`}>
      {/* Tablero ilustrativo: la misma estructura que el resto de las landings
          de idioma, con otras cifras. Ni los números ni los colaboradores son
          datos de un cliente: las etiquetas son genéricas a propósito, para que
          nadie las lea como personas, y los valores no coinciden con los de
          ninguna de las otras cinco landings de idioma, para que las páginas no
          se vean calcadas una al lado de la otra. Aquí el perfil es el de una
          asignación que arranca: la comprensión auditiva es la competencia más
          baja, que es justo lo que argumenta esta página. */}
      <div className={styles.dash} role="img" aria-label="Panel de progreso del equipo en el programa de español para personal extranjero de S-Peak">
        <div className={styles.dashTopbar}>
          <div className={styles.dashTopbarTitle}>
            <span className={styles.dashDots}><i></i><i></i><i></i></span>
            Panel de Progreso del Equipo
          </div>
          <span className={styles.dashTopbarTag}>S-Peak Analytics</span>
        </div>
        <div className={styles.dashContent}>
          <div className={styles.dashChips}>
            <span className={styles.dashChip}><b>+27%</b> mejora</span>
            <span className={styles.dashChip}><b>8</b> colaboradores activos</span>
            <span className={styles.dashChip}><b>22</b> sesiones</span>
          </div>
          <div className={styles.dashGrid}>
            {/* Métrica destacada */}
            <div className={`${styles.dashWidget} ${styles.dashMetric}`}>
              <div className={styles.wMetric}>97<span>%</span></div>
              <div className={styles.wMetricLabel}>Evidencias aprobadas con rúbrica</div>
              <div className={styles.wMetricSub}>↑ 8 pts vs. trimestre anterior</div>
            </div>
            {/* Gráfica de línea */}
            <div className={`${styles.dashWidget} ${styles.dashChart}`}>
              <div className={styles.wTitle}>Progreso del equipo · Trimestre</div>
              <svg viewBox="0 0 300 86" preserveAspectRatio="none" aria-hidden="true">
                <polygon fill="#B51E40" fillOpacity="0.08" points="0,78 50,71 100,67 150,59 200,54 250,45 300,29 300,86 0,86"/>
                <polyline fill="none" stroke="#B51E40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" points="0,78 50,71 100,67 150,59 200,54 250,45 300,29"/>
                <circle cx="300" cy="29" r="4" fill="#B51E40"/>
              </svg>
              <div className={styles.dashChartX}><span>Mes 1</span><span>Mes 2</span><span>Mes 3</span></div>
            </div>
            {/* Competencias del equipo */}
            <div className={`${styles.dashWidget} ${styles.dashSkills}`}>
              <div className={styles.wTitle}>Competencias del equipo</div>
              <div className={styles.wSkill}>
                <div className={styles.wSkillTop}><span>Comunicación oral</span><span className={styles.wSkillPct}>71%</span></div>
                <div className={styles.wBar}><span style={{ width: "71%" }}></span></div>
              </div>
              <div className={styles.wSkill}>
                <div className={styles.wSkillTop}><span>Comprensión auditiva</span><span className={styles.wSkillPct}>57%</span></div>
                <div className={styles.wBar}><span style={{ width: "57%" }}></span></div>
              </div>
              <div className={styles.wSkill}>
                <div className={styles.wSkillTop}><span>Comunicación en piso</span><span className={styles.wSkillPct}>63%</span></div>
                <div className={styles.wBar}><span style={{ width: "63%" }}></span></div>
              </div>
              <div className={styles.wSkill}>
                <div className={styles.wSkillTop}><span>Trato con proveedores</span><span className={styles.wSkillPct}>77%</span></div>
                <div className={styles.wBar}><span style={{ width: "77%" }}></span></div>
              </div>
            </div>
            {/* Lista de colaboradores */}
            <div className={styles.dashWidget}>
              <div className={styles.wTitle}>Colaboradores</div>
              <div className={styles.wPerson}>
                <span className={styles.wPersonAv}>A</span>
                <span className={styles.wPersonName}>Colaborador A</span>
                <span className={styles.wPersonLvl}>B2</span>
                <span className={styles.wPersonPct}>92%</span>
              </div>
              <div className={styles.wPerson}>
                <span className={styles.wPersonAv}>B</span>
                <span className={styles.wPersonName}>Colaborador B</span>
                <span className={styles.wPersonLvl}>B1</span>
                <span className={styles.wPersonPct}>84%</span>
              </div>
              <div className={styles.wPerson}>
                <span className={styles.wPersonAv}>C</span>
                <span className={styles.wPersonName}>Colaborador C</span>
                <span className={styles.wPersonLvl}>A2</span>
                <span className={styles.wPersonPct}>66%</span>
              </div>
              <div className={styles.wPerson}>
                <span className={styles.wPersonAv}>D</span>
                <span className={styles.wPersonName}>Colaborador D</span>
                <span className={styles.wPersonLvl}>A1</span>
                <span className={styles.wPersonPct}>55%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* PROCESO INFOGRAFÍA */}
<section className={`sp-seccion ${styles.proceso}`} id="metodo">
  <img className={`${styles.deco} ${styles.decoProceso}`} src="/images/isotype.svg" alt="" aria-hidden="true" width="1587" height="907" loading="lazy" />
  <div className={styles.procesoInner}>
    <div className={`${styles.procesoLeft} reveal`}>
      <div className="sp-eyebrow">El método S‑Peak</div>
      <h2>5 razones por las que las empresas líderes en México eligen S‑Peak</h2>
      {/* TODO (datos): la landing de inglés abre este bloque con el lugar de
          México en el índice de dominio del inglés. No hay una cifra
          equivalente verificada para este caso. La cifra que le correspondería
          es la tasa de asignaciones internacionales que se interrumpen antes de
          tiempo, y no tenemos fuente para citarla, así que esta bajada va sin
          número. Si el equipo aporta una, se cita aquí. */}
      <p className={styles.procesoIntro}>El español no se resuelve con un intérprete ni con el inglés del comité directivo. Lo que se dice en piso, lo que advierte un proveedor y lo que pide una autoridad ocurre en español, y quien no lo entiende dirige a partir de lo que alguien más decidió traducirle. Así es como <strong>S-Peak</strong> cierra esa brecha.</p>
    </div>
    <div className="reveal">
      <div className={styles.cycle}>
        <div className={styles.cycleCenter}>
          <div className={styles.cycleNum} id="cycle-num">01</div>
          <div className={styles.cycleTitle} id="cycle-title">Diagnóstico antes de proponer nada.</div>
          <div className={styles.cycleDesc} id="cycle-desc">Evaluamos el nivel real de cada participante y las situaciones concretas en que necesita el español en su puesto. No asumimos, medimos.</div>
        </div>
        <button className={`${styles.cycleNode} cycle-node`} aria-label="Diagnóstico antes de proponer nada" style={{ left: "13.9%", top: "61.7%" }} data-num="01" data-title="Diagnóstico antes de proponer nada." data-desc="Evaluamos el nivel real de cada participante y las situaciones concretas en que necesita el español en su puesto. No asumimos, medimos.">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="20" x2="6" y2="14"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="18" y1="20" x2="18" y2="10"/></svg>
        </button>
        <button className={`${styles.cycleNode} cycle-node`} aria-label="Programa por rol y por nivel" style={{ left: "50%", top: "88%" }} data-num="02" data-title="Programa por rol y por nivel." data-desc="Un director general que conduce un comité no aprende lo mismo que un técnico de arranque que coordina en piso con contratistas, ni al mismo ritmo. Cada programa se diseña según el puesto, el nivel actual y los retos reales del día a día.">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="3"/><path d="M3.5 20a6.5 6.5 0 0 1 10-5.4"/><circle cx="17.5" cy="16.5" r="2.5"/><path d="M17.5 12.9v-1.4M17.5 21.5v-1.4M21.3 16.5h-1.4M15.1 16.5h-1.4"/></svg>
        </button>
        <button className={`${styles.cycleNode} cycle-node`} aria-label="Español aplicado, no español teórico" style={{ left: "86.1%", top: "61.7%" }} data-num="03" data-title="Español aplicado, no español teórico." data-desc="Cada sesión replica situaciones reales: una junta con el equipo local, un recorrido por piso, una negociación con un proveedor, un trámite ante una autoridad. Practican lo que van a usar al día siguiente.">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8A8.5 8.5 0 0 1 12.5 20a8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.4 8.4 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8z"/></svg>
        </button>
        <button className={`${styles.cycleNode} cycle-node`} aria-label="Evidencia para tomar decisiones" style={{ left: "72.3%", top: "19.3%" }} data-num="04" data-title="Evidencia para tomar decisiones." data-desc="Entregamos reportes de asistencia, progreso y nivel a la Dirección de RH. Usted sabe exactamente en qué está invirtiendo y cómo avanza cada asignación.">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </button>
        <button className={`${styles.cycleNode} cycle-node`} aria-label="Flexibilidad que respeta la operación" style={{ left: "27.7%", top: "19.3%" }} data-num="05" data-title="Flexibilidad que respeta la operación." data-desc="Nos adaptamos a la agenda de su personal extranjero, que suele ser la más apretada de la operación. Cancelaciones, reposiciones y material compartido después de cada sesión. Sin fricciones, sin excusas.">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="0"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </button>
      </div>
    </div>
  </div>
  <div className={`${styles.procesoQuote} reveal`}>
    <span className={styles.pqMark} aria-hidden="true">&ldquo;</span>
    <p>La asistencia se cuida sola cuando el colaborador entiende que lo que aprende hoy lo ocupa mañana.</p>
  </div>
</section>

{/* TESTIMONIOS — PENDIENTE DE DATOS REALES
    La landing de inglés lleva aquí un carrusel de cuatro testimonios con
    nombre, empresa y puesto. No se copian a español: son de clientes de los
    programas de inglés y traerlos tal cual los presentaría como testimonios
    de un programa de español para extranjeros, que es justo lo que no se debe
    afirmar.

    Para publicar esta sección hacen falta cuatro testimonios reales de
    clientes de este programa (cita, nombre o inicial, empresa y
    puesto). El markup se recupera de app/idioma/ingles-para-empresas/page.tsx:
    <section className={`sp-seccion ${styles.testimonials}`} id="resultados">
    con el set duplicado que el guion del carrusel necesita para el bucle.

    Mientras no exista el .testi-track, el bloque del carrusel en
    SCRIPT_PRINCIPAL sale por su propia guarda y no hace nada. */}

{/* FAQ */}
<section className="sp-seccion" id="faq">
  <div className={styles.faqInner}>
    <div className={`${styles.faqLeft} reveal`}>
      <div className="sp-eyebrow">Preguntas frecuentes</div>
      <h2>Resolvamos sus dudas</h2>
      <p>Hemos recopilado las dudas más comunes de nuestros clientes para brindarle claridad desde el primer momento.</p>
      <div className={`sp-cta-card ${styles.faqCtaCard}`}>
        <p>¿Tiene una pregunta que no está aquí?</p>
        <button className="sp-btn sp-btn--rojo" onClick={abrir}>Solicite una Cotización</button>
      </div>
    </div>
    <div className="sp-faq-lista reveal">
      <details className="sp-faq-item" name="faq-espanol">
        <summary className="sp-faq-pregunta">
          1. ¿Cómo sé que de verdad funciona? ¿Qué recibe Recursos Humanos?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Cada programa avanza por Sprints, 26 horas enfocadas en un dominio del puesto, que cierran con evidencia real (una junta con el equipo, un recorrido por piso, una llamada con un proveedor), evaluada con rúbrica y documentada en una <strong>Tarjeta de Resultados</strong> que usted presenta a Dirección. Cada asignación avanza por dominio comprobado, no por horas cursadas. <em>Solicite una propuesta y le mostramos un ejemplo de Tarjeta.</em></div>
      </details>
      {/* TODO (datos): la respuesta 2 de la landing de inglés cita una
          referencia de tiempo para pasar de B1 a B2. Esa cifra es del programa
          de inglés y no se traslada a este caso sin una referencia propia; hasta
          tenerla, la respuesta remite a la proyección del diagnóstico. */}
      <details className="sp-faq-item" name="faq-espanol">
        <summary className="sp-faq-pregunta">
          2. ¿En cuánto tiempo veo un cambio real?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Depende del punto de partida, de la constancia del participante y de cuánto español necesite ya en su puesto. En el diagnóstico inicial medimos el nivel real de cada colaborador y le damos <strong>una proyección concreta para su caso</strong>, con las fechas en que puede esperar cada salto de dominio. <em>Cotice y le estimamos el plan.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-espanol">
        <summary className="sp-faq-pregunta">
          3. ¿Adaptan el español al puesto y manejan personal de varias nacionalidades?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Sí a las dos. Anclamos cada Sprint a lo que el puesto exige —dirigir al equipo local, entender el piso, tratar con proveedores o con autoridades— y no a un temario general. La nacionalidad de origen no cambia el programa: lo que cambia es el nivel de partida de cada quien, y eso lo fija el diagnóstico. Si tiene <strong>varias asignaciones a la vez</strong>, las llevamos en paralelo con gestión central y resultados consolidados. <em>Indíquenos los puestos y el alcance.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-espanol">
        <summary className="sp-faq-pregunta">
          4. La asignación dura dos o tres años. ¿Se justifica la inversión?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Es justo por eso. Compare la inversión no contra el sueldo del expatriado, sino contra lo que cuesta una asignación que se interrumpe: la reubicación, la búsqueda del reemplazo y los meses de operación sin titular al frente. Lo que suele quebrar una asignación no es la capacidad técnica —esa ya la trae— sino el aislamiento de dirigir a través de un intérprete y no acabar de entender el entorno donde vive. Además el retorno no llega al final: <strong>los primeros dominios se ocupan a las pocas semanas</strong>, en la junta de equipo y en el recorrido por piso. Y el programa se dimensiona a la asignación, no a un plan de estudios: si son dos años, el plan se traza para dos años. <em>Díganos cuánto dura la estancia y lo ajustamos en el diagnóstico.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-espanol">
        <summary className="sp-faq-pregunta">
          5. ¿Quién imparte y qué respaldo tienen?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Instructores certificados con experiencia en entornos corporativos, no profesores de escuela. Cada uno se asigna según el puesto y el nivel de partida de cada participante, y si alguno no resulta el adecuado, <strong>lo cambiamos.</strong> La calidad no se deja al azar. <em>Pregúntenos por el perfil de quienes trabajarían con su equipo.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-espanol">
        <summary className="sp-faq-pregunta">
          6. ¿Qué pasa si un participante falta, se rezaga o termina su asignación?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Cubierto en los tres casos. Si falta, le enviamos la grabación y los temas para que no pierda el ritmo. Si se rezaga, lo detectamos a tiempo y ajustamos. Y si concluye su asignación o sale de la empresa, reasignamos su lugar a otro participante del mismo dominio, <strong>sin perder lo invertido</strong>. <em>Lo dejamos definido en la propuesta desde el inicio.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-espanol">
        <summary className="sp-faq-pregunta">
          7. ¿Cómo encaja el programa sin frenar la operación?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Las sesiones se agendan en los horarios que le convengan, y en la modalidad que elija: en sus instalaciones, en línea en vivo o híbrida. Y como la agenda de un expatriado es la primera que se rompe, manejamos reposición ágil: si se atraviesa un viaje o una urgencia, <strong>la sesión se repone sin trámites</strong>, para que el avance no se detenga. <em>Cuéntenos cómo opera su equipo.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-espanol">
        <summary className="sp-faq-pregunta">
          8. ¿Cuánto cuesta y cómo se cobra?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Se cotiza <strong>por grupo completo, no por persona</strong>, de 1 a 10 participantes: a más participantes, menor el costo por cabeza. Una sola asignación se cotiza igual, como grupo de uno. La frecuencia (sesiones por semana) define el ritmo de avance y la inversión mensual; más sesiones es avanzar más rápido, no pagar más caro por hora. Por eso no manejamos precio de lista: armamos la propuesta según cómo opere su empresa. <em>Solicite su cotización y le damos el número para su caso.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-espanol">
        <summary className="sp-faq-pregunta">
          9. ¿Tiene registro ante la STPS y es deducible de impuestos?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta"><strong>Sí a ambas.</strong> El programa cuenta con registro oficial ante la STPS y emitimos la constancia de capacitación de cada participante contratado en México. Además es deducible, y según el decreto del Plan México (DOF) pueden existir estímulos adicionales para la formación de personal; le entregamos la documentación de soporte y le recomendamos confirmar la aplicación a su caso con su área contable. <em>Solicite la información para su expediente.</em></div>
      </details>
    </div>
  </div>
</section>

{/* FINAL CTA */}
<section className={`sp-seccion ${styles.finalCta}`}>
  <img className={`${styles.deco} ${styles.decoCta}`} src="/images/isotype.svg" alt="" aria-hidden="true" width="1587" height="907" loading="lazy" />
  <h2>Lleve a su equipo al nivel que<br />su operación necesita</h2>
  <p>Permítanos diseñar un programa de español que su personal extranjero sí termine, con avance medible y evidencia para Dirección.</p>
  <button className="sp-btn sp-btn--blanco" onClick={abrir}>Solicite una Cotización</button>
</section>
</main>
{/* Botón flotante de WhatsApp */}
<a href="https://wa.me/525585265520"
   className={styles.whatsappFloat}
   target="_blank"
   rel="noopener noreferrer"
   aria-label="Escríbanos por WhatsApp"
   aria-haspopup="dialog"
   onClick={(e) => window.openWaModal(e)}>
  <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>

{/* Modal de pre-registro WhatsApp */}
<div className={`sp-modal-overlay ${styles.waModalOverlay}`} id="waModal" role="dialog" aria-modal="true" aria-labelledby="waModalTitle" onClick={(e) => window.closeWaModalOnOverlay(e)}>
  <div className={`sp-modal ${styles.waModal}`}>
    <div className={styles.waModalHead}>
      <button type="button" className={styles.waModalClose} aria-label="Cerrar" onClick={() => window.closeWaModal()}>&times;</button>
      <h3 id="waModalTitle">Un paso antes de conectar</h3>
      <p>Le atenderemos de inmediato</p>
    </div>
    <div className={styles.waModalBody}>
      <form id="waForm" onSubmit={(e) => window.submitWaForm(e)}>
        <div className="sp-form-group">
          <label htmlFor="waNombre">Nombre *</label>
          <input type="text" id="waNombre" name="nombre" autoComplete="name" required />
        </div>
        <div className="sp-form-group">
          <label htmlFor="waCorreo">Correo electrónico *</label>
          <input type="email" id="waCorreo" name="correo" autoComplete="email" required />
        </div>
        <div className="sp-form-group">
          <label htmlFor="waTelefono">Teléfono *</label>
          <input type="tel" id="waTelefono" name="telefono" autoComplete="tel" required />
        </div>
        <button type="submit" className={`sp-form-submit ${styles.waSubmit}`}>Continuar a WhatsApp &rarr;</button>
      </form>
    </div>
  </div>
</div>

      <Script
        id="lp-espanol-principal"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: SCRIPT_PRINCIPAL }}
      />
      <Script
        id="lp-espanol-whatsapp"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: SCRIPT_WHATSAPP }}
      />
    </>
  );
}
