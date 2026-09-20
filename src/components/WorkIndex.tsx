import Link from "next/link";
import { projects, otherRepos } from "@/content/projects";
import { site } from "@/content/site";
import styles from "./WorkIndex.module.css";

export default function WorkIndex() {
  return (
    <>
      <p className={styles.preamble} data-reveal="pending">
        {projects.length} builds, written up the way I’d explain them in a review: the problem, the decisions I
        made, and what each one cost me. The trade-offs are the interesting part.
      </p>

      <ol className={styles.list}>
        {projects.map((project) => (
          <li key={project.slug} data-reveal="pending">
            <Link href={`/work/${project.slug}`} className={styles.row}>
              <span className={styles.index}>{project.index}</span>

              <div className={styles.body}>
                <div className={styles.titleRow}>
                  <h3 className={`serif ${styles.name}`}>{project.name}</h3>
                  <span className={styles.category}>{project.category}</span>
                </div>
                <p className={styles.tagline}>{project.tagline}</p>
                <ul className={styles.stack}>
                  {project.stack.slice(0, 5).map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.meta}>
                <span className="label">{project.year}</span>
                <span className={styles.cta}>
                  Case study
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <div className={styles.appendix} data-reveal="pending">
        <div className={styles.appendixHead}>
          <span className="label">Appendix — further repositories</span>
          <span className={styles.rule} aria-hidden="true" />
        </div>
        <ul className={styles.repos}>
          {otherRepos.map((repo) => (
            <li key={repo.name}>
              <a className={styles.repo} href={repo.href} target="_blank" rel="noreferrer">
                <span className={styles.repoName}>{repo.name}</span>
                <span className={styles.repoNote}>{repo.note}</span>
                <span className={styles.repoLang}>{repo.lang}</span>
              </a>
            </li>
          ))}
        </ul>
        <a className={styles.allRepos} href={site.links.github} target="_blank" rel="noreferrer">
          All repositories on GitHub
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </>
  );
}
