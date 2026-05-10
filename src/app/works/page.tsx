import { PageLayout } from "@/components/page-layout";
import { ArrowUpRight } from "lucide-react";
import { basehub } from "basehub";

async function getWorks() {
  try {
    const data = await basehub().query({
      works: {
        items: {
          _id: true,
          _title: true,
          _slug: true,
          description: true,
          href: true,
          role: true,
        },
      },
    });
    return data?.works?.items ?? null;
  } catch {
    return null;
  }
}

const fallback = [
  { _id: "1", _title: "project name", _slug: "project-name", description: "brief description of what this does.", href: "#", role: "full-stack" },
  { _id: "2", _title: "another project", _slug: "another-project", description: "brief description of what this does.", href: "#", role: "backend" },
  { _id: "3", _title: "something cool", _slug: "something-cool", description: "brief description of what this does.", href: "#", role: "frontend" },
];

export default async function WorksPage() {
  const works = await getWorks();
  const items = works ?? fallback;
  const isLive = works !== null;

  return (
    <PageLayout>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header — fixed, doesn't scroll */}
        <div className="shrink-0 px-5 sm:px-8 lg:px-10 xl:px-12 py-10 border-b border-border">
          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground/50 font-mono">
            selected works
          </span>
          <h1 className="font-serif italic text-5xl sm:text-6xl mt-1.5 leading-none">
            projects.
          </h1>
          {!isLive && (
            <p className="text-[9px] font-mono text-muted-foreground/30 mt-2">
              ↳ basehub content unavailable — showing placeholder
            </p>
          )}
        </div>

        {/* List — scrollable area */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="flex flex-col px-5 sm:px-8 lg:px-10 xl:px-12">
            {items.map((item, i) => (
              <a
                key={item._id ?? i}
                href={item.href ?? "#"}
                target={item.href && item.href !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-start justify-between py-7 border-b border-border hover:pl-2 transition-all duration-200"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[8px] font-mono text-muted-foreground/30 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif italic text-xl text-foreground leading-tight">
                      {item._title}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-6 shrink-0 pt-0.5">
                  {item.role && (
                    <span className="text-[8px] font-mono text-muted-foreground/30">{item.role}</span>
                  )}
                  <ArrowUpRight
                    size={13}
                    className="text-muted-foreground/20 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
