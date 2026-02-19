import {
  ArrowUpRight01Icon,
  CircleIcon,
  MusicNote01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type SpotifyResponse = {
  isPlaying: boolean;
  status?: "ok" | "error" | "unconfigured";
  error?: string;
  track: {
    title: string;
    artist: string;
    songUrl: string;
  } | null;
};

type SpotifyNowPlayingProps = {
  className?: string;
};

export default function SpotifyNowPlaying({ className }: SpotifyNowPlayingProps) {
  const [data, setData] = useState<SpotifyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchSpotify = async () => {
      try {
        const response = await fetch("/api/spotify");

        if (!response.ok) {
          throw new Error("Failed to fetch now playing track.");
        }

        const json = (await response.json()) as SpotifyResponse;

        if (isMounted) {
          setData(json);
          setHasError(false);
        }
      } catch {
        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchSpotify();

    const interval = window.setInterval(() => {
      void fetchSpotify();
    }, 30000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const label = isLoading
    ? "syncing spotify..."
    : data?.status === "unconfigured"
      ? "set spotify env vars"
      : hasError
        ? "spotify is taking a break"
        : data?.isPlaying && data.track
          ? `${data.track.title} - ${data.track.artist}`
          : "not listening right now";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/70 bg-background/85 px-3 py-2.5 shadow-[0_12px_35px_-20px_rgba(32,53,74,0.8)] backdrop-blur-md",
        className,
      )}
    >
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <p className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.14em] text-muted-foreground/90">
          <HugeiconsIcon icon={MusicNote01Icon} size={13} strokeWidth={1.9} />
          now playing
        </p>
        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
          <HugeiconsIcon
            icon={CircleIcon}
            size={8}
            strokeWidth={2.4}
            className={cn(
              "shrink-0",
              data?.isPlaying ? "text-emerald-600" : "text-muted-foreground/60",
            )}
          />
          {data?.isPlaying ? "live" : "idle"}
        </span>
      </div>

      <div className="min-w-0">
        {isLoading ? (
          <div className="h-3.5 w-full animate-pulse rounded bg-muted" />
        ) : data?.isPlaying && data.track ? (
          <a
            href={data.track.songUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-w-0 items-center gap-2 text-xs text-foreground/90 transition-colors hover:text-foreground"
          >
            <span className="inline-flex items-end gap-[2px]">
              <span className="spotify-wave h-[7px] w-[2px] rounded-full bg-emerald-500" />
              <span className="spotify-wave h-[10px] w-[2px] rounded-full bg-emerald-500 [animation-delay:0.12s]" />
              <span className="spotify-wave h-[8px] w-[2px] rounded-full bg-emerald-500 [animation-delay:0.24s]" />
            </span>
            <span className="truncate">{label}</span>
            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              size={14}
              strokeWidth={1.9}
              className="shrink-0 text-muted-foreground"
            />
          </a>
        ) : (
          <p className="truncate text-xs text-muted-foreground">{label}</p>
        )}
      </div>
    </div>
  );
}
