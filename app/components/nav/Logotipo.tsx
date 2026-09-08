"use client";

import Image from "next/image";
import Link from "next/link";
import useModoLanding from "./useModoLanding";
import styles from "../Header.module.css";

/* El logotipo del header.

   Es isla de cliente solo por el modo landing: ahí deja de ser enlace y pasa a
   ser un <span>, para no dar una ruta de salida al visitante de campaña. Fuera
   de ese modo es el <Link> de siempre.

   Quitar el href hace falta de verdad, no basta con apagar el clic: un <a> con
   pointer-events: none se sigue enfocando con el teclado y Enter navega. La
   regla de interacciones.css cubre el frame anterior a la hidratación, donde
   el HTML del servidor todavía trae el enlace; este componente cubre el resto. */

export default function Logotipo() {
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

  if (landing) return <span className={styles.logo}>{marca}</span>;

  return (
    <Link href="/" className={`${styles.logo} sp-logo-enlace`}>
      {marca}
    </Link>
  );
}
