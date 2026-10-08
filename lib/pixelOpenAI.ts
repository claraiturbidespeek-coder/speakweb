/* Conversiones del píxel de OpenAI Ads. Ver app/components/PixelOpenAI.tsx.

   DOS EVENTOS. El formulario de contacto mide `lead_created`; el modal de
   WhatsApp, un evento personalizado, `custom` con el nombre de
   EVENTO_WHATSAPP. app/api/lead/route.ts manda el mismo evento desde el
   servidor según el `origen` del lead.

   EVENT_ID. Cada envío lleva un identificador único para que OpenAI deduplique
   el evento del navegador con el que mande el servidor: los dos tienen que
   llegar con el mismo event_id. Se genera en el cliente, una vez por envío,
   antes de armar el payload: viaja en él como `event_id` y
   app/api/lead/route.ts lo reenvía a la Conversions API como `id`. */

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
  }
}

/* UUID v4. crypto.randomUUID solo existe en contextos seguros (HTTPS o
   localhost); fuera de ellos, una vista previa por IP en http, se arma a mano
   con getRandomValues, que sí está siempre. */
export function nuevoIdEvento(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (n) => n.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

/* La referencia de navegador que escribe el píxel en la cookie __obref. Viaja
   en el payload y el endpoint la manda sin tocar en el bloque `user` del evento
   del servidor, para que OpenAI lo empareje con el navegador. Vacía si la
   cookie no existe: sin píxel, antes de que el SDK la escriba o si el
   navegador la bloquea. */
export function leerObref(): string {
  try {
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("__obref="));
    return cookie ? decodeURIComponent(cookie.slice("__obref=".length)).trim() : "";
  } catch {
    return "";
  }
}

/* El identificador de atribución de OpenAI. Llega en el parámetro `oppref` de
   la URL de aterrizaje, y el píxel lo guarda en la cookie __oppref para las
   páginas siguientes. El píxel lo manda solo; la Conversions API no, así que
   viaja en el payload y el endpoint lo pone a nivel de evento. Primero el de
   la URL actual y si no, el de la cookie. Se pasa tal cual, sin recortar: es
   opaco. Vacío si no hay ninguno. */
export function leerOppref(): string {
  try {
    const enUrl = new URLSearchParams(window.location.search).get("oppref");
    if (enUrl) return enUrl;
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("__oppref="));
    return cookie ? decodeURIComponent(cookie.slice("__oppref=".length)) : "";
  } catch {
    return "";
  }
}

/* El nombre del evento personalizado del modal de WhatsApp. Lo usan el píxel y
   el endpoint: tiene que ser idéntico en los dos para que OpenAI deduplique. */
export const EVENTO_WHATSAPP = "whatsapp_contact_form";

// Sin píxel montado (falta NEXT_PUBLIC_OAIQ_PIXEL_ID) no hacen nada.
export function medirWhatsappOpenAI(eventId: string): void {
  window.oaiq?.(
    "measure",
    "custom",
    { type: "custom" },
    { custom_event_name: EVENTO_WHATSAPP, event_id: eventId }
  );
}

export function medirLeadOpenAI(eventId: string): void {
  window.oaiq?.(
    "measure",
    "lead_created",
    { type: "customer_action" },
    { event_id: eventId }
  );
}
