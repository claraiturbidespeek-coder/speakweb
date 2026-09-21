import BotonContacto from "@/app/components/contacto/BotonContacto";
import Logotipo from "@/app/components/nav/Logotipo";
import MenuAnclas from "@/app/components/nav/MenuAnclas";
import MenuCompleto from "@/app/components/nav/MenuCompleto";
import Navegacion from "@/app/components/nav/Navegacion";
import styles from "./Header.module.css";

/* El header sigue siendo componente de servidor. Lo que cruza a cliente son
   cuatro islas, y las cuatro por el modo landing: la navegación, el botón de
   menú con su panel, el logotipo, que ahí deja de ser enlace, y el menú de
   anclas, que solo existe en modo landing por debajo de 960px y va después de
   Cotizar. El botón de contacto no depende de la ruta y se queda fuera. */

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.izquierda}>
          <MenuCompleto />

          <Logotipo />
        </div>

        <Navegacion />

        <BotonContacto
          className={`sp-btn sp-btn--rojo sp-btn--plano ${styles.cta}`}
        >
          <span className={styles.ctaLargo}>Solicite una Cotización</span>
          <span className={styles.ctaCorto}>Cotizar</span>
        </BotonContacto>

        <MenuAnclas />
      </div>
    </header>
  );
}
