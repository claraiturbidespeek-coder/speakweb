import { LOGOS_CLIENTES } from "./logos-clientes";

/* Franja de confianza compartida por las 9 páginas que la llevan: home, las
   siete de Soluciones por Equipo y /idioma/ingles-para-empresas.

   El encabezado y la lista de logos son fijos — no hay props para variarlos,
   porque el objetivo es que las 9 páginas se vean idénticas. Lo único que
   cambia entre páginas es si llevan la imagen decorativa del isotipo detrás
   de la tarjeta, y eso trae consigo ajustes de posicionamiento que solo esa
   página necesita: se reciben como clases desde fuera en vez de vivir aquí,
   para no acoplar este componente al módulo CSS de una sola página. */

type BandaLogosProps = {
  decorativo?: boolean;
  className?: string;
  claseTarjeta?: string;
  claseDecorativo?: string;
};

export default function BandaLogos({
  decorativo = false,
  className,
  claseTarjeta,
  claseDecorativo,
}: BandaLogosProps) {
  const logos = [...LOGOS_CLIENTES, ...LOGOS_CLIENTES];

  return (
    <div className={`sp-logos${className ? ` ${className}` : ""}`}>
      {decorativo ? (
        <img
          className={claseDecorativo}
          src="/images/isotype.svg"
          alt=""
          aria-hidden="true"
          width="1587"
          height="907"
          loading="lazy"
        />
      ) : null}
      <div className={`sp-logos-card${claseTarjeta ? ` ${claseTarjeta}` : ""}`}>
        <p className="sp-logos-label">
          Más de 500 empresas confían en <strong>S-Peak</strong>
        </p>
        <div className="sp-marquesina">
          <div className="sp-marquesina-track">
            {logos.map((l, i) => (
              <img
                key={`${l.archivo}-${i}`}
                src={`/images/logos/${encodeURIComponent(l.archivo)}`}
                alt={i < LOGOS_CLIENTES.length ? l.marca : ""}
                aria-hidden={i >= LOGOS_CLIENTES.length}
                height="44"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
