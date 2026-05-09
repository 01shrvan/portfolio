const links = [
  {
    title: "twitter",
    href: "https://twitter.com/01shrvan",
    handle: "@01shrvan",
  },
  { title: "github", href: "https://github.com/01shrvan", handle: "@01shrvan" },
  {
    title: "linkedin",
    href: "https://www.linkedin.com/in/shrvanbenke",
    handle: "shrvan benke",
  },
  {
    title: "email",
    href: "mailto:benkeshrvan@gmail.com",
    handle: "benkeshrvan@gmail.com",
  },
];

export default function ConnectLinks() {
  return (
    <ul className="flex flex-col">
      {links.map((link, index) => (
        <li key={index} className="group border-t border-border last:border-b">
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-between px-4 py-4 transition-colors duration-200 group-hover:bg-muted/20 overflow-hidden"
          >
            <span className="absolute h-2.5 w-2.5 border-foreground/[0.1] group-hover:border-foreground/40 border-t border-l top-0 left-0 transition-colors duration-300" />
            <span className="absolute h-2.5 w-2.5 border-foreground/[0.1] group-hover:border-foreground/40 border-t border-r top-0 right-0 transition-colors duration-300" />
            <span className="absolute h-2.5 w-2.5 border-foreground/[0.1] group-hover:border-foreground/40 border-b border-l bottom-0 left-0 transition-colors duration-300" />
            <span className="absolute h-2.5 w-2.5 border-foreground/[0.1] group-hover:border-foreground/40 border-b border-r bottom-0 right-0 transition-colors duration-300" />

            <span className="shine absolute -top-1/2 h-[200%] w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />

            <div className="flex flex-col gap-0.5 z-10">
              <span className="text-sm font-medium">{link.title}</span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {link.handle}
              </span>
            </div>

            <span className="overflow-hidden w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-200 text-muted-foreground font-mono text-sm z-10">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
