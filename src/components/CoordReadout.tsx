"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CoordReadout.module.css";

const pad = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, "0");

export default function CoordReadout() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const frame = useRef(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  if (!pos) return null;

  return (
    <div className={styles.readout} aria-hidden="true">
      <span>X{pad(pos.x)}</span>
      <span className={styles.divider}>/</span>
      <span>Y{pad(pos.y)}</span>
    </div>
  );
}
