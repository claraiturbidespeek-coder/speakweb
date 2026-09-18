"use client";

import Script from "next/script";
import AnimacionesEntrada from "@/app/components/AnimacionesEntrada";
import BandaLogos from "@/app/components/BandaLogos";
import CentroDeRecursos from "@/app/components/CentroDeRecursos";
import FranjaIdiomas from "@/app/components/FranjaIdiomas";
import Icono from "@/app/components/Icono";
import SeccionEvidencia from "@/app/components/SeccionEvidencia";
import SelloSTPS from "@/app/components/SelloSTPS";
import { useContacto } from "@/app/components/contacto/useContacto";
// La lista de las seis páginas de idioma vive con la plantilla de equipo.
import { IDIOMAS } from "@/app/equipo/tipos";
import CicloMetodo, { type PasoMetodo } from "../CicloMetodo";
import styles from "../landing.module.css";

// El guion de los dos comportamientos que siguen siendo DOM suelto: el ciclo
// radial del método y el carrusel de testimonios. El envío de leads y el modal
// de WhatsApp salieron de aquí a React —lib/atribucion.ts y
// components/whatsapp/FlotanteWhatsApp.tsx—, así que esto ya no toca window.

/* Los cinco pasos del método, en el orden del recorrido. La posición de cada
   uno en el círculo y el comportamiento del ciclo los pone CicloMetodo.tsx. */
const PASOS: PasoMetodo[] = [
  {
    titulo: "Diagnóstico antes de proponer nada.",
    descripcion:
      "Evaluamos el nivel real de cada colaborador y las situaciones concretas en que usa el italiano en su puesto. No asumimos, medimos.",
    etiqueta: "Diagnóstico antes de proponer nada",
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="20" x2="6" y2="14"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="18" y1="20" x2="18" y2="10"/></svg>
    ),
  },
  {
    titulo: "Programa por rol y por nivel.",
    descripcion:
      "Un jefe de mantenimiento que resuelve una falla con el fabricante no aprende lo mismo que un comprador que negocia refacciones y tiempos de entrega, ni al mismo ritmo. Cada programa se diseña según el puesto, el nivel actual y los retos reales del día a día.",
    etiqueta: "Programa por rol y por nivel",
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="3"/><path d="M3.5 20a6.5 6.5 0 0 1 10-5.4"/><circle cx="17.5" cy="16.5" r="2.5"/><path d="M17.5 12.9v-1.4M17.5 21.5v-1.4M21.3 16.5h-1.4M15.1 16.5h-1.4"/></svg>
    ),
  },
  {
    titulo: "Italiano aplicado, no italiano teórico.",
    descripcion:
      "Cada sesión replica situaciones reales: una llamada al servicio técnico con la línea parada, la puesta en marcha de un equipo junto al técnico del fabricante, una revisión de pedido con la matriz. Sus colaboradores practican lo que van a usar al día siguiente.",
    etiqueta: "Italiano aplicado, no italiano teórico",
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8A8.5 8.5 0 0 1 12.5 20a8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.4 8.4 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8z"/></svg>
    ),
  },
  {
    titulo: "Evidencia para tomar decisiones.",
    descripcion:
      "Entregamos a la Dirección de RH reportes de progreso y nivel, no solo de asistencia. Usted sabe exactamente en qué está invirtiendo y qué resultados está obteniendo.",
    etiqueta: "Evidencia para tomar decisiones",
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
    ),
  },
  {
    titulo: "Flexibilidad que respeta la operación.",
    descripcion:
      "Nos adaptamos a la agenda de su equipo, incluidos los turnos de planta y la diferencia de horario con Italia. Cancelaciones, reposiciones y material compartido después de cada sesión. Sin fricciones, sin excusas.",
    etiqueta: "Flexibilidad que respeta la operación",
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="0"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    ),
  },
];

