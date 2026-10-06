"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { FocusEvent, FormEvent, KeyboardEvent, MouseEvent } from "react";
import { usePathname } from "next/navigation";
import Icono from "@/app/components/Icono";
import CampoIdioma from "./CampoIdioma";
import styles from "./ModalContacto.module.css";
import {
  enviarLead,
  idiomaDeRuta,
  NO_ESPECIFICADO,
  recogerAtribucion,
  type PayloadLead,
} from "@/lib/atribucion";

// Evento propio, distinto del conversion_whatsapp del flotante: este clic llega
// después de un lead ya registrado y no debe contarse como otra conversión.
const CONTACTO_WHATSAPP = "https://wa.me/525585265520";
function registrarWhatsappPostLead() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "whatsapp_post_lead" });
}

/* Modal de contacto del sitio. Uno solo, montado por ProveedorContacto.

   Es un <dialog> abierto con showModal(), y esa decisión es la que resuelve la
   accesibilidad: el navegador atrapa el foco dentro, cierra con Escape, deja
   inerte el fondo y devuelve el foco al botón que lo abrió. Lo único que hay
   que escribir a mano es el cierre al hacer clic fuera.

   Todos los caminos de cierre —Escape, clic fuera, la cruz— pasan por close(),
   así que el evento `close` es el único sitio donde se restaura el scroll y se
   avisa al proveedor.

   PASOS. Es un solo <form> con los dos pasos siempre montados: el CSS
   muestra el activo y oculta el resto. Así lo escrito sobrevive al ir y volver
   entre pasos, y al cerrar y reabrir el modal, porque el componente no se
   desmonta. Pasar de paso no envía nada ni dispara eventos: el envío y la
   conversión son los de siempre, al final.

   El payload no cambia. El idioma se elige en el select de CampoIdioma, el de
   siempre, que es también el que declara el parámetro `idioma` del WebMCP. El
   rango de colaboradores se elige con chips que viven en el estado, no en el
   formulario, y se antepone al texto de `mensaje`. */

const ESTADO_INICIAL = { enviando: false, error: false, exito: false };

type Paso = "capacitacion" | "contacto";
const PASOS: Paso[] = ["capacitacion", "contacto"];

const PREGUNTAS: Record<Paso, string> = {
  capacitacion: "Su capacitación",
  contacto: "¿A quién le enviamos la propuesta?",
};

const RANGOS_COLABORADORES = ["1 a 10", "11 a 50", "51 a 200", "Más de 200"];

const CAMPOS_CONTACTO = ["nombre", "empresa", "correo"] as const;
type CampoContacto = (typeof CAMPOS_CONTACTO)[number];

const FORMATO_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Dominios mal escritos que se repiten en los leads. Solo se sugiere la
   corrección: el visitante decide si la toma. */
const DOMINIOS_CORREGIDOS: Record<string, string> = {
  "gmail.con": "gmail.com",
  "gmail.co": "gmail.com",
  "gmial.com": "gmail.com",
  "gmal.com": "gmail.com",
  "gamil.com": "gmail.com",
  "hotmial.com": "hotmail.com",
  "hotmal.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "hotmail.con": "hotmail.com",
  "outlok.com": "outlook.com",
  "outllok.com": "outlook.com",
  "outlook.con": "outlook.com",
  "yahoo.con": "yahoo.com",
  "yaho.com": "yahoo.com",
};

