import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <p>
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
      <p>
        En S-Peak ofrecemos soluciones integrales de clases de idiomas para
        empresas. Ayudamos a los líderes de Recursos Humanos a potenciar el
        talento de sus equipos mediante cursos corporativos, tecnología de
        seguimiento en tiempo real y resultados medibles.
      </p>
      <a
        href="https://www.linkedin.com/company/s-peak"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>

      <nav aria-labelledby="footer-informacion">
        <h2 id="footer-informacion">Información</h2>
        <ul>
          <li>
            <Link href="/blog/">Centro de Recursos</Link>
          </li>
          <li>
            <Link href="/aviso-de-privacidad/">Aviso de privacidad</Link>
          </li>
          <li>
            <Link href="/terminos-y-condiciones/">Términos y condiciones</Link>
          </li>
        </ul>
      </nav>

      <nav aria-labelledby="footer-idiomas">
        <h2 id="footer-idiomas">Idiomas</h2>
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
      </nav>

      <p>S-Peak 2026 | Copyright Todos los Derechos Reservados</p>
    </footer>
  );
}
