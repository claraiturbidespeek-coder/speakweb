import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <Image
            className="site-logo"
            src="/brand/logo_white.svg"
            alt="S-Peak"
            width={1776}
            height={492}
          />
        </Link>

        <nav aria-label="Principal">
          <ul className={styles.list}>
            <li className={styles.item}>
              <details className={styles.details}>
                <summary className={styles.summary}>Idiomas</summary>
                <ul className={styles.dropdown}>
                  <li>
                    <Link
                      className={styles.dropdownLink}
                      href="/idioma/aleman-para-empresas/"
                    >
                      Alemán
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={styles.dropdownLink}
                      href="/idioma/espanol-para-empresas/"
                    >
                      Español
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={styles.dropdownLink}
                      href="/idioma/frances-para-empresas/"
                    >
                      Francés
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={styles.dropdownLink}
                      href="/idioma/ingles-para-empresas/"
                    >
                      Inglés
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={styles.dropdownLink}
                      href="/idioma/italiano-para-empresas/"
                    >
                      Italiano
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={styles.dropdownLink}
                      href="/idioma/portugues-para-empresas/"
                    >
                      Portugués
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li className={styles.item}>
              <Link className={styles.link} href="/clientes/">
                Clientes
              </Link>
            </li>
            <li className={styles.item}>
              <Link className={styles.link} href="/#faq">
                Preguntas Frecuentes
              </Link>
            </li>
            <li className={styles.item}>
              <Link className={styles.link} href="/blog/">
                Centro de Recursos
              </Link>
            </li>
          </ul>
        </nav>

        {/* TODO: abre el modal de contacto — se implementa en fase posterior */}
        <button type="button" className={styles.cta}>
          Solicite Información
        </button>
      </div>
    </header>
  );
}
