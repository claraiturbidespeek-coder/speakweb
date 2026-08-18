import Link from "next/link";
import Script from "next/script";
import BotonContacto from "@/app/components/contacto/BotonContacto";
import Icono from "./Icono";
import type { DatosEquipo } from "./tipos";
import styles from "./equipo.module.css";

/* Plantilla de las páginas de Soluciones por Equipo.

   La estructura sale de /equipo/ventas-y-marketing/, que es la referencia de
   diseño del proyecto. Lo que cambia entre áreas es el contenido, no el
   marcado: por eso cada página es un archivo de datos y esta plantilla.

   Se renderiza en el servidor. Los únicos trozos de cliente son los botones de
   contacto y el guion de interacción, igual que en la referencia. */

const LOGOS = [
  { archivo: "axa.webp", marca: "AXA" },
  { archivo: "gbm.webp", marca: "GBM" },
  { archivo: "loreal.webp", marca: "L'Oréal" },
  { archivo: "naturgy.webp", marca: "Naturgy" },
  { archivo: "pepsico.webp", marca: "PepsiCo" },
  { archivo: "santander.webp", marca: "Santander" },
  { archivo: "walmart.webp", marca: "Walmart" },
];

// Comunes a las siete áreas: el documento de contenido no los trae y se
// reutilizan de la referencia.
const CIFRAS = [
  { icono: "birrete", num: "+40K", label: "Profesionales formados" },
  { icono: "edificio", num: "+500", label: "Empresas atendidas" },
  { icono: "premio", num: "+20", label: "Años de experiencia" },
];

const AVATARES = ["MG", "FH", "AV", "RC"];

const TESTIMONIOS = [
  {
    iniciales: "BI",
    nombre: "Braskem Idesa",
    rol: "Área de RRHH",
    acento: false,
    cita: "El equipo de S-Peak tiene una gran actitud de servicio, sus cursos de idiomas son excelentes para nuestros equipos, se adaptan a las necesidades de sus perfiles de puesto.",
  },
  {
    iniciales: "FD",
    nombre: "Fernanda D.",
    rol: "Alumna · Chedraui",
    acento: true,
    cita: "S-Peak es una organización sumamente dinámica. Su capacidad para entender nuestras necesidades específicas y adaptar sus mejores recursos a nuestros objetivos de negocio es su gran diferencial.",
  },
  {
    iniciales: "EC",
    nombre: "Erika C.",
    rol: "People Development & D&I Expert",
    acento: false,
    cita: "Valoramos el seguimiento que S-Peak nos brinda, el feedback que piden a través de citas regulares y encuestas, así como su reacción a lo que pedimos como cliente.",
  },
];

// Copiado textualmente de la referencia: aparición al hacer scroll y arrastre
// del carrusel de mercado.
const GUION = `
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  (function () {
    const car = document.getElementById('mercadoCarousel');
    if (!car) return;
    const SPEED = 0.045;
    const originals = Array.from(car.children);
    if (!originals.length) return;

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
      let guard = 0;
      while (period > 0 && car.scrollWidth - car.clientWidth < period && guard++ < 6) appendSet();
    };
    layout();

    let pos = car.scrollLeft;
    let hovering = false, dragging = false, touching = false, touchTimer = null;
    let manual = false, last = null;
    const running = () => !hovering && !dragging && !touching && !manual && period > 0;

    const tick = (ts) => {
      if (last === null) last = ts;
      let dt = ts - last; last = ts;
      if (dt > 100) dt = 100;
      if (running()) { pos += SPEED * dt; while (pos >= period) pos -= period; car.scrollLeft = pos; }
      requestAnimationFrame(tick);
    };

    car.addEventListener('scroll', () => {
      if (Math.abs(car.scrollLeft - pos) > 2) pos = car.scrollLeft;
    }, { passive: true });
    car.addEventListener('mouseenter', () => { hovering = true; });
    car.addEventListener('mouseleave', () => { hovering = false; });
    car.addEventListener('focusin', () => { hovering = true; });
    car.addEventListener('focusout', () => { hovering = false; });
    car.addEventListener('touchstart', () => {
      touching = true; if (touchTimer) clearTimeout(touchTimer);
    }, { passive: true });
    car.addEventListener('touchend', () => {
      if (touchTimer) clearTimeout(touchTimer);
      touchTimer = setTimeout(() => { touching = false; }, 1200);
    }, { passive: true });

    let startX = 0, startLeft = 0;
    car.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return;
      dragging = true; startX = e.clientX; startLeft = car.scrollLeft;
      car.classList.add('dragging');
    });
    car.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4 && !car.hasPointerCapture(e.pointerId)) car.setPointerCapture(e.pointerId);
      car.scrollLeft = startLeft - dx;
    });
    const stopDrag = (e) => {
      if (!dragging) return;
      dragging = false; pos = car.scrollLeft;
      car.classList.remove('dragging');
      if (e && car.hasPointerCapture(e.pointerId)) car.releasePointerCapture(e.pointerId);
    };
    car.addEventListener('pointerup', stopDrag);
    car.addEventListener('pointercancel', stopDrag);
    car.addEventListener('pointerleave', stopDrag);

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
    const pasarAManual = () => {
      if (manual) return;
      manual = true;
      while (car.children.length > originals.length) car.removeChild(car.lastElementChild);
      const max = car.scrollWidth - car.clientWidth;
      if (car.scrollLeft > max) car.scrollLeft = max;
      pos = car.scrollLeft;
    };
    const mover = (dir) => { pasarAManual(); car.scrollBy({ left: dir * paso(), behavior: suave }); };
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
        if (!manual) { layout(); pos = car.scrollLeft; }
        actualizarFlechas();
      }, 150);
    });

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(tick);
  })();
`;

