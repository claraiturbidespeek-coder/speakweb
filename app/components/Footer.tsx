import Image from "next/image";
import Link from "next/link";
import { ENLACES_EQUIPOS, ENLACES_IDIOMAS } from "@/app/components/nav/secciones";
import BotonContacto from "@/app/components/contacto/BotonContacto";
import Icono from "@/app/components/Icono";
import styles from "./Footer.module.css";

export default function Footer() {
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
            En S-Peak ofrecemos soluciones integrales de capacitación en idiomas para
            empresas. Ayudamos a los líderes de Recursos Humanos a potenciar el
            talento de sus equipos mediante cursos corporativos, tecnología de
            seguimiento en tiempo real y resultados medibles.
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
            <li>
              <Link className={styles.link} href="/clientes/">
                Casos de éxito
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <nav className={styles.legal} aria-label="Legal">
            <Link className={styles.legalLink} href="/aviso-de-privacidad/">
              Aviso de privacidad
            </Link>
            <Link className={styles.legalLink} href="/terminos-y-condiciones/">
              Términos y condiciones
            </Link>
          </nav>
          <p>S-Peak 2026 | Copyright Todos los Derechos Reservados</p>
        </div>
      </div>
    </footer>
  );
}
