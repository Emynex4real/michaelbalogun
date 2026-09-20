import { ImageResponse } from "next/og";

/**
 * The registration mark from the masthead, as the tab icon. Replaces the
 * Create Next App default, which is the one thing on a portfolio that tells a
 * reviewer nobody finished the job.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16181c",
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            border: "3px solid #d4562a",
            background: "rgba(212, 86, 42, 0.25)",
          }}
        />
      </div>
    ),
    size,
  );
}
