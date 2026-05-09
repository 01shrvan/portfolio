import { ImageResponse } from "@vercel/og";
import { createElement as h } from "react";

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") ?? "building things for the web.";

  return new ImageResponse(
    h(
      "div",
      {
        style: {
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#f0f0f0",
          fontFamily: "Inter, sans-serif",
          padding: "64px 72px",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        },
      },
      h("div", {
        style: {
          position: "absolute",
          top: 0,
          left: 72,
          right: 72,
          height: "1px",
          background: "#1c1c1c",
        },
      }),
      h("div", {
        style: {
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 72,
          width: "1px",
          background: "#1c1c1c",
        },
      }),
      h("div", {
        style: {
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 72,
          width: "1px",
          background: "#1c1c1c",
        },
      }),
      h("div", {
        style: {
          position: "absolute",
          bottom: 0,
          left: 72,
          right: 72,
          height: "1px",
          background: "#1c1c1c",
        },
      }),
      h(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: "32px" } },
        h(
          "div",
          {
            style: {
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#555",
              fontFamily: "monospace",
            },
          },
          "shrvan benke · portfolio",
        ),
        h(
          "div",
          {
            style: {
              fontSize: "72px",
              fontWeight: "700",
              lineHeight: "1",
              letterSpacing: "-2px",
              color: "#f5f5f5",
              maxWidth: "880px",
            },
          },
          title,
        ),
      ),
      h(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          },
        },
        h(
          "div",
          {
            style: {
              fontSize: "12px",
              color: "#444",
              fontFamily: "monospace",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            },
          },
          "full-stack · ai · design",
        ),
        h(
          "div",
          {
            style: {
              fontSize: "22px",
              fontWeight: "700",
              color: "#333",
              letterSpacing: "-0.5px",
            },
          },
          "shrvan",
        ),
      ),
    ),
    { width: 1200, height: 630 },
  );
}
