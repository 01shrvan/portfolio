"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface NavbarProps {
  pathname: string;
}

const navLinks = [
  { href: "/writings", text: "writings" },
  { href: "/works", text: "works" },
];

export default function Navbar({ pathname }: NavbarProps) {
  const [hovered, setHovered] = React.useState<number | string | null>(null);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="relative px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between z-20 shrink-0">
      <a
        href="/"
        className="font-sans text-xl sm:text-2xl font-semibold tracking-tight leading-none shrink-0"
      >
        shrvan
      </a>

      <nav className="flex items-center gap-0.5">
        <ul className="flex items-center">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <motion.a
                href={link.href}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                animate={{
                  opacity: hovered !== null && hovered !== i ? 0.25 : 1,
                  filter:
                    hovered !== null && hovered !== i
                      ? "blur(1px)"
                      : "blur(0px)",
                }}
                transition={{ duration: 0.15 }}
                className={cn(
                  "relative px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.18em] transition-colors duration-200",
                  isActive(link.href)
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive(link.href) && (
                  <span className="absolute left-0.5 top-1/2 -translate-y-1/2 text-foreground/30 text-[7px]">
                    ▸
                  </span>
                )}
                {link.text}
              </motion.a>
            </li>
          ))}
        </ul>

        <span className="w-px h-3 bg-border mx-0.5 sm:mx-1" />

        <motion.a
          href="/connect"
          onMouseEnter={() => setHovered("connect")}
          onMouseLeave={() => setHovered(null)}
          animate={{
            opacity: hovered !== null && hovered !== "connect" ? 0.25 : 1,
            filter:
              hovered !== null && hovered !== "connect"
                ? "blur(1px)"
                : "blur(0px)",
          }}
          transition={{ duration: 0.15 }}
          className={cn(
            "relative px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.18em] transition-colors duration-200",
            isActive("/connect")
              ? "text-foreground font-medium"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {isActive("/connect") && (
            <span className="absolute left-0.5 top-1/2 -translate-y-1/2 text-foreground/30 text-[7px]">
              ▸
            </span>
          )}
          connect
        </motion.a>
      </nav>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen border-b border-border pointer-events-none" />
      <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 size-1.5 rounded-full border border-border bg-background z-10" />
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 size-1.5 rounded-full border border-border bg-background z-10" />
    </header>
  );
}
