import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Shrvan Benke — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const B = "rgba(255,255,255,0.08)";
const M = "rgba(255,255,255,0.35)";
const D = "rgba(255,255,255,0.18)";
const DD = "rgba(255,255,255,0.07)";

const NAV_H = 56;
const FOOT_H = 56;
const RIGHT_W = 340;

const techRows = [
  ["next.js", "typescript"],
  ["react", "tailwind"],
  ["python", "node.js"],
  ["postgresql", "openai"],
];

export default async function Image() {
  const font = await readFile(
    join(process.cwd(), "public/fonts/CormorantGaramond-Italic.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
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
            backgroundSize: "7px 7px",
            display: "flex",
          }}
        />

        {[
          { l: -5, t: NAV_H - 5 },
          { l: 1200 - 5, t: NAV_H - 5 },
          { l: 1200 - RIGHT_W - 5, t: NAV_H - 5 },
          { l: -5, t: 630 - FOOT_H - 5 },
          { l: 1200 - 5, t: 630 - FOOT_H - 5 },
          { l: 1200 - RIGHT_W - 5, t: 630 - FOOT_H - 5 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pos.l,
              top: pos.t,
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.14)",
              background: "#0a0a0a",
              zIndex: 10,
              display: "flex",
            }}
          />
        ))}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: NAV_H,
            padding: "0 32px",
            borderBottom: `1px solid ${B}`,
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
              color: "#fafafa",
              fontSize: 22,
              fontStyle: "italic",
              fontFamily: "CormorantGaramond",
            }}
          >
            astra
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            {["writings", "works", "connect"].map((link) => (
              <span
                key={link}
                style={{
                  color: M,
                  fontSize: 10,
                  fontFamily: "monospace",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {link}
              </span>
            ))}
          </div>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              border: `1px solid rgba(255,255,255,0.2)`,
              display: "flex",
            }}
          />
        </div>

        <div style={{ display: "flex", flex: 1 }}>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "32px 52px",
              borderRight: `1px solid ${B}`,
            }}
          >
            <div
              style={{
                fontSize: 156,
                fontStyle: "italic",
                fontFamily: "CormorantGaramond",
                color: "rgba(250,250,250,0.88)",
                lineHeight: 0.88,
                letterSpacing: "-0.02em",
                display: "flex",
              }}
            >
              shrvan
            </div>
            <div
              style={{
                fontSize: 156,
                fontStyle: "italic",
                fontFamily: "CormorantGaramond",
                color: "rgba(250,250,250,0.18)",
                lineHeight: 0.88,
                letterSpacing: "-0.02em",
                display: "flex",
              }}
            >
              benke
            </div>
          </div>

          <div
            style={{
              width: RIGHT_W,
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                padding: "22px 24px",
                borderBottom: `1px solid ${B}`,
                display: "flex",
                flexDirection: "column",
                gap: 7,
              }}
            >
              <span
                style={{
                  color: DD,
                  fontSize: 9,
                  fontFamily: "monospace",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                role
              </span>
              <span style={{ color: "#fafafa", fontSize: 14, fontFamily: "serif" }}>
                full-stack developer
              </span>
            </div>

            <div
              style={{
                padding: "22px 24px",
                borderBottom: `1px solid ${B}`,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#fafafa",
                    flexShrink: 0,
                    display: "flex",
                  }}
                />
                <span
                  style={{
                    color: M,
                    fontSize: 9,
                    fontFamily: "monospace",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  open to work
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {["freelance", "contracts", "full-time"].map((t) => (
                  <span
                    key={t}
                    style={{ color: D, fontSize: 12, fontFamily: "monospace" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {techRows.map((row, ri) => (
                <div
                  key={ri}
                  style={{
                    display: "flex",
                    flex: 1,
                    borderBottom:
                      ri < techRows.length - 1 ? `1px solid ${B}` : "none",
                  }}
                >
                  {row.map((tech, ci) => (
                    <div
                      key={tech}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRight: ci === 0 ? `1px solid ${B}` : "none",
                        color: D,
                        fontSize: 11,
                        fontFamily: "monospace",
                      }}
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: FOOT_H,
            padding: "0 32px",
            borderTop: `1px solid ${B}`,
            position: "relative",
            zIndex: 1,
          }}
        >
          <span style={{ color: M, fontSize: 13, fontFamily: "serif" }}>
            built by shrvan
          </span>
          <span
            style={{
              color: DD,
              fontSize: 9,
              fontFamily: "monospace",
              letterSpacing: "0.08em",
            }}
          >
            inspired by akira.sachi.dev
          </span>
          <div
            style={{
              display: "flex",
              gap: 8,
              color: M,
              fontSize: 13,
              fontFamily: "serif",
            }}
          >
            <span>github</span>
            <span style={{ opacity: 0.3 }}>·</span>
            <span>x</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "CormorantGaramond",
          data: font,
          style: "italic",
          weight: 400,
        },
      ],
    }
  );
}
