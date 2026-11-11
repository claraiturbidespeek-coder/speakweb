"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

/* La pista con desplazamiento lateral de la línea de tiempo de Nuestra
   Historia, con sus dos flechas y su deslizamiento automático.

   Las flechas son las del carrusel del Centro de Recursos —el mismo marcado y
   las mismas clases sp-carrusel-nav y sp-carrusel-flecha de patrones.css—,
   pero no CarruselFlechas: esa va atada al contexto del carrusel, que avanza
   por pasos y clona el track para dar la vuelta. Aquí la línea va y vuelve.

   - Flechas: cada clic desliza un hito (el ancho de una tarjeta más el hueco
     de la rejilla), con desplazamiento suave salvo con movimiento reducido.
     Cada flecha se desactiva al llegar a su extremo; si la línea cabe entera,
     las dos.
   - Deslizamiento automático: hacia la derecha, despacio y continuo; al
     llegar al final se detiene un momento y vuelve hacia la izquierda, en
     bucle. Arranca cuando termina la animación de construcción del eje (el
     elemento con data-eje), para no mover la línea mientras se dibuja, y
     solo corre con la pista en pantalla. Se pausa con el cursor encima de la pista o de las flechas (que es también
     usarlas) y con el foco dentro, y se reanuda al salir. Con movimiento
     reducido no arranca. La posición se lleva en una variable aparte porque
     scrollLeft puede redondear a píxeles enteros y a esta velocidad no
     avanzaría; al reanudar se toma la de scrollLeft, por si el usuario la
     movió.

   - Arrastre con el mouse: la línea se toma y se arrastra hacia los lados;
     mientras tanto el deslizamiento automático se pausa.

   La barra de scroll no se ve (la esconde el módulo), pero la pista sigue
   respondiendo al trackpad y al dedo. Por debajo de 960px la línea es
   vertical, no hay nada que desplazar y el módulo esconde las flechas. */

/* Píxeles por segundo del deslizamiento automático. */
const VELOCIDAD = 24;
/* Lo que se queda quieta en cada extremo antes de dar la vuelta, en ms. */
const PAUSA_EXTREMO = 1500;

