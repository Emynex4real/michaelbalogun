import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import styles from "./case.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary },
  };
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const position = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(position + 1) % projects.length];

  return (
    <article className="shell">
      <nav className={styles.breadcrumb}>
        <Link href="/#work" className={styles.back}>
          <span aria-hidden="true">←</span> Work index
        </Link>
        <span className="label">
          Sheet {project.index} / {String(projects.length).padStart(2, "0")}
        </span>
      </nav>
      <div className="ticks" aria-hidden="true" />

      <header className={styles.header}>
        <p className={styles.category}>
          <span className={styles.index}>{project.index}</span>
          {project.category}
        </p>
        <h1 className={`serif ${styles.title}`}>{project.name}</h1>
        <p className={styles.tagline}>{project.tagline}</p>
        <p className={styles.summary}>{project.summary}</p>

        <dl className={styles.metaBar}>
          <div>
            <dt className="label">Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt className="label">Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div className={styles.metaWide}>
            <dt className="label">Stack</dt>
            <dd>{project.stack.join(" · ")}</dd>
          </div>
        </dl>

        {(project.links.live || project.links.repo || project.links.note) && (
          <div className={styles.links}>
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noreferrer" className={styles.linkPrimary}>
                Open live site <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.links.repo && (
              <a href={project.links.repo} target="_blank" rel="noreferrer" className={styles.linkSecondary}>
                Source <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.links.note && <p className={styles.linkNote}>{project.links.note}</p>}
          </div>
        )}
      </header>

      <section className={styles.block} data-reveal="pending">
        <div className={styles.blockHead}>
          <span className="label">A — The problem</span>
          <span className={styles.rule} aria-hidden="true" />
        </div>
        <p className={`serif ${styles.problem}`}>{project.problem}</p>
      </section>

      <section className={styles.block} data-reveal="pending">
        <div className={styles.blockHead}>
          <span className="label">B — What it does</span>
          <span className={styles.rule} aria-hidden="true" />
        </div>
        <ul className={styles.brief}>
          {project.brief.map((item, i) => (
            <li key={i}>
              <span className={styles.briefIndex}>{String(i + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.block} data-reveal="pending">
        <div className={styles.blockHead}>
          <span className="label">C — Decisions &amp; trade-offs</span>
          <span className={styles.rule} aria-hidden="true" />
        </div>
        <ol className={styles.decisions}>
          {project.decisions.map((decision, i) => (
            <li key={decision.title} className={styles.decision} data-reveal="pending">
              <span className={styles.decisionId}>D-{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className={`serif ${styles.decisionTitle}`}>{decision.title}</h2>
                <p className={styles.decisionBody}>{decision.body}</p>
                <p className={styles.tradeoff}>
                  <span className={styles.tradeoffLabel}>Trade-off</span>
                  {decision.tradeoff}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.block} data-reveal="pending">
        <div className={styles.blockHead}>
          <span className="label">D — Outcome</span>
          <span className={styles.rule} aria-hidden="true" />
        </div>
        <div className={styles.outcomes}>
          {project.outcomes.map((o) => (
            <div key={o.label} className={styles.outcome}>
              <span className={`serif ${styles.outcomeValue}`}>{o.value}</span>
              <span className={styles.outcomeLabel}>{o.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.block} data-reveal="pending">
        <div className={styles.blockHead}>
          <span className="label">E — Known limits</span>
          <span className={styles.rule} aria-hidden="true" />
        </div>
        <ul className={styles.limits}>
          {project.limits.map((limit, i) => (
            <li key={i}>{limit}</li>
          ))}
        </ul>
      </section>

      <nav className={styles.next}>
        <Link href={`/work/${next.slug}`} className={styles.nextLink}>
          <span className="label">Next — sheet {next.index}</span>
          <span className={`serif ${styles.nextName}`}>
            {next.name}
            <span className={styles.nextArrow} aria-hidden="true">
              →
            </span>
          </span>
          <span className={styles.nextTagline}>{next.tagline}</span>
        </Link>
      </nav>
    </article>
  );
}
