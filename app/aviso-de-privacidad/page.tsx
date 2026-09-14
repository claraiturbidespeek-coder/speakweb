import { Fragment } from "react";
import type { Metadata } from "next";
import IndiceContenidos from "@/app/components/IndiceContenidos";
import type { Encabezado } from "@/lib/posts";
import styles from "./aviso.module.css";

/* Contenido de la versión que envió el cliente (documento «Comunicación
   integral», 13/09/2026), que sustituye por completo al aviso migrado de
   WordPress. El texto legal va literal: no se reescribió, resumió ni
   corrigió, y se conservan sus comillas angulares, sus referencias cruzadas
   («ver sección 7») y la fecha de actualización que trae el propio
   documento.

   Lo único que es marcado y no contenido:
   - Los ocho apartados numerados son <h3>, el nivel que ya usaba el cuerpo
     de esta página. El documento los trae como Heading3, así que la
     jerarquía coincide.
   - Las enumeraciones del documento (listas con viñeta en Word) son <ul>.
   - Las negritas del documento se conservan con <strong>, en los mismos
     fragmentos.
   - El apartado 8 viene como un solo párrafo con un salto de línea manual
     en medio; aquí son dos <p>. En el documento las dos frases quedan
     pegadas sin espacio ("iniciar la clase.Las grabaciones").
   - Los correos van enlazados como mailto, que es el tratamiento que esta
     página ya daba a privacidad@s-peak.com. Las tres direcciones del apartado
     7, que el documento escribe sin esquema, van enlazadas con https:// y
     abriendo en pestaña nueva, con el rel del resto de enlaces externos del
     sitio; el texto visible es el del documento, sin esquema.

   El índice lateral no se deduce del marcado: los ocho apartados se declaran
   abajo en APARTADOS, que es de donde salen a la vez el id y el texto del h3 y
   los que recibe IndiceContenidos. Un solo origen, así que no pueden
   desajustarse. En el blog el índice sí es automático, pero porque sus notas
   son Markdown y pasan por rehype-slug; este documento es JSX escrito a mano y
   no hay tal árbol que recorrer. */

export const metadata: Metadata = {
  title: "Aviso de Privacidad | S-Peak",
  /* La descripción resume los apartados del propio documento —responsable,
     datos, finalidades, con quién se comparten y derechos— en el registro de
     usted del resto del sitio. */
  description:
    "Aviso de privacidad de S-Peak: qué datos personales recabamos, para qué los usamos, con quién los compartimos y cómo ejercer sus derechos.",
  alternates: { canonical: "https://s-peak.com/aviso-de-privacidad/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "S-Peak",
    title: "Aviso de Privacidad | S-Peak",
    description:
      "Aviso de privacidad de S-Peak: qué datos personales recabamos, para qué los usamos, con quién los compartimos y cómo ejercer sus derechos.",
    url: "https://s-peak.com/aviso-de-privacidad/",
    images: [
      {
        url: "https://s-peak.com/images/og-links.jpg",
        alt: "Aviso de privacidad de S-Peak",
      },
    ],
  },
};

/* Los ocho apartados del documento. De aquí salen a la vez el id y el texto de
   cada h3 y las entradas del índice lateral, así que no pueden desajustarse.
   Los id son cortos y estables a propósito: son los anclajes que alguien puede
   citar de un aviso de privacidad, y no deben moverse si cambia la redacción
   de un titular. */
