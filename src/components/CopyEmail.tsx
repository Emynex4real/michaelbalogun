"use client";

import { useEffect, useState } from "react";
import styles from "./Contact.module.css";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked by permissions; the mailto link still works.
      setCopied(false);
    }
  };

  return (
    <button type="button" onClick={copy} className={styles.copy}>
      {copied ? "Copied" : "Copy address"}
    </button>
  );
}
