"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

/* Carrusel horizontal compartido. Nace del "Por qué urge ahora" (mercado) de
   las páginas de equipo: avanza solo por pasos (quieto, desliza una tarjeta
   completa, vuelve a quedarse quieto), se detiene al pasar el mouse/tocar/
   arrastrar, y pasa a modo manual temporal en cuanto se usan las flechas o el
   arrastre — si no se vuelve a tocar en `intervalo` ms, retoma el automático
   solo. El track se clona a sí mismo mientras está en automático para poder
   loopear sin salto; los clones se quitan mientras dura el modo manual.

   Antes vivía como texto en un <Script id="..."> por página. Igual que
   AnimacionesEntrada.tsx: next/script solo ejecuta un script con un `id` dado
   una vez por sesión de navegador, así que revisitar la página por
   navegación interna (sin recarga) lo dejaba muerto — el carrusel quedaba
   fijo, sin arrastre ni flechas. Un useEffect normal se reinicia en cada
   montaje, que es lo que pasa en cada navegación de la SPA.

   Se exporta en piezas (Provider/Flechas/Track) para poder poner las flechas
   en un sitio del layout distinto del track —como en Centro de Recursos, en
   la esquina superior de la sección— sin duplicar la mecánica. `Carrusel`,
   la exportación por defecto, es el armado simple (flechas pegadas arriba
   del track) que ya usan las páginas de equipo. */

const DURACION_PASO = 550;

type CarruselCtx = {
  trackRef: RefObject<HTMLDivElement | null>;
  prevRef: RefObject<HTMLButtonElement | null>;
  nextRef: RefObject<HTMLButtonElement | null>;
  id: string;
};

const Contexto = createContext<CarruselCtx | null>(null);

function useCarruselCtx(nombre: string) {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error(`${nombre} debe usarse dentro de <CarruselProvider>`);
  return ctx;
}