const APARTADOS = [
  {
    id: "responsable",
    titulo: "1. ¿Quién es responsable de sus datos?",
    cuerpo: (
      <>
        <p>
          Proactive Strategies SC, que opera las marcas S-Peak y
          ResponSable, con domicilio en Av. Río Churubusco 124 PH, Col. El
          Prado, Alcaldía Iztapalapa, C.P. 09480, Ciudad de México. Nuestro
          Departamento de Datos Personales le atiende en{" "}
          <a href="mailto:privacidad@s-peak.com">privacidad@s-peak.com</a>.
        </p>
      </>
    ),
  },
  {
    id: "datos",
    titulo: "2. ¿Qué datos usamos?",
    cuerpo: (
      <>
        <ul>
          <li>
            <strong>Si nos contacta</strong> (formularios, WhatsApp, correo
            o teléfono): nombre, empresa, puesto, correo, teléfono y su
            mensaje.
          </li>
          <li>
            <strong>Si toma un curso que contrató su empresa:</strong>{" "}
            nombre, correo, teléfono, empresa, área o puesto, idioma,
            nivel, resultados de exámenes, asistencia, avance, y las
            grabaciones y transcripciones de las clases (imagen y voz).
          </li>
          <li>
            <strong>Si visita el sitio:</strong> dirección IP, dispositivo,
            navegador, páginas que visita, cómo navega en ellas y de qué
            anuncio o campaña llegó (ver sección 7).
          </li>
          <li>
            <strong>Si es profesor de S-Peak:</strong> nombre, correo, sus
            planeaciones de clase y las calificaciones que reciben, su
            ubicación al iniciar la clase, y su imagen y voz en las
            grabaciones y transcripciones de las clases (ver sección 8).
          </li>
        </ul>

        <p>
          No pedimos datos sensibles (como salud, religión u origen
          étnico); por favor no los incluya en sus mensajes. En este sitio
          no pedimos datos bancarios.
        </p>
      </>
    ),
  },
  {
    id: "finalidades",
    titulo: "3. ¿Para qué los usamos?",
    cuerpo: (
      <>
        <p>
          <strong>Necesarios</strong> (sin ellos no podemos atenderle):
        </p>

        <ul>
          <li>Responder su solicitud y enviarle una propuesta.</li>
          <li>
            Dar el curso que contrató su empresa: evaluar su nivel,
            organizar grupos y clases, entregarle la grabación de la clase
            para repasar o reponerla, y enviar a su empresa un reporte
            mensual de asistencia y calificaciones.
          </li>
          <li>
            Revisar la calidad de las clases, analizando las
            transcripciones con herramientas de inteligencia artificial.
          </li>
          <li>Facturar a su empresa y cumplir obligaciones legales.</li>
        </ul>

        <p>
          <strong>Opcionales</strong> (puede negarse y eso no afecta lo
          anterior):
        </p>

        <ul>
          <li>
            Enviarle promociones e invitaciones a eventos de S-Peak y de
            ResponSable, nuestra otra marca (consultoría en
            responsabilidad social y sostenibilidad). Para negarse, escriba
            a{" "}
            <a href="mailto:privacidad@s-peak.com">privacidad@s-peak.com</a>{" "}
            con el asunto «Baja» (puede indicar si es de una sola marca o
            de las dos); no necesita enviar identificación.
          </li>
          <li>
            Medir nuestros anuncios y mostrarle publicidad de S-Peak en
            otros sitios. Para negarse, vea la sección 7.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "comparticion",
    titulo: "4. ¿Con quién compartimos sus datos?",
    cuerpo: (
      <>
        <ul>
          <li>
            Con la empresa que contrató su curso: el reporte mensual de
            asistencia y calificaciones.
          </li>
          <li>Con autoridades, cuando la ley lo exija.</li>
        </ul>

        <p>Estas dos no requieren su consentimiento.</p>

        <ul>
          <li>
            Con Google y Microsoft: reciben datos de su visita a través de
            las herramientas del sitio y pueden usarlos también para sus
            propios fines (sección 7). Si no lo limita con los medios de la
            sección 7, entendemos que acepta que reciban estos datos; puede
            limitarlo en cualquier momento con esos mismos medios.
          </li>
        </ul>

        <p>
          Además nos apoyamos en proveedores para operar: alojamiento del
          sitio y de nuestra plataforma, correo, sistema de clientes,
          WhatsApp e inteligencia artificial.
        </p>
      </>
    ),
  },
  {
    id: "derechos",
    titulo: "5. Sus derechos y cómo retirar su consentimiento",
    cuerpo: (
      <>
        <p>
          Puede pedir{" "}
          <strong>acceso, rectificación, cancelación u oposición</strong>{" "}
          de sus datos, o <strong>retirar su consentimiento</strong>,
          escribiendo a{" "}
          <a href="mailto:privacidad@s-peak.com">privacidad@s-peak.com</a>.
          Incluya:
        </p>

        <ul>
          <li>Su nombre y un correo u otro medio para responderle.</li>
          <li>
            Copia de una identificación oficial (si es representante,
            también el documento que lo acredite).
          </li>
          <li>
            Qué pide y sobre qué datos (si solo pide acceso, basta con
            decirlo). Si pide corregirlos, indique la corrección y adjunte
            el documento que la respalde.
          </li>
          <li>Cualquier dato que nos ayude a encontrarlos.</li>
        </ul>

        <p>
          Le respondemos en un máximo de 20 días hábiles y, si procede, lo
          aplicamos en los 15 días hábiles siguientes. Si el caso lo
          justifica, estos plazos pueden ampliarse una sola vez por un
          periodo igual, y se lo avisaremos. El trámite es gratuito. Si
          pide acceso, le enviamos sus datos en un archivo electrónico.
        </p>

        <p>
          Algunas evaluaciones se hacen de forma automática (ver sección
          8); puede pedir que una persona las revise u oponerse a ellas.
        </p>

        <p>
          Retirar su consentimiento no tiene efectos hacia atrás, y algunos
          datos debemos conservarlos por ley (por ejemplo, las facturas).
        </p>

        <p>
          Si no le respondemos o no está de acuerdo con la respuesta, puede
          acudir a la Secretaría Anticorrupción y Buen Gobierno.
        </p>
      </>
    ),
  },
  {
    id: "cambios",
    titulo: "6. Cambios a este aviso",
    cuerpo: (
      <>
        <p>
          Publicaremos cualquier cambio en esta página, con su fecha. Si
          agregamos usos que requieran su consentimiento, se lo pediremos
          antes de aplicarlos: por correo si lo tenemos y, si no, en esta
          página.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    titulo: "7. Cookies y herramientas del sitio",
    cuerpo: (
      <>
        <p>El sitio usa:</p>

        <ul>
          <li>
            <strong>Google reCAPTCHA:</strong> evitar spam en los
            formularios.
          </li>
          <li>
            <strong>Google Tag Manager y Google Analytics:</strong> medir
            visitas.
          </li>
          <li>
            <strong>Google Ads:</strong> medir nuestros anuncios y
            mostrarle publicidad de S-Peak.
          </li>
          <li>
            <strong>Microsoft Clarity:</strong> entender cómo se usa la
            página para mejorarla; graba cómo navega (clics, desplazamiento
            y movimientos) y no guarda lo que escribe en los formularios.
          </li>
        </ul>

        <p>
          Cómo limitarlo: bloquee o borre las cookies en la configuración
          de su navegador (esto reduce lo que registran estas herramientas,
          aunque no lo elimina del todo) y limite los anuncios
          personalizados de Google en{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            adssettings.google.com
          </a>
          . Cómo usan los datos Google y Microsoft:{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            policies.google.com/privacy
          </a>{" "}
          y{" "}
          <a
            href="https://privacy.microsoft.com/privacystatement"
            target="_blank"
            rel="noopener noreferrer"
          >
            privacy.microsoft.com/privacystatement
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "profesores",
    titulo: "8. Profesores",
    cuerpo: (
      <>
        <p>
          Si es profesor de S-Peak, nuestra app usa su ubicación (GPS)
          únicamente para validar que está en el lugar donde imparte la
          clase. Esta validación es obligatoria: sin ella, la app no
          permite iniciar la clase.
        </p>

        <p>
          Las grabaciones y transcripciones de las clases incluyen su
          imagen y voz. Nuestra plataforma califica de forma automática,
          con inteligencia artificial, sus planeaciones y sus clases; puede
          pedir que una persona revise cualquier calificación.
        </p>
      </>
    ),
  },
];

/* El índice los quiere todos al mismo nivel. `nivel: 3` es el que el componente
   sangra y encoge, para los subapartados de una nota; estos ocho son de primer
   nivel. */
const ENCABEZADOS: Encabezado[] = APARTADOS.map(({ id, titulo }) => ({
  id,
  texto: titulo,
  nivel: 2,
}));

export default function AvisoDePrivacidad() {
  return (
    <main>
      <section className={`sp-seccion ${styles.cabecera}`}>
        <div className={`sp-inner ${styles.documento}`}>
          <h1 className={styles.titulo}>Aviso de Privacidad</h1>
          <p className={styles.actualizacion}>
            Última actualización: 13/09/2026
          </p>
        </div>
      </section>

      <section className={`sp-seccion ${styles.cuerpo}`}>
        <div className="sp-inner sp-lectura">
          <div className="sp-lectura-principal">
            <div className={styles.contenido}>
              {APARTADOS.map((a) => (
                <Fragment key={a.id}>
                  <h2 id={a.id}>{a.titulo}</h2>
                  {a.cuerpo}
                </Fragment>
              ))}
            </div>
          </div>

          <aside className="sp-lectura-lateral">
            <div className="sp-lectura-sticky">
              <IndiceContenidos encabezados={ENCABEZADOS} />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
