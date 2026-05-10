import { PageLayout } from "@/components/page-layout";
import { basehub } from "basehub";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getWriting(slug: string) {
  try {
    const data = await basehub().query({
      writings: {
        __args: {
          filter: { _slug: { eq: slug } },
        },
        item: {
          _id: true,
          _title: true,
          tldr: true,
          content: {
            html: true,
            readingTime: true,
          },
          _sys: {
            createdAt: true,
          },
        },
      },
    });
    return data?.writings?.item ?? null;
  } catch {
    return null;
  }
}

function formatDate(raw: string | undefined): string {
  if (!raw) return "";
  try {
    return new Date(raw).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  } catch {
    return raw;
  }
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const writing = await getWriting(slug);

  if (!writing) notFound();

  return (
    <PageLayout>
      <div className="h-full flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="px-5 sm:px-8 lg:px-10 xl:px-12 py-10 max-w-2xl">

            <Link
              href="/writings"
              className="inline-flex items-center gap-1.5 text-[8px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 hover:text-foreground transition-colors mb-8"
            >
              ← writings
            </Link>

            <h1 className="font-serif italic text-4xl sm:text-5xl leading-tight text-foreground mb-3">
              {writing._title}
            </h1>

            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground/70 mb-8">
              <span>shrvan</span>
              <span>·</span>
              <span>{formatDate(writing._sys?.createdAt)}</span>
              {writing.content?.readingTime && (
                <>
                  <span>·</span>
                  <span>{writing.content.readingTime} min read</span>
                </>
              )}
            </div>

            {writing.tldr && (
              <div className="border-l-2 border-border pl-4 mb-10">
                <span className="block text-[7px] font-mono uppercase tracking-[0.25em] text-muted-foreground/60 mb-2">
                  tl;dr
                </span>
                <p className="font-serif italic text-base text-muted-foreground leading-relaxed">
                  &ldquo;{writing.tldr}&rdquo;
                </p>
              </div>
            )}

            <div
              className="prose prose-neutral dark:prose-invert max-w-none
                prose-p:text-sm prose-p:leading-[1.8] prose-p:text-muted-foreground prose-p:mb-5
                prose-headings:font-serif prose-headings:italic prose-headings:font-normal prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-a:text-foreground prose-a:underline-offset-4 prose-a:decoration-border hover:prose-a:decoration-foreground
                prose-strong:text-foreground prose-strong:font-medium
                prose-code:text-xs prose-code:font-mono prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded-none
                prose-pre:bg-muted prose-pre:rounded-none prose-pre:border prose-pre:border-border
                prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:text-muted-foreground prose-blockquote:italic prose-blockquote:font-serif
                prose-hr:border-border
                [&>*:first-child]:mt-0"
              dangerouslySetInnerHTML={{ __html: writing.content?.html ?? "" }}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
