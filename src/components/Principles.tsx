import { principles } from "@/content/site";
import styles from "./Principles.module.css";

export default function Principles() {
  return (
    <>
      <p className={styles.preamble} data-reveal="pending">
        {principles.length} rules I actually hold to, each one paid for by a specific build. They’re
        here because how someone decides matters more than what they’ve memorised.
      </p>

      <ol className={styles.list}>
        {principles.map((p) => (
          <li key={p.id} className={styles.item} data-reveal="pending">
            <span className={styles.id}>{p.id}</span>
            <div className={styles.content}>
              <h3 className={`serif ${styles.rule}`}>{p.rule}</h3>
              <p className={styles.note}>{p.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
