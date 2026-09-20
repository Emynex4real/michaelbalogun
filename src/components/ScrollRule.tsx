"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ScrollRule.module.css";

export default function ScrollRule() {
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const measure = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={styles.rule} aria-hidden="true">
      <div className={styles.track} />
      <div className={styles.cursor} style={{ top: `${progress * 100}%` }}>
        <span className={styles.readout}>{String(Math.round(progress * 100)).padStart(3, "0")}</span>
      </div>
    </div>
  );
}
