"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import styles from "./Masthead.module.css";

const sections = [
  { id: "top", index: "00", name: "Index" },
  { id: "work", index: "01", name: "Work" },
  { id: "approach", index: "02", name: "Approach" },
  { id: "stack", index: "03", name: "Stack" },
  { id: "profile", index: "04", name: "Profile" },
  { id: "contact", index: "05", name: "Contact" },
];

function LagosClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: site.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());

    // First paint happens on the next frame rather than synchronously here, so
    // the effect subscribes rather than cascading a render.
    const first = requestAnimationFrame(() => setTime(format()));
    const id = setInterval(() => setTime(format()), 1000);
    return () => {
      cancelAnimationFrame(first);
      clearInterval(id);
    };
  }, []);

  // Rendered only after mount: the server has no business guessing the clock.
  return <span className={styles.clock}>{time ? `${time} WAT` : "--:--:-- WAT"}</span>;
}

export default function Masthead() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"paper" | "blueprint">("paper");
  const [grid, setGrid] = useState(true);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // The pre-paint script is the source of truth for theme and grid; adopt what
  // it decided once hydration has settled.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const root = document.documentElement;
      setTheme((root.getAttribute("data-theme") as "paper" | "blueprint") ?? "paper");
      setGrid(root.getAttribute("data-grid") !== "off");
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The sheet covers the page, so focus has to go into it and come back out
  // again — otherwise a keyboard user tabs through the page hidden behind it.
  useEffect(() => {
    if (!open) return;
    const opener = menuButtonRef.current;
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  const toggleTheme = () => {
    const next = theme === "paper" ? "blueprint" : "paper";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const toggleGrid = () => {
    const next = !grid;
    setGrid(next);
    document.documentElement.setAttribute("data-grid", next ? "on" : "off");
    try {
      localStorage.setItem("grid", next ? "on" : "off");
    } catch {}
  };

  const themeLabel = theme === "paper" ? "Blueprint" : "Paper";

  return (
    <>
      <header className={styles.bar}>
        <div className={styles.inner}>
          <Link href="/#top" className={styles.identity}>
            <span className={styles.mark} aria-hidden="true" />
            <span className={styles.name}>{site.name}</span>
            <span className={styles.role}>{site.role}</span>
          </Link>

          <nav className={styles.nav} aria-label="Sections">
            {sections.slice(1).map((s) => (
              <Link key={s.id} href={`/#${s.id}`} className={styles.navLink}>
                <span className={styles.navIndex}>{s.index}</span>
                {s.name}
              </Link>
            ))}
          </nav>

          <div className={styles.controls}>
            <LagosClock />
            <button
              type="button"
              onClick={toggleGrid}
              className={styles.control}
              aria-pressed={grid}
              title="Toggle drafting grid"
            >
              Grid
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className={styles.control}
              title="Switch between paper and blueprint"
            >
              {themeLabel}
            </button>
            <button
              type="button"
              ref={menuButtonRef}
              className={styles.menuButton}
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="index-sheet"
            >
              <span className={styles.menuBars} aria-hidden="true">
                <span />
                <span />
              </span>
              Index
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className={styles.sheet}
          id="index-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Section index"
        >
          <div className={styles.sheetHead}>
            <span className="label">Sheet index</span>
            <button
              type="button"
              ref={closeButtonRef}
              onClick={() => setOpen(false)}
              className={styles.sheetControl}
            >
              Close
            </button>
          </div>

          <ul className={styles.sheetList}>
            {sections.map((s) => (
              <li key={s.id}>
                <Link href={`/#${s.id}`} onClick={() => setOpen(false)} className={styles.sheetLink}>
                  <span className={styles.sheetIndex}>{s.index}</span>
                  <span className={styles.sheetName}>{s.name}</span>
                  <span className={styles.sheetArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* The bar's Grid and Theme buttons are desktop-only, so on a phone
              this sheet is the only place either control can be reached. */}
          <div className={styles.sheetControls}>
            <button
              type="button"
              onClick={toggleGrid}
              className={styles.sheetControl}
              aria-pressed={grid}
            >
              Grid {grid ? "on" : "off"}
            </button>
            <button type="button" onClick={toggleTheme} className={styles.sheetControl}>
              Switch to {themeLabel}
            </button>
          </div>

          <div className={styles.sheetFoot}>
            <span className="label">{site.location}</span>
            <span className="label">Rev {site.revision}</span>
          </div>
        </div>
      )}
    </>
  );
}
