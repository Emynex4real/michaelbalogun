import type { Metadata } from "next";
import Link from "next/link";

// Next already emits a noindex directive for this route; adding another one
// here only produces two competing robots tags in the same head.
export const metadata: Metadata = {
  title: "Sheet not found",
};

export default function NotFound() {
  return (
    <div className="shell" style={{ paddingBlock: "clamp(5rem, 14vw, 10rem)" }}>
      <p className="label" style={{ marginBottom: "1.25rem" }}>
        Error 404 — sheet not found
      </p>
      <h1 className="serif" style={{ fontSize: "var(--step-display)", maxWidth: "14ch", marginBottom: "1.5rem" }}>
        That drawing isn&apos;t in the set.
      </h1>
      <Link
        href="/"
        style={{
          display: "inline-flex",
          gap: "0.6rem",
          borderBottom: "1px solid var(--line-strong)",
          paddingBottom: "0.2rem",
          fontSize: "var(--step-small)",
        }}
      >
        <span aria-hidden="true">←</span> Back to the index
      </Link>
    </div>
  );
}
