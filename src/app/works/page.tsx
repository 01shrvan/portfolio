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
  { _id: "1", _title: "project name", _slug: "project-name", description: "brief description of what this does and the problem it solves.", href: "#", role: "full-stack" },
  { _id: "2", _title: "another project", _slug: "another-project", description: "brief description of what this does and the problem it solves.", href: "#", role: "backend" },
  { _id: "3", _title: "something cool", _slug: "something-cool", description: "brief description of what this does and the problem it solves.", href: "#", role: "frontend" },
];

export default async function WorksPage() {
  const works = await getWorks();
  const items = works ?? fallback;

  return (
    <PageLayout>
      <div className="h-full flex flex-col overflow-hidden">
        <div className="shrink-0 px-5 sm:px-8 lg:px-10 xl:px-12 py-10 border-b border-border">
          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground/60 font-mono animate-in fade-in-0 duration-500">
            selected works
          </span>
          <h1 className="font-serif italic text-5xl sm:text-6xl mt-1.5 leading-none animate-clip-reveal [animation-delay:80ms]">
            projects.
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="flex flex-col px-5 sm:px-8 lg:px-10 xl:px-12">
            {items.map((item, i) => (
              <a
                key={item._id ?? i}
                href={item.href ?? "#"}
                target={item.href && item.href !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{ animationDelay: `${120 + i * 60}ms` }}
                className="group flex flex-col py-5 border-b border-border hover:pl-2 transition-all duration-200 animate-in fade-in-0 slide-in-from-bottom-2 duration-400 fill-mode-both"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[8px] font-mono text-muted-foreground/50 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif italic text-xl text-foreground leading-tight">
                      {item._title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 ml-6 shrink-0">
                    {item.role && (
                      <span className="text-[8px] font-mono text-muted-foreground/60">
                        {item.role}
                      </span>
                    )}
                    <ArrowUpRight
                      size={13}
                      className="text-muted-foreground/40 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200"
                    />
                  </div>
                </div>

                {item.description && (
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-out ml-8">
                    <div className="overflow-hidden">
                      <div className="mt-3 px-3 py-2.5 border border-border/50 bg-muted/20">
                        <p className="text-xs font-mono text-muted-foreground/80 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
