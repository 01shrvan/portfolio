"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const technologies = [
  { name: "next.js",    url: "https://nextjs.org" },
  { name: "typescript", url: "https://typescriptlang.org" },
  { name: "react",      url: "https://react.dev" },
  { name: "tailwind",   url: "https://tailwindcss.com" },
  { name: "python",     url: "https://python.org" },
  { name: "node.js",    url: "https://nodejs.org" },
  { name: "postgresql", url: "https://postgresql.org" },
  { name: "openai",     url: "https://openai.com" },
];

const COLS = 2;
const TOTAL_ROWS = Math.ceil(technologies.length / COLS);

export function TechGrid() {
  return (
    <>
      <div className="md:hidden h-full flex flex-col justify-center px-6 py-4 gap-3">
        <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60">
          stack
        </span>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {technologies.map((tech, i) => (
            <motion.a
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
              className="text-[10px] font-mono text-muted-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              {tech.name}
            </motion.a>
          ))}
        </div>
      </div>

      <div className="hidden md:grid grid-cols-2 h-full">
        {technologies.map((tech, i) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          const isLastRow = row === TOTAL_ROWS - 1;
          const isLastCol = col === COLS - 1;

          return (
            <motion.a
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
              className={[
                "group relative flex items-center justify-center transition-colors duration-200 hover:bg-muted/30",
                !isLastCol ? "border-r border-border" : "",
                !isLastRow ? "border-b border-border" : "",
              ].join(" ")}
            >
              <span className="text-[9px] font-mono text-muted-foreground/70 group-hover:text-foreground transition-colors duration-200 select-none">
                {tech.name}
              </span>
              <ArrowUpRight
                size={9}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-50 transition-opacity duration-200 text-foreground"
              />
              {!isLastCol && !isLastRow && (
                <span className="absolute -bottom-[3px] -right-[3px] size-1.5 rounded-full border border-border bg-background z-10" />
              )}
            </motion.a>
          );
        })}
      </div>
    </>
  );
}
