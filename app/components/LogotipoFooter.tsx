"use client";

import Image from "next/image";
import Link from "next/link";
import useModoLanding from "@/app/components/nav/useModoLanding";

/* El logotipo del footer. Hace lo mismo que el del header, nav/Logotipo.tsx:
   en modo landing deja de ser enlace y pasa a ser un <span>, para no dar una
   ruta de salida al visitante de campaña. Es la única isla de cliente del
   footer; el resto sigue en el servidor.

   `sp-logo-enlace` le quita el clic en el frame anterior a la hidratación,
   donde el HTML del servidor todavía trae el enlace (interacciones.css). */

export default function LogotipoFooter() {
  const landing = useModoLanding();

  const marca = (
    <Image
      className="site-logo"
      src="/brand/logo_white.svg"
      alt="S-Peak"
      width={1776}
      height={492}
    />
  );

  if (landing) return <span>{marca}</span>;

  return (
    <Link href="/" className="sp-logo-enlace">
      {marca}
    </Link>
  );
}
