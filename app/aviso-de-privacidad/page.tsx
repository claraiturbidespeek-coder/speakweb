import type { Metadata } from "next";
import Link from "next/link";
import styles from "./aviso.module.css";

/* Migrado verbatim de https://s-peak.com/aviso-de-privacidad/ (fuente
   WordPress). El texto no se reescribió, resumió ni corrigió: se conservó
   tal cual, incluidas erratas del original (p. ej. "Compañia" sin acento) y
   el registro en usted que ya traía. Lo único que cambió es el marcado: los
   apartados "1.1", "1.2.1", etc. eran <p> sueltos en el original y aquí se
   volvieron encabezados (h3/h4) reales, según su propia numeración —
   presentación, no contenido.

   Dos fechas de actualización conviven en el original y no coinciden entre
   sí: el aviso lo señala al equipo, no se resolvió por cuenta propia. */

export const metadata: Metadata = {
  title: "Aviso de Privacidad | S-Peak",
  alternates: { canonical: "https://s-peak.com/aviso-de-privacidad/" },
};

export default function AvisoDePrivacidad() {
  return (
    <main>
      <section className={`sp-seccion ${styles.cabecera}`}>
        <div className={`sp-inner ${styles.documento}`}>
          <h1 className={styles.titulo}>Aviso de Privacidad</h1>
          <p className={styles.actualizacion}>
            Última Actualización: Abril 28, 2026
          </p>
        </div>
      </section>

      <section className={`sp-seccion ${styles.cuerpo}`}>
        <div className={`sp-inner ${styles.documento}`}>
          <div className={styles.contenido}>
            <h3>
              1.1 Mecanismos y procedimiento para que, en su caso, el titular
              pueda revocar su consentimiento al tratamiento de sus datos
              personales.
            </h3>

            <p>
              En todo momento usted podrá revocar el consentimiento que nos ha
              otorgado para el tratamiento de sus datos personales, a fin de
              que dejemos de hacer uso de los mismos.
            </p>

            <p>
              Para ello, es necesario que presente su petición en{" "}
              <a href="mailto:privacidad@s-peak.com">privacidad@s-peak.com</a>.
              Su petición deberá ir acompañada de la siguiente información:
            </p>

            <ul>
              <li>Nombre completo</li>
              <li>Teléfono fijo y/o celular</li>
              <li>Correo electrónico</li>
            </ul>

            <p>
              Es importante informarle que usted tiene derecho al Acceso,
              Rectificación, Cancelación y Objeción de sus datos personales, a
              oponerse al tratamiento de los mismos o a revocar el
              consentimiento que para dicho fin nos haya otorgado en los
              términos que marca la Ley en su Art. 29.
            </p>

            <p>
              Tendremos un plazo máximo de 30 días para atender su petición y a
              través de un correo electrónico se le notificará que S-Peak ha
              revocado el tratamiento de sus datos personales.
            </p>

            <h3>1.2 Datos personales recabados.</h3>

            <h4>1.2.1 ¿Qué datos personales recabamos?</h4>

            <p>
              Para las finalidades señaladas en el presente aviso de
              privacidad, podemos recabar sus datos personales de distintas
              formas: cuando usted nos los proporciona directamente; cuando
              visita nuestro sitio de Internet o utiliza nuestros servicios en
              línea, y cuando obtenemos información a través de otras fuentes
              que están permitidas por la ley. Datos personales que recabamos
              de forma directa. Recabamos sus datos personales de forma
              directa cuando usted mismo nos los proporciona por diversos
              medios, como cuando participa en nuestras promociones o nos da
              información con objeto de que le prestemos un servicio. Los
              datos que obtenemos por este medio pueden ser, entre otros:
            </p>

            <ul>
              <li>Nombre completo</li>
              <li>Compañia</li>
              <li>Puesto</li>
              <li>Teléfono</li>
              <li>Correo Electrónico</li>
            </ul>

            <h3>1.3 Las finalidades del tratamiento de los datos personales</h3>

            <h4>1.3.1 ¿Para qué fines utilizamos sus datos personales?</h4>

            <p>
              Sus datos personales serán utilizados para proveer los
              servicios y productos requeridos, así como actividades afines.
            </p>

            <h3>1.4 La identidad y domicilio del responsable</h3>

            <p>
              S-Peak, responsable del manejo de la información se localiza en
              Avenida Masaryk, No. 18, Piso 2, Col Polanco V Sección, Ciudad
              de México.
            </p>

            <p>
              Cómo contactarnos: vía email{" "}
              <a href="mailto:privacidad@s-peak.com">privacidad@s-peak.com</a>{" "}
              o si requiere comunicación directa con nosotros puede consultar
              las direcciones de email y teléfonos correspondientes haciendo
              click <a href="https://s-peak.com/">aquí</a>.
            </p>

            <h3>
              1.5 Opciones y medios para limitar el uso o divulgación de sus
              datos personales
            </h3>

            <p>
              Usted puede dejar de recibir mensajes promocionales realizando
              la solicitud correspondiente a{" "}
              <a href="mailto:privacidad@s-peak.com">privacidad@s-peak.com</a>
            </p>

            <h3>
              1.6 Los medios para ejercer los derechos de acceso,
              rectificación, cancelación u oposición
            </h3>

            <p>
              Usted tiene el derecho de acceder a sus datos personales que
              poseemos y a los detalles del tratamiento de los mismos, así
              como a rectificarlos en caso de ser inexactos o instruirnos
              cancelarlos cuando considere que resulten ser excesivos o
              innecesarios para las finalidades que justificaron su obtención
              u oponerse al tratamiento de los mismos para fines específicos.
              Los mecanismos que se han implementado para el ejercicio de
              dichos derechos son a través de la presentación de la solicitud
              respectiva a la dirección electrónica{" "}
              <a href="mailto:privacidad@s-peak.com">privacidad@s-peak.com</a>,
              en caso de contar con mecanismos para acreditar su identidad,
              como la firma electrónica o cualquier otro medio para hacerlo.
              Para mayor información, favor de comunicarse a{" "}
              <a href="mailto:privacidad@s-peak.com">privacidad@s-peak.com</a>{" "}
              o visitar nuestra página de Internet{" "}
              <Link href="/aviso-de-privacidad/">
                https://s-peak.com/aviso-de-privacidad-s-peak/
              </Link>
            </p>

            <h3>1.7 Transferencias de datos personales</h3>

            <h4>1.7.1 Sus datos pueden ser comunicados a terceros</h4>

            <p>
              Hacemos de su conocimiento que sus datos podrán ser transferidos
              a entidades del mismo grupo de interés de la empresa, nacionales
              o extranjeras, con el objetivo general de cumplir con las
              finalidades para las cuales ha proporcionado sus datos.
              Propósitos específicos: CFD, CFDI, información fiscal, correo
              electrónico masivo, promociones a clientes.
            </p>

            <h3>1.8 Cambios al aviso de privacidad</h3>

            <p>
              Nos reservamos el derecho de efectuar en cualquier momento
              modificaciones o actualizaciones al presente aviso de
              privacidad, para la atención de novedades legislativas o
              jurisprudenciales, políticas internas, nuevos requerimientos
              para la prestación u ofrecimiento de nuestros servicios o
              productos y prácticas del mercado. Estas modificaciones estarán
              disponibles al público a través de nuestra página de Internet{" "}
              <Link href="/aviso-de-privacidad/">
                https://s-peak.com/aviso-de-privacidad-s-peak/
              </Link>{" "}
              o se las haremos llegar al último correo electrónico que nos
              haya proporcionado. La fecha de la última actualización al
              presente aviso de privacidad: 08/06/2020
            </p>

            <h3>1.9 La declaración de datos personales sensibles</h3>

            <p>
              Le informamos que, para cumplir con las finalidades previstas en
              este aviso, serán recabados y tratados datos personales
              sensibles, como aquéllos que refieren a nombre, apellidos,
              teléfono dirección de email y teléfono. Nos comprometemos a que
              los mismos serán tratados bajo medidas de seguridad, siempre
              garantizando su confidencialidad.
            </p>

            <h3>Uso de GPS en la aplicación S-Peak para profesores</h3>

            <h4>1.9.1 Recolección y uso de datos de ubicación GPS</h4>

            <p>
              La aplicación S-Peak para profesores podrá solicitar acceso a su
              información de ubicación GPS con el único propósito de facilitar
              el proceso de inicio de clases con sus alumnos. Esta
              funcionalidad se basa en la siguiente premisa:
            </p>

            <p>
              Ubicación precisa para la coincidencia profesor-alumno: Al
              activar la función GPS, la aplicación podrá identificar la
              ubicación actual del profesor con mayor precisión. Esto permite
              emparejar al profesor con sus alumnos que se encuentren en la
              misma área cercana, facilitando la conexión y el inicio de la
              clase.
            </p>

            <h4>1.9.2 No compartimos su ubicación GPS</h4>

            <p>
              Es importante destacar que la información de ubicación GPS no
              se almacena ni se comparte con terceros bajo ninguna
              circunstancia. Únicamente se utiliza en el momento preciso para
              la coincidencia profesor-alumno y luego se elimina de forma
              segura.
            </p>

            <h4>1.9.3 Control sobre el uso de GPS</h4>

            <p>
              Usted tiene el control total sobre el uso de su información de
              GPS dentro de la aplicación S-Peak para profesores. Puede
              otorgar o revocar el acceso a su ubicación GPS en cualquier
              momento a través de la configuración de la aplicación o de su
              dispositivo móvil.
            </p>

            <h4>1.9.4 Compromiso con la privacidad</h4>

            <p>
              En S-Peak nos comprometemos a proteger la privacidad de nuestros
              usuarios. El uso de la información de ubicación GPS se limita
              estrictamente al propósito descrito anteriormente y se
              implementa con las medidas de seguridad adecuadas para
              garantizar su confidencialidad.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
