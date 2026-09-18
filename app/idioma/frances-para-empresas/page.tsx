"use client";

import Script from "next/script";
import AnimacionesEntrada from "@/app/components/AnimacionesEntrada";
import BandaLogos from "@/app/components/BandaLogos";
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
      "Evaluamos el nivel real de cada colaborador y las situaciones concretas en que usa el francés en su puesto. No asumimos, medimos.",
    etiqueta: "Diagnóstico antes de proponer nada",
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="20" x2="6" y2="14"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="18" y1="20" x2="18" y2="10"/></svg>
    ),
  },
  {
    titulo: "Programa por rol y por nivel.",
    descripcion:
      "Un director financiero que reporta a la matriz no aprende lo mismo que un comprador que negocia con un proveedor de Quebec, ni al mismo ritmo. Cada programa se diseña según el puesto, el nivel actual y los retos reales del día a día.",
    etiqueta: "Programa por rol y por nivel",
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="3"/><path d="M3.5 20a6.5 6.5 0 0 1 10-5.4"/><circle cx="17.5" cy="16.5" r="2.5"/><path d="M17.5 12.9v-1.4M17.5 21.5v-1.4M21.3 16.5h-1.4M15.1 16.5h-1.4"/></svg>
    ),
  },
  {
    titulo: "Francés aplicado, no francés teórico.",
    descripcion:
      "Cada sesión replica situaciones reales: un comité con la matriz en Francia, un correo de seguimiento a un cliente en Montreal, la defensa de una propuesta en una licitación francófona. Sus colaboradores practican lo que van a usar al día siguiente.",
    etiqueta: "Francés aplicado, no francés teórico",
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
      "Nos adaptamos a la agenda de su equipo, incluida la diferencia de horario con Francia y Canadá. Cancelaciones, reposiciones y material compartido después de cada sesión. Sin fricciones, sin excusas.",
    etiqueta: "Flexibilidad que respeta la operación",
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="0"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    ),
  },
];

