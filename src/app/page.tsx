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

        <div className="mx-auto flex w-full h-full max-w-7xl min-w-0 border-x overflow-hidden flex-col md:flex-row">

          <div className="flex-1 flex flex-col justify-end px-5 sm:px-8 lg:px-10 xl:px-12 py-8 md:py-12 border-b md:border-b-0 md:border-r border-border overflow-hidden">
            <motion.span
              className="text-[8px] font-mono uppercase tracking-[0.3em] text-muted-foreground/50 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.5 }}
            >
              mmxxv
            </motion.span>

            <div>
              {["shrvan", "benke"].map((word, i) => (
                <motion.p
                  key={word}
                  className={[
                    "font-serif italic block tracking-tight",
                    "text-[clamp(4.5rem,11vw,9.5rem)]",
                    "leading-[0.85]",
                    i === 1 ? "text-foreground/25" : "text-foreground",
                  ].join(" ")}
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  animate={{ clipPath: "inset(-30% -5% -30% -5%)" }}
                  transition={{ duration: 0.95, delay: 0.1 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.p>
              ))}
            </div>
          </div>

          <motion.div
            className="w-full md:w-[280px] lg:w-[320px] xl:w-[340px] shrink-0 flex flex-col overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="px-6 py-5 border-b border-border">
              <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 block mb-1.5">
                role
              </span>
              <span className="text-sm text-foreground">full-stack developer</span>
            </div>

            <div className="px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full bg-foreground opacity-75 animate-[ping-sequence_2s_linear_infinite]" />
                  <span className="relative inline-flex h-1.5 w-1.5 bg-foreground" />
                </span>
                <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  open to work
                </span>
              </div>
              <div className="space-y-1">
                {["freelance", "contracts", "full-time"].map((t) => (
                  <p key={t} className="text-xs font-mono text-muted-foreground/70">{t}</p>
                ))}
              </div>
            </div>

            <div className="px-6 py-5 border-b border-border flex-1">
              <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 block mb-3">
                stack
              </span>
              <div className="flex flex-wrap gap-x-2 gap-y-1.5">
                {stack.map((t) => (
                  <span key={t} className="text-[9px] font-mono text-muted-foreground/80 hover:text-foreground transition-colors cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-6 py-5">
              <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 block mb-3">
                links
              </span>
              <div className="flex flex-col gap-2">
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
