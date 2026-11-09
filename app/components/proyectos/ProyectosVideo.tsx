import Icono from "@/app/components/Icono";
import CeldaVideo, { type VideoProyecto } from "./CeldaVideo";
import styles from "./ProyectosVideo.module.css";

/* Sección de proyectos: dos videos de YouTube y cuatro tarjetas de cifra en una
   rejilla. Hoy la monta /nosotros/; está pensada para la home también, así que
   todo el contenido llega por props y el estilo vive en su propio módulo.

   Las celdas van en el HTML en el orden de lectura —video A, las cuatro cifras,
   video B— y la rejilla hace el resto sin `order`:
     - desde 960px, 4 columnas: el video A ocupa dos y le siguen las cifras 1 y
       2; en la segunda fila, las cifras 3 y 4 y el video B en las dos últimas;
     - de 601 a 960px, 2 columnas: cada video a todo lo ancho, las cifras de
       dos en dos;
     - hasta 600px, una columna.

   Es componente de servidor: el único trozo de cliente es la celda de video,
   que inserta el iframe al hacer clic. */

export type CifraProyecto = {
  icono: string;
  cifra: string;
  descriptor: string;
  cliente: string;
};

type Props = {
  titulo: string;
  bajada: string;
  videos: [VideoProyecto, VideoProyecto];
  cifras: [CifraProyecto, CifraProyecto, CifraProyecto, CifraProyecto];
  id?: string;
  className?: string;
};

function TarjetaCifra({ icono, cifra, descriptor, cliente }: CifraProyecto) {
  return (
    <div className={`sp-tarjeta ${styles.cifra}`}>
      <span className="sp-icono sp-icono--md sp-icono--rojo">
        <Icono nombre={icono} />
      </span>
      <p className={styles.cifraNum}>{cifra}</p>
      <p className={styles.cifraDescriptor}>{descriptor}</p>
      <p className={styles.cifraCliente}>{cliente}</p>
    </div>
  );
}

export default function ProyectosVideo({
  titulo,
  bajada,
  videos,
  cifras,
  id,
  className,
}: Props) {
  const [videoA, videoB] = videos;

  return (
    <section className={`sp-seccion${className ? ` ${className}` : ""}`} id={id}>
      <div className="sp-inner">
        <div className="sp-seccion-top reveal">
          <h2>{titulo}</h2>
          <p>{bajada}</p>
        </div>

        <div className={`${styles.rejilla} reveal stagger`}>
          <CeldaVideo {...videoA} className={styles.video} />
          {cifras.map((c) => (
            <TarjetaCifra key={c.cliente} {...c} />
          ))}
          <CeldaVideo {...videoB} className={styles.video} />
        </div>
      </div>
    </section>
  );
}
