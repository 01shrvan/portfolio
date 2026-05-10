"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const technologies = [
  { name: "next.js", url: "https://nextjs.org" },
  { name: "react", url: "https://react.dev" },
  { name: "typescript", url: "https://typescriptlang.org" },
  { name: "tailwind", url: "https://tailwindcss.com" },
  { name: "python", url: "https://python.org" },
  { name: "node.js", url: "https://nodejs.org" },
  { name: "postgresql", url: "https://postgresql.org" },
  { name: "prisma", url: "https://prisma.io" },
  { name: "openai", url: "https://openai.com" },
  { name: "figma", url: "https://figma.com" },
];

export function TechGrid() {
  return (
    <div className="grid grid-cols-5 h-full">
      {technologies.map((tech, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        return (
          <motion.a
            key={tech.name}
            href={tech.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.6 + i * 0.05,
              ease: "easeOut",
            }}
            className={[
              "group relative flex items-center justify-center p-4 transition-colors duration-200 hover:bg-muted/30",
              col !== 4 ? "border-r border-border" : "",
              row === 0 ? "border-b border-border" : "",
            ].join(" ")}
          >
            <span className="text-[9px] font-mono text-muted-foreground group-hover:text-foreground transition-colors duration-200">
              {tech.name}
            </span>
            <ArrowUpRight
              size={8}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-60 transition-opacity duration-200 text-foreground"
            />
            {col !== 4 && row === 0 && (
              <span className="absolute -bottom-[3px] -right-[3px] size-1.5 rounded-full border border-border bg-background z-10" />
            )}
          </motion.a>
        );
      })}
    </div>
  );
}