function datosEstructurados(datos: DatosEquipo) {
  const url = `https://s-peak.com/equipo/${datos.slug}/`;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://s-peak.com/" },
          { "@type": "ListItem", position: 2, name: "Soluciones por Equipo", item: "https://s-peak.com/equipo/" },
          { "@type": "ListItem", position: 3, name: datos.nombre, item: url },
        ],
      },
      {
        "@type": "Service",
        name: datos.servicio.nombre,
        serviceType: datos.servicio.tipo,
        provider: { "@type": "Organization", name: "S-Peak", url: "https://s-peak.com" },
        areaServed: { "@type": "Country", name: "México" },
        description: datos.servicio.descripcion,
      },
      {
        "@type": "FAQPage",
        mainEntity: datos.faq.preguntas.map((f) => ({
          "@type": "Question",
          name: f.pregunta,
          acceptedAnswer: { "@type": "Answer", text: f.respuestaPlana },
        })),
      },
    ],
  });
}

export default function PaginaEquipo({ datos }: { datos: DatosEquipo }) {
  return (
    <>
      <main>
        {/* BREADCRUMB */}
        <div className={styles.breadcrumb}>
          <div className={styles.breadcrumbInner}>
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">›</span>
            <span>Soluciones por Equipo</span>
            <span aria-hidden="true">›</span>
            <span>{datos.nombre}</span>
          </div>
        </div>

        {/* HERO */}
        <section className={styles.hero}>
          <img
            className={styles.decoHero}
            src="/images/isotype.svg"
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
          <div className={styles.heroInner}>
            <div className="reveal">
              <div className="sp-etiqueta">{datos.hero.etiqueta}</div>
              <h1>{datos.hero.titulo}</h1>
              <p className="sp-hero-sub">{datos.hero.sub}</p>
              <BotonContacto className="sp-btn sp-btn--rojo">
                {datos.hero.cta}
              </BotonContacto>
              <div className="sp-hero-social">
                <div className="sp-avatares">
                  {AVATARES.map((a) => (
                    <span key={a} className="sp-avatar-apilado">
                      {a}
                    </span>
                  ))}
                </div>
                <div>
                  <div className="sp-estrellas">★★★★★</div>
                  <p>{datos.hero.prueba}</p>
                </div>
              </div>
            </div>

            <div className={`${styles.heroVisual} reveal`}>
              <div className={styles.heroImgWrap}>
                <img
                  src={datos.hero.imagen.src}
                  alt={datos.hero.imagen.alt}
                  width="600"
                  height="420"
                  loading="eager"
                />
              </div>
              <div className="sp-stats-row">
                {CIFRAS.map((c) => (
                  <div key={c.num} className="sp-stat">
                    <span className="sp-icono sp-icono--sm sp-icono--rojo">
                      <Icono nombre={c.icono} />
                    </span>
                    <span className="sp-stat-num">{c.num}</span>
                    <span className="sp-stat-label">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NOTA DE ENCUADRE — solo las áreas cuyo contenido la trae */}
        {datos.encuadre ? (
          <div className={styles.encuadre}>
            <p className={`sp-inner ${styles.encuadreTexto}`}>{datos.encuadre}</p>
          </div>
        ) : null}

        {/* LOGOS */}
        <div className="sp-logos">
          <div className="sp-logos-card">
            <p className="sp-logos-label">
              Más de 500 empresas confían en <strong>S-Peak</strong>
            </p>
            <div className="sp-marquesina">
              <div className="sp-marquesina-track">
                {[...LOGOS, ...LOGOS].map((l, i) => (
                  <img
                    key={`${l.archivo}-${i}`}
                    src={`/images/logos/${l.archivo}`}
                    alt={i < LOGOS.length ? l.marca : ""}
                    aria-hidden={i >= LOGOS.length}
                    height="44"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* COMPETENCIAS */}
        <section className={`sp-seccion ${styles.competencias}`} id="competencias">
          <div className="sp-inner">
            <div className="sp-seccion-top reveal">
              <div className="sp-eyebrow" style={{ justifyContent: "center" }}>
                {datos.competencias.eyebrow}
              </div>
              <h2>{datos.competencias.titulo}</h2>
              <p>{datos.competencias.sub}</p>
            </div>
            <div className={`${styles.compGrid} reveal stagger`}>
              {datos.competencias.tarjetas.map((t) => (
                <div key={t.titulo} className={`sp-tarjeta sp-barra ${styles.compCard}`}>
                  <div className="sp-icono sp-icono--xl sp-icono--rojo">
                    <Icono nombre={t.icono} />
                  </div>
                  <h3>{t.titulo}</h3>
                  <p>{t.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FRANJA DE IDIOMAS — solo las áreas que traen su texto */}
        {datos.franja ? (
        <section className="sp-franja">
          <div className="sp-franja-inner">
            <div className="sp-franja-texto reveal">
              <h2>{datos.franja.titulo}</h2>
              <p>{datos.franja.texto}</p>
            </div>
            <div className="sp-franja-idiomas reveal">
              {datos.franja.idiomas.map((i) => (
                <a key={i.ruta} className="sp-pill" href={i.ruta}>
                  {i.nombre}
                </a>
              ))}
            </div>
          </div>
        </section>
        ) : null}

        {/* DOLOR */}
        <section className={`sp-seccion ${styles.dolor}`} id="dolor">
          <div className="sp-inner">
            <div className="sp-seccion-top reveal">
              <div className="sp-eyebrow" style={{ justifyContent: "center" }}>
                {datos.dolor.eyebrow}
              </div>
              <h2>{datos.dolor.titulo}</h2>
              <p>{datos.dolor.sub}</p>
            </div>
            <div className={`${styles.dolorGrid} reveal stagger`}>
              {datos.dolor.tarjetas.map((t) => (
                <div key={t.titulo} className={`sp-tarjeta sp-barra ${styles.dolorCard}`}>
                  <div className="sp-icono sp-icono--lg sp-icono--claro">
                    <Icono nombre={t.icono} />
                  </div>
                  <h3>{t.titulo}</h3>
                  <p>{t.texto}</p>
                </div>
              ))}
            </div>
            <div className={`${styles.dolorCta} reveal`}>
              <BotonContacto className="sp-btn sp-btn--rojo">
                {datos.dolor.cta}
              </BotonContacto>
            </div>
          </div>
        </section>

        {/* MERCADO */}
        <section className="sp-seccion" id="mercado">
          <div className={`sp-inner ${styles.mercadoInner}`}>
            <div className={`${styles.mercadoLeft} reveal`}>
              <div className="sp-eyebrow">{datos.mercado.eyebrow}</div>
              <h2>{datos.mercado.titulo}</h2>
              <p>{datos.mercado.texto}</p>
            </div>
            <div className={`${styles.mercadoRight} reveal`}>
              <div className={styles.mercadoNav}>
                <button
                  type="button"
                  className={styles.mercadoArrow}
                  id="mercadoPrev"
                  aria-controls="mercadoCarousel"
                  aria-label="Ver tarjetas anteriores"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={styles.mercadoArrow}
                  id="mercadoNext"
                  aria-controls="mercadoCarousel"
                  aria-label="Ver tarjetas siguientes"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
              <div
                className={`${styles.mercadoCarousel} stagger`}
                id="mercadoCarousel"
                tabIndex={0}
                role="region"
                aria-label={datos.mercado.etiquetaCarrusel}
              >
                {datos.mercado.tarjetas.map((t) => (
                  <article key={t.titulo} className={`sp-tarjeta sp-barra ${styles.mercadoCard}`}>
                    <div className="sp-icono sp-icono--md sp-icono--rojo">
                      <Icono nombre={t.icono} />
                    </div>
                    <h3>{t.titulo}</h3>
                    <p>{t.texto}</p>
                    <span className={styles.mercadoCardSource}>{t.fuente}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DIFERENCIADORES */}
        <section className={`sp-seccion ${styles.diferenciadores}`}>
          <div className="sp-inner">
            <div className="sp-seccion-top reveal">
              <div className="sp-eyebrow" style={{ justifyContent: "center" }}>
                {datos.diferenciadores.eyebrow}
              </div>
              <h2>{datos.diferenciadores.titulo}</h2>
            </div>
            <div className={`${styles.difGrid} reveal stagger`}>
              {datos.diferenciadores.tarjetas.map((t) => (
                <div
                  key={t.titulo}
                  className={`sp-tarjeta sp-barra-lateral ${styles.difCard}`}
                >
                  <div className="sp-icono sp-icono--lg sp-icono--navy">
                    <Icono nombre={t.icono} />
                  </div>
                  <div>
                    <h3>{t.titulo}</h3>
                    <p>{t.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BANDA DE CTA */}
        <section className={`sp-banda ${styles.ctaBanda}`}>
          <img
            className={styles.decoCta}
            src="/images/isotype.svg"
            alt=""
            aria-hidden="true"
          />
          <h2>{datos.banda.titulo}</h2>
          <p>{datos.banda.texto}</p>
          <BotonContacto className="sp-btn sp-btn--blanco">
            {datos.banda.cta}
          </BotonContacto>
        </section>

        {/* TESTIMONIOS */}
        <section className={`sp-seccion ${styles.testimonials}`} id="resultados">
          <div className="sp-testi-top reveal">
            <div
              className="sp-eyebrow"
              style={{ color: "rgba(255,255,255,0.4)", justifyContent: "center" }}
            >
              Lo que dicen los equipos
            </div>
            <h2>{datos.testimonios.titulo}</h2>
            <p>En S-Peak, el éxito no se supone: se mide en números.</p>
          </div>
          <div className={`${styles.testiGrid} reveal stagger`}>
            {TESTIMONIOS.map((t) => (
              <div
                key={t.iniciales}
                className={`sp-testi-card sp-barra${t.acento ? " sp-testi-card--acento" : ""}`}
              >
                <div
                  className="sp-estrellas"
                  style={t.acento ? { color: "var(--color-navy)" } : undefined}
                >
                  ★★★★★
                </div>
                <p className="sp-testi-quote">&ldquo;{t.cita}&rdquo;</p>
                <div className="sp-testi-autor">
                  <div className="sp-avatar">{t.iniciales}</div>
                  <div>
                    <div className="sp-autor-nombre">{t.nombre}</div>
                    <div className="sp-autor-rol">{t.rol}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="sp-seccion" id="faq">
          <div className={`sp-inner ${styles.faqInner}`}>
            <div className={`${styles.faqLeft} reveal`}>
              <div className="sp-eyebrow">Preguntas frecuentes</div>
              <h2>{datos.faq.titulo}</h2>
              <p>{datos.faq.texto}</p>
              <div className={`sp-cta-card ${styles.faqCtaCard}`}>
                <p>{datos.faq.ctaTitulo}</p>
                <BotonContacto className="sp-btn sp-btn--rojo">
                  {datos.faq.ctaBoton}
                </BotonContacto>
              </div>
            </div>
            <div className="sp-faq-lista reveal">
              {datos.faq.preguntas.map((f) => (
                <details key={f.pregunta} className="sp-faq-item" name={`faq-${datos.slug}`}>
                  <summary className="sp-faq-pregunta">
                    {f.pregunta}
                    <span className="sp-faq-icono">+</span>
                  </summary>
                  <div className="sp-faq-respuesta">{f.respuesta}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Etiqueta nativa, no next/script: con `afterInteractive` el JSON-LD se
          inyectaría desde el cliente y no estaría en el HTML que lee Google. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: datosEstructurados(datos) }}
      />
      <Script
        id={`equipo-${datos.slug}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: GUION }}
      />
    </>
  );
}
