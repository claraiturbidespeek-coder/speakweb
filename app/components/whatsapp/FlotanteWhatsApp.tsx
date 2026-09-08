"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Icono from "@/app/components/Icono";
import {
  enviarLead,
  idiomaDeRuta,
  NO_ESPECIFICADO,
  recogerAtribucion,
  type PayloadLead,
} from "@/lib/atribucion";
import styles from "./FlotanteWhatsApp.module.css";

/* El botón flotante de WhatsApp y su modal de pre-registro.

   Va montado una sola vez en el layout raíz, junto a ProveedorContacto: el
   flotante es de todo el sitio, no de las seis landings de idioma que lo
   estrenaron. El contexto de cada página lo resuelve al enviar —usePathname
   para el idioma cuando la ruta es una de /idioma/, y la URL de origen desde
   lib/atribucion.ts—, así que no necesita que la página le pase nada.

   Sustituye al guion inline que traían las seis landings de idioma. Aquello
   definía window.collectLeadTags y window.sendLead por su cuenta, apuntando a
   un endpoint de otro proyecto: el lead salía por correo pero no entraba al
   Kommo de este sitio. Ahora usa lib/atribucion.ts, la misma pieza que el
   formulario de contacto, así que los dos llegan a los mismos destinos y se
   distinguen solo por `origen`.

   Con esto desaparece la duplicación que lib/atribucion.ts documentaba: no
   quedan dos copias de la lógica de atribución.

   Es un modal propio y no el de contacto: aquel pide siete campos y este tres.
   Lo que sí comparte es el vocabulario del sistema —.sp-modal, .sp-form,
   .sp-form-exito— para que no se vea como una pieza de otro sitio. */

const TELEFONO = "525585265520";

/* El texto con el que se abre la conversación.

   En las seis rutas de /idioma/ nombra el idioma de la página; en el resto del
   sitio se queda la frase genérica con la que nació el botón. Antes el contexto
   lo daba el lugar —el flotante solo existía en esas seis landings—, y desde
   que es global quien atiende el chat necesita leerlo en el propio mensaje.

   El idioma llega como lo escribe IDIOMA_POR_RUTA, en mayúscula inicial porque
   así viaja al CRM; aquí va en mitad de la frase y baja a minúscula. */
function mensajeWhatsapp(
  nombre: string,
  telefono: string,
  correo: string,
  idioma: string,
) {
  const programas =
    idioma === NO_ESPECIFICADO
      ? "los programas de idiomas para empresas"
      : `los programas de ${idioma.toLocaleLowerCase("es")} para empresas`;

  return (
    `Hola, soy ${nombre} (${telefono}). Me interesa conocer más sobre ` +
    `${programas} de S-Peak. Mi correo es ${correo}.`
  );
}

function enlaceWhatsapp(texto: string) {
  return `https://wa.me/${TELEFONO}?text=${encodeURIComponent(texto)}`;
}

const ESTADO_INICIAL = { enviando: false, error: false };

