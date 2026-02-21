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
    albumImage: string | null;
    progressMs: number;
    durationMs: number;
  } | null;
};

type SpotifyNowPlayingProps = {
  className?: string;
};

export default function SpotifyNowPlaying({ className }: SpotifyNowPlayingProps) {
  const [data, setData] = useState<SpotifyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [liveProgressMs, setLiveProgressMs] = useState(0);

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

  const activeTrack = data?.isPlaying ? data.track : null;
  const isLive = Boolean(activeTrack);

  useEffect(() => {
    if (activeTrack) {
      setLiveProgressMs(activeTrack.progressMs);
      return;
    }

    setLiveProgressMs(0);
  }, [
    activeTrack,
  ]);

  useEffect(() => {
    if (!activeTrack?.durationMs) {
      return;
    }

    const duration = activeTrack.durationMs;

    const interval = window.setInterval(() => {
      setLiveProgressMs((prev) => Math.min(prev + 1000, duration));
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [
    activeTrack,
  ]);

  const label = isLoading
    ? "syncing spotify..."
    : data?.status === "unconfigured"
      ? "set spotify env vars"
      : hasError
        ? "spotify is taking a break"
        : activeTrack
          ? `${activeTrack.title} - ${activeTrack.artist}`
          : "not listening right now";

  const helperText = isLoading
    ? "fetching current track"
    : data?.status === "unconfigured"
      ? "spotify credentials are not configured"
      : hasError
        ? "please try again shortly"
        : isLive
          ? "live from spotify"
          : "check back in a bit";

  const durationMs = activeTrack?.durationMs ?? 0;
  const safeProgressMs =
    isLive && durationMs > 0
      ? Math.min(liveProgressMs, durationMs)
      : Math.max(liveProgressMs, 0);
  const progressPercent = durationMs > 0 ? (safeProgressMs / durationMs) * 100 : 0;

  const formatDuration = (ms: number) => {
    if (!Number.isFinite(ms) || ms <= 0) {
      return "--:--";
    }

    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-card/60 px-3 py-2.5 backdrop-blur-md",
        className,
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.14em] text-muted-foreground/90">
          <HugeiconsIcon icon={MusicNote01Icon} size={13} strokeWidth={1.9} />
          spotify pulse
        </p>
        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
          <HugeiconsIcon
            icon={CircleIcon}
            size={8}
            strokeWidth={2.4}
            className={cn(
              "shrink-0",
              isLive ? "text-foreground/70" : "text-muted-foreground/60",
            )}
          />
          {isLive ? "live" : "idle"}
        </span>
      </div>

      {isLoading ? (
        <div className="mt-1.5">
          <p className="truncate text-xs text-foreground/90">{label}</p>
          <p className="mt-0.5 truncate text-[10px] tracking-[0.12em] text-muted-foreground/85">
            {helperText}
          </p>
        </div>
      ) : activeTrack ? (
        <>
          <div className="mt-2 flex items-center gap-3">
            {activeTrack.albumImage ? (
              <img
                src={activeTrack.albumImage}
                alt={`${activeTrack.title} album art`}
                className="h-14 w-14 shrink-0 rounded-lg border border-border/70 object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-dashed border-border/70 text-muted-foreground/75">
                <HugeiconsIcon icon={MusicNote01Icon} size={18} strokeWidth={1.9} />
              </span>
            )}

            <div className="min-w-0 flex-1">
              <a
                href={activeTrack.songUrl}
                target="_blank"
                rel="noreferrer"
                className="group block min-w-0"
              >
                <p className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-foreground/80">
                  {activeTrack.title}
                </p>
                <p className="mt-0.5 truncate text-[11px] tracking-wide text-muted-foreground/90">
                  {activeTrack.artist}
                </p>
              </a>

              <div className="mt-2 inline-flex items-end gap-[2px]">
                <span className="spotify-wave h-[7px] w-[2px] rounded-full bg-foreground/60" />
                <span className="spotify-wave h-[10px] w-[2px] rounded-full bg-foreground/60 [animation-delay:0.12s]" />
                <span className="spotify-wave h-[8px] w-[2px] rounded-full bg-foreground/60 [animation-delay:0.24s]" />
              </div>
            </div>

            <a
              href={activeTrack.songUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open track on Spotify"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} strokeWidth={2} />
            </a>
          </div>

          <div className="mt-2.5 space-y-1.5">
            <div className="h-px w-full bg-border/45" />
            <div className="h-[2px] w-full">
              <span
                className="block h-full bg-foreground/55 transition-[width] duration-700 ease-linear"
                style={{ width: `${Math.max(0, Math.min(progressPercent, 100))}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] tracking-wide text-muted-foreground/80">
              <span>{formatDuration(safeProgressMs)}</span>
              <span>{formatDuration(durationMs)}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-2 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-dashed border-border/70 text-muted-foreground/85">
            <HugeiconsIcon icon={MusicNote01Icon} size={16} strokeWidth={1.9} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs text-foreground/90">{label}</p>
            <p className="mt-0.5 truncate text-[10px] tracking-[0.12em] text-muted-foreground/85">
              {helperText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
