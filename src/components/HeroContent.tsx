"use client";

import { motion } from "framer-motion";

function Brackets() {
  return (
    <>
      <span className="absolute h-2 w-2 border-transparent group-hover:border-foreground/40 border-t border-l top-0 left-0 transition-colors duration-300" />
      <span className="absolute h-2 w-2 border-transparent group-hover:border-foreground/40 border-t border-r top-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2 w-2 border-transparent group-hover:border-foreground/40 border-b border-l bottom-0 left-0 transition-colors duration-300" />
      <span className="absolute h-2 w-2 border-transparent group-hover:border-foreground/40 border-b border-r bottom-0 right-0 transition-colors duration-300" />
    </>
  );
}

const workItems = [
  { label: "web apps", tech: "next.js · react" },
  { label: "ai tools", tech: "openai · python" },
  { label: "apis", tech: "trpc · rest" },
  { label: "ui/design", tech: "figma · tailwind" },
];

function WorksCard() {
  return (
    <motion.a
      href="/works"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.3 }}
      className="relative h-[136px] border border-border overflow-hidden cursor-pointer group block"
    >
      <span className="shine absolute -top-1/2 h-[200%] w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none z-20" />

      <div className="absolute inset-0 right-[130px] flex flex-col justify-between p-4">
        <div>
          <span className="text-[8px] uppercase tracking-[0.18em] text-muted-foreground/35">01 · works</span>
          <p className="text-[13px] font-bold mt-1 leading-[1.1]">shipped<br />projects.</p>
        </div>
        <span className="text-[8px] text-foreground/40 group-hover:text-foreground/70 flex items-center gap-1 group-hover:gap-1.5 transition-all duration-300">
          explore <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </span>
      </div>

      <div className="absolute top-3 bottom-3 right-[130px] border-l border-dashed border-border/25" />
      <div className="absolute top-1/2 right-[130px] -translate-y-1/2 -translate-x-1/2 size-1.5 rounded-full border border-border/50 bg-background" />

      <div className="absolute inset-y-0 right-0 w-[130px] flex flex-col justify-center">
        {workItems.map((item, i) => (
          <div key={item.label}>
            <div
              className="px-3 py-[4.5px] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
              style={{ transitionDelay: `${70 + i * 50}ms` }}
            >
              <span className="text-[7px] font-mono text-foreground/55 block leading-none">{item.label}</span>
              <span className="text-[7px] font-mono text-muted-foreground/30 mt-0.5 block">{item.tech}</span>
            </div>
            {i < workItems.length - 1 && <div className="mx-3 h-px bg-border/10" />}
          </div>
        ))}
      </div>

      <Brackets />
    </motion.a>
  );
}

const stackItems = [
  { name: "next.js", role: "framework" },
  { name: "react", role: "ui lib" },
  { name: "typescript", role: "language" },
  { name: "tailwind", role: "css" },
];

function StackCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.42 }}
      className="relative h-[136px] border border-border overflow-hidden cursor-pointer group"
    >
      <span className="shine absolute -top-1/2 h-[200%] w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none z-20" />

      <div className="p-4 pb-0">
        <span className="text-[8px] uppercase tracking-[0.18em] text-muted-foreground/35">02 · stack</span>
        <p className="text-[13px] font-bold mt-1 leading-[1.1]">current<br />toolset.</p>
      </div>

      <div className="absolute top-[68px] left-4 right-4 border-t border-dashed border-border/25" />
      <div className="absolute top-[68px] left-4 -translate-y-1/2 size-1.5 rounded-full border border-border/50 bg-background" />

      <div className="absolute bottom-0 left-0 right-0 h-[62px] flex items-center px-4">
        <div className="flex items-center w-full">
          {stackItems.map((item, i) => (
            <div key={item.name} className="flex items-center flex-1">
              <div
                className="flex flex-col items-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 w-full"
                style={{ transitionDelay: `${70 + i * 50}ms` }}
              >
                <span className="text-[8px] font-mono text-foreground/65 leading-none">{item.name}</span>
                <span className="text-[7px] font-mono text-muted-foreground/30 mt-0.5">{item.role}</span>
              </div>
              {i < stackItems.length - 1 && <div className="w-px h-4 bg-border/15 shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      <Brackets />
    </motion.div>
  );
}

const connectItems = [
  { label: "github", value: "01shrvan" },
  { label: "twitter", value: "@01shrvan" },
  { label: "email", value: "benkeshrvan@gmail" },
];

function ConnectCard() {
  return (
    <motion.a
      href="/connect"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.54 }}
      className="relative h-[136px] border border-border overflow-hidden cursor-pointer group block"
    >
      <span className="shine absolute -top-1/2 h-[200%] w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none z-20" />

      <div className="absolute inset-0 right-[130px] flex flex-col justify-between p-4">
        <div>
          <span className="text-[8px] uppercase tracking-[0.18em] text-muted-foreground/35">03 · connect</span>
          <p className="text-[13px] font-bold mt-1 leading-[1.1]">let's<br />talk.</p>
        </div>
        <span className="text-[8px] font-mono text-muted-foreground/25">pune · india</span>
      </div>

      <div className="absolute top-3 bottom-3 right-[130px] border-l border-dashed border-border/25" />
      <div className="absolute top-1/2 right-[130px] -translate-y-1/2 -translate-x-1/2 size-1.5 rounded-full border border-border/50 bg-background" />

      <div className="absolute inset-y-0 right-0 w-[130px] flex flex-col justify-center">
        {connectItems.map((item, i) => (
          <div key={item.label}>
            <div
              className="px-3 py-[5px] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
              style={{ transitionDelay: `${70 + i * 55}ms` }}
            >
              <span className="text-[7px] font-mono text-muted-foreground/30 block leading-none">{item.label}</span>
              <span className="text-[8px] font-mono text-foreground/55 mt-0.5 block">{item.value}</span>
            </div>
            {i < connectItems.length - 1 && <div className="mx-3 h-px bg-border/10" />}
          </div>
        ))}
      </div>

      <Brackets />
    </motion.a>
  );
}

function HeroLink({ href, children }: { href: string; children: string }) {
  return (
    <div className="relative group w-fit">
      <a
        href={href}
        className="relative block overflow-hidden border border-border/50 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        <span className="shine absolute -top-1/2 h-[200%] w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
        {children}
      </a>
      <span className="absolute h-1.5 w-1.5 border-transparent group-hover:border-foreground/40 border-t border-l top-0 left-0 transition-colors duration-300" />
      <span className="absolute h-1.5 w-1.5 border-transparent group-hover:border-foreground/40 border-t border-r top-0 right-0 transition-colors duration-300" />
      <span className="absolute h-1.5 w-1.5 border-transparent group-hover:border-foreground/40 border-b border-l bottom-0 left-0 transition-colors duration-300" />
      <span className="absolute h-1.5 w-1.5 border-transparent group-hover:border-foreground/40 border-b border-r bottom-0 right-0 transition-colors duration-300" />
    </div>
  );
}

const lines = ["building", "things", "for the web."];

export default function HeroContent() {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-[1fr_340px]">

      <div className="flex flex-col justify-center px-5 sm:px-8 md:px-10 py-8 lg:border-r lg:border-border/40">

        <h1
          className="font-bold tracking-tight leading-[0.88] mb-8"
          style={{ fontSize: "clamp(2.8rem, 8vw, 5rem)" }}
        >
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.72, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            </div>
          ))}
        </h1>

        <motion.p
          className="text-[13px] text-muted-foreground/55 leading-relaxed max-w-[260px] mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          full-stack dev from pune. i care about how things work and how they look — end to end.
        </motion.p>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.62, duration: 0.45 }}
        >
          <HeroLink href="/works">works</HeroLink>
          <HeroLink href="/writings">writings</HeroLink>
        </motion.div>

      </div>

      <div className="hidden lg:flex flex-col justify-center gap-3 px-5 py-6">
        <WorksCard />
        <StackCard />
        <ConnectCard />
      </div>

    </div>
  );
}
