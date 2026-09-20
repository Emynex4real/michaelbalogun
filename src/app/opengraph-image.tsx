import { ImageResponse } from "next/og";
import { site, statement } from "@/content/site";

/**
 * The share card. The metadata declares `summary_large_image`, so without this
 * route every link posted to LinkedIn or X renders as a blank rectangle.
 * Drawn with plain divs — Satori supports no external CSS and no CSS modules,
 * so the drafting-paper tokens are repeated here by hand.
 */
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#ece8df";
const INK = "#16181c";
const INK_MUTED = "#676d75";
const LINE = "rgba(22, 24, 28, 0.16)";
const ACCENT = "#b23a17";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          backgroundImage: `linear-gradient(to right, rgba(22,24,28,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(22,24,28,0.05) 1px, transparent 1px)`,
          backgroundSize: "88px 88px",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          color: INK,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: INK_MUTED,
            borderBottom: `1px solid ${LINE}`,
            paddingBottom: 24,
          }}
        >
          <span>{site.name}</span>
          <span>Rev {site.revision}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ width: 56, height: 3, background: ACCENT }} />
            <span
              style={{
                fontSize: 22,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: INK_MUTED,
              }}
            >
              {site.role}
            </span>
          </div>
          <div style={{ fontSize: 74, lineHeight: 1.08, maxWidth: 940 }}>{statement.headline}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: INK_MUTED,
            borderTop: `1px solid ${LINE}`,
            paddingTop: 24,
          }}
        >
          <span>{site.location}</span>
          <span>{site.availability}</span>
        </div>
      </div>
    ),
    size,
  );
}
