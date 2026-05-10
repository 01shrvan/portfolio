import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

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

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col border-x shrink-0">
        <nav className="relative flex h-14 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-serif italic text-xl tracking-tight">
            astra
          </Link>
          <div className="flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors duration-200 font-mono"
              >
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

        <main className="mx-auto flex w-full h-full max-w-7xl min-w-0 flex-col border-x overflow-hidden">
          {children}
        </main>

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
