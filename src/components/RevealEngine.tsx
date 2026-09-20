"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One observer for every [data-reveal] element on the page, rather than a
 * component wrapper per element. Server components stay server components and
 * the client bundle stays a single hook.
 */
export default function RevealEngine() {
  const pathname = usePathname();

  useEffect(() => {
    // The pre-paint script in the document head sets data-reveal-ready; if it
    // decided motion is unwelcome, nothing needs observing.
    if (!document.documentElement.hasAttribute("data-reveal-ready")) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "shown");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const targets = document.querySelectorAll<HTMLElement>('[data-reveal=""], [data-reveal="pending"]');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
