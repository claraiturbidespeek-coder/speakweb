"use client";

import Script from "next/script";
import AnimacionesEntrada from "@/app/components/AnimacionesEntrada";
import BandaLogos from "@/app/components/BandaLogos";
import FranjaIdiomas from "@/app/components/FranjaIdiomas";
import Icono from "@/app/components/Icono";
import SelloSTPS from "@/app/components/SelloSTPS";
import FlotanteWhatsApp from "@/app/components/whatsapp/FlotanteWhatsApp";
import { useContacto } from "@/app/components/contacto/useContacto";
// La lista de las seis páginas de idioma vive con la plantilla de equipo.
import { IDIOMAS } from "@/app/equipo/tipos";
import styles from "../landing.module.css";

// El guion de los dos comportamientos que siguen siendo DOM suelto: el ciclo
// radial del método y el carrusel de testimonios. El envío de leads y el modal
// de WhatsApp salieron de aquí a React —lib/atribucion.ts y
// components/whatsapp/FlotanteWhatsApp.tsx—, así que esto ya no toca window.
const SCRIPT_PRINCIPAL = `
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
  // Mientras la sección de testimonios de alemán esté pendiente de casos
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
      <div className="sp-etiqueta">Alemán corporativo · México</div>
      <h1><strong>Cursos de alemán para empresas</strong> con matriz o cliente en Alemania.</h1>
      <p className="sp-hero-sub">Cuando la auditoría llega de Stuttgart, la especificación viene en alemán y el corporativo espera el reporte en su idioma, el inglés de en medio deja de alcanzar. En <strong>S-Peak</strong> diseñamos programas de alemán para empresas por puesto, para que sus colaboradores <strong>reporten, sustenten y coordinen</strong> directamente en alemán, con seguimiento continuo y evidencia verificable del avance.</p>
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
        <img src="/images/ejecutiva-hero.webp" alt="Ejecutiva en un curso de alemán para empresas de S-Peak" width="1300" height="1898" loading="eager" fetchPriority="high" />
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
        <img src="/images/imagen-ejecutivo.webp" alt="Ejecutivo en un programa de alemán para empresas de S-Peak" width="1024" height="768" loading="lazy" />
      </div>
    </div>
    <div className={`${styles.areasLeft} reveal`}>
      <div className="sp-eyebrow">Alemán de negocios</div>
      <h2>Prepare a su talento para el alemán que exige su operación</h2>
      <p>Cada área responde ante un interlocutor distinto: calidad sostiene la auditoría de la matriz, ingeniería trabaja con especificaciones que llegan en alemán, producción coordina el arranque de una línea con técnicos enviados desde Alemania y compras negocia con proveedores del corporativo. Su equipo ya domina el proceso: <strong>no enseñamos manufactura ni sistemas de calidad, enseñamos el alemán con el que su equipo los sustenta</strong>. Cada programa se adapta al rol y al contexto real del puesto, con <strong>indicadores verificables</strong> y reportes que le permiten <strong>decidir sobre su inversión</strong>.</p>
      <button className="sp-btn sp-btn--rojo" onClick={abrir}>Solicite una Cotización</button>
    </div>
  </div>
</section>

{/* FRANJA DE IDIOMAS — se esconde en modo landing */}
<FranjaIdiomas
  className="sp-oculto-landing"
  titulo="No solo alemán"
  texto={
    <>
      Si su empresa nos busca por alemán suele ser porque hay una matriz, una
      auditoría o un cliente alemán de por medio. Pero pocas plantas tratan con
      una sola geografía: cuando el mismo equipo también reporta a Estados
      Unidos, Francia o Brasil, capacitamos en{" "}
      <strong>la lengua que realmente usa cada relación</strong>. En el
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
          inglés ni con los de francés, para que las páginas no se vean
          calcadas una al lado de la otra. */}
      <div className={styles.dash} role="img" aria-label="Panel de progreso del equipo en el programa de alemán para empresas de S-Peak">
        <div className={styles.dashTopbar}>
          <div className={styles.dashTopbarTitle}>
            <span className={styles.dashDots}><i></i><i></i><i></i></span>
            Panel de Progreso del Equipo
          </div>
          <span className={styles.dashTopbarTag}>S-Peak Analytics</span>
        </div>
        <div className={styles.dashContent}>
          <div className={styles.dashChips}>
            <span className={styles.dashChip}><b>+16%</b> mejora</span>
            <span className={styles.dashChip}><b>15</b> colaboradores activos</span>
            <span className={styles.dashChip}><b>28</b> sesiones</span>
          </div>
          <div className={styles.dashGrid}>
            {/* Métrica destacada */}
            <div className={`${styles.dashWidget} ${styles.dashMetric}`}>
              <div className={styles.wMetric}>85<span>%</span></div>
              <div className={styles.wMetricLabel}>Evidencias aprobadas con rúbrica</div>
              <div className={styles.wMetricSub}>↑ 5 pts vs. trimestre anterior</div>
            </div>
            {/* Gráfica de línea */}
            <div className={`${styles.dashWidget} ${styles.dashChart}`}>
              <div className={styles.wTitle}>Progreso del equipo · Trimestre</div>
              <svg viewBox="0 0 300 86" preserveAspectRatio="none" aria-hidden="true">
                <polygon fill="#B51E40" fillOpacity="0.08" points="0,75 50,64 100,61 150,50 200,47 250,31 300,26 300,86 0,86"/>
                <polyline fill="none" stroke="#B51E40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" points="0,75 50,64 100,61 150,50 200,47 250,31 300,26"/>
                <circle cx="300" cy="26" r="4" fill="#B51E40"/>
              </svg>
              <div className={styles.dashChartX}><span>Mes 1</span><span>Mes 2</span><span>Mes 3</span></div>
            </div>
            {/* Competencias del equipo */}
            <div className={`${styles.dashWidget} ${styles.dashSkills}`}>
              <div className={styles.wTitle}>Competencias del equipo</div>
              <div className={styles.wSkill}>
                <div className={styles.wSkillTop}><span>Comunicación oral</span><span className={styles.wSkillPct}>79%</span></div>
                <div className={styles.wBar}><span style={{ width: "79%" }}></span></div>
              </div>
              <div className={styles.wSkill}>
                <div className={styles.wSkillTop}><span>Comprensión auditiva</span><span className={styles.wSkillPct}>68%</span></div>
                <div className={styles.wBar}><span style={{ width: "68%" }}></span></div>
              </div>
              <div className={styles.wSkill}>
                <div className={styles.wSkillTop}><span>Redacción corporativa</span><span className={styles.wSkillPct}>77%</span></div>
                <div className={styles.wBar}><span style={{ width: "77%" }}></span></div>
              </div>
              <div className={styles.wSkill}>
                <div className={styles.wSkillTop}><span>Negociación</span><span className={styles.wSkillPct}>70%</span></div>
                <div className={styles.wBar}><span style={{ width: "70%" }}></span></div>
              </div>
            </div>
            {/* Lista de colaboradores */}
            <div className={styles.dashWidget}>
              <div className={styles.wTitle}>Colaboradores</div>
              <div className={styles.wPerson}>
                <span className={styles.wPersonAv}>A</span>
                <span className={styles.wPersonName}>Colaborador A</span>
                <span className={styles.wPersonLvl}>B2</span>
                <span className={styles.wPersonPct}>87%</span>
              </div>
              <div className={styles.wPerson}>
                <span className={styles.wPersonAv}>B</span>
                <span className={styles.wPersonName}>Colaborador B</span>
                <span className={styles.wPersonLvl}>B1</span>
                <span className={styles.wPersonPct}>76%</span>
              </div>
              <div className={styles.wPerson}>
                <span className={styles.wPersonAv}>C</span>
                <span className={styles.wPersonName}>Colaborador C</span>
                <span className={styles.wPersonLvl}>B1</span>
                <span className={styles.wPersonPct}>70%</span>
              </div>
              <div className={styles.wPerson}>
                <span className={styles.wPersonAv}>D</span>
                <span className={styles.wPersonName}>Colaborador D</span>
                <span className={styles.wPersonLvl}>A2</span>
                <span className={styles.wPersonPct}>61%</span>
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
          equivalente verificada para el alemán —ni de dominio del idioma ni de
          peso de la inversión alemana en el país—, así que esta bajada va sin
          número. Si el equipo aporta una fuente, se cita aquí. */}
      <p className={styles.procesoIntro}>El alemán no se resuelve con el inglés de por medio. La auditoría, la especificación y la junta con la matriz llegan en alemán, y quien no lo domina defiende su planta a través de un intermediario. Así es como <strong>S-Peak</strong> cierra esa brecha.</p>
    </div>
    <div className="reveal">
      <div className={styles.cycle}>
        <div className={styles.cycleCenter}>
          <div className={styles.cycleNum} id="cycle-num">01</div>
          <div className={styles.cycleTitle} id="cycle-title">Diagnóstico antes de proponer nada.</div>
          <div className={styles.cycleDesc} id="cycle-desc">Evaluamos el nivel real de cada colaborador y las situaciones concretas en que usa el alemán en su puesto. No asumimos, medimos.</div>
        </div>
        <button className={`${styles.cycleNode} cycle-node`} aria-label="Diagnóstico antes de proponer nada" style={{ left: "13.9%", top: "61.7%" }} data-num="01" data-title="Diagnóstico antes de proponer nada." data-desc="Evaluamos el nivel real de cada colaborador y las situaciones concretas en que usa el alemán en su puesto. No asumimos, medimos.">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="20" x2="6" y2="14"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="18" y1="20" x2="18" y2="10"/></svg>
        </button>
        <button className={`${styles.cycleNode} cycle-node`} aria-label="Programa por rol y por nivel" style={{ left: "50%", top: "88%" }} data-num="02" data-title="Programa por rol y por nivel." data-desc="Un gerente de calidad que sostiene una auditoría no aprende lo mismo que un ingeniero que trabaja con especificaciones de proceso, ni al mismo ritmo. Cada programa se diseña según el puesto, el nivel actual y los retos reales del día a día.">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="3"/><path d="M3.5 20a6.5 6.5 0 0 1 10-5.4"/><circle cx="17.5" cy="16.5" r="2.5"/><path d="M17.5 12.9v-1.4M17.5 21.5v-1.4M21.3 16.5h-1.4M15.1 16.5h-1.4"/></svg>
        </button>
        <button className={`${styles.cycleNode} cycle-node`} aria-label="Alemán aplicado, no alemán teórico" style={{ left: "86.1%", top: "61.7%" }} data-num="03" data-title="Alemán aplicado, no alemán teórico." data-desc="Cada sesión replica situaciones reales: una auditoría de la matriz, un correo de escalamiento a la planta en Alemania, la presentación de un plan de acción ante el corporativo. Sus colaboradores practican lo que van a usar al día siguiente.">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8A8.5 8.5 0 0 1 12.5 20a8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.4 8.4 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8z"/></svg>
        </button>
        <button className={`${styles.cycleNode} cycle-node`} aria-label="Evidencia para tomar decisiones" style={{ left: "72.3%", top: "19.3%" }} data-num="04" data-title="Evidencia para tomar decisiones." data-desc="Entregamos reportes de asistencia, progreso y nivel a la Dirección de RH. Usted sabe exactamente en qué está invirtiendo y qué resultados está obteniendo.">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </button>
        <button className={`${styles.cycleNode} cycle-node`} aria-label="Flexibilidad que respeta la operación" style={{ left: "27.7%", top: "19.3%" }} data-num="05" data-title="Flexibilidad que respeta la operación." data-desc="Nos adaptamos a la agenda de su equipo, incluidos los turnos de planta y la diferencia de horario con Alemania. Cancelaciones, reposiciones y material compartido después de cada sesión. Sin fricciones, sin excusas.">
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
    nombre, empresa y puesto. No se copian a alemán: son de clientes de los
    programas de inglés y traerlos tal cual los presentaría como testimonios
    de un programa de alemán, que es justo lo que no se debe afirmar.

    Para publicar esta sección hacen falta cuatro testimonios reales de
    clientes del programa de alemán (cita, nombre o inicial, empresa y
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
      <details className="sp-faq-item" name="faq-aleman">
        <summary className="sp-faq-pregunta">
          1. ¿Cómo sé que de verdad funciona? ¿Qué recibe Recursos Humanos?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Cada programa avanza por Sprints, 26 horas enfocadas en un dominio del puesto, que cierran con evidencia real (una simulación, un correo, una presentación), evaluada con rúbrica y documentada en una <strong>Tarjeta de Resultados</strong> que usted presenta a Dirección. Su equipo avanza por dominio comprobado, no por horas cursadas. <em>Solicite una propuesta y le mostramos un ejemplo de Tarjeta.</em></div>
      </details>
      {/* TODO (datos): la respuesta 2 de la landing de inglés cita una
          referencia de tiempo para pasar de B1 a B2. Esa cifra es del programa
          de inglés y no se traslada al alemán sin una referencia propia; hasta
          tenerla, la respuesta remite a la proyección del diagnóstico. */}
      <details className="sp-faq-item" name="faq-aleman">
        <summary className="sp-faq-pregunta">
          2. ¿En cuánto tiempo veo un cambio real?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Depende del punto de partida, de la constancia del equipo y de cuánto alemán use ya en su puesto. En el diagnóstico inicial medimos el nivel real de cada colaborador y le damos <strong>una proyección concreta para su caso</strong>, con las fechas en que puede esperar cada salto de dominio. <em>Cotice y le estimamos el plan.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-aleman">
        <summary className="sp-faq-pregunta">
          3. ¿Adaptan el alemán a mi industria y manejan equipos en varias plantas?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Sí. Anclamos cada Sprint al lenguaje de su sector —automotriz, aeroespacial, manufactura— y a la función de cada equipo: calidad, ingeniería, producción, compras, coordinación con casa matriz, con foco en que comuniquen y reporten en alemán en situaciones reales. Si opera varias plantas, capacitamos <strong>todas en simultáneo</strong>, con gestión central y resultados consolidados. <em>Indíquenos su industria y el alcance.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-aleman">
        <summary className="sp-faq-pregunta">
          4. ¿Enseñan el alemán técnico de la industria automotriz?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Enseñamos el alemán con el que su equipo comunica lo técnico, no la técnica misma: sus ingenieros ya saben de procesos, tolerancias y sistemas de calidad. Lo que trabajamos es que puedan sustentar un hallazgo ante un auditor, escalar un problema de línea a la matriz o defender un plan de acción, en alemán y sin intermediario. El vocabulario del sector entra como contexto de esas situaciones. <strong>La disciplina la aportan ellos, el idioma lo aportamos nosotros.</strong> <em>Díganos con quién habla su equipo y lo ajustamos en el diagnóstico.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-aleman">
        <summary className="sp-faq-pregunta">
          5. ¿Quién imparte y qué respaldo tienen?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Instructores certificados con experiencia en entornos corporativos, no profesores de escuela. Cada uno se asigna según el dominio y el puesto de su equipo, y si alguno no resulta el adecuado, <strong>lo cambiamos.</strong> La calidad no se deja al azar. <em>Pregúntenos por el perfil de quienes trabajarían con su equipo.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-aleman">
        <summary className="sp-faq-pregunta">
          6. ¿Qué pasa si un colaborador falta, se rezaga o deja la empresa?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Cubierto en los tres casos. Si falta, le enviamos la grabación y los temas para que no pierda el ritmo. Si se rezaga, lo detectamos a tiempo y ajustamos. Y si deja la empresa, reasignamos su lugar a otro colaborador del mismo dominio, <strong>sin perder lo invertido</strong>. <em>Lo dejamos definido en la propuesta desde el inicio.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-aleman">
        <summary className="sp-faq-pregunta">
          7. ¿Cómo encaja el programa sin frenar la operación?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Las sesiones se agendan en los horarios que le convengan a su equipo, incluidos los cambios de turno, y en la modalidad que elija: en sus instalaciones, en línea en vivo o híbrida. Y como la operación trae imprevistos, manejamos reposición ágil: si se atraviesa un paro de línea o una urgencia, <strong>la sesión se repone sin trámites</strong>, para que el avance no se detenga. <em>Cuéntenos cómo opera su equipo.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-aleman">
        <summary className="sp-faq-pregunta">
          8. ¿Cuánto cuesta y cómo se cobra?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Se cotiza <strong>por grupo completo, no por persona</strong>, de 1 a 10 colaboradores: a más participantes, menor el costo por colaborador. La frecuencia (sesiones por semana) define el ritmo de avance y la inversión mensual; más sesiones es avanzar más rápido, no pagar más caro por hora. Por eso no manejamos precio de lista: armamos la propuesta según cómo opere su empresa. <em>Solicite su cotización y le damos el número para su caso.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-aleman">
        <summary className="sp-faq-pregunta">
          9. ¿Tiene registro ante la STPS y es deducible de impuestos?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta"><strong>Sí a ambas.</strong> El programa cuenta con registro oficial ante la STPS y emitimos la constancia de capacitación de cada colaborador. Además es deducible, y según el decreto del Plan México (DOF) pueden existir estímulos adicionales para la formación de personal; le entregamos la documentación de soporte y le recomendamos confirmar la aplicación a su caso con su área contable. <em>Solicite la información para su expediente.</em></div>
      </details>
    </div>
  </div>
</section>

{/* FINAL CTA */}
<section className={`sp-seccion ${styles.finalCta}`}>
  <img className={`${styles.deco} ${styles.decoCta}`} src="/images/isotype.svg" alt="" aria-hidden="true" width="1587" height="907" loading="lazy" />
  <h2>Lleve a su equipo al nivel que<br />su operación necesita</h2>
  <p>Permítanos diseñar un programa de alemán que su equipo sí termine, con avance medible y evidencia para Dirección.</p>
  <button className="sp-btn sp-btn--blanco" onClick={abrir}>Solicite una Cotización</button>
</section>
</main>
<FlotanteWhatsApp />

      <Script
        id="lp-aleman-principal"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: SCRIPT_PRINCIPAL }}
      />
    </>
  );
}
