"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const RUNG_COUNT = 10;

function Ladder({ side }: { side: "left" | "right" }) {
  return (
    <div className="flex h-full w-full flex-col">
      {Array.from({ length: RUNG_COUNT }).map((_, i) => (
        <div
          key={i}
          className={[
            "relative w-full flex-1",
            side === "left" ? "border-r" : "border-l",
            i !== RUNG_COUNT - 1 ? "border-b-2" : "",
          ].join(" ")}
          style={{
            backgroundImage:
              "repeating-linear-gradient(315deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
            backgroundSize: "7px 7px",
            backgroundAttachment: "fixed",
            color: "var(--ladder-color)",
          }}
        />
      ))}
    </div>
  );
}

const navLinks = [
  { href: "/writings", label: "writings" },
  { href: "/works", label: "works" },
  { href: "/connect", label: "connect" },
];

const stack = ["next.js", "typescript", "react", "python", "postgresql", "tailwind", "openai", "node.js"];

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">

      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col border-x shrink-0">
        <nav className="relative flex h-14 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-serif italic text-xl tracking-tight">shrvan</Link>
          <div className="flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                className="px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors duration-200 font-mono">
                {label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
          <div className="z-10 absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
          <div className="z-10 absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
          <div className="border-b absolute bottom-0 left-1/2 -translate-x-1/2 w-screen" />
        </nav>
      </div>

      <div className="flex-1 w-full overflow-hidden xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,80rem)_minmax(0,1fr)]">
        <aside className="pointer-events-none hidden xl:flex pr-[20%]">
          <Ladder side="left" />
        </aside>

        <div className="mx-auto flex w-full h-full max-w-7xl min-w-0 border-x overflow-hidden flex-col">

          <div className="flex-1 flex flex-col justify-end px-5 sm:px-8 lg:px-10 xl:px-12 pt-10 pb-8 overflow-hidden relative">

            <motion.span
              className="absolute top-8 right-5 sm:right-8 lg:right-10 xl:right-12 text-[8px] font-mono uppercase tracking-[0.25em] text-muted-foreground/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.6 }}
            >
              full-stack developer
            </motion.span>

            <div className="mb-6">
              {["building", "things", "for the web."].map((line, i) => (
                <motion.p
                  key={line}
                  className={[
                    "font-serif italic block tracking-tight",
                    "text-[clamp(4rem,10.5vw,9rem)]",
                    "leading-[0.87]",
                    i === 2 ? "text-foreground/35" : "text-foreground",
                  ].join(" ")}
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  animate={{ clipPath: "inset(-30% -5% -30% -5%)" }}
                  transition={{ duration: 0.9, delay: 0.12 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.p
              className="text-sm text-muted-foreground leading-relaxed max-w-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              i build end-to-end — from data layer to the pixel.
              care about craft, not just shipping.
            </motion.p>
          </div>

          <motion.div
            className="shrink-0 border-t border-border"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <div className="grid grid-cols-3 divide-x divide-border">

              <div className="px-4 sm:px-6 lg:px-8 py-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full bg-foreground opacity-75 animate-[ping-sequence_2s_linear_infinite]" />
                    <span className="relative inline-flex h-1.5 w-1.5 bg-foreground" />
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                    open to work
                  </span>
                </div>
                <p className="text-xs font-mono text-muted-foreground/70">
                  freelance · contracts · full-time
                </p>
              </div>

              <div className="px-4 sm:px-6 lg:px-8 py-5">
                <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">stack</p>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  {stack.map((t) => (
                    <span key={t} className="text-[9px] font-mono text-muted-foreground/80 hover:text-foreground transition-colors cursor-default">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-4 sm:px-6 lg:px-8 py-5">
                <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">links</p>
                <div className="flex flex-col gap-1.5">
                  {[
                    { href: "https://github.com/01shrvan", label: "github ↗", ext: true },
                    { href: "/works", label: "works →", ext: false },
                    { href: "/writings", label: "writings →", ext: false },
                    { href: "/connect", label: "connect →", ext: false },
                  ].map(({ href, label, ext }) => (
                    <a key={href} href={href}
                      target={ext ? "_blank" : undefined}
                      rel={ext ? "noopener noreferrer" : undefined}
                      className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors duration-150 w-fit">
                      {label}
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        <aside className="pointer-events-none hidden xl:flex pl-[20%]">
          <Ladder side="right" />
        </aside>
      </div>

      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col border-x shrink-0">
        <footer className="relative h-14 px-4 sm:px-6">
          <div className="flex h-full items-center justify-between">
            <span className="text-sm text-muted-foreground">
              built by{" "}
              <a href="https://github.com/01shrvan" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground transition-colors">
                shrvan
              </a>
            </span>
            <span className="text-[8px] font-mono text-muted-foreground/40">
              inspired by{" "}
              <a href="https://akira.sachi.dev" target="_blank" rel="noopener noreferrer"
                className="hover:text-muted-foreground transition-colors">
                akira.sachi.dev
              </a>
            </span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <a href="https://github.com/01shrvan" target="_blank" rel="noopener noreferrer"
                className="hover:text-foreground transition-colors">github</a>
              <span className="opacity-30">·</span>
              <a href="https://x.com/01shrvan" target="_blank" rel="noopener noreferrer"
                className="hover:text-foreground transition-colors">x</a>
            </div>
          </div>
          <div className="z-10 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
          <div className="z-10 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
          <div className="border-t absolute top-0 left-1/2 -translate-x-1/2 w-screen" />
        </footer>
      </div>
    </div>
  );
}
