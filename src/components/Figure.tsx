import { useEffect, useState } from "react";
import { Dithering } from "@paper-design/shaders-react";

/* Fig. 1 — the one bit of craft on the page.

   A Paper dithering shader: a moving field resolved into hard on/off dots,
   which is the same halftone logic the rest of the page is printed with.
   It reads in the theme's own ink rather than a brand colour, so it stays
   part of the document instead of sitting on top of it.

   Renders a static dot field when reduced motion is requested or WebGL is
   unavailable — the plate is never an empty box. */

type Ink = { back: string; front: string };

const DARK: Ink = { back: "#2b2723", front: "#f2e8c9" };
const LIGHT: Ink = { back: "#f4eddc", front: "#a8482c" };

function readInk(): Ink {
  return document.documentElement.classList.contains("light") ? LIGHT : DARK;
}

export default function Figure() {
  const [ink, setInk] = useState<Ink>(DARK);
  const [mode, setMode] = useState<"pending" | "shader" | "static">("pending");

  useEffect(() => {
    setInk(readInk());

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode("static");
    } else {
      // Probe rather than assume: some devices hand back a context-less
      // canvas and would render nothing at all.
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
        setMode(gl ? "shader" : "static");
      } catch {
        setMode("static");
      }
    }

    // The theme toggle swaps a class on <html>; follow it.
    const observer = new MutationObserver(() => setInk(readInk()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const field =
    mode === "shader" ? (
      <Dithering
        className="h-full w-full"
        colorBack={ink.back}
        colorFront={ink.front}
        shape="sphere"
        type="4x4"
        size={1.4}
        speed={0.5}
      />
    ) : (
      <div
        className="h-full w-full"
        style={{
          backgroundImage: `radial-gradient(circle, ${ink.front} 0.9px, transparent 0.9px)`,
          backgroundSize: "4px 4px",
        }}
      />
    );

  return (
    <div className="h-full w-full" style={{ background: ink.back }}>
      {field}
    </div>
  );
}
