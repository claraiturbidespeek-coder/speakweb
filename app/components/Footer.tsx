import Image from "next/image";
import Link from "next/link";
import { ENLACES_EQUIPOS, ENLACES_IDIOMAS } from "@/app/components/nav/secciones";
import BotonContacto from "@/app/components/contacto/BotonContacto";
import Icono from "@/app/components/Icono";
import styles from "./Footer.module.css";

export default function Footer() {
  /* El año del copyright, para no tener que acordarse cada enero. Este es un
     componente de servidor y las páginas se prerrenderizan, así que el valor se
     fija en el build: se actualiza con el primer despliegue del año, no al dar
     la medianoche en el navegador del visitante. */
  const anio = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.logoWrap}>
            <Link href="/">
              <Image
                className="site-logo"
                src="/brand/logo_white.svg"
                alt="S-Peak"
                width={1776}
                height={492}
              />
            </Link>
          </p>
          <p className={styles.about}>
            Capacitación en idiomas para empresas. Acompañamos a las áreas de
            Recursos Humanos con programas a la medida, seguimiento en tiempo
            real y resultados medibles.
          </p>
          <BotonContacto className={`sp-btn sp-btn--rojo ${styles.cta}`}>
            Solicite una Cotización
          </BotonContacto>
          <a
            className={styles.social}
            href="https://www.linkedin.com/company/s-peak"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <span className="sp-icono sp-icono--sm">
              <Icono nombre="linkedin" />
            </span>
          </a>
        </div>

        <nav aria-labelledby="footer-idiomas">
          <h2 className={styles.title} id="footer-idiomas">
            Idiomas
          </h2>
          <ul className={styles.list}>
            {ENLACES_IDIOMAS.map((e) => (
              <li key={e.ruta}>
                <Link className={styles.link} href={e.ruta}>
                  {e.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-equipo">
          <h2 className={styles.title} id="footer-equipo">
            Soluciones por Equipo
          </h2>
          <ul className={styles.list}>
            {ENLACES_EQUIPOS.map((e) => (
              <li key={e.ruta}>
                <Link className={styles.link} href={e.ruta}>
                  {e.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-recursos">
          <h2 className={styles.title} id="footer-recursos">
            Recursos
          </h2>
          <ul className={styles.list}>
            <li>
              <Link className={styles.link} href="/blog/">
                Centro de Recursos
              </Link>
            </li>
            {/* Casos de éxito (/clientes/), oculta. Descomentar para
                reactivarla; la página sigue en su sitio. */}
            {/*
            <li>
              <Link className={styles.link} href="/clientes/">
                Casos de éxito
              </Link>
            </li>
            */}
          </ul>
        </nav>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <nav className={styles.legal} aria-label="Legal">
            <Link className={styles.legalLink} href="/aviso-de-privacidad/">
              Aviso de privacidad
            </Link>
          </nav>
          <p>© {anio} S-Peak. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
