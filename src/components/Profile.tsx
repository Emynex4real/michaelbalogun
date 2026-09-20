import { profile, site } from "@/content/site";
import styles from "./Profile.module.css";

const facts = [
  { field: "Based in", value: site.location },
  { field: "Studied", value: "Information Systems" },
  { field: "Domains", value: "Education · Commerce · Music · ML · Client work" },
  { field: "Works in", value: "TypeScript, React, Node, PHP, Postgres, Python" },
  { field: "Also", value: "Founder of InnovaTeam" },
  { field: "Open to", value: site.openTo.join(" · ") },
];

export default function Profile() {
  return (
    <div className={styles.wrap}>
      <div className={styles.prose} data-reveal="pending">
        {profile.paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? styles.first : undefined}>
            {p}
          </p>
        ))}
        <p className={styles.seeking}>{profile.seeking}</p>
      </div>

      <aside className={styles.facts} data-reveal="pending" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
        <div className={styles.factsHead}>
          <span className="label">Particulars</span>
        </div>
        <dl>
          {facts.map((f) => (
            <div key={f.field} className={styles.factRow}>
              <dt className="label">{f.field}</dt>
              <dd className={styles.factValue}>{f.value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  );
}
