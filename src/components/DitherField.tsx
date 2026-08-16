"use client";

import { useEffect, useRef } from "react";

/* The signature.

   A luminous lens — a solid core that breaks apart into concentric
   interference rings and then into scattered dots at the edges — resolved
   through a 4×4 Bayer matrix. No greys and no gradients anywhere: every
   dot is either printed or it isn't, exactly the way a halftone plate
   works. What you read as a soft falloff is dot density alone.

   It renders in the page's ink colour, not the accent, so the hero stays a
   two-colour composition and the accent keeps its job as punctuation.

   Cheap by construction: one ImageData pixel per dot, 24fps, paused
   off-screen and on hidden tabs, one static frame under reduced motion. */

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const FPS = 24;

export default function DitherField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    let image: ImageData | null = null;
    let visible = true;
    let last = 0;
    let rgb: [number, number, number] = [245, 239, 228];
    let gain = 1;

    function readInk() {
      const styles = getComputedStyle(document.documentElement);
      const raw = styles
        .getPropertyValue("--field-ink")
        .trim()
        .split(/[\s,]+/)
        .map(Number);
      if (raw.length === 3 && raw.every((n) => !Number.isNaN(n))) {
        rgb = [raw[0], raw[1], raw[2]];
      }
      const g = Number(styles.getPropertyValue("--field-gain"));
      gain = Number.isFinite(g) && g > 0 ? g : 1;
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      // A small plate needs a fine pitch or it reads as scattered noise
      // rather than a halftone.
      const pitch = rect.width < 200 ? 2 : rect.width < 640 ? 4 : 3;
      w = Math.max(1, Math.floor(rect.width / pitch));
      h = Math.max(1, Math.floor(rect.height / pitch));
      canvas!.width = w;
      canvas!.height = h;
      image = ctx!.createImageData(w, h);
    }

    function draw(t: number) {
      if (!image) return;
      const data = image.data;
      const [r, g, b] = rgb;

      // The lens drifts a little so the composition is never quite static.
      const cx = w * (0.5 + 0.035 * Math.sin(t * 0.21));
      const cy = h * (0.5 + 0.045 * Math.cos(t * 0.17));
      const inv = 1 / Math.max(w, 1);
      // Wide plates get an elliptical lens; a square plate gets a round one.
      const ratio = w / Math.max(h, 1);
      const aspect = ratio * (ratio > 2 ? 0.62 : 1);

      for (let y = 0; y < h; y++) {
        const dy = (y - cy) * inv * aspect;
        const row = BAYER[y & 3];
        for (let x = 0; x < w; x++) {
          const dx = (x - cx) * inv;
          const d = Math.sqrt(dx * dx + dy * dy);

          // Solid core, hard falloff — density alone reads as light.
          let core = 1 - d * 2.05;
          if (core < 0) core = 0;
          core *= core;

          const rings = 0.5 + 0.5 * Math.sin(d * 52 - t * 1.35);
          const drift = 0.5 + 0.5 * Math.sin(x * 0.017 - y * 0.011 + t * 0.4);

          let v = (core * (0.7 + 0.46 * rings) + core * drift * 0.16) * gain;
          if (v > 1) v = 1;

          const on = v > (row[x & 3] + 0.5) / 16;
          const i = (y * w + x) << 2;
          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = b;
          data[i + 3] = on ? 255 : 0;
        }
      }
      ctx!.putImageData(image, 0, 0);
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      if (now - last < 1000 / FPS) return;
      last = now;
      draw(now / 1000);
    }

    readInk();
    resize();
    draw(0);

    const ro = new ResizeObserver(() => {
      resize();
      draw(reduced ? 0 : performance.now() / 1000);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);

    // The theme toggle swaps a class on <html>; follow it.
    const mo = new MutationObserver(() => {
      readInk();
      draw(reduced ? 0 : performance.now() / 1000);
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    if (!reduced) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`h-full w-full [image-rendering:pixelated] ${className}`}
    />
  );
}
