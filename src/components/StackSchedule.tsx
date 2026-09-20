import { stack } from "@/content/site";
import styles from "./StackSchedule.module.css";

export default function StackSchedule() {
  return (
    <>
      <p className={styles.preamble} data-reveal="pending">
        A schedule, not a skills grid — every entry says what I use it for, because the tool on its
        own has never been the interesting claim.
      </p>

      <div className={styles.schedule}>
        {stack.map((group) => (
          <section key={group.group} className={styles.group} data-reveal="pending">
            <h3 className={styles.groupName}>{group.group}</h3>
            <dl className={styles.rows}>
              {group.items.map((item) => (
                <div key={item.name} className={styles.row}>
                  <dt className={styles.item}>{item.name}</dt>
                  <dd className={styles.note}>{item.note}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </>
  );
}
