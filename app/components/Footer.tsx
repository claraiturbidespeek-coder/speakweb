import Image from "next/image";
import Link from "next/link";
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
            En S-Peak ofrecemos soluciones integrales de clases de idiomas para
            empresas. Ayudamos a los líderes de Recursos Humanos a potenciar el
            talento de sus equipos mediante cursos corporativos, tecnología de
            seguimiento en tiempo real y resultados medibles.
          </p>
          <a
            className={styles.social}
            href="https://www.linkedin.com/company/s-peak"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <nav className={styles.col} aria-labelledby="footer-informacion">
          <h2 className={styles.title} id="footer-informacion">
            Información
          </h2>
          <ul className={styles.list}>
            <li>
              <Link className={styles.link} href="/blog/">
                Centro de Recursos
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="/aviso-de-privacidad/">
                Aviso de privacidad
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="/terminos-y-condiciones/">
                Términos y condiciones
              </Link>
            </li>
          </ul>
        </nav>

        <nav className={styles.col} aria-labelledby="footer-idiomas">
          <h2 className={styles.title} id="footer-idiomas">
            Idiomas
          </h2>
          <ul className={styles.list}>
            <li>
              <Link className={styles.link} href="/idioma/aleman-para-empresas/">
                Alemán
              </Link>
            </li>
            <li>
              <Link
                className={styles.link}
                href="/idioma/espanol-para-empresas/"
              >
                Español
              </Link>
            </li>
            <li>
              <Link
                className={styles.link}
                href="/idioma/frances-para-empresas/"
              >
                Francés
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="/idioma/ingles-para-empresas/">
                Inglés
              </Link>
            </li>
            <li>
              <Link
                className={styles.link}
                href="/idioma/italiano-para-empresas/"
              >
                Italiano
              </Link>
            </li>
            <li>
              <Link
                className={styles.link}
                href="/idioma/portugues-para-empresas/"
              >
                Portugués
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.bottom}>
        <p>S-Peak 2026 | Copyright Todos los Derechos Reservados</p>
      </div>
    </footer>
  );
}