export function CarruselProvider({
  intervalo = 3500,
  children,
}: {
  intervalo?: number;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    const car = trackRef.current;
    const prev = prevRef.current;
    const next = nextRef.current;
    if (!car) return;

    const originals = Array.from(car.children);
    if (!originals.length) return;

    const clones: Element[] = [];
    const appendSet = () => {
      originals.forEach((node) => {
        const clone = node.cloneNode(true) as Element;
        clone.setAttribute("aria-hidden", "true");
        clone.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
        car.appendChild(clone);
        clones.push(clone);
      });
    };

    let period = 0;
    const layout = () => {
      if (car.children.length <= originals.length) appendSet();
      period =
        (car.children[originals.length] as HTMLElement).offsetLeft -
        (car.children[0] as HTMLElement).offsetLeft;
      let guard = 0;
      while (period > 0 && car.scrollWidth - car.clientWidth < period && guard++ < 6) {
        appendSet();
      }
    };
    layout();

    let hovering = false;
    let dragging = false;
    let touching = false;
    let manual = false;
    let touchTimer: ReturnType<typeof setTimeout> | null = null;
    const running = () => !hovering && !dragging && !touching && !manual && period > 0;

    const onMouseEnter = () => { hovering = true; };
    const onMouseLeave = () => { hovering = false; };
    const onFocusIn = () => { hovering = true; };
    const onFocusOut = () => { hovering = false; };
    const onTouchStart = () => {
      touching = true;
      if (touchTimer) clearTimeout(touchTimer);
    };
    const onTouchEnd = () => {
      if (touchTimer) clearTimeout(touchTimer);
      touchTimer = setTimeout(() => { touching = false; }, 1200);
    };

    car.addEventListener("mouseenter", onMouseEnter);
    car.addEventListener("mouseleave", onMouseLeave);
    car.addEventListener("focusin", onFocusIn);
    car.addEventListener("focusout", onFocusOut);
    car.addEventListener("touchstart", onTouchStart, { passive: true });
    car.addEventListener("touchend", onTouchEnd, { passive: true });

    let startX = 0;
    let startLeft = 0;
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      dragging = true;
      startX = e.clientX;
      startLeft = car.scrollLeft;
      car.classList.add("dragging");
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4 && !car.hasPointerCapture(e.pointerId)) car.setPointerCapture(e.pointerId);
      car.scrollLeft = startLeft - dx;
    };
    const stopDrag = (e?: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      car.classList.remove("dragging");
      if (e && car.hasPointerCapture(e.pointerId)) car.releasePointerCapture(e.pointerId);
    };
    car.addEventListener("pointerdown", onPointerDown);
    car.addEventListener("pointermove", onPointerMove);
    car.addEventListener("pointerup", stopDrag);
    car.addEventListener("pointercancel", stopDrag);
    car.addEventListener("pointerleave", stopDrag);

    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const suave = reducido ? "auto" : "smooth";
    const paso = () => {
      const a = car.children[0] as HTMLElement;
      const b = car.children[1] as HTMLElement | undefined;
      return b ? b.offsetLeft - a.offsetLeft : a.offsetWidth;
    };
    const actualizarFlechas = () => {
      if (!prev || !next) return;
      const max = car.scrollWidth - car.clientWidth;
      prev.disabled = car.scrollLeft <= 1;
      next.disabled = car.scrollLeft >= max - 1;
    };
    // El modo manual es temporal, no definitivo: usar una flecha pausa el
    // automático (como el hover), pero si no se vuelve a tocar el carrusel en
    // `intervalo` ms, se reconstruye el buffer de clones y el avance
    // automático continúa solo donde se quedó. `programarCiclo` (más abajo)
    // es el único temporizador de todo esto — entrar en manual solo lo
    // reinicia a `intervalo` ms, en vez de llevar una cuenta aparte, para que
    // "cuánto falta para retomar" nunca quede desalineado con el ciclo normal.
    const pasarAManual = () => {
      if (manual) return;
      manual = true;
      while (car.children.length > originals.length) car.removeChild(car.lastElementChild as Element);
      clones.length = 0;
      const max = car.scrollWidth - car.clientWidth;
      if (car.scrollLeft > max) car.scrollLeft = max;
    };
    const mover = (dir: number) => {
      pasarAManual();
      car.scrollBy({ left: dir * paso(), behavior: suave });
      if (!reducido) programarCiclo(intervalo);
    };
    const onPrevClick = () => mover(-1);
    const onNextClick = () => mover(1);
    if (prev && next) {
      prev.addEventListener("click", onPrevClick);
      next.addEventListener("click", onNextClick);
      car.addEventListener("scroll", actualizarFlechas, { passive: true });
      actualizarFlechas();
    }

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!manual) layout();
        actualizarFlechas();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    // ---- Avance automático: quieto, un paso, quieto ----
    // El track se anima "a mano" (rAF) en vez de con `scroll-behavior: smooth`
    // porque necesitamos saber con certeza cuándo termina el paso para poder
    // hacer el ajuste de loop (restar `period`) en el momento exacto en que
    // el track queda quieto, no a mitad del deslizamiento.
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    let stepTimer: ReturnType<typeof setTimeout> | null = null;
    let animId = 0;

    const animarPaso = () => {
      const distancia = paso();
      const inicio = car.scrollLeft;
      const destino = inicio + distancia;
      const t0 = performance.now();
      const frame = (ts: number) => {
        const t = Math.min(1, (ts - t0) / DURACION_PASO);
        car.scrollLeft = inicio + (destino - inicio) * easeOutCubic(t);
        if (t < 1) {
          animId = requestAnimationFrame(frame);
        } else if (car.scrollLeft >= period) {
          car.scrollLeft -= period; // salto invisible: la región clonada es idéntica
        }
      };
      animId = requestAnimationFrame(frame);
    };

    const programarCiclo = (ms: number) => {
      if (stepTimer) clearTimeout(stepTimer);
      stepTimer = setTimeout(() => {
        if (manual) {
          // Nadie tocó el carrusel en todo un `intervalo`: retomar el loop.
          manual = false;
          layout();
        }
        if (running()) animarPaso();
        programarCiclo(intervalo);
      }, ms);
    };
    if (!reducido) programarCiclo(intervalo);

    return () => {
      cancelAnimationFrame(animId);
      if (stepTimer) clearTimeout(stepTimer);
      window.removeEventListener("resize", onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (touchTimer) clearTimeout(touchTimer);
      car.removeEventListener("scroll", actualizarFlechas);
      car.removeEventListener("mouseenter", onMouseEnter);
      car.removeEventListener("mouseleave", onMouseLeave);
      car.removeEventListener("focusin", onFocusIn);
      car.removeEventListener("focusout", onFocusOut);
      car.removeEventListener("touchstart", onTouchStart);
      car.removeEventListener("touchend", onTouchEnd);
      car.removeEventListener("pointerdown", onPointerDown);
      car.removeEventListener("pointermove", onPointerMove);
      car.removeEventListener("pointerup", stopDrag);
      car.removeEventListener("pointercancel", stopDrag);
      car.removeEventListener("pointerleave", stopDrag);
      if (prev) prev.removeEventListener("click", onPrevClick);
      if (next) next.removeEventListener("click", onNextClick);
      clones.forEach((clone) => clone.remove());
    };
  }, [intervalo]);

  return (
    <Contexto.Provider value={{ trackRef, prevRef, nextRef, id }}>
      {children}
    </Contexto.Provider>
  );
}

export function CarruselFlechas() {
  const { prevRef, nextRef, id } = useCarruselCtx("CarruselFlechas");
  return (
    <div className="sp-carrusel-nav">
      <button
        ref={prevRef}
        type="button"
        className="sp-carrusel-flecha"
        aria-controls={id}
        aria-label="Ver tarjetas anteriores"
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
        aria-label="Ver tarjetas siguientes"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

export function CarruselTrack({
  etiqueta,
  className = "",
  children,
}: {
  etiqueta: string;
  className?: string;
  children: ReactNode;
}) {
  const { trackRef, id } = useCarruselCtx("CarruselTrack");
  return (
    <div
      ref={trackRef}
      id={id}
      className={`sp-carrusel-track ${className}`.trim()}
      tabIndex={0}
      role="region"
      aria-label={etiqueta}
    >
      {children}
    </div>
  );
}

export default function Carrusel({
  etiqueta,
  intervalo = 3500,
  className = "",
  children,
}: {
  etiqueta: string;
  intervalo?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <CarruselProvider intervalo={intervalo}>
      <div className="sp-carrusel">
        <CarruselFlechas />
        <CarruselTrack etiqueta={etiqueta} className={className}>
          {children}
        </CarruselTrack>
      </div>
    </CarruselProvider>
  );
}
