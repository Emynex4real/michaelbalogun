import { site, statement, figures } from "@/content/site";
import styles from "./Hero.module.css";

const titleBlock = [
  { field: "Drawn by", value: site.name },
  { field: "Discipline", value: site.role },
  { field: "Location", value: site.location },
  { field: "Status", value: site.availability },
  { field: "Revision", value: site.revision },
];

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <span className={`${styles.reg} ${styles.regTL}`} aria-hidden="true" />
      <span className={`${styles.reg} ${styles.regTR}`} aria-hidden="true" />

      <div className={styles.sheetMeta}>
        <span className="label">Sheet 00 — Index</span>
        <span className={styles.dashes} aria-hidden="true" />
        <span className="label">Rev {site.revision}</span>
      </div>
      <div className="ticks" aria-hidden="true" />

      <div className={styles.grid}>
        <div className={styles.lead}>
          <p className={styles.eyebrow} data-reveal="pending">
            <span className={styles.who}>{site.name}</span>
            <span className={styles.slash} aria-hidden="true">
              /
            </span>
            <span className={styles.what}>{site.role}</span>
          </p>

          <h1 className={`serif ${styles.headline}`} data-reveal="pending" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
            {statement.headline}
          </h1>

          <p className={styles.lede} data-reveal="pending" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
            {statement.lede}
          </p>

          <div className={styles.actions} data-reveal="pending" style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
            <a href="#work" className={styles.primary}>
              View the work
              <span aria-hidden="true">↓</span>
            </a>
            <a href="#contact" className={styles.secondary}>
              Hire me
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <aside className={styles.block} data-reveal="pending" style={{ "--reveal-delay": "200ms" } as React.CSSProperties}>
          <div className={styles.blockHead}>
            <span className="label">Title block</span>
          </div>
          <dl className={styles.blockBody}>
            {titleBlock.map((row) => (
              <div key={row.field} className={styles.blockRow}>
                <dt className="label">{row.field}</dt>
                <dd className={styles.blockValue}>{row.value}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.blockFoot}>
            <span className={styles.live} aria-hidden="true" />
            <span className="label">Available for work</span>
          </div>
        </aside>
      </div>

      <div className={styles.figures} data-reveal="pending">
        {figures.map((f) => (
          <div key={f.label} className={styles.figure}>
            <div className={styles.figureValue}>
              {f.value}
              <span className={styles.figureUnit}>{f.unit}</span>
            </div>
            <p className={styles.figureLabel}>{f.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
