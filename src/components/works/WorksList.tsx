import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Work {
  _title: string;
  role: string;
  description?: string | null;
  href: string;
}

interface WorksListProps {
  works: Work[];
}

export default function WorksList({ works }: WorksListProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  return (
    <ul className="flex flex-col">
      {works.map((work, index) => (
        <li
          key={index}
          className="group border-t border-border last:border-b"
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        >
          <a
            href={work.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-between px-4 py-4 transition-colors duration-200 group-hover:bg-muted/20 overflow-hidden"
          >
            <span className="absolute h-2.5 w-2.5 border-foreground/[0.1] group-hover:border-foreground/40 border-t border-l top-0 left-0 transition-colors duration-300" />
            <span className="absolute h-2.5 w-2.5 border-foreground/[0.1] group-hover:border-foreground/40 border-t border-r top-0 right-0 transition-colors duration-300" />
            <span className="absolute h-2.5 w-2.5 border-foreground/[0.1] group-hover:border-foreground/40 border-b border-l bottom-0 left-0 transition-colors duration-300" />
            <span className="absolute h-2.5 w-2.5 border-foreground/[0.1] group-hover:border-foreground/40 border-b border-r bottom-0 right-0 transition-colors duration-300" />

            <span className="shine absolute -top-1/2 h-[200%] w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0 z-10">
              <p className="font-medium text-sm truncate">{work._title}</p>
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground shrink-0">
                {work.role}
              </span>
            </div>

            <span className="overflow-hidden w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-200 text-muted-foreground font-mono text-xs shrink-0 ml-4 z-10">
              ↗
            </span>
          </a>

          <AnimatePresence>
            {hovered === index && work.description && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.12 }}
                className="fixed z-50 pointer-events-none w-52 border border-border bg-card px-3 py-2.5"
                style={{ top: cursor.y + 14, left: cursor.x + 14 }}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground mb-1">
                  {work._title}
                </p>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {work.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
}
