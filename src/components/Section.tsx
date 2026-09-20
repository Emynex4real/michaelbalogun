import styles from "./Section.module.css";

type Props = {
  id: string;
  index: string;
  title: string;
  meta?: string;
  children: React.ReactNode;
};

export default function Section({ id, index, title, meta, children }: Props) {
  return (
    <section id={id} className={styles.section}>
      <header className={styles.head}>
        <span className={styles.index}>[{index}]</span>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.line} aria-hidden="true" />
        {meta && <span className="label">{meta}</span>}
      </header>
      {children}
    </section>
  );
}
