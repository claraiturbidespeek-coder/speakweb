"use client";

import Icono from "@/app/components/Icono";

/* El correo del footer: un enlace mailto: que, al hacer clic, deja el evento
   `clic_correo` en el dataLayer, como ModalContacto.tsx deja
   `lead_formulario_principal` y FlotanteWhatsApp.tsx `conversion_whatsapp`.
   Es solo medición: qué hace GTM con él (etiqueta de GA4, sin conversión de
   Google Ads) se decide en el contenedor, no aquí.

   Es isla de cliente solo por el onClick: el footer sigue en el servidor. Las
   clases llegan de fuera para que el enlace tome el estilo del teléfono sin
   que este componente conozca el módulo CSS del footer. */

const CORREO = "hola@s-peak.com";

export default function EnlaceCorreo({
  className,
  claseIcono,
}: {
  className?: string;
  claseIcono?: string;
}) {
  return (
    <a
      className={className}
      href={`mailto:${CORREO}`}
      onClick={() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "clic_correo" });
      }}
    >
      <span className={`sp-icono${claseIcono ? ` ${claseIcono}` : ""}`}>
        <Icono nombre="correo" />
      </span>
      <span>{CORREO}</span>
    </a>
  );
}
