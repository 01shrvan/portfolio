import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  {
    title: "Twitter",
    href: "https://twitter.com/01shrvan",
    handle: "@01shrvan",
  },
  {
    title: "GitHub",
    href: "https://github.com/01shrvan",
    handle: "@01shrvan",
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/shrvanbenke",
    handle: "Shrvan Benke",
  },
  {
    title: "Email",
    href: "mailto:benkeshrvan@gmail.com",
    handle: "benkeshrvan@gmail.com",
  },
];

export default function ConnectLinks() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 gap-4">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div
            className={cn(
              "relative flex items-center justify-between p-4 border transition-all duration-300",
              hoveredIndex === index
                ? "border-foreground/20 bg-muted/30"
                : "border-border",
            )}
          >
            <div className="flex flex-col">
              <span className="font-medium text-lg">{link.title}</span>
              <span className="text-muted-foreground text-sm mt-1">
                {link.handle}
              </span>
            </div>
            <div className="relative overflow-hidden">
              <ArrowUpRight
                className={cn(
                  "w-6 h-6 transition-transform duration-300 ease-in-out",
                  hoveredIndex === index
                    ? "translate-x-1 -translate-y-1"
                    : "text-muted-foreground",
                )}
              />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
