"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Iti } from "intl-tel-input";
import styles from "./CampoTelefono.module.css";

/* El teléfono, con selector de país, en los dos formularios del sitio (el
   modal de contacto y el del flotante de WhatsApp). Viaja como `telefono`.

   Es intl-tel-input sobre un <input type="tel"> normal: el mismo name, el
   mismo autocomplete y el mismo toolparamdescription del WebMCP. La librería
   envuelve el input con la bandera y la lada; el div .campo es solo para que
   ese envoltorio quede dentro de un nodo que React no reordena.

   CARGA. La librería, su hoja y el script de validación pesan más que el
   resto del formulario, así que no van en la carga inicial: se piden la
   primera vez que `activo` llega en true, es decir, al abrir el formulario.
   Mientras no han llegado, el campo es un input de teléfono como el de antes.

   VALOR. Lo que se ve es el número nacional ("55 3229 8615") y la lada va en
   el selector. Lo que se envía lo da telefonoInternacional(): el número con +
   y lada ("+525532298615"). La conversión a +521 de Kommo no es de aquí: la
   hace lib/telefonoKommo.ts en el servidor.

   AVISO. Si al salir del campo lo escrito no es un número válido del país
   elegido, se sugiere elegir otro. Es solo un aviso: no bloquea el envío. */

const AVISO = "¿Es un número de otro país? Elíjalo en el selector.";

// Los textos de la librería, en usted como el resto del sitio.
const TEXTOS = {
  selectedCountryAriaLabel:
    "Cambiar el país del teléfono. Seleccionado: ${countryName} (${dialCode})",
  noCountrySelected: "Seleccione el país del teléfono",
  countryListAriaLabel: "Lista de países",
  searchPlaceholder: "Buscar país",
  clearSearchAriaLabel: "Borrar búsqueda",
  closeCountrySelectorAriaLabel: "Cerrar",
  searchEmptyState: "No encontramos ese país",
  searchSummaryAria: (total: number) =>
    total === 0
      ? "No encontramos ese país"
      : total === 1
        ? "1 país encontrado"
        : `${total} países encontrados`,
};

const PAIS_INICIAL = "mx";

// La instancia de cada input, para que el formulario lea el valor al enviar.
const instancias = new WeakMap<HTMLInputElement, Iti>();

/* El teléfono para el payload: con + y lada, o vacío. Un número que la
   librería no sabe formatear (uno inválido, como "1234", que getNumber()
   devuelve tal cual) va igual con + y la lada del país elegido. Si la librería no llegó a cargar (se envió antes, o
   falló la red), va lo escrito tal cual, que el servidor sabe interpretar. */
export function telefonoInternacional(campo: unknown): string {
  if (!(campo instanceof HTMLInputElement)) return "";
  const escrito = campo.value.trim();
  const iti = instancias.get(campo);
  if (!escrito || !iti) return escrito;
  const numero = iti.getNumber();
  if (numero.startsWith("+")) return numero;
  const digitos = escrito.replace(/\D/g, "");
  const lada = iti.getSelectedCountry()?.dialCode;
  return escrito.startsWith("+") || !lada ? `+${digitos}` : `+${lada}${digitos}`;
}

function esInvalido(input: HTMLInputElement): boolean {
  const iti = instancias.get(input);
  return Boolean(input.value.trim()) && iti?.isValidNumber() === false;
}

export default function CampoTelefono({
  id,
  activo,
  required = false,
  toolparamdescription,
  enterKeyHint,
}: {
  id: string;
  activo: boolean;
  required?: boolean;
  toolparamdescription: string;
  enterKeyHint?: "next" | "send";
}) {
  const campo = useRef<HTMLInputElement>(null);
  const idAviso = `${useId()}-aviso`;
  const [aviso, setAviso] = useState(false);
  // Pasa a true una sola vez, al primer `activo`, y ya no vuelve: cerrar el
  // formulario no desmonta la librería ni pierde el país elegido.
  const [cargar, setCargar] = useState(activo);
  if (activo && !cargar) setCargar(true);

  useEffect(() => {
    const input = campo.current;
    if (!cargar || !input) return;
    let vivo = true;
    let iti: Iti | null = null;
    const form = input.form;

    // Mientras se escribe o se cambia de país, solo se retira un aviso que ya
    // quedó resuelto; aparecer, aparece al salir del campo.
    const retirarSiResuelto = () => setAviso((previo) => previo && esInvalido(input));
    // Un formulario vaciado vuelve a México. El reset del navegador vacía el
    // valor después de este evento, por eso se espera un turno.
    const alVaciar = () => {
      setAviso(false);
      setTimeout(() => iti?.setSelectedCountry(PAIS_INICIAL));
    };

    import("./cargarTelefono")
      .then(({ default: intlTelInput }) => {
        if (!vivo) return;
        iti = intlTelInput(input, {
          initialCountry: PAIS_INICIAL,
          countryNameLocale: "es",
          uiTranslations: TEXTOS,
          containerClass: styles.iti,
          loadUtils: () => import("intl-tel-input/utils"),
          /* La lada no va aparte junto a la bandera: con ella aparte, teclear
             "+" abre el buscador de países en vez de dejar escribir "+49" y
             cambiar de país sobre la marcha. */
          separateDialCode: false,
          // En móvil la lista va a pantalla completa. Dentro de un <dialog>
          // modal tiene que colgar del diálogo: en el body quedaría inerte.
          fullscreenParent: input.closest("dialog"),
        });
        instancias.set(input, iti);
        input.addEventListener("input", retirarSiResuelto);
        input.addEventListener("countrychange", retirarSiResuelto);
        form?.addEventListener("reset", alVaciar);
      })
      .catch((err) => {
        console.error("No se pudo cargar el selector de país del teléfono:", err);
      });

    return () => {
      vivo = false;
      input.removeEventListener("input", retirarSiResuelto);
      input.removeEventListener("countrychange", retirarSiResuelto);
      form?.removeEventListener("reset", alVaciar);
      instancias.delete(input);
      iti?.destroy();
    };
  }, [cargar]);

  return (
    <>
      <div className={styles.campo}>
        <input
          ref={campo}
          type="tel"
          id={id}
          name="telefono"
          toolparamdescription={toolparamdescription}
          autoComplete="tel"
          enterKeyHint={enterKeyHint}
          required={required}
          aria-describedby={aviso ? idAviso : undefined}
          onBlur={(e) => setAviso(esInvalido(e.currentTarget))}
        />
      </div>
      {aviso && (
        <p id={idAviso} className={styles.aviso}>
          {AVISO}
        </p>
      )}
    </>
  );
}
