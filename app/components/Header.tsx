import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/">
        <Image
          className="site-logo"
          src="/brand/logo_white.svg"
          alt="S-Peak"
          width={1776}
          height={492}
        />
      </Link>

      <nav aria-label="Principal">
        <ul>
          <li>
            <details>
              <summary>Idiomas</summary>
              <ul>
                <li>
                  <Link href="/idioma/aleman-para-empresas/">Alemán</Link>
                </li>
                <li>
                  <Link href="/idioma/espanol-para-empresas/">Español</Link>
                </li>
                <li>
                  <Link href="/idioma/frances-para-empresas/">Francés</Link>
                </li>
                <li>
                  <Link href="/idioma/ingles-para-empresas/">Inglés</Link>
                </li>
                <li>
                  <Link href="/idioma/italiano-para-empresas/">Italiano</Link>
                </li>
                <li>
                  <Link href="/idioma/portugues-para-empresas/">Portugués</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link href="/clientes/">Clientes</Link>
          </li>
          <li>
            <Link href="/#faq">Preguntas Frecuentes</Link>
          </li>
          <li>
            <Link href="/blog/">Centro de Recursos</Link>
          </li>
        </ul>
      </nav>

      {/* TODO: abre el modal de contacto — se implementa en fase posterior */}
      <button type="button">Solicite Información</button>
    </header>
  );
}
