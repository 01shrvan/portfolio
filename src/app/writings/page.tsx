import { PageLayout } from "@/components/page-layout";
import { basehub } from "basehub";

async function getWritings() {
  try {
    const data = await basehub().query({
      writings: {
        items: {
          _id: true,
          _title: true,
          _slug: true,
          tldr: true,
          _sys: {
            createdAt: true,
            lastModifiedAt: true,
          },
        },
      },
    });
    return data?.writings?.items ?? null;
  } catch {
    return null;
  }
}

const fallback = [
  { _id: "1", _title: "post title here", _slug: "post-title", tldr: "a short description of what this writing covers.", _sys: { createdAt: "2024-12-01", lastModifiedAt: "2024-12-01" } },
  { _id: "2", _title: "another thought", _slug: "another-thought", tldr: "a short description of what this writing covers.", _sys: { createdAt: "2024-11-10", lastModifiedAt: "2024-11-10" } },
];

function formatDate(raw: string | undefined): string {
  if (!raw) return "";
  try {
    return new Date(raw).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return raw;
  }
}

export default async function WritingsPage() {
  const writings = await getWritings();
  const items = writings ?? fallback;

  return (
    <PageLayout>
      <div className="h-full flex flex-col overflow-hidden">
        <div className="shrink-0 px-5 sm:px-8 lg:px-10 xl:px-12 py-10 border-b border-border">
          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground/60 font-mono">
            writings
          </span>
          <h1 className="font-serif italic text-5xl sm:text-6xl mt-1.5 leading-none">
            thoughts.
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="flex flex-col px-5 sm:px-8 lg:px-10 xl:px-12">
            {items.map((item, i) => (
              <a
                key={item._id ?? i}
                href={`/writings/${item._slug}`}
                className="group flex items-center justify-between py-7 border-b border-border hover:pl-2 transition-all duration-200"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-[8px] font-mono text-muted-foreground/50 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif italic text-xl text-foreground leading-tight">
                    {item._title}
                  </span>
                </div>
                <span className="text-xs font-mono text-muted-foreground/70 ml-6 shrink-0">
                  {formatDate(item._sys?.createdAt)}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
