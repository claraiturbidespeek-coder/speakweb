import BotonContacto from "@/app/components/contacto/BotonContacto";
import styles from "./SeccionEvidencia.module.css";

/* La sección "No le entregamos listas de asistencia. Le entregamos evidencia."
   con su tablero de progreso.

   Nació en la plantilla de las landings de idioma y ahora la piden también las
   siete páginas de /equipo/: el markup y su estilo suben aquí en vez de
   duplicarse. El texto es el mismo en las trece; lo que cambia por página son
   las cifras del tablero y su `aria-label`.

   El tablero es ilustrativo. Ni los números ni los colaboradores son datos de
   un cliente: los colaboradores van siempre como "Colaborador A" a "D" para que
   nadie los lea como personas, y cada página trae sus propias cifras para que
   no se vean calcadas una al lado de la otra.

   Es componente de servidor: el único botón interactivo es BotonContacto, así
   que puede montarse igual en PaginaEquipo, que se renderiza en el servidor,
   que en las landings, que son de cliente. */

export type TableroEvidencia = {
  /* Los tres chips de arriba. */
  mejora: number;
  activos: number;
  sesiones: number;
  /* La métrica destacada, en % de evidencias aprobadas, y su alza en puntos. */
  aprobadas: number;
  alza: number;
  /* Las siete alturas de la gráfica, de izquierda a derecha, sobre el viewBox
     de 300×86: más bajo es más alto en pantalla. */
  curva: number[];
  competencias: { nombre: string; pct: number }[];
  /* En orden: Colaborador A, B, C y D. */
  colaboradores: { nivel: string; pct: number }[];
};

const LETRAS = ["A", "B", "C", "D"];

export default function SeccionEvidencia({
  etiqueta,
  tablero,
}: {
  etiqueta: string;
  tablero: TableroEvidencia;
}) {
  const puntos = tablero.curva.map((y, i) => `${i * 50},${y}`).join(" ");
  const ultimo = tablero.curva[tablero.curva.length - 1];

  return (
    <section className="sp-seccion" id="enfoque">
      <div className={styles.evidenciaInner}>
        <div className={`${styles.evidenciaLeft} reveal`}>
          <div className="sp-eyebrow">Nuestro enfoque</div>
          <h2>No le entregamos listas de asistencia.<br /><em>Le entregamos evidencia.</em></h2>
          <p>A la dirección de <strong>Recursos Humanos</strong> le entregamos <strong>tableros</strong> que detallan el <strong>avance, la adopción y el impacto real</strong> del programa, para una <strong>decisión basada en datos</strong> y la optimización de su presupuesto.</p>
          <div className={styles.evidenciaTags}>
            <span className={styles.evidenciaTag}>Evidencias demostrables</span>
            <span className={styles.evidenciaTag}>Métricas de avance y asistencia</span>
            <span className={styles.evidenciaTag}>Reportes de desempeño</span>
          </div>
          <BotonContacto className="sp-btn sp-btn--rojo">Solicite una Cotización</BotonContacto>
        </div>
        <div className={`${styles.evidenciaRight} reveal`}>
          <div className={styles.dash} role="img" aria-label={etiqueta}>
            <div className={styles.dashTopbar}>
              <div className={styles.dashTopbarTitle}>
                <span className={styles.dashDots}><i></i><i></i><i></i></span>
                Panel de Progreso del Equipo
              </div>
              <span className={styles.dashTopbarTag}>S-Peak Analytics</span>
            </div>
            <div className={styles.dashContent}>
              <div className={styles.dashChips}>
                <span className={styles.dashChip}><b>+{tablero.mejora}%</b> mejora</span>
                <span className={styles.dashChip}><b>{tablero.activos}</b> colaboradores activos</span>
                <span className={styles.dashChip}><b>{tablero.sesiones}</b> sesiones</span>
              </div>
              <div className={styles.dashGrid}>
                {/* Métrica destacada */}
                <div className={`${styles.dashWidget} ${styles.dashMetric}`}>
                  <div className={styles.wMetric}>{tablero.aprobadas}<span>%</span></div>
                  <div className={styles.wMetricLabel}>Evidencias aprobadas con rúbrica</div>
                  <div className={styles.wMetricSub}>↑ {tablero.alza} pts vs. trimestre anterior</div>
                </div>
                {/* Gráfica de línea */}
                <div className={`${styles.dashWidget} ${styles.dashChart}`}>
                  <div className={styles.wTitle}>Progreso del equipo · Trimestre</div>
                  <svg viewBox="0 0 300 86" preserveAspectRatio="none" aria-hidden="true">
                    <polygon fill="#B51E40" fillOpacity="0.08" points={`${puntos} 300,86 0,86`}/>
                    <polyline fill="none" stroke="#B51E40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" points={puntos}/>
                    <circle cx="300" cy={ultimo} r="4" fill="#B51E40"/>
                  </svg>
                  <div className={styles.dashChartX}><span>Mes 1</span><span>Mes 2</span><span>Mes 3</span></div>
                </div>
                {/* Competencias del equipo */}
                <div className={`${styles.dashWidget} ${styles.dashSkills}`}>
                  <div className={styles.wTitle}>Competencias del equipo</div>
                  {tablero.competencias.map((c) => (
                    <div key={c.nombre} className={styles.wSkill}>
                      <div className={styles.wSkillTop}><span>{c.nombre}</span><span className={styles.wSkillPct}>{c.pct}%</span></div>
                      <div className={styles.wBar}><span style={{ width: `${c.pct}%` }}></span></div>
                    </div>
                  ))}
                </div>
                {/* Lista de colaboradores */}
                <div className={styles.dashWidget}>
                  <div className={styles.wTitle}>Colaboradores</div>
                  {tablero.colaboradores.map((c, i) => (
                    <div key={LETRAS[i]} className={styles.wPerson}>
                      <span className={styles.wPersonAv}>{LETRAS[i]}</span>
                      <span className={styles.wPersonName}>Colaborador {LETRAS[i]}</span>
                      <span className={styles.wPersonLvl}>{c.nivel}</span>
                      <span className={styles.wPersonPct}>{c.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
