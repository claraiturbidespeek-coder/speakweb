import type { Metadata } from "next";
import Script from "next/script";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Página no encontrada (404) | S-Peak",
  description:
    "La página que busca no está disponible. Regrese al inicio de S-Peak o solicite información sobre nuestros programas de idiomas para empresas.",
};

// Ciclo narrativo copiado textualmente de 404.html (líneas 696-781).
const GUION_ESCENA = `
  // Ciclo narrativo de la 404: 6 pasos en loop. Cada paso fija el estado de
  // ánimo de ambos personajes y el idioma/texto de cada burbuja.
  (function () {
    var scene = document.getElementById('sp404');
    if (!scene) return;

    // Contenido literal aprobado — no traducir ni reordenar.
    var STEPS = [
      { mood: 'calm',   ll: 'Español',  lt: '¿Dónde está la página?', rl: 'English',   rt: 'Sorry… what page?' },
      { mood: 'calm',   ll: 'Français', lt: 'Je cherche la page…',    rl: 'Deutsch',   rt: 'Wie bitte? Seite?' },
      { mood: 'stress', ll: '日本語',     lt: 'ページが見つからない',       rl: 'Português', rt: 'Não entendi nada…' },
      { mood: 'stress', ll: 'Español',  lt: '…no nos entendemos.',    rl: 'English',   rt: 'I am so lost.' },
      { mood: 'mal',    ll: '???',      lt: '¿?  ◊  ★  ??',           rl: '???',       rt: '??  ◊  ⟩  !?', bad: true },
      { mood: 'mal',    ll: '⚠',        lt: '★  ¿⁇  ◊  !',            rl: '⚠',         rt: '◊  ⟩  ??  ★', bad: true }
    ];

    var STEP_MS = 2900;  // duración de cada paso
    var SWAP_MS = 520;   // hueco entre fade-out y fade-in: nunca se solapan dos poses

    var el = {
      lLang: document.getElementById('sp404-l-lang'),
      lText: document.getElementById('sp404-l-text'),
      lSay:  document.getElementById('sp404-l-say'),
      rLang: document.getElementById('sp404-r-lang'),
      rText: document.getElementById('sp404-r-text'),
      rSay:  document.getElementById('sp404-r-say')
    };
    var chars = scene.querySelectorAll('.sp404-char img');

    function showMood(mood, visible) {
      Array.prototype.forEach.call(chars, function (img) {
        img.classList.toggle('is-on', visible && img.dataset.mood === mood);
      });
    }

    function setText(step) {
      el.lLang.textContent = step.ll;
      el.lText.textContent = step.lt;
      el.rLang.textContent = step.rl;
      el.rText.textContent = step.rt;
    }

    function animateBubbles(step) {
      [el.lSay, el.rSay].forEach(function (say) {
        say.classList.remove('is-pop', 'is-bad');
        void say.offsetWidth;   // fuerza reflow para reiniciar la animación
        say.classList.add(step.bad ? 'is-bad' : 'is-pop');
      });
    }

    var i = 0, tick = null, swap = null;

    function stop() {
      clearInterval(tick); clearTimeout(swap);
      tick = null; swap = null;
    }

    function start() {
      if (tick) return;
      tick = setInterval(function () {
        showMood(STEPS[i].mood, false);        // se desvanece por completo…
        swap = setTimeout(function () {        // …y 520ms después entra el siguiente
          i = (i + 1) % STEPS.length;
          showMood(STEPS[i].mood, true);
          setText(STEPS[i]);
          animateBubbles(STEPS[i]);
        }, SWAP_MS);
      }, STEP_MS);
    }

    function freeze() {   // movimiento reducido: se queda en el paso 1
      stop();
      i = 0;
      showMood(STEPS[0].mood, true);
      setText(STEPS[0]);
      [el.lSay, el.rSay].forEach(function (say) { say.classList.remove('is-pop', 'is-bad'); });
    }

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    function sync() { reduce.matches ? freeze() : start(); }
    sync();
    if (reduce.addEventListener) reduce.addEventListener('change', sync);
    else if (reduce.addListener) reduce.addListener(sync);

    window.addEventListener('pagehide', stop);
  })();
`;

export default function NoEncontrado() {
  return (
    <>
<main className={styles.escena} id="sp404">
  <span className={styles.soloLectores}>Error 404</span>

  {/* Escenario. Decorativo: el mensaje real lo lleva el bloque de copy,
       y las burbujas cambian de texto cada 2.9s (ruido para un lector de pantalla). */}
  <div className={styles.escenario} aria-hidden="true">

    {/* "404" gigante con falla de señal. Vive dentro del escenario para poder
         anclarlo a los personajes en pantallas chicas; en desktop el escenario
         arranca en y=0, así que top:120px equivale a la posición del prototipo. */}
    <div className={styles.fondo}>
      <span className={styles.fondoBase}>404</span>
      <span className={styles.fondoRojo}>404</span>
      <span className={styles.fondoCian}>404</span>
    </div>

    <div className={`${styles.lado} ${styles.ladoIzq}`}>
      <div className={styles.burbuja}>
        <div className={styles.flota}>
          <div className={styles.globo}>
            <div className={styles.idioma} id="sp404-l-lang">Español</div>
            <div className={styles.dice} id="sp404-l-say"><span id="sp404-l-text">¿Dónde está la página?</span></div>
          </div>
        </div>
      </div>
      <div className={`${styles.personaje} sp404-char`}>
        <img src="/images/404/s2-m-calm.webp"   alt="" data-mood="calm" className="is-on" fetchPriority="high" />
        <img src="/images/404/s2-m-stress.webp" alt="" data-mood="stress" />
        <img src="/images/404/s2-m-mal.webp"    alt="" data-mood="mal" />
      </div>
    </div>

    <div className={`${styles.lado} ${styles.ladoDer}`}>
      <div className={styles.burbuja}>
        <div className={styles.flota}>
          <div className={styles.globo}>
            <div className={styles.idioma} id="sp404-r-lang">English</div>
            <div className={styles.dice} id="sp404-r-say"><span id="sp404-r-text">Sorry… what page?</span></div>
          </div>
        </div>
      </div>
      <div className={`${styles.personaje} sp404-char`}>
        <img src="/images/404/s2-w-calm.webp"   alt="" data-mood="calm" className="is-on" fetchPriority="high" />
        <img src="/images/404/s2-w-stress.webp" alt="" data-mood="stress" />
        <img src="/images/404/s2-w-mal.webp"    alt="" data-mood="mal" />
      </div>
    </div>
  </div>

  <div className={styles.copy}>
    <h1>Se perdió en la traducción.</h1>
    <p><span className={styles.entradilla}>Buscabas una página y no la encontramos.</span> Pasa igual que en una conversación: cuando los idiomas no conectan, el mensaje se pierde. <strong>Eso es justo lo que resolvemos</strong> en S-Peak.</p>
    <a className={styles.cta} href="/">Volver a donde sí nos entendemos</a>
  </div>
</main>

      <Script
        id="sp404-escena"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: GUION_ESCENA }}
      />
    </>
  );
}