export default function FlotanteWhatsApp() {
  const dialogo = useRef<HTMLDialogElement>(null);
  const formulario = useRef<HTMLFormElement>(null);
  const primerCampo = useRef<HTMLInputElement>(null);
  const ruta = usePathname();
  const id = useId();

  const [estado, setEstado] = useState(ESTADO_INICIAL);
  // Cuando hay enlace, el modal ya está en su estado de confirmación: es el
  // mismo que abrimos automáticamente y el que ofrece el botón de respaldo.
  const [enlace, setEnlace] = useState<string | null>(null);

  const abrir = () => {
    setEstado(ESTADO_INICIAL);
    setEnlace(null);
    dialogo.current?.showModal();
    // El foco al primer campo espera al frame en que el diálogo ya es visible.
    requestAnimationFrame(() => primerCampo.current?.focus());
  };

  const cerrar = () => dialogo.current?.close();

  // Al cerrar se limpia todo, para que una segunda apertura no muestre la
  // confirmación del envío anterior.
  useEffect(() => {
    const el = dialogo.current;
    if (!el) return;
    const alCerrar = () => {
      formulario.current?.reset();
      setEstado(ESTADO_INICIAL);
      setEnlace(null);
    };
    el.addEventListener("close", alCerrar);
    return () => el.removeEventListener("close", alCerrar);
  }, []);

  // Clic en el fondo: <dialog> no distingue el panel del backdrop, así que se
  // compara el objetivo con el propio diálogo, igual que el modal de contacto.
  const alHacerClic = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogo.current) cerrar();
  };

  const alEnviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formulario.current;
    if (!form || !form.reportValidity()) return;

    const datos = new FormData(form);
    const texto = (clave: string) => (datos.get(clave)?.toString() ?? "").trim();

    const nombre = texto("nombre");
    const telefono = texto("telefono");
    const correo = texto("correo");

    // Una sola lectura de la ruta para los dos usos: el mensaje y el payload.
    const idioma = idiomaDeRuta(ruta);

    const payload: PayloadLead = {
      nombre,
      // El modal corto no los pide; van vacíos, como en el formulario largo
      // cuando el visitante los deja en blanco.
      empresa: "",
      correo,
      telefono,
      puesto: "",
      mensaje: "",
      // La marca que separa este lead del formulario en Resend y en Kommo.
      origen: "WhatsApp",
      ...recogerAtribucion(idioma),
    };

    const url = enlaceWhatsapp(
      mensajeWhatsapp(nombre, telefono, correo, idioma),
    );

    /* ORDEN DELIBERADO. window.open tiene que ejecutarse en el mismo tic
       síncrono que el submit: en cuanto se cede el turno a un await, el
       navegador deja de considerarlo consecuencia del gesto del usuario y el
       bloqueador de ventanas emergentes lo corta. Por eso el envío del lead va
       sin esperar —el registro no debe retrasar la apertura— y la ventana se
       abre a continuación, todavía dentro del gesto.

       Si aun así el navegador la bloquea, no hay forma fiable de detectarlo:
       algunos devuelven null y otros una referencia inservible. Por eso el
       estado de confirmación ofrece siempre el botón manual, se haya abierto
       la ventana o no. */
    setEstado({ enviando: true, error: false });
    enviarLead(payload)
      .then(() => setEstado({ enviando: false, error: false }))
      .catch(() => setEstado({ enviando: false, error: true }));

    window.open(url, "_blank", "noopener,noreferrer");

    // Conversión de WhatsApp → la recoge GTM (Custom Event "conversion_whatsapp").
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "conversion_whatsapp" });

    setEnlace(url);
  };

  return (
    <>
      <button
        type="button"
        className={styles.flotante}
        aria-label="Escríbanos por WhatsApp"
        aria-haspopup="dialog"
        onClick={abrir}
      >
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>

      <dialog
        ref={dialogo}
        className={`sp-modal-overlay ${styles.overlay}`}
        aria-labelledby={`${id}-titulo`}
        onClick={alHacerClic}
      >
        <div className={`sp-modal ${styles.modal}`}>
          {enlace ? (
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
              <h3 id={`${id}-titulo`}>¡Todo listo!</h3>
              <p>
                Le estamos redirigiendo a WhatsApp con su mensaje ya escrito.
              </p>

              {/* El respaldo del bloqueador de ventanas emergentes. Se muestra
                  siempre porque no hay manera fiable de saber si la apertura
                  automática funcionó. */}
              <div className={styles.respaldo}>
                <p className="sp-form-exito-prisa">
                  ¿No se abrió la ventana de WhatsApp?
                </p>
                <a
                  className="sp-btn sp-btn--whatsapp"
                  href={enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sp-icono sp-icono--sm">
                    <Icono nombre="whatsapp" />
                  </span>
                  Abrir WhatsApp
                </a>
              </div>

              {estado.error ? (
                <p className={`sp-form-estado is-error ${styles.avisoEnvio}`}>
                  Su conversación de WhatsApp está lista, pero no pudimos
                  registrar sus datos. Escríbanos y le atendemos igual.
                </p>
              ) : null}
            </div>
          ) : (
            <>
              <div className={styles.cabecera}>
                <button
                  type="button"
                  className={styles.cerrar}
                  aria-label="Cerrar"
                  onClick={cerrar}
                >
                  &times;
                </button>
                <h3 id={`${id}-titulo`}>Un paso antes de conectar</h3>
                <p>Le atenderemos de inmediato</p>
              </div>
              <div className={styles.cuerpo}>
                <form ref={formulario} className="sp-form" onSubmit={alEnviar}>
                  <div className="sp-form-group">
                    <label htmlFor={`${id}-nombre`}>Nombre *</label>
                    <input
                      ref={primerCampo}
                      type="text"
                      id={`${id}-nombre`}
                      name="nombre"
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className="sp-form-group">
                    <label htmlFor={`${id}-telefono`}>Teléfono *</label>
                    <input
                      type="tel"
                      id={`${id}-telefono`}
                      name="telefono"
                      autoComplete="tel"
                      required
                    />
                  </div>
                  <div className="sp-form-group">
                    <label htmlFor={`${id}-correo`}>Correo electrónico *</label>
                    <input
                      type="email"
                      id={`${id}-correo`}
                      name="correo"
                      autoComplete="email"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className={`sp-form-submit ${styles.enviar}`}
                    disabled={estado.enviando}
                  >
                    Continuar a WhatsApp &rarr;
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
