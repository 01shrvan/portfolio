import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Shrvan Benke — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 80px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "repeating-linear-gradient(315deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 0, transparent 50%)",
            backgroundSize: "8px 8px",
          }}
        />

        <div
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: 13,
            fontFamily: "monospace",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          full-stack developer
        </div>

        <div
          style={{
            fontSize: 128,
            fontStyle: "italic",
            color: "#fafafa",
            lineHeight: 0.85,
            letterSpacing: "-0.02em",
          }}
        >
          shrvan
        </div>
        <div
          style={{
            fontSize: 128,
            fontStyle: "italic",
            color: "rgba(250,250,250,0.2)",
            lineHeight: 0.85,
            letterSpacing: "-0.02em",
          }}
        >
          benke
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 52,
            color: "rgba(255,255,255,0.35)",
            fontSize: 12,
            fontFamily: "monospace",
            letterSpacing: "0.08em",
          }}
        >
          {["next.js", "·", "react", "·", "python", "·", "typescript", "·", "postgresql", "·", "openai"].map(
            (t, i) => (
              <span key={i}>{t}</span>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
