"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

type Cmd =
  | { type: "M"; x: number; y: number }
  | { type: "L"; x: number; y: number }
  | { type: "C"; x1: number; y1: number; x2: number; y2: number; x: number; y: number }
  | { type: "Q"; x1: number; y1: number; x: number; y: number }
  | { type: "Z" };

interface Pt { x: number; y: number }
interface Handle { from: Pt; cp: Pt }
interface LineGeo { d: string; handles: Handle[] }

function d2(a: Pt, b: Pt) {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

function extract(commands: Cmd[], threshold = 7): LineGeo {
  let d = "";
  const rawHandles: Handle[] = [];
  let cur: Pt = { x: 0, y: 0 };

  for (const cmd of commands) {
    if (cmd.type === "M") {
      d += `M${cmd.x},${cmd.y}`;
      cur = { x: cmd.x, y: cmd.y };
    } else if (cmd.type === "L") {
      d += `L${cmd.x},${cmd.y}`;
      cur = { x: cmd.x, y: cmd.y };
    } else if (cmd.type === "C") {
      const cp1: Pt = { x: cmd.x1, y: cmd.y1 };
      const cp2: Pt = { x: cmd.x2, y: cmd.y2 };
      const end: Pt = { x: cmd.x, y: cmd.y };
      d += `C${cp1.x},${cp1.y},${cp2.x},${cp2.y},${end.x},${end.y}`;
      if (d2(cur, cp1) > threshold) rawHandles.push({ from: { ...cur }, cp: cp1 });
      if (d2(end, cp2) > threshold) rawHandles.push({ from: end, cp: cp2 });
      cur = end;
    } else if (cmd.type === "Q") {
      const cp1: Pt = { x: cmd.x1, y: cmd.y1 };
      const end: Pt = { x: cmd.x, y: cmd.y };
      d += `Q${cp1.x},${cp1.y},${end.x},${end.y}`;
      if (d2(cur, cp1) > threshold) rawHandles.push({ from: { ...cur }, cp: cp1 });
      cur = end;
    } else if (cmd.type === "Z") {
      d += "Z";
    }
  }

  const handles = [...rawHandles]
    .sort((a, b) => d2(b.from, b.cp) - d2(a.from, a.cp))
    .slice(0, 38);

  return { d, handles };
}

export function BezierAnatomy() {
  const [geo, setGeo] = useState<{
    line1: LineGeo;
    line2: LineGeo;
    vb: string;
  } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { parse } = await import("opentype.js");
        const res = await fetch("/fonts/CormorantGaramond-Italic.ttf");
        const buf = await res.arrayBuffer();
        const font = parse(buf);

        const fs = 120;
        const lh = fs * 1.24;

        const p1 = font.getPath("shrvan", 0, 0, fs);
        const p2 = font.getPath("benke", 0, lh, fs);

        const bb1 = p1.getBoundingBox();
        const bb2 = p2.getBoundingBox();

        const padX = 18;
        const padY = 36;
        const vbX = Math.min(bb1.x1, bb2.x1) - padX;
        const vbY = bb1.y1 - padY;
        const vbW = Math.max(bb1.x2, bb2.x2) - vbX + padX;
        const vbH = bb2.y2 - vbY + padY;

        setGeo({
          line1: extract(p1.commands as Cmd[], 7),
          line2: extract(p2.commands as Cmd[], 7),
          vb: `${vbX} ${vbY} ${vbW} ${vbH}`,
        });
      } catch {
        // silently fail — page renders without this component
      }
    })();
  }, []);

  if (!geo) return null;

  return (
    <svg
      viewBox={geo.vb}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* shrvan — primary, brighter */}
      <motion.path
        d={geo.line1.d}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.7}
        strokeOpacity={0.55}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
      />

      {/* benke — secondary, dimmer */}
      <motion.path
        d={geo.line2.d}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.55}
        strokeOpacity={0.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.0, ease: [0.4, 0, 0.2, 1], delay: 0.55 }}
      />

      {/* Handles for shrvan */}
      {geo.line1.handles.map((h, i) => (
        <motion.g
          key={`h1-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 + i * 0.02, duration: 0.35 }}
        >
          <line
            x1={h.from.x} y1={h.from.y}
            x2={h.cp.x} y2={h.cp.y}
            stroke="currentColor"
            strokeWidth={0.35}
            strokeOpacity={0.2}
            strokeDasharray="1.8,1.8"
          />
        </motion.g>
      ))}

      {/* Handles for benke */}
      {geo.line2.handles.map((h, i) => (
        <motion.g
          key={`h2-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 + i * 0.02, duration: 0.35 }}
        >
          <line
            x1={h.from.x} y1={h.from.y}
            x2={h.cp.x} y2={h.cp.y}
            stroke="currentColor"
            strokeWidth={0.3}
            strokeOpacity={0.1}
            strokeDasharray="1.5,1.5"
          />
        </motion.g>
      ))}

    </svg>
  );
}
