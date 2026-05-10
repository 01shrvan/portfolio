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

      {/* NAV */}
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

      {/* MAIN */}
      <div className="flex-1 w-full overflow-hidden xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,80rem)_minmax(0,1fr)]">
        <aside className="pointer-events-none hidden xl:flex pr-[20%]">
          <Ladder side="left" />
        </aside>

        {/* Content — two distinct zones, not a mirrored 2-col card layout */}
        <div className="mx-auto flex w-full h-full max-w-7xl min-w-0 border-x overflow-hidden flex-col">

          {/* Top zone: editorial headline (takes most of the space) */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

            {/* LEFT — typographic statement */}
            <div className="flex-1 flex flex-col justify-between px-5 sm:px-8 lg:px-10 xl:px-12 py-10 lg:border-r lg:border-border overflow-hidden">

              {/* Headline */}
              <div>
                <motion.div
                  className="overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-muted-foreground/50">
                    full-stack developer · pune, india
                  </span>
                </motion.div>

                <div className="mt-4 space-y-0">
                  {["building", "things", "for the web."].map((line, i) => (
                    <div
                      key={line}
                      className="overflow-hidden"
                      style={{ paddingBottom: 40, marginBottom: -40 }}
                    >
                      <motion.p
                        className={[
                          "font-serif italic leading-[0.92] tracking-tight",
                          "text-[clamp(2.8rem,7.5vw,5.5rem)]",
                          i === 2 ? "text-muted-foreground" : "text-foreground",
                        ].join(" ")}
                        initial={{ y: "115%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {line}
                      </motion.p>
                    </div>
                  ))}
                </div>

                <motion.p
                  className="mt-6 text-sm text-muted-foreground/60 leading-relaxed max-w-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                >
                  i build end-to-end — from data layer to the pixel. care about
                  craft, not just shipping.
                </motion.p>
              </div>

              {/* Stack tags + links at bottom */}
              <div>
                <motion.div
                  className="flex flex-wrap gap-x-3 gap-y-1.5 mb-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                >
                  {stack.map((t) => (
                    <span key={t} className="text-[9px] font-mono text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-default">
                      {t}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.62, duration: 0.35 }}
                >
                  {[
                    { href: "https://github.com/01shrvan", label: "github ↗", ext: true },
                    { href: "/works", label: "works", ext: false },
                    { href: "/writings", label: "writings", ext: false },
                  ].map(({ href, label, ext }) => (
                    <a key={href} href={href}
                      target={ext ? "_blank" : undefined}
                      rel={ext ? "noopener noreferrer" : undefined}
                      className="text-[9px] font-mono uppercase tracking-[0.15em] text-muted-foreground/50 hover:text-foreground border-b border-transparent hover:border-foreground/30 pb-px transition-all duration-200">
                      {label}
                    </a>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* RIGHT — index sidebar (completely different from akira's card stack) */}
            <motion.div
              className="hidden lg:flex lg:w-[260px] xl:w-[300px] shrink-0 flex-col border-t border-border lg:border-t-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Status */}
              <div className="px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full bg-foreground opacity-75 animate-[ping-sequence_2s_linear_infinite]" />
                    <span className="relative inline-flex h-1.5 w-1.5 bg-foreground" />
                  </span>
                  <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                    open to work
                  </span>
                </div>
                <p className="mt-2 text-[9px] text-muted-foreground/40 font-mono">
                  available for freelance, contracts, full-time.
                </p>
              </div>

              {/* Works index */}
              <div className="px-5 py-4 border-b border-border flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50">works</span>
                  <Link href="/works" className="text-[8px] font-mono text-muted-foreground/30 hover:text-foreground transition-colors">all →</Link>
                </div>
                <div className="space-y-0">
                  {[
                    { label: "web apps", note: "next.js · react" },
                    { label: "ai tools", note: "openai · python" },
                    { label: "apis", note: "trpc · rest" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/20 last:border-0">
                      <span className="text-[9px] text-foreground/60">{item.label}</span>
                      <span className="text-[8px] font-mono text-muted-foreground/30">{item.note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Writings index */}
              <div className="px-5 py-4 border-b border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50">writings</span>
                  <Link href="/writings" className="text-[8px] font-mono text-muted-foreground/30 hover:text-foreground transition-colors">all →</Link>
                </div>
                <p className="text-[9px] text-muted-foreground/30 font-mono">thoughts on code, design, craft.</p>
              </div>

              {/* Contact row */}
              <div className="px-5 py-4">
                <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50 block mb-3">links</span>
                <div className="flex items-center gap-3">
                  {[
                    { href: "https://github.com/01shrvan", label: "github" },
                    { href: "https://x.com/01shrvan", label: "x" },
                    { href: "/connect", label: "email" },
                  ].map(({ href, label }) => (
                    <a key={label} href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[9px] font-mono text-muted-foreground/50 hover:text-foreground transition-colors duration-200 border-b border-transparent hover:border-foreground/20 pb-px">
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <aside className="pointer-events-none hidden xl:flex pl-[20%]">
          <Ladder side="right" />
        </aside>
      </div>

      {/* FOOTER */}
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
            <span className="text-[8px] font-mono text-muted-foreground/30">
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
