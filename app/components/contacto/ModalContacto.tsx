"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import { usePathname } from "next/navigation";
import {
  enviarLead,
  idiomaDeRuta,
  recogerAtribucion,
  type PayloadLead,
} from "@/lib/atribucion";

/* Modal de contacto del sitio. Uno solo, montado por ProveedorContacto.

   Es un <dialog> abierto con showModal(), y esa decisión es la que resuelve la
   accesibilidad: el navegador atrapa el foco dentro, cierra con Escape, deja
   inerte el fondo y devuelve el foco al botón que lo abrió. Lo único que hay
   que escribir a mano es el cierre al hacer clic fuera.

   Todos los caminos de cierre —Escape, clic fuera, la cruz— pasan por close(),
   así que el evento `close` es el único sitio donde se restaura el scroll y se
   avisa al proveedor. */

const ESTADO_INICIAL = { enviando: false, error: false, exito: false };

declare global {
  interface Window {
    // La landing de inglés monta Lenis para el scroll suave. Solo existe ahí.
    __lenis?: { stop: () => void; start: () => void };
    dataLayer?: Record<string, unknown>[];
  }
}

export default function ModalContacto({
  abierto,
  alCerrar,
}: {
  abierto: boolean;
  alCerrar: () => void;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const formulario = useRef<HTMLFormElement>(null);
  const [estado, setEstado] = useState(ESTADO_INICIAL);
  const ruta = usePathname();

  // Abrir. Se restablece el estado por si se reabre después de un envío.
  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (abierto && !d.open) {
      setEstado(ESTADO_INICIAL);
      d.showModal();
      document.body.style.overflow = "hidden";
      window.__lenis?.stop();
      // El foco natural sería la cruz de cerrar; mejor el primer campo.
      d.querySelector<HTMLInputElement>("input")?.focus();
    } else if (!abierto && d.open) {
      d.close();
    }
  }, [abierto]);

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

  // Clic fuera: el destino es el propio <dialog> cuando se pincha su relleno.
  const alHacerClic = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogo.current) dialogo.current?.close();
  };

  const alEnviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formulario.current;
    if (!form || !form.reportValidity()) return;

    const datos = new FormData(form);
    const texto = (clave: string) => (datos.get(clave)?.toString() ?? "").trim();

    const payload: PayloadLead = {
      nombre: texto("nombre"),
      empresa: texto("empresa"),
      correo: texto("correo"),
      telefono: texto("telefono"),
      puesto: texto("puesto"),
      mensaje: texto("mensaje"),
      origen: "Formulario principal",
      ...recogerAtribucion(idiomaDeRuta(ruta)),
    };

    setEstado({ enviando: true, error: false, exito: false });
    try {
      await enviarLead(payload);
      form.reset();
      setEstado({ enviando: false, error: false, exito: true });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "lead_formulario_principal" });
    } catch {
      setEstado({ enviando: false, error: true, exito: false });
    }
  };

  return (
    <dialog
      ref={dialogo}
      className="sp-modal-overlay"
      aria-labelledby="modal-contacto-titulo"
      onClick={alHacerClic}
    >
      <div className="sp-modal">
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
          </div>
        ) : (
          <>
            <div className="sp-modal-head">
              <div>
                <h2 id="modal-contacto-titulo">Hable con un Experto</h2>
                <p>Un asesor se pondrá en contacto en menos de 24 horas.</p>
              </div>
              <button
                className="sp-modal-cerrar"
                type="button"
                onClick={() => dialogo.current?.close()}
                aria-label="Cerrar"
              >
                &times;
              </button>
            </div>

            <form
              ref={formulario}
              className="sp-form"
              onSubmit={alEnviar}
              noValidate
            >
              <div className="sp-form-row">
                <div className="sp-form-group">
                  <label htmlFor="contactoNombre">Nombre y Apellido *</label>
                  <input
                    type="text"
                    id="contactoNombre"
                    name="nombre"
                    autoComplete="name"
                    placeholder="María González"
                    required
                  />
                </div>
                <div className="sp-form-group">
                  <label htmlFor="contactoEmpresa">Empresa *</label>
                  <input
                    type="text"
                    id="contactoEmpresa"
                    name="empresa"
                    autoComplete="organization"
                    placeholder="Grupo Industrial SA"
                    required
                  />
                </div>
              </div>

              <div className="sp-form-row">
                <div className="sp-form-group">
                  <label htmlFor="contactoCorreo">Correo Electrónico *</label>
                  <input
                    type="email"
                    id="contactoCorreo"
                    name="correo"
                    autoComplete="email"
                    placeholder="maria@empresa.com"
                    required
                  />
                </div>
                <div className="sp-form-group">
                  <label htmlFor="contactoTelefono">Teléfono</label>
                  <input
                    type="tel"
                    id="contactoTelefono"
                    name="telefono"
                    autoComplete="tel"
                    placeholder="+52 55 0000 0000"
                  />
                </div>
              </div>

              <div className="sp-form-group">
                <label htmlFor="contactoPuesto">Puesto que desempeña</label>
                <input
                  type="text"
                  id="contactoPuesto"
                  name="puesto"
                  autoComplete="organization-title"
                  placeholder="Ej. Directora de Recursos Humanos"
                />
              </div>

              <div className="sp-form-group">
                <label htmlFor="contactoMensaje">Cuéntenos su necesidad</label>
                <textarea
                  id="contactoMensaje"
                  name="mensaje"
                  placeholder="Número de colaboradores, área, nivel actual de inglés…"
                />
              </div>

              <button
                className="sp-form-submit"
                type="submit"
                disabled={estado.enviando}
              >
                {estado.enviando ? "Enviando…" : "Solicite Información"}
              </button>

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
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
