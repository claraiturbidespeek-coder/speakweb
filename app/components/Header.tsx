import BotonContacto from "@/app/components/contacto/BotonContacto";
import Logotipo from "@/app/components/nav/Logotipo";
import MenuCompleto from "@/app/components/nav/MenuCompleto";
import Navegacion from "@/app/components/nav/Navegacion";
import styles from "./Header.module.css";

/* El header sigue siendo componente de servidor. Lo que cruza a cliente son
   tres islas, y las tres por el modo landing: la navegación, el botón de menú
   con su panel y el logotipo, que ahí deja de ser enlace. El botón de contacto
   no depende de la ruta y se queda fuera. */

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
      </div>
    </header>
  );
}
