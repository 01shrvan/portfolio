import { cn } from "@/lib/utils";
import {
  ArrowRight01Icon,
  BookOpen01Icon,
  Briefcase01Icon,
  Cancel01Icon,
  Clock01Icon,
  Home01Icon,
  Menu02Icon,
  Message01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";
import Time from "./Time";

const links = [
  {
    href: "/",
    label: "home",
    icon: Home01Icon,
  },
  {
    href: "/works",
    label: "works",
    icon: Briefcase01Icon,
  },
  {
    href: "/writings",
    label: "writings",
    icon: BookOpen01Icon,
  },
];

function SidebarContent() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const currentPath = `/${window.location.pathname.split("/")[1]}`;
  const isHome = window.location.pathname === "/";

  return (
    <nav className="flex h-full flex-col overflow-hidden">
      <div className="shrink-0 border-b border-border/70 pb-4">
        <a
          href="/"
          className="font-naori text-[2.4rem] leading-none tracking-tight lg:text-5xl"
        >
          shrvan
        </a>
        <p className="mt-2 text-xs tracking-wide text-muted-foreground max-[420px]:hidden">
          maker, builder, breaker
        </p>
      </div>

      <ul className="flex-1 space-y-2 overflow-y-auto pt-3 pr-1 text-base">
        {links.map((link, index) => {
          const isActive = link.href === currentPath || (link.href === "/" && isHome);
          return (
            <motion.li
              className="px-0.5"
              key={link.href}
              initial={{ opacity: isActive ? 1 : 0.8 }}
              animate={{
                opacity: isActive
                  ? 1
                  : hoveredIndex === null
                    ? 0.8
                    : hoveredIndex === index
                      ? 1
                      : 0.45,
              }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a
                href={link.href}
                className={cn(
                  "group flex items-center justify-between rounded-xl border px-3 py-2.5 transition-all duration-200",
                  isActive
                    ? "border-border/90 bg-card text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border/70 hover:bg-card/50 hover:text-foreground",
                )}
              >
                <span className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={link.icon} size={17} strokeWidth={1.8} />
                  <span>{link.label}</span>
                </span>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={15}
                  strokeWidth={1.9}
                  className={cn(
                    "transition-transform duration-200",
                    isActive
                      ? "translate-x-0 text-foreground"
                      : "translate-x-0 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-foreground",
                  )}
                />
              </a>
            </motion.li>
          );
        })}
      </ul>

      <div className="shrink-0 space-y-2 border-t border-border/70 pt-2.5">
        <a
          href="/connect"
          className="group flex items-center justify-between rounded-xl border border-border/80 bg-card/60 px-3 py-2 text-sm transition hover:border-border hover:bg-card"
        >
          <span className="flex items-center gap-2.5">
            <HugeiconsIcon icon={Message01Icon} size={17} strokeWidth={1.8} />
            connect
          </span>
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={15}
            strokeWidth={1.9}
            className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground"
          />
        </a>

        <div className="flex items-center justify-between rounded-xl border border-border/70 px-3 py-1.5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <HugeiconsIcon icon={Clock01Icon} size={15} strokeWidth={1.9} />
            local time
          </span>
          <Time />
        </div>
      </div>
    </nav>
  );
}

export default function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isOpen, setIsOpen] = React.useState(false);

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <>
      {!isDesktop && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 rounded-full border border-border/80 bg-background/80 p-2 text-foreground shadow-sm backdrop-blur-sm"
          whileTap={{ scale: 0.94 }}
          aria-label="Open navigation"
        >
          <HugeiconsIcon icon={Menu02Icon} size={22} strokeWidth={1.9} />
        </motion.button>
      )}
      <AnimatePresence>
        {!isDesktop && isOpen && (
          <motion.button
            aria-label="Close navigation"
            className="fixed inset-0 z-[998] bg-foreground/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
        {(isDesktop || isOpen) && (
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 z-[999] w-72 overflow-hidden border-r border-border/65 bg-background px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-4 lg:w-64 lg:py-8"
          >
            {!isDesktop && (
              <motion.button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 rounded-full border border-border/80 bg-background/80 p-1.5"
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HugeiconsIcon icon={Cancel01Icon} size={20} strokeWidth={1.9} />
              </motion.button>
            )}
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
