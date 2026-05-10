"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { motion } from "motion/react";
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

const EMAIL = "benkeshrvan@gmail.com";

function EmailCard() {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="relative w-full overflow-hidden border border-border group cursor-pointer"
      onClick={copy}
    >
      <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />
      <div className="p-5 sm:p-6 flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground/70 font-mono">email</span>
          <motion.div
            animate={copied ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.25 }}
            className="text-muted-foreground/60 group-hover:text-foreground transition-colors duration-200"
          >
            {copied ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} />}
          </motion.div>
        </div>
        <div>
          <p className="text-base sm:text-xl font-mono text-foreground tracking-tight break-all">{EMAIL}</p>
          <p className="text-xs font-mono text-muted-foreground/70 mt-1.5 uppercase tracking-[0.15em]">
            {copied ? "copied ✓" : "click to copy"}
          </p>
        </div>
        <div className="h-px w-full bg-border/50" />
        <a
          href={`mailto:${EMAIL}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground group-hover:text-foreground transition-colors duration-300"
        >
          <span>open in mail</span>
          <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
      <span className="absolute h-3 w-3 border-foreground/20 group-hover:border-foreground border-b border-r bottom-0 right-0 transition-colors duration-300" />
      <span className="absolute h-3 w-3 border-foreground/20 group-hover:border-foreground border-b border-l bottom-0 left-0 transition-colors duration-300" />
      <span className="absolute h-3 w-3 border-foreground/20 group-hover:border-foreground border-t border-r top-0 right-0 transition-colors duration-300" />
      <span className="absolute h-3 w-3 border-foreground/20 group-hover:border-foreground border-t border-l top-0 left-0 transition-colors duration-300" />
    </motion.div>
  );
}

function SocialCard({ label, handle, href, delay }: { label: string; handle: string; href: string; delay: number }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className="relative flex-1 overflow-hidden border border-border group block"
    >
      <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />
      <div className="p-4 sm:p-5 flex flex-col justify-between h-[88px]">
        <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground/70 font-mono">{label}</span>
        <div className="flex items-end justify-between">
          <span className="text-sm font-mono text-foreground">{handle}</span>
          <ArrowUpRight size={12} className="text-muted-foreground/50 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200" />
        </div>
      </div>
      <span className="absolute h-2.5 w-2.5 border-foreground/20 group-hover:border-foreground border-b border-r bottom-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/20 group-hover:border-foreground border-b border-l bottom-0 left-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/20 group-hover:border-foreground border-t border-r top-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/20 group-hover:border-foreground border-t border-l top-0 left-0 transition-colors duration-300" />
    </motion.a>
  );
}

const navLinks = [
  { href: "/writings", label: "writings" },
  { href: "/works", label: "works" },
  { href: "/connect", label: "connect" },
];

export default function ConnectPage() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">

      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col border-x shrink-0">
        <nav className="relative flex h-14 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-serif italic text-xl tracking-tight">astra</Link>
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

          <div className="flex-1 flex flex-col justify-center px-5 sm:px-8 lg:px-10 xl:px-12 py-10 md:border-r border-border overflow-y-auto no-scrollbar">
            <motion.span
              className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground/60 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              03 · connect
            </motion.span>

            <motion.h1
              className="font-serif italic text-5xl sm:text-6xl lg:text-7xl leading-none mt-2"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(-30% -5% -30% -5%)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              let&apos;s build
            </motion.h1>
            <motion.h1
              className="font-serif italic text-5xl sm:text-6xl lg:text-7xl leading-none text-foreground/35"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(-30% -5% -30% -5%)" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              something.
            </motion.h1>

            <motion.p
              className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              open to collaborations, freelance work, or just a good conversation about code and craft.
            </motion.p>

            <motion.div
              className="mt-5 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full bg-foreground opacity-75 animate-[ping-sequence_2s_linear_infinite]" />
                <span className="relative inline-flex h-1.5 w-1.5 bg-foreground" />
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/80">available for work</span>
            </motion.div>

            <div className="mt-8 flex flex-col gap-3 md:hidden">
              <EmailCard />
              <div className="flex gap-3">
                <SocialCard label="github" handle="01shrvan" href="https://github.com/01shrvan" delay={0.2} />
                <SocialCard label="x / twitter" handle="@01shrvan" href="https://x.com/01shrvan" delay={0.28} />
              </div>
            </div>
          </div>

          <div className="hidden md:flex w-[380px] lg:w-[420px] xl:w-[460px] shrink-0 flex-col justify-center px-6 lg:px-8 py-8 gap-4 overflow-y-auto no-scrollbar">
            <EmailCard />
            <div className="flex gap-4">
              <SocialCard label="github" handle="01shrvan" href="https://github.com/01shrvan" delay={0.2} />
              <SocialCard label="x / twitter" handle="@01shrvan" href="https://x.com/01shrvan" delay={0.28} />
            </div>
          </div>

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