const SCRIPT_PRINCIPAL = `

  // Carrusel testimonios: avance automático tarjeta por tarjeta.
  // Mientras la sección de testimonios de francés esté pendiente de casos
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
      <div className="sp-etiqueta">Francés corporativo · México</div>
      <h1><strong>Cursos de francés para empresas</strong> con operación internacional.</h1>
      <p className="sp-hero-sub">Cuando la matriz está en París, el cliente en Montreal o el contrato se firma en Quebec, el inglés de en medio deja de alcanzar. En <strong>S-Peak</strong> diseñamos programas de francés para empresas por puesto, para que sus colaboradores <strong>reporten, negocien y coordinen</strong> directamente en francés, con seguimiento continuo y evidencia verificable del avance.</p>
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
        <img src="/images/ejecutiva-hero.webp" alt="Ejecutiva en un curso de francés para empresas de S-Peak" width="1300" height="1898" loading="eager" fetchPriority="high" />
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
        <img src="/images/imagen-ejecutivo.webp" alt="Ejecutivo en un programa de francés para empresas de S-Peak" width="1024" height="768" loading="lazy" />
      </div>
    </div>
    <div className={`${styles.areasLeft} reveal`}>
      <div className="sp-eyebrow">Francés de negocios</div>
      <h2>Prepare a su talento para el francés que exige su operación</h2>
      <p>Cada departamento trata con una geografía distinta: ventas negocia con distribuidores en Quebec, finanzas reporta el cierre a la matriz en París, operaciones coordina con proveedores franceses y compras responde a una licitación en Montreal. Por eso cada programa <strong>se adapta al rol y al contexto real del puesto</strong>. Medimos el avance con <strong>indicadores verificables</strong> y entregamos reportes que le permiten <strong>decidir sobre su inversión</strong>.</p>
      <button className="sp-btn sp-btn--rojo" onClick={abrir}>Solicite una Cotización</button>
    </div>
  </div>
</section>

{/* FRANJA DE IDIOMAS — se esconde en modo landing */}
<FranjaIdiomas
  className="sp-oculto-landing"
  titulo="No solo francés"
  texto={
    <>
      Si su empresa nos busca por francés suele ser porque hay una matriz, un
      cliente o un contrato francófono de por medio. Pero pocas operaciones
      tratan con una sola geografía: cuando el mismo equipo también responde a
      Estados Unidos, Brasil o Alemania, capacitamos en{" "}
      <strong>la lengua que realmente usa cada relación</strong>. En el
      diagnóstico definimos cuáles.
    </>
  }
  idiomas={IDIOMAS}
/>

{/* EVIDENCIA */}
{/* Tablero ilustrativo: la misma estructura que la landing de inglés, con
    otras cifras. Ni los números ni los colaboradores son datos de un
    cliente: las etiquetas son genéricas a propósito, para que nadie las
    lea como personas, y los valores no coinciden con los de inglés para
    que las dos páginas no se vean calcadas una al lado de la otra. */}
<SeccionEvidencia
  etiqueta="Panel de progreso del equipo en el programa de francés para empresas de S-Peak"
  tablero={{
    mejora: 21,
    activos: 9,
    sesiones: 32,
    aprobadas: 88,
    alza: 6,
    curva: [72, 66, 55, 58, 44, 34, 22],
    competencias: [
      { nombre: "Comunicación oral", pct: 82 },
      { nombre: "Comprensión auditiva", pct: 74 },
      { nombre: "Redacción corporativa", pct: 71 },
      { nombre: "Negociación", pct: 66 },
    ],
    colaboradores: [
      { nivel: "B2", pct: 90 },
      { nivel: "B1", pct: 81 },
      { nivel: "B1", pct: 67 },
      { nivel: "A2", pct: 59 },
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
          equivalente verificada para el francés, así que esta bajada va sin
          número. Si el equipo aporta una fuente, se cita aquí. */}
      <p className={styles.procesoIntro}>El francés no se resuelve con el inglés de por medio. El contrato, la auditoría y la junta con la matriz llegan en francés, y quien no lo domina negocia a través de un intermediario. Así es como <strong>S-Peak</strong> cierra esa brecha.</p>
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

{/* TESTIMONIOS — PENDIENTE DE DATOS REALES
    La landing de inglés lleva aquí un carrusel de cuatro testimonios con
    nombre, empresa y puesto. No se copian a francés: son de clientes de los
    programas de inglés y traerlos tal cual los presentaría como testimonios
    de un programa de francés, que es justo lo que no se debe afirmar.

    Para publicar esta sección hacen falta cuatro testimonios reales de
    clientes del programa de francés (cita, nombre o inicial, empresa y
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
      <details className="sp-faq-item" name="faq-frances">
        <summary className="sp-faq-pregunta">
          1. ¿Cómo sé que de verdad funciona? ¿Qué recibe Recursos Humanos?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Cada programa avanza por Sprints, 26 horas enfocadas en un dominio del puesto, que cierran con evidencia real (una simulación, un correo, una presentación), evaluada con rúbrica y documentada en una <strong>Tarjeta de Resultados</strong> que usted presenta a Dirección. Su equipo avanza por dominio comprobado, no por horas cursadas. <em>Solicite una propuesta y le mostramos un ejemplo de Tarjeta.</em></div>
      </details>
      {/* TODO (datos): la respuesta 2 de la landing de inglés cita una
          referencia de tiempo para pasar de B1 a B2. Esa cifra es del programa
          de inglés y no se traslada al francés sin una referencia propia; hasta
          tenerla, la respuesta remite a la proyección del diagnóstico. */}
      <details className="sp-faq-item" name="faq-frances">
        <summary className="sp-faq-pregunta">
          2. ¿En cuánto tiempo veo un cambio real?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Depende del punto de partida, de la constancia del equipo y de cuánto francés use ya en su puesto. En el diagnóstico inicial medimos el nivel real de cada colaborador y le damos <strong>una proyección concreta para su caso</strong>. <em>Cotice y le estimamos el plan.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-frances">
        <summary className="sp-faq-pregunta">
          3. ¿Adaptan el francés a mi industria y manejan equipos en varios países?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Sí. Anclamos cada Sprint al lenguaje de su sector y a la función de cada equipo: comercial, operaciones, finanzas, atención a clientes, coordinación con casa matriz, con foco en que comuniquen y reporten en francés en situaciones reales. Para multinacionales capacitamos <strong>México y filiales en simultáneo</strong>, con gestión central y resultados consolidados. <em>Indíquenos su industria y el alcance.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-frances">
        <summary className="sp-faq-pregunta">
          4. ¿Enseñan el francés de Francia o el de Quebec?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">La base es la misma; lo que ajustamos es con quién habla su equipo. Si trata a diario con Quebec, el programa trabaja el acento, el registro y el vocabulario administrativo que allá se usa; si la relación es con la matriz o los clientes en Francia, se calibra hacia esa variante. <strong>La variante la define su operación, no el libro de texto.</strong> <em>Díganos con quién hablan y la ajustamos en el diagnóstico.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-frances">
        <summary className="sp-faq-pregunta">
          5. ¿Quién imparte y qué respaldo tienen?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Instructores especialistas en idioma de negocios, nativos o bilingües, con experiencia en entornos corporativos, no profesores de escuela. Cada uno se asigna según el dominio, el puesto de su equipo y la variante de francés que necesita su operación, y si alguno no resulta el adecuado, <strong>lo cambiamos.</strong> La calidad no se deja al azar. <em>Pregúntenos por el perfil de quienes trabajarían con su equipo.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-frances">
        <summary className="sp-faq-pregunta">
          6. ¿Qué pasa si un colaborador falta, se rezaga o deja la empresa?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Cubierto en los tres casos. Si falta, le enviamos la grabación y los temas para que no pierda el ritmo. Si se rezaga, lo detectamos a tiempo y ajustamos. Y si deja la empresa, reasignamos su lugar a otro colaborador del mismo dominio, <strong>sin perder lo invertido</strong>. <em>Lo dejamos definido en la propuesta desde el inicio.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-frances">
        <summary className="sp-faq-pregunta">
          7. ¿Cómo encaja el programa sin frenar la operación?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Las sesiones se agendan en los horarios que le convengan a su equipo, en la modalidad que elija: en sus instalaciones, en línea en vivo o híbrida. Y como la operación trae imprevistos, manejamos reposición ágil: si se atraviesa una junta o una urgencia, <strong>la sesión se repone sin trámites</strong>, para que el avance no se detenga. <em>Cuéntenos cómo opera su equipo.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-frances">
        <summary className="sp-faq-pregunta">
          8. ¿Cuánto cuesta y cómo se cobra?
          <span className="sp-faq-icono">+</span>
        </summary>
        <div className="sp-faq-respuesta">Se cotiza <strong>por grupo completo, no por persona</strong>, de 1 a 10 colaboradores: a más participantes, menor el costo por colaborador. La frecuencia (sesiones por semana) define el ritmo de avance y la inversión mensual; más sesiones es avanzar más rápido, no pagar más caro por hora. Por eso no manejamos precio de lista: armamos la propuesta según cómo opere su empresa. <em>Solicite su cotización y le damos el número para su caso.</em></div>
      </details>
      <details className="sp-faq-item" name="faq-frances">
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
  <p>Permítanos diseñar un programa de francés que su equipo sí termine, con avance medible y evidencia para Dirección.</p>
  <button className="sp-btn sp-btn--blanco" onClick={abrir}>Solicite una Cotización</button>
</section>
</main>

      <Script
        id="lp-frances-principal"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: SCRIPT_PRINCIPAL }}
      />
    </>
  );
}