export default function LineaDesplazable({
  className,
  claseNav,
  etiqueta,
  children,
}: {
  className: string;
  claseNav: string;
  etiqueta: string;
  children: ReactNode;
}) {
  const envolturaRef = useRef<HTMLDivElement>(null);
  const pistaRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    const envoltura = envolturaRef.current;
    const pista = pistaRef.current;
    const prev = prevRef.current;
    const next = nextRef.current;
    if (!envoltura || !pista || !prev || !next) return;

    const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Las flechas y las orillas desvanecidas: en cada extremo se desactiva
    // su flecha y se apaga su orilla (el módulo lee data-al-inicio y
    // data-al-final).
    const actualizar = () => {
      const max = pista.scrollWidth - pista.clientWidth;
      const alInicio = pista.scrollLeft <= 1;
      const alFinal = pista.scrollLeft >= max - 1;
      prev.disabled = alInicio;
      next.disabled = alFinal;
      pista.toggleAttribute("data-al-inicio", alInicio);
      pista.toggleAttribute("data-al-final", alFinal);
    };

    // Al cambiar de tamaño: las flechas y, si hace falta, el deslizamiento.
    const alRedimensionar = () => {
      actualizar();
      reanudar();
    };

    const paso = () => {
      const hito = pista.querySelector("li");
      if (!hito) return pista.clientWidth;
      // El hueco es el de la rejilla, el primer hijo de la pista.
      const rejilla = pista.firstElementChild;
      const hueco = rejilla ? parseFloat(getComputedStyle(rejilla).columnGap) || 0 : 0;
      return hito.getBoundingClientRect().width + hueco;
    };

    const mover = (sentido: 1 | -1) => {
      pista.scrollBy({
        left: sentido * paso(),
        behavior: movimientoReducido.matches ? "auto" : "smooth",
      });
    };

    /* ----- Deslizamiento automático ----- */
    let construida = false;
    let enPantalla = false;
    let encima = false;
    let enfocada = false;
    let arrastrando = false;
    let sentido: 1 | -1 = 1;
    let posicion = 0;
    let quietaHasta = 0;
    let anterior: number | null = null;
    let cuadro = 0;

    const corriendo = () =>
      construida &&
      enPantalla &&
      !encima &&
      !enfocada &&
      !arrastrando &&
      !movimientoReducido.matches;

    const avanzar = (ahora: number) => {
      cuadro = 0;
      if (!corriendo()) return;
      const max = pista.scrollWidth - pista.clientWidth;
      // Nada que desplazar (vertical, o la línea cabe): se detiene, y el
      // ResizeObserver la reanuda si vuelve a haber recorrido.
      if (max <= 1) return;
      // Si algo más movió la línea (la inercia de un deslizamiento con el
      // dedo, el teclado), se sigue desde ahí en vez de devolverla. El margen
      // cubre el redondeo de scrollLeft a píxeles.
      if (Math.abs(pista.scrollLeft - posicion) > 2) posicion = pista.scrollLeft;
      if (ahora >= quietaHasta) {
        const dt = anterior === null ? 0 : Math.min(ahora - anterior, 100);
        posicion = Math.min(max, Math.max(0, posicion + (sentido * VELOCIDAD * dt) / 1000));
        pista.scrollLeft = posicion;
        if ((sentido === 1 && posicion >= max) || (sentido === -1 && posicion <= 0)) {
          sentido = sentido === 1 ? -1 : 1;
          quietaHasta = ahora + PAUSA_EXTREMO;
        }
      }
      anterior = ahora;
      cuadro = requestAnimationFrame(avanzar);
    };

    const reanudar = () => {
      if (!corriendo() || cuadro) return;
      posicion = pista.scrollLeft;
      anterior = null;
      cuadro = requestAnimationFrame(avanzar);
    };

    const pausar = () => {
      if (cuadro) cancelAnimationFrame(cuadro);
      cuadro = 0;
    };

    const alTerminarAnimacion = (e: AnimationEvent) => {
      if (!(e.target instanceof Element) || !e.target.hasAttribute("data-eje")) return;
      construida = true;
      reanudar();
    };

    // Con movimiento reducido no hay animación de construcción que esperar
    // ni deslizamiento que arrancar; si cambia la preferencia, se respeta.
    const alCambiarMovimiento = () => {
      if (movimientoReducido.matches) pausar();
      else {
        construida = true;
        reanudar();
      }
    };

    const alEntrar = () => {
      encima = true;
      pausar();
    };
    const alSalir = () => {
      encima = false;
      reanudar();
    };
    const alEnfocar = () => {
      enfocada = true;
      pausar();
    };
    const alDesenfocar = (e: FocusEvent) => {
      if (e.relatedTarget instanceof Node && envoltura.contains(e.relatedTarget)) return;
      enfocada = false;
      reanudar();
    };

    /* ----- Arrastre con el mouse -----
       Solo mouse y botón principal: en táctil la pista ya se arrastra sola
       con el desplazamiento nativo. Se captura el puntero para seguir el
       arrastre aunque salga de la pista, y el preventDefault del pointerdown
       evita que el gesto seleccione texto. Al soltar, el deslizamiento sigue
       desde donde quedó la línea (reanudar lee scrollLeft); si el cursor sigue
       encima, espera a que salga, como siempre. */
    let origenX = 0;
    let origenScroll = 0;

    const alPresionar = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      if (pista.scrollWidth - pista.clientWidth <= 1) return;
      e.preventDefault();
      arrastrando = true;
      pausar();
      origenX = e.clientX;
      origenScroll = pista.scrollLeft;
      pista.setPointerCapture(e.pointerId);
      pista.setAttribute("data-arrastrando", "");
    };

    const alArrastrar = (e: PointerEvent) => {
      if (!arrastrando) return;
      pista.scrollLeft = origenScroll - (e.clientX - origenX);
    };

    const alSoltar = (e: PointerEvent) => {
      if (!arrastrando) return;
      arrastrando = false;
      if (pista.hasPointerCapture(e.pointerId)) pista.releasePointerCapture(e.pointerId);
      pista.removeAttribute("data-arrastrando");
      reanudar();
    };

    const alAnterior = () => mover(-1);
    const alSiguiente = () => mover(1);

    prev.addEventListener("click", alAnterior);
    next.addEventListener("click", alSiguiente);
    pista.addEventListener("scroll", actualizar, { passive: true });
    pista.addEventListener("animationend", alTerminarAnimacion);
    pista.addEventListener("pointerdown", alPresionar);
    pista.addEventListener("pointermove", alArrastrar);
    pista.addEventListener("pointerup", alSoltar);
    pista.addEventListener("pointercancel", alSoltar);
    envoltura.addEventListener("pointerenter", alEntrar);
    envoltura.addEventListener("pointerleave", alSalir);
    envoltura.addEventListener("focusin", alEnfocar);
    envoltura.addEventListener("focusout", alDesenfocar);
    movimientoReducido.addEventListener("change", alCambiarMovimiento);
    const observador = new ResizeObserver(alRedimensionar);
    observador.observe(pista);
    // Fuera de pantalla no se mueve: no gasta cuadros en algo que no se ve.
    const visibilidad = new IntersectionObserver(([entrada]) => {
      enPantalla = entrada.isIntersecting;
      if (enPantalla) reanudar();
      else pausar();
    });
    visibilidad.observe(pista);
    actualizar();

    return () => {
      pausar();
      prev.removeEventListener("click", alAnterior);
      next.removeEventListener("click", alSiguiente);
      pista.removeEventListener("scroll", actualizar);
      pista.removeEventListener("animationend", alTerminarAnimacion);
      pista.removeEventListener("pointerdown", alPresionar);
      pista.removeEventListener("pointermove", alArrastrar);
      pista.removeEventListener("pointerup", alSoltar);
      pista.removeEventListener("pointercancel", alSoltar);
      envoltura.removeEventListener("pointerenter", alEntrar);
      envoltura.removeEventListener("pointerleave", alSalir);
      envoltura.removeEventListener("focusin", alEnfocar);
      envoltura.removeEventListener("focusout", alDesenfocar);
      movimientoReducido.removeEventListener("change", alCambiarMovimiento);
      observador.disconnect();
      visibilidad.disconnect();
    };
  }, []);

  return (
    <div ref={envolturaRef}>
      <div className={`sp-carrusel-nav ${claseNav}`}>
        <button
          ref={prevRef}
          type="button"
          className="sp-carrusel-flecha"
          aria-controls={id}
          aria-label="Ver hitos anteriores"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          ref={nextRef}
          type="button"
          className="sp-carrusel-flecha"
          aria-controls={id}
          aria-label="Ver hitos siguientes"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      <div ref={pistaRef} id={id} className={className} role="region" aria-label={etiqueta}>
        {children}
      </div>
    </div>
  );
}
