import Image from "next/image";
import Link from "next/link";
import BotonContacto from "@/app/components/contacto/BotonContacto";
import MenuCompleto from "@/app/components/nav/MenuCompleto";
import Navegacion from "@/app/components/nav/Navegacion";
import styles from "./Header.module.css";

/* El header sigue siendo componente de servidor. Lo que cruza a cliente son
   dos islas: la navegación, que necesita saber la ruta para elegir entre el
   menú general y el de secciones, y el botón de menú con su panel. El logo y
   el botón de contacto no dependen de la ruta y se quedan fuera. */

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.izquierda}>
          <MenuCompleto />

          <Link href="/" className={styles.logo}>
            <Image
              className="site-logo"
              src="/brand/logo_white.svg"
              alt="S-Peak"
              width={1776}
              height={492}
            />
          </Link>
        </div>

        <Navegacion />

        <BotonContacto
          className={`sp-btn sp-btn--rojo sp-btn--plano ${styles.cta}`}
        >
          <span className={styles.ctaLargo}>Solicite Información</span>
          <span className={styles.ctaCorto}>Cotizar</span>
        </BotonContacto>
      </div>
    </header>
  );
}
