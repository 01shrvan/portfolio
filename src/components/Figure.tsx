import { useEffect, useState } from "react";
import { Dithering } from "@paper-design/shaders-react";

type Ink = { back: string; front: string };

const DARK: Ink = { back: "#2b2723", front: "#e08a45" };
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
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
        setMode(gl ? "shader" : "static");
      } catch {
        setMode("static");
      }
    }

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
        size={0.32}
        speed={0.35}
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