const SCRIPT_PRINCIPAL = `

  // Carrusel testimonios: avance automático tarjeta por tarjeta.
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
      <div className="sp-etiqueta">Italiano corporativo · México</div>
      <h1><strong>Cursos de italiano para empresas</strong> con matriz o proveedor italiano.</h1>
      <p className="sp-hero-sub">Cuando el manual llega en italiano, el técnico que pone la línea en marcha viene de Bolonia y la refacción se resuelve por teléfono con Milán, el inglés de en medio deja de alcanzar. En <strong>S-Peak</strong> diseñamos programas de italiano para empresas por puesto, para que sus colaboradores <strong>resuelvan, negocien y coordinen</strong> directamente en italiano, con seguimiento continuo y evidencia verificable del avance.</p>
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
        <img src="/images/ejecutiva-hero.webp" alt="Ejecutiva en un curso de italiano para empresas de S-Peak" width="1300" height="1898" loading="eager" fetchPriority="high" />
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
        <img src="/images/imagen-ejecutivo.webp" alt="Ejecutivo en un programa de italiano para empresas de S-Peak" width="1024" height="768" loading="lazy" />
      </div>
    </div>
    <div className={`${styles.areasLeft} reveal`}>
      <div className="sp-eyebrow">Italiano de negocios</div>
      <h2>Prepare a su talento para el italiano que exige su operación</h2>
      <p>Cada área trata con un interlocutor distinto: mantenimiento resuelve una falla con el servicio técnico del fabricante, producción arranca equipo nuevo con personal enviado desde Italia, compras negocia refacciones y tiempos de entrega, y dirección sostiene la relación con la matriz o el socio. Su equipo ya domina la máquina y el proceso: <strong>no enseñamos mantenimiento industrial ni diseño de producto, enseñamos el italiano con el que su equipo los resuelve</strong>. Cada programa se adapta al rol y al contexto real del puesto, con <strong>indicadores verificables</strong> y reportes que le permiten <strong>decidir sobre su inversión</strong>.</p>
      <button className="sp-btn sp-btn--rojo" onClick={abrir}>Solicite una Cotización</button>
    </div>
  </div>
</section>

{/* FRANJA DE IDIOMAS — se esconde en modo landing */}
<FranjaIdiomas
  className="sp-oculto-landing"
  titulo="No solo italiano"
  texto={
    <>
      Si su empresa nos busca por italiano suele ser porque hay una matriz, un
      socio o una línea de producción italiana de por medio. Pero pocas
      operaciones tratan con una sola geografía: cuando el mismo equipo también
      reporta a Estados Unidos, Alemania o Brasil, capacitamos en{" "}
      <strong>la lengua que realmente usa cada relación</strong>. En el
      diagnóstico definimos cuáles.
    </>
  }
  idiomas={IDIOMAS}
/>

{/* EVIDENCIA */}
{/* Tablero ilustrativo: la misma estructura que el resto de las landings
    de idioma, con otras cifras. Ni los números ni los colaboradores son
    datos de un cliente: las etiquetas son genéricas a propósito, para que
    nadie las lea como personas, y los valores no coinciden con los de
    inglés, francés ni alemán, para que las páginas no se vean calcadas
    una al lado de la otra. */}
<SeccionEvidencia
  etiqueta="Panel de progreso del equipo en el programa de italiano para empresas de S-Peak"
  tablero={{
    mejora: 24,
    activos: 11,
    sesiones: 35,
    aprobadas: 94,
    alza: 7,
    curva: [70, 63, 58, 52, 41, 36, 20],
    competencias: [
      { nombre: "Comunicación oral", pct: 84 },
      { nombre: "Comprensión auditiva", pct: 75 },
      { nombre: "Redacción corporativa", pct: 63 },
      { nombre: "Negociación", pct: 80 },
    ],
    colaboradores: [
      { nivel: "B2", pct: 93 },
      { nivel: "B2", pct: 89 },
      { nivel: "B1", pct: 65 },
      { nivel: "A2", pct: 62 },
    ],
  }}
/>

{/* PROCESO INFOGRAFÍA */}
<section className={`sp-seccion ${styles.proceso}`} id="metodo">
  <img className={`${styles.deco} ${styles.decoProceso}`} src="/images/isotype.svg" alt="" aria-hidden="true" width="1587" height="907" loading="lazy" />
  <div className={styles.procesoInner}>
    <div className={`${styles.procesoLeft} reveal`}>
      <div className="sp-eyebrow">El método S‑Peak</div>
      <h2>5 razones por las que las empresas líderes en México eligen S‑Peak</h2>
      {/* TODO (datos): la landing de inglés abre este bloque con el lugar de
          México en el índice de dominio del inglés. No hay una cifra
          equivalente verificada para el italiano —ni de dominio del idioma ni
          de peso de la maquinaria italiana instalada en el país—, así que esta
          bajada va sin número. Si el equipo aporta una fuente, se cita aquí. */}
      <p className={styles.procesoIntro}>Cuando la línea está detenida, quien no domina el italiano resuelve a través de un intermediario. Así es como <strong>S-Peak</strong> cierra esa brecha.</p>
    </div>
    <div className="reveal">
      <CicloMetodo pasos={PASOS} />
    </div>
  </div>
  <div className={`${styles.procesoQuote} reveal`}>
    <span className={styles.pqMark} aria-hidden="true">&ldquo;</span>
    <p>La asistencia se cuida sola cuando el colaborador entiende que lo que aprende hoy lo ocupa mañana.</p>
  </div>
</section>

{/* TESTIMONIOS — son los de la landing de inglés, a propósito.
    Los cuatro testimonios (y su copia para el bucle del carrusel) son de
    clientes de los programas de inglés, copiados tal cual de
    app/idioma/ingles-para-empresas/page.tsx. No es un error: es decisión del
    cliente, que sabe que no son de su programa de italiano y los quiere aquí
    mientras consigue testimonios propios de este programa. No los borre.
    Cuando lleguen los de italiano, se sustituyen en este bloque. */}
<section className={`sp-seccion ${styles.testimonials}`} id="resultados">
  <div className="sp-testi-top reveal">
    <div className="sp-eyebrow" style={{ color: "rgba(255,255,255,0.4)", justifyContent: "center" }}>Lo que dicen nuestros clientes</div>
    <h2>Resultados reales en equipos nacionales e internacionales</h2>
    <p>En <strong>S-Peak</strong>, el éxito no se supone: se mide en números.</p>
  </div>
  <div className={`${styles.testiCarousel} reveal`}>
    <div className={`${styles.testiTrack} testi-track`}>
      {/* Set 1 */}
      <div className={`sp-testi-card ${styles.testiCard}`}>
        <div className="sp-estrellas">★★★★★</div>
        <p className="sp-testi-quote">"El equipo de <strong>S-Peak</strong> tiene una gran actitud de servicio, sus cursos de idiomas son excelentes para nuestros equipos, se adaptan a las necesidades de sus perfiles de puesto."</p>
        <div className="sp-testi-autor">
          <div className="sp-avatar">BI</div>
          <div>
            <div className="sp-autor-nombre">Braskem Idesa</div>
            <div className="sp-autor-rol">Área de RRHH</div>
          </div>
        </div>
      </div>
      <div className={`sp-testi-card sp-testi-card--acento ${styles.testiCard}`}>
        <div className="sp-estrellas" style={{ color: "var(--color-navy)" }}>★★★★★</div>
        <p className="sp-testi-quote">"<strong>S-Peak</strong> es una organización sumamente dinámica. Su capacidad para entender nuestras necesidades específicas y adaptar sus mejores recursos a nuestros objetivos de negocio es su gran diferencial."</p>
        <div className="sp-testi-autor">
          <div className="sp-avatar">FD</div>
          <div>
            <div className="sp-autor-nombre">Fernanda D.</div>
            <div className="sp-autor-rol">Alumna · Chedraui</div>
          </div>
        </div>
      </div>
      <div className={`sp-testi-card ${styles.testiCard}`}>
        <div className="sp-estrellas">★★★★★</div>
        <p className="sp-testi-quote">"<strong>S-Peak</strong> ha sido un gran aliado para nosotros, ya que se adapta a nuestras necesidades y cuenta con un sistema robusto de seguimiento en asistencias. Valoramos también que siempre nos brinda una buena atención tanto a la empresa como a los alumnos."</p>
        <div className="sp-testi-autor">
          <div className="sp-avatar">AP</div>
          <div>
            <div className="sp-autor-nombre">Anabel P.</div>
            <div className="sp-autor-rol">Analista de Planeación y Desarrollo de RH</div>
          </div>
        </div>
      </div>
      <div className={`sp-testi-card ${styles.testiCard}`}>
        <div className="sp-estrellas">★★★★★</div>
        <p className="sp-testi-quote">"Valoramos el seguimiento que <strong>S-Peak</strong> nos brinda, el feedback que piden a través de citas regulares y encuestas, así como reaccionan a lo que pedimos como cliente. Además, los profesores están muy bien preparados para asegurar el aprendizaje, y los precios son justos."</p>
        <div className="sp-testi-autor">
          <div className="sp-avatar">EC</div>
          <div>
            <div className="sp-autor-nombre">Erika C.</div>
            <div className="sp-autor-rol">People Development, Culture &amp; D&amp;I Expert</div>
          </div>
        </div>
      </div>
      {/* Set 2 (duplicado para loop infinito) */}
      <div className={`sp-testi-card ${styles.testiCard}`} aria-hidden="true">
        <div className="sp-estrellas">★★★★★</div>
        <p className="sp-testi-quote">"El equipo de <strong>S-Peak</strong> tiene una gran actitud de servicio, sus cursos de idiomas son excelentes para nuestros equipos, se adaptan a las necesidades de sus perfiles de puesto."</p>
        <div className="sp-testi-autor">
          <div className="sp-avatar">BI</div>
          <div>
            <div className="sp-autor-nombre">Braskem Idesa</div>
            <div className="sp-autor-rol">Área de RRHH</div>
          </div>
        </div>
      </div>
      <div className={`sp-testi-card sp-testi-card--acento ${styles.testiCard}`} aria-hidden="true">
        <div className="sp-estrellas" style={{ color: "var(--color-navy)" }}>★★★★★</div>
        <p className="sp-testi-quote">"<strong>S-Peak</strong> es una organización sumamente dinámica. Su capacidad para entender nuestras necesidades específicas y adaptar sus mejores recursos a nuestros objetivos de negocio es su gran diferencial."</p>
        <div className="sp-testi-autor">
          <div className="sp-avatar">FD</div>
          <div>
            <div className="sp-autor-nombre">Fernanda D.</div>
            <div className="sp-autor-rol">Alumna · Chedraui</div>
          </div>
        </div>
      </div>
      <div className={`sp-testi-card ${styles.testiCard}`} aria-hidden="true">
        <div className="sp-estrellas">★★★★★</div>
        <p className="sp-testi-quote">"<strong>S-Peak</strong> ha sido un gran aliado para nosotros, ya que se adapta a nuestras necesidades y cuenta con un sistema robusto de seguimiento en asistencias. Valoramos también que siempre nos brinda una buena atención tanto a la empresa como a los alumnos."</p>
        <div className="sp-testi-autor">
          <div className="sp-avatar">AP</div>
          <div>
            <div className="sp-autor-nombre">Anabel P.</div>
            <div className="sp-autor-rol">Analista de Planeación y Desarrollo de RH</div>
          </div>
        </div>
      </div>
      <div className={`sp-testi-card ${styles.testiCard}`} aria-hidden="true">
        <div className="sp-estrellas">★★★★★</div>
        <p className="sp-testi-quote">"Valoramos el seguimiento que <strong>S-Peak</strong> nos brinda, el feedback que piden a través de citas regulares y encuestas, así como reaccionan a lo que pedimos como cliente. Además, los profesores están muy bien preparados para asegurar el aprendizaje, y los precios son justos."</p>
        <div className="sp-testi-autor">
          <div className="sp-avatar">EC</div>
          <div>
            <div className="sp-autor-nombre">Erika C.</div>
            <div className="sp-autor-rol">People Development, Culture &amp; D&amp;I Expert</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* FAQ */}
<section className="sp-seccion" id="faq">
  <div className={styles.faqInner}>
    <div className={`${styles.faqLeft} reveal`}>
      <div className="sp-eyebrow">Preguntas frecuentes</div>
      <h2>Preguntas frecuentes sobre cursos de italiano para empresas</h2>
      <p>Hemos recopilado las dudas más comunes de nuestros clientes para brindarle claridad desde el primer momento.</p>
      <div className={`sp-cta-card ${styles.faqCtaCard}`}>
        <p>¿Tiene una pregunta que no está aquí?</p>
        <button className="sp-btn sp-btn--rojo" onClick={abrir}>Solicite una Cotización</button>
      </div>
    </div>
    <div className="sp-faq-lista reveal">
      <details className="sp-faq-item" name="faq-italiano">
        <summary className="sp-faq-pregunta">
          1. ¿Cómo sé que de verdad funciona? ¿Qué recibe Recursos Humanos?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Cada programa avanza por Sprints, 26 horas enfocadas en un dominio del puesto, que cierran con evidencia real (una simulación, un correo, una presentación), evaluada con rúbrica y documentada en una <strong>Tarjeta de Resultados</strong> que usted presenta a Dirección. Su equipo avanza por dominio comprobado, no por horas cursadas. <em>Solicite una propuesta y le mostramos un ejemplo de Tarjeta.</em></div>
      </details>
      {/* TODO (datos): la respuesta 2 de la landing de inglés cita una
          referencia de tiempo para pasar de B1 a B2. Esa cifra es del programa
          de inglés y no se traslada al italiano sin una referencia propia; hasta
          tenerla, la respuesta remite a la proyección del diagnóstico. */}
      <details className="sp-faq-item" name="faq-italiano">
        <summary className="sp-faq-pregunta">
          2. ¿En cuánto tiempo veo un cambio real?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Depende del punto de partida, de la constancia del equipo y de cuánto italiano use ya en su puesto. En el diagnóstico inicial medimos el nivel real de cada colaborador y le damos <strong>una proyección concreta para su caso</strong>. <em>Cotice y le estimamos el plan.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-italiano">
        <summary className="sp-faq-pregunta">
          3. ¿Adaptan el italiano a mi industria y manejan equipos en varias plantas?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Sí. Anclamos cada Sprint al lenguaje de su sector —manufactura, alimentos, moda y diseño— y a la función de cada equipo: mantenimiento, producción, compras, comercial, coordinación con la matriz o el socio, con foco en que comuniquen y resuelvan en italiano en situaciones reales. Si opera varias plantas, capacitamos <strong>todas en simultáneo</strong>, con gestión central y resultados consolidados. <em>Indíquenos su industria y el alcance.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-italiano">
        <summary className="sp-faq-pregunta">
          4. ¿No basta con el inglés? Nuestro proveedor italiano lo habla.
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Con el ejecutivo que lleva su cuenta, casi siempre sí. El inglés se cae en otro lado: en el manual y la interfaz del equipo, que llegan en italiano; en la llamada al servicio técnico con la línea parada, donde del otro lado contesta quien resuelve, no quien fue asignado a la cuenta; y en el trato diario con el técnico que viene a la puesta en marcha. Por eso no proponemos italiano para toda la empresa: <strong>lo enfocamos en los puestos donde el inglés ya le está costando tiempo</strong>, que suelen ser mantenimiento, producción y compras. <em>Díganos dónde se le atora y lo acotamos en el diagnóstico.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-italiano">
        <summary className="sp-faq-pregunta">
          5. ¿Quién imparte y qué respaldo tienen?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Instructores especialistas en idioma de negocios, nativos o bilingües, con experiencia en entornos corporativos, no profesores de escuela. Cada uno se asigna según el dominio y el puesto de su equipo, y si alguno no resulta el adecuado, <strong>lo cambiamos.</strong> La calidad no se deja al azar. <em>Pregúntenos por el perfil de quienes trabajarían con su equipo.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-italiano">
        <summary className="sp-faq-pregunta">
          6. ¿Qué pasa si un colaborador falta, se rezaga o deja la empresa?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Cubierto en los tres casos. Si falta, le enviamos la grabación y los temas para que no pierda el ritmo. Si se rezaga, lo detectamos a tiempo y ajustamos. Y si deja la empresa, reasignamos su lugar a otro colaborador del mismo dominio, <strong>sin perder lo invertido</strong>. <em>Lo dejamos definido en la propuesta desde el inicio.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-italiano">
        <summary className="sp-faq-pregunta">
          7. ¿Cómo encaja el programa sin frenar la operación?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Las sesiones se agendan en los horarios que le convengan a su equipo, incluidos los cambios de turno, y en la modalidad que elija: en sus instalaciones, en línea en vivo o híbrida. Y como la operación trae imprevistos, manejamos reposición ágil: si se atraviesa un paro de línea o una urgencia, <strong>la sesión se repone sin trámites</strong>, para que el avance no se detenga. <em>Cuéntenos cómo opera su equipo.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-italiano">
        <summary className="sp-faq-pregunta">
          8. ¿Cuánto cuesta y cómo se cobra?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Se cotiza <strong>por grupo completo, no por persona</strong>. Cada grupo es de 1 a 10 colaboradores; si son más, armamos varios grupos. A más participantes, menor el costo por colaborador. La frecuencia (sesiones por semana) define el ritmo de avance y la inversión mensual; más sesiones significan avanzar más rápido, no pagar más caro por hora. Por eso no manejamos precio de lista: armamos la propuesta según cómo opere su empresa. <em>Solicite su cotización y le damos el número para su caso.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-italiano">
        <summary className="sp-faq-pregunta">
          9. ¿Tiene registro ante la STPS y es deducible de impuestos?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta"><strong>Sí a ambas.</strong> Contamos con registro oficial ante la STPS y firmamos como agente capacitador externo la constancia de capacitación (DC-3) de cada colaborador. Además es deducible, y según el decreto del Plan México (DOF) pueden existir estímulos adicionales para la formación de personal; le entregamos la documentación de soporte y le recomendamos confirmar la aplicación a su caso con su área contable. <em>Solicite la información para su expediente.</em></div>
      </details>
    </div>
  </div>
</section>

{/* FINAL CTA */}
<section className={`sp-seccion ${styles.finalCta}`}>
  <img className={`${styles.deco} ${styles.decoCta}`} src="/images/isotype.svg" alt="" aria-hidden="true" width="1587" height="907" loading="lazy" />
  <h2>Lleve a su equipo al nivel que<br />su operación necesita</h2>
  <p>Permítanos diseñar un programa de italiano que su equipo sí termine, con avance medible y evidencia para Dirección.</p>
  <button className="sp-btn sp-btn--blanco" onClick={abrir}>Solicite una Cotización</button>
</section>

{/* CENTRO DE RECURSOS — se esconde en modo landing */}
<CentroDeRecursos className="sp-oculto-landing" />
</main>

      <Script
        id="lp-italiano-principal"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: SCRIPT_PRINCIPAL }}
      />
    </>
  );
}
