import { site } from "@/content/site";
import CopyEmail from "./CopyEmail";
import styles from "./Contact.module.css";

const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
  "Engineering role — let's talk",
)}&body=${encodeURIComponent(
  "Hi Michael,\n\nI came across your portfolio. Here's what we're building and the role I have in mind:\n\n",
)}`;

const elsewhere = [
  { name: "GitHub", handle: "Emynex4real", href: site.links.github },
  { name: "LinkedIn", handle: "Michael Balogun", href: site.links.linkedin },
  { name: "X", handle: "@Innovateamm", href: site.links.x },
];

export default function Contact() {
  return (
    <div className={styles.wrap}>
      <div data-reveal="pending">
        <h3 className={`serif ${styles.pitch}`}>
          If you’re hiring someone to build things people actually depend on, I’d like to talk.
        </h3>

        <ul className={styles.tags}>
          {site.openTo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className={styles.emailBlock}>
          <span className="label">Direct</span>
          <a href={mailto} className={styles.email}>
            {site.email}
          </a>
          <CopyEmail email={site.email} />
        </div>

        <p className={styles.note}>
          Email is the fastest route — I read every one and reply within a couple of days. If you’d
          rather see code first, most of the repositories are public; the two that run on live
          payments and student data are not, and I’ll walk you through those directly.
        </p>
      </div>

      <aside className={styles.links} data-reveal="pending" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
        <div className={styles.linksHead}>
          <span className="label">Elsewhere</span>
        </div>
        {elsewhere.map((link) => (
          <a key={link.name} href={link.href} target="_blank" rel="noreferrer" className={styles.link}>
            <span className={styles.linkName}>{link.name}</span>
            <span className={styles.linkHandle}>{link.handle}</span>
            <span className={styles.linkArrow} aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </aside>
    </div>
  );
}
