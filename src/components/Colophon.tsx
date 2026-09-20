import { site } from "@/content/site";
import styles from "./Colophon.module.css";

const specs = [
  { field: "Typefaces", value: "Newsreader (display) · IBM Plex Mono (everything else)" },
  { field: "Built with", value: "Next.js · TypeScript · hand-written CSS Modules" },
  { field: "Dependencies", value: "No UI kit, no animation library — motion is CSS" },
  { field: "Grid", value: "88px drafting grid · 1px hairlines" },
];

export default function Colophon() {
  return (
    <footer className={styles.footer}>
      <div className="shell">
        <div className="ticks" aria-hidden="true" />
        <div className={styles.inner}>
          <div className={styles.sign}>
            <p className={`serif ${styles.signature}`}>{site.name}</p>
            <p className="label">
              {site.location} · {site.availability} · Remote or on-site
            </p>
          </div>

          <dl className={styles.specs}>
            {specs.map((spec) => (
              <div key={spec.field} className={styles.specRow}>
                <dt className="label">{spec.field}</dt>
                <dd className={styles.specValue}>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.baseline}>
          <span className="label">Drawing rev {site.revision}</span>
          <span className="label">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