function sugerirCorreo(valor: string): string {
  const arroba = valor.lastIndexOf("@");
  if (arroba < 1) return "";
  const dominio = valor.slice(arroba + 1).toLowerCase();
  const corregido =
    DOMINIOS_CORREGIDOS[dominio] ??
    (dominio.endsWith(".con") ? dominio.slice(0, -4) + ".com" : "");
  return corregido ? valor.slice(0, arroba + 1) + corregido : "";
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export default function ModalContacto({
  abierto,
  idiomaBoton,
  alCerrar,
}: {
  abierto: boolean;
  idiomaBoton: string | null;
  alCerrar: () => void;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const formulario = useRef<HTMLFormElement>(null);
  const cuerpo = useRef<HTMLDivElement>(null);
  // Último alto pintado del cuerpo, para animar desde ahí al cambiar de paso.
  const altoCuerpo = useRef(0);
  const [estado, setEstado] = useState(ESTADO_INICIAL);
  const ruta = usePathname();

  const [paso, setPaso] = useState<Paso>("capacitacion");
  const [idioma, setIdioma] = useState("");
  /* El idioma vino de la página o del botón: en vez del selector se muestra
     "Idioma: X · cambiar". El select sigue en el DOM, fuera de la vista. */
  const [idiomaOmitido, setIdiomaOmitido] = useState(false);
  const [colaboradores, setColaboradores] = useState("");
  // Errores del paso 1, que se muestran al intentar continuar.
  const [faltaIdioma, setFaltaIdioma] = useState(false);
  const [faltanColaboradores, setFaltanColaboradores] = useState(false);
  const [errores, setErrores] = useState<Partial<Record<CampoContacto, string>>>({});
  const [sugerencia, setSugerencia] = useState("");
  /* El último idioma de página o de botón que se aplicó. Si al reabrir sigue
     siendo el mismo, no se vuelve a imponer: respeta un "cambiar" del
     visitante. `undefined` es que todavía no se ha aplicado ninguno. */
  const [presetAplicado, setPresetAplicado] = useState<string | null | undefined>(
    undefined
  );
  const [abiertoPrevio, setAbiertoPrevio] = useState(abierto);
  // Campos en los que ya se escribió: solo esos se validan al salir.
  const tocados = useRef(new Set<string>());

  /* Al abrir, el idioma de la página o del botón. Se ajusta durante el render
     y no en un efecto, para no pintar un primer cuadro con el selector. En
     home, /idioma/, /equipo/ y el resto no hay idioma que imponer. */
  if (abierto !== abiertoPrevio) {
    setAbiertoPrevio(abierto);
    const deRuta = idiomaDeRuta(ruta);
    const preset = idiomaBoton ?? (deRuta !== NO_ESPECIFICADO ? deRuta : null);
    if (abierto && preset !== presetAplicado) {
      setPresetAplicado(preset);
      if (preset) {
        setIdioma(preset);
        setIdiomaOmitido(true);
      } else {
        setIdiomaOmitido(false);
      }
    }
  }

  const numeroPaso = PASOS.indexOf(paso) + 1;

  // Abrir. Se restablece el estado por si se reabre después de un envío.
  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (abierto && !d.open) {
      setEstado(ESTADO_INICIAL);
      d.showModal();
      document.body.style.overflow = "hidden";
      window.__lenis?.stop();
    } else if (!abierto && d.open) {
      d.close();
    }
  }, [abierto]);

  /* Foco al abrir y en cada cambio de paso: el campo con error si lo hay, si
     no el primer control del paso que se pueda enfocar (el select, cuando está
     plegado, va dentro de un contenedor inerte). El foco natural sería la cruz
     de cerrar. */
  useEffect(() => {
    const form = formulario.current;
    if (!abierto || !dialogo.current?.open || !form) return;
    const contenedor = form.querySelector(`[data-paso="${paso}"]`);
    const destino =
      contenedor?.querySelector<HTMLElement>('[aria-invalid="true"]') ??
      [...(contenedor?.querySelectorAll<HTMLElement>("input, select, textarea, button") ?? [])].find(
        (el) => !el.closest("[inert]")
      );
    destino?.focus();
  }, [abierto, paso]);

  /* El select refleja siempre el idioma del estado. Hace falta por dos casos:
     CampoIdioma remonta el select al navegar (llega vacío o con el idioma de
     la nueva página) y un botón con idioma asignado lo impone sin que la
     página lo traiga. El otro sentido lo cubre alEscribir: el cambio del
     select, sea de una persona o de un agente por el WebMCP, entra al estado. */
  useLayoutEffect(() => {
    const campo = formulario.current?.elements.namedItem("idioma");
    if (campo instanceof HTMLSelectElement && campo.value !== idioma) {
      campo.value = idioma;
    }
  }, [idioma, ruta, estado.exito]);

  /* El alto del cuerpo, al día: lo anota un ResizeObserver, que avisa después
     de cada maquetado. Al cambiar de paso el efecto de abajo corre antes de que
     llegue el aviso del paso nuevo, así que aquí queda el alto del anterior (o
     el de un punto intermedio, si una animación seguía en curso). */
  useEffect(() => {
    const el = cuerpo.current;
    if (!el) return;
    const observador = new ResizeObserver(() => {
      altoCuerpo.current = el.offsetHeight;
    });
    observador.observe(el);
    return () => observador.disconnect();
  }, [estado.exito]);

  /* Al cambiar de paso, el cuerpo va de su alto anterior al nuevo. Se fija el
     alto de partida, se fuerza el maquetado y se pasa al de llegada; la
     transición la pone el CSS con [data-animando]. Al terminar se suelta el
     alto para que el cuerpo vuelva a medir lo que su contenido. Sin animación
     con movimiento reducido o si el modal está cerrado. */
  useLayoutEffect(() => {
    const el = cuerpo.current;
    const desde = altoCuerpo.current;
    if (!el || !dialogo.current?.open || !desde) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.style.height = "";
    const hasta = el.offsetHeight;
    if (hasta === desde) return;

    el.removeAttribute("data-animando");
    el.style.height = `${desde}px`;
    void el.offsetHeight;
    el.setAttribute("data-animando", "");
    el.style.height = `${hasta}px`;

    const soltar = (e?: TransitionEvent) => {
      if (e && (e.target !== el || e.propertyName !== "height")) return;
      el.removeAttribute("data-animando");
      el.style.height = "";
    };
    el.addEventListener("transitionend", soltar);
    return () => {
      el.removeEventListener("transitionend", soltar);
      soltar();
    };
  }, [paso, idiomaOmitido]);

  // Cerrar: un solo sitio, sea quien sea quien lo haya provocado.
  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    const alCerrarNativo = () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
      alCerrar();
    };
    d.addEventListener("close", alCerrarNativo);
    return () => d.removeEventListener("close", alCerrarNativo);
  }, [alCerrar]);

  const valorDe = (nombre: string): string => {
    const campo = formulario.current?.elements.namedItem(nombre);
    return campo && "value" in campo ? String(campo.value).trim() : "";
  };

  /* Si ya hay algo capturado, el clic fuera no cierra: un clic de más no debe
     tirar lo escrito. Quedan la cruz y Escape. Un idioma impuesto por la
     página no cuenta como capturado. */
  const hayAlgoCapturado = () =>
    Boolean(colaboradores) ||
    (Boolean(idioma) && !idiomaOmitido) ||
    ["nombre", "empresa", "correo", "telefono", "puesto", "mensaje"].some(
      (nombre) => valorDe(nombre) !== ""
    );

  // Clic fuera: el destino es el propio <dialog> cuando se pincha su relleno.
  const alHacerClic = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogo.current && (estado.exito || !hayAlgoCapturado())) {
      dialogo.current?.close();
    }
  };

  const validarCampo = (nombre: CampoContacto): string => {
    const valor = valorDe(nombre);
    if (nombre === "nombre") return valor ? "" : "Escriba su nombre y apellido.";
    if (nombre === "empresa") return valor ? "" : "Escriba el nombre de su empresa.";
    if (!valor) return "Escriba su correo electrónico.";
    return FORMATO_CORREO.test(valor)
      ? ""
      : "Revise el correo: debe tener la forma nombre@empresa.com.";
  };

  // Valida los tres campos de contacto. Devuelve si pasan.
  const validarContacto = (): boolean => {
    const nuevos: Partial<Record<CampoContacto, string>> = {};
    for (const nombre of CAMPOS_CONTACTO) {
      const mensaje = validarCampo(nombre);
      if (mensaje) nuevos[nombre] = mensaje;
    }
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const esCampoContacto = (nombre: string): nombre is CampoContacto =>
    (CAMPOS_CONTACTO as readonly string[]).includes(nombre);

  // Los errores aparecen al salir del campo, nunca mientras se escribe.
  const alSalirDeCampo = (e: FocusEvent<HTMLFormElement>) => {
    const objetivo = e.target;
    if (!(objetivo instanceof HTMLInputElement)) return;
    const nombre = objetivo.name;
    if (!esCampoContacto(nombre) || !tocados.current.has(nombre)) return;
    setErrores((previos) => ({ ...previos, [nombre]: validarCampo(nombre) }));
    if (nombre === "correo") setSugerencia(sugerirCorreo(valorDe("correo")));
  };

  // Mientras se escribe solo se retira un error que ya quedó resuelto.
  const alEscribir = (e: FormEvent<HTMLFormElement>) => {
    const objetivo = e.target;
    if (
      !(
        objetivo instanceof HTMLInputElement ||
        objetivo instanceof HTMLSelectElement ||
        objetivo instanceof HTMLTextAreaElement
      )
    ) {
      return;
    }
    const nombre = objetivo.name;
    if (nombre === "idioma") {
      setIdioma(objetivo.value);
      if (objetivo.value) setFaltaIdioma(false);
      return;
    }
    tocados.current.add(nombre);
    if (nombre === "correo") setSugerencia("");
    if (esCampoContacto(nombre) && errores[nombre] && !validarCampo(nombre)) {
      setErrores((previos) => ({ ...previos, [nombre]: "" }));
    }
  };

  const aplicarSugerencia = () => {
    const campo = formulario.current?.elements.namedItem("correo");
    if (campo instanceof HTMLInputElement) {
      campo.value = sugerencia;
      campo.focus();
    }
    setSugerencia("");
    setErrores((previos) => ({ ...previos, correo: validarCampo("correo") }));
  };

  // Lleva el foco al primer campo de contacto con error.
  const enfocarPrimerError = () => {
    const primero = CAMPOS_CONTACTO.find((n) => validarCampo(n));
    const campo = primero && formulario.current?.elements.namedItem(primero);
    if (campo instanceof HTMLElement) campo.focus();
  };

  const regresar = () => {
    const anterior = PASOS[PASOS.indexOf(paso) - 1];
    if (anterior) setPaso(anterior);
  };

  // Los chips ya no avanzan solos: se elige y se continúa con el botón.
  const elegirColaboradores = (valor: string) => {
    setColaboradores(valor);
    setFaltanColaboradores(false);
  };

  // Despliega el selector, con el idioma de la página ya elegido.
  const cambiarIdioma = () => {
    setIdiomaOmitido(false);
    requestAnimationFrame(() => {
      const campo = formulario.current?.elements.namedItem("idioma");
      if (campo instanceof HTMLSelectElement) campo.focus();
    });
  };

  // Continuar del paso 1: pide idioma y colaboradores.
  const continuar = () => {
    const sinIdioma = !idioma && !valorDe("idioma");
    setFaltaIdioma(sinIdioma);
    setFaltanColaboradores(!colaboradores);
    if (sinIdioma) {
      setIdiomaOmitido(false);
      requestAnimationFrame(() => {
        const campo = formulario.current?.elements.namedItem("idioma");
        if (campo instanceof HTMLSelectElement) campo.focus();
      });
      return;
    }
    if (!colaboradores) {
      formulario.current
        ?.querySelector<HTMLElement>('[data-paso="capacitacion"] button[aria-pressed]')
        ?.focus();
      return;
    }
    setPaso("contacto");
  };

  /* Enter solo envía desde Contacto, que es el último paso. En los pasos de
     chips no hay campos de texto: Enter sobre un chip lo elige y eso avanza. */
  const alPulsarTecla = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing || paso === "contacto") return;
    if (!(e.target instanceof HTMLInputElement)) return;
    e.preventDefault();
  };

  const alEnviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formulario.current;
    if (!form || estado.enviando) return;

    const datos = new FormData(form);
    const texto = (clave: string) => (datos.get(clave)?.toString() ?? "").trim();

    /* Un envío normal llega desde Contacto. Un agente por el WebMCP puede
       enviar desde cualquier paso: se revisa lo obligatorio y, si falta algo,
       se lleva al visitante a ese paso. */
    if (!idioma && !texto("idioma")) {
      setIdiomaOmitido(false);
      setFaltaIdioma(true);
      setPaso("capacitacion");
      return;
    }
    if (!validarContacto()) {
      if (paso === "contacto") enfocarPrimerError();
      else setPaso("contacto");
      return;
    }

    const necesidad = texto("mensaje");
    const mensaje = colaboradores
      ? `Colaboradores: ${colaboradores}.${necesidad ? " " + necesidad : ""}`
      : necesidad;

    const payload: PayloadLead = {
      nombre: texto("nombre"),
      empresa: texto("empresa"),
      correo: texto("correo"),
      telefono: texto("telefono"),
      puesto: texto("puesto"),
      mensaje,
      sitio_web: texto("sitio_web"),
      recibir_novedades: texto("recibir_novedades"),
      origen: "Formulario principal",
      // El elegido; el de la ruta solo por si no llegara ninguno.
      ...recogerAtribucion(idioma || texto("idioma") || idiomaDeRuta(ruta)),
    };

    setEstado({ enviando: true, error: false, exito: false });
    try {
      await enviarLead(payload);
      form.reset();
      // El siguiente formulario empieza de cero, con el idioma de su página.
      setPaso("capacitacion");
      setIdioma("");
      setIdiomaOmitido(false);
      setColaboradores("");
      setFaltaIdioma(false);
      setFaltanColaboradores(false);
      setErrores({});
      setSugerencia("");
      setPresetAplicado(undefined);
      tocados.current.clear();
      setEstado({ enviando: false, error: false, exito: true });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "lead_formulario_principal" });
    } catch {
      setEstado({ enviando: false, error: true, exito: false });
    }
  };

  // Atributos de accesibilidad y mensaje de error de un campo de contacto.
  const conError = (nombre: CampoContacto) => ({
    "aria-invalid": errores[nombre] ? true : undefined,
    "aria-describedby": errores[nombre] ? `contacto-${nombre}-error` : undefined,
  });
  const mensajeError = (nombre: CampoContacto) =>
    errores[nombre] ? (
      <p id={`contacto-${nombre}-error`} className={styles.error}>
        {errores[nombre]}
      </p>
    ) : null;

  return (
    <dialog
      ref={dialogo}
      className={`sp-modal-overlay ${styles.overlay}`}
      aria-labelledby="modal-contacto-titulo"
      onClick={alHacerClic}
    >
      <div className={`sp-modal ${styles.modal}`}>
        {estado.exito ? (
          <div className="sp-form-exito" role="status" aria-live="polite">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1b7a3d"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sp-form-exito-check"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="11" />
              <path d="M7 12.5l3.5 3.5L17 9" />
            </svg>
            <h3 id="modal-contacto-titulo">¡Solicitud enviada!</h3>
            <p>
              Nuestro equipo está atendiendo su solicitud. Le contactaremos muy
              pronto.
            </p>
            <p className="sp-form-exito-prisa">
              ¿Tiene prisa? Le atendemos de inmediato.
            </p>
            <a
              className="sp-btn sp-btn--whatsapp"
              href={CONTACTO_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              onClick={registrarWhatsappPostLead}
            >
              <span className="sp-icono sp-icono--sm">
                <Icono nombre="whatsapp" />
              </span>
              Escríbanos por WhatsApp
            </a>
          </div>
        ) : (
          <>
            <div className={styles.cabecera}>
              <div>
                <h2 id="modal-contacto-titulo" className={styles.titulo}>
                  Hable con un Experto
                </h2>
                <p className={styles.subtitulo}>
                  Un asesor se pondrá en contacto en menos de 24 horas hábiles.
                </p>
              </div>
              <button
                className={`sp-modal-cerrar ${styles.cerrar}`}
                type="button"
                onClick={() => dialogo.current?.close()}
                aria-label="Cerrar"
              >
                &times;
              </button>
            </div>

            <form
              ref={formulario}
              className={`sp-form ${styles.form}`}
              onSubmit={alEnviar}
              onKeyDown={alPulsarTecla}
              onBlur={alSalirDeCampo}
              onChange={alEscribir}
              noValidate
              toolname="solicitar_cotizacion"
              tooldescription="Solicite cotización de capacitación en idiomas para su empresa con S-Peak. Un asesor se pondrá en contacto en menos de 24 horas hábiles. Una persona revisa y confirma el envío."
            >
              {/* Cuerpo: lo único que hace scroll. */}
              <div ref={cuerpo} className={styles.cuerpo}>
                <p className={styles.contador} aria-live="polite">
                  Paso {numeroPaso} de {PASOS.length}
                </p>
                <div className={styles.segmentos} aria-hidden="true">
                  {PASOS.map((p, i) => (
                    <span key={p} data-hecho={i < numeroPaso || undefined} />
                  ))}
                </div>
                <h3 id="contacto-pregunta" className={styles.pregunta}>
                  {PREGUNTAS[paso]}
                </h3>

                {/* Solo el paso activo se muestra: cada uno mide lo suyo. */}
                <div>
                  {/* Paso 1, Su capacitación: idioma y colaboradores. */}
                  <div
                    className={styles.paso}
                    data-paso="capacitacion"
                    data-activo={paso === "capacitacion" || undefined}
                    role="group"
                    aria-labelledby="contacto-pregunta"
                  >
                    {/* Si la página trae el idioma, se muestra y el selector
                        queda plegado: fuera de la vista e inerte, pero en el
                        DOM, porque es el que declara `idioma` al WebMCP. */}
                    {idiomaOmitido && (
                      <p className={styles.idiomaFijo}>
                        Idioma: <strong>{idioma}</strong> ·{" "}
                        <button type="button" className={styles.enlace} onClick={cambiarIdioma}>
                          cambiar
                        </button>
                      </p>
                    )}
                    <div
                      className={idiomaOmitido ? styles.idiomaNativo : styles.idioma}
                      inert={idiomaOmitido}
                    >
                      <CampoIdioma id="contactoIdioma" siempreSelector />
                      {faltaIdioma && (
                        <p className={styles.error}>Elija el idioma que le interesa.</p>
                      )}
                    </div>

                    <p id="contacto-colaboradores" className={styles.subpregunta}>
                      ¿Cuántas personas tomarían la capacitación? *
                    </p>
                    <div
                      className={styles.chips}
                      role="group"
                      aria-labelledby="contacto-colaboradores"
                    >
                      {RANGOS_COLABORADORES.map((rango) => (
                        <button
                          key={rango}
                          type="button"
                          className={styles.chip}
                          aria-pressed={colaboradores === rango}
                          onClick={() => elegirColaboradores(rango)}
                        >
                          {rango}
                        </button>
                      ))}
                    </div>
                    {faltanColaboradores && (
                      <p className={styles.error}>Elija cuántas personas la tomarían.</p>
                    )}
                  </div>

                  {/* Paso Contacto: todos los campos y el envío. */}
                  <div
                    className={styles.paso}
                    data-paso="contacto"
                    data-activo={paso === "contacto" || undefined}
                    role="group"
                    aria-labelledby="contacto-pregunta"
                  >
                    <div className={styles.campos}>
                      <div className="sp-form-group">
                        <label htmlFor="contactoNombre">Nombre y apellido *</label>
                        <input
                          type="text"
                          id="contactoNombre"
                          name="nombre"
                          toolparamdescription="Nombre y apellido de la persona que solicita la cotización."
                          autoComplete="name"
                          enterKeyHint="next"
                          required
                          {...conError("nombre")}
                        />
                        {mensajeError("nombre")}
                      </div>
                      <div className="sp-form-group">
                        <label htmlFor="contactoEmpresa">Empresa *</label>
                        <input
                          type="text"
                          id="contactoEmpresa"
                          name="empresa"
                          toolparamdescription="Nombre de la empresa que solicita la capacitación."
                          autoComplete="organization"
                          enterKeyHint="next"
                          required
                          {...conError("empresa")}
                        />
                        {mensajeError("empresa")}
                      </div>
                      <div className="sp-form-group">
                        <label htmlFor="contactoCorreo">Correo electrónico *</label>
                        <input
                          type="email"
                          id="contactoCorreo"
                          name="correo"
                          toolparamdescription="Correo electrónico de contacto."
                          autoComplete="email"
                          enterKeyHint="next"
                          required
                          {...conError("correo")}
                        />
                        {mensajeError("correo")}
                        {sugerencia && (
                          <p className={styles.sugerencia}>
                            ¿Quiso decir{" "}
                            <button
                              type="button"
                              className={styles.enlace}
                              onClick={aplicarSugerencia}
                            >
                              {sugerencia}
                            </button>
                            ?
                          </p>
                        )}
                      </div>
                      <div className="sp-form-group">
                        <label htmlFor="contactoTelefono">
                          Teléfono <span className={styles.opcional}>(opcional)</span>
                        </label>
                        <input
                          type="tel"
                          id="contactoTelefono"
                          name="telefono"
                          toolparamdescription="Teléfono de contacto. Opcional."
                          autoComplete="tel"
                          enterKeyHint="next"
                          placeholder="+52 55 0000 0000"
                        />
                      </div>
                      <div className={`sp-form-group ${styles.anchoCompleto}`}>
                        <label htmlFor="contactoPuesto">
                          Puesto que desempeña{" "}
                          <span className={styles.opcional}>(opcional)</span>
                        </label>
                        <input
                          type="text"
                          id="contactoPuesto"
                          name="puesto"
                          toolparamdescription="Puesto que desempeña la persona en la empresa. Opcional."
                          autoComplete="organization-title"
                          enterKeyHint="send"
                        />
                      </div>
                      <div className={`sp-form-group ${styles.anchoCompleto}`}>
                        <label htmlFor="contactoMensaje">
                          ¿Algo más que debamos saber?{" "}
                          <span className={styles.opcional}>(opcional)</span>
                        </label>
                        <p id="contacto-mensaje-ayuda" className={styles.ayuda}>
                          Por ejemplo, nivel actual del equipo, horarios o sedes.
                        </p>
                        <textarea
                          id="contactoMensaje"
                          name="mensaje"
                          rows={2}
                          aria-describedby="contacto-mensaje-ayuda"
                          toolparamdescription="Necesidad de capacitación: número de colaboradores, área, nivel actual del idioma. Opcional."
                        />
                      </div>
                    </div>

                    <p
                      className={`sp-form-estado${estado.error ? " is-error" : ""}`}
                      role="status"
                      aria-live="polite"
                      hidden={!estado.enviando && !estado.error}
                    >
                      {estado.enviando
                        ? "Enviando su solicitud…"
                        : estado.error
                          ? "No pudimos enviar su solicitud. Inténtelo de nuevo o escríbanos por WhatsApp."
                          : ""}
                    </p>

                    <p className="sp-form-nota">
                      Al enviar acepto recibir comunicaciones de <strong>S-Peak</strong>.
                      Consulte nuestro{" "}
                      <a
                        href="/aviso-de-privacidad/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--color-muted)", textDecoration: "underline" }}
                      >
                        Aviso de privacidad
                      </a>
                      .
                    </p>
                  </div>
                </div>

                {/* Campo trampa: invisible para una persona, irresistible para un
                    bot que rellena todo lo que encuentra. Si llega con contenido,
                    /api/lead/ descarta el envío. No lleva label ni entra en el
                    tabulador a propósito. */}
                <input
                  type="text"
                  name="sitio_web"
                  className="sp-trampa"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                {/* Casilla trampa: la misma idea en casilla. Una persona no puede
                    marcarla —fuera de pantalla, fuera del tabulador y oculta al
                    lector de pantalla—; un bot que marca todo lo que encuentra,
                    sí. Si llega marcada, /api/lead/ descarta el envío. */}
                <input
                  type="checkbox"
                  name="recibir_novedades"
                  value="si"
                  className="sp-trampa"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
              </div>

              {/* Pie fijo. A la izquierda, Atrás; en el primer paso se oculta
                  sin dejar de ocupar su sitio y en su lugar va una nota. A la
                  derecha, Continuar en el paso 1 y el envío en Contacto. */}
              <div className={styles.pie}>
                <div className={styles.pieInicio}>
                  <button
                    type="button"
                    className={styles.atras}
                    onClick={regresar}
                    data-oculto={numeroPaso === 1 || undefined}
                  >
                    Atrás
                  </button>
                  {numeroPaso === 1 && (
                    <p className={styles.pieNota}>Le toma menos de un minuto.</p>
                  )}
                </div>
                {/* Una `key` distinta en cada botón para que React no reutilice el
                    mismo elemento: si el clic en Continuar cambia el paso y el
                    botón pasa a type="submit" antes de que el navegador termine
                    el clic, el formulario se envía. */}
                {paso === "contacto" ? (
                  <button
                    key="enviar"
                    className={`sp-btn sp-btn--rojo ${styles.enviar}`}
                    type="submit"
                    /* Ignora el segundo clic de un doble clic: Continuar y este
                       botón ocupan el mismo sitio, y un doble clic en Continuar
                       acababa enviando con el segundo clic. Un envío siempre
                       arranca con un clic sencillo. */
                    onClick={(e) => {
                      if (e.detail > 1) e.preventDefault();
                    }}
                    disabled={estado.enviando}
                  >
                    {estado.enviando ? "Enviando…" : "Solicite Cotización"}
                  </button>
                ) : (
                  <button
                    key="continuar"
                    className={`sp-btn sp-btn--rojo ${styles.enviar}`}
                    type="button"
                    onClick={continuar}
                  >
                    Continuar
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
