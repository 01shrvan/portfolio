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

export default function SpotifyNowPlaying({
  className,
}: {
  className?: string;
}) {
  const [data, setData] = useState<SpotifyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [liveProgressMs, setLiveProgressMs] = useState(0);

  useEffect(() => {
    let mounted = true;

    const fetchSpotify = async () => {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) throw new Error();
        const json = (await res.json()) as SpotifyResponse;
        if (mounted) {
          setData(json);
          setHasError(false);
        }
      } catch {
        if (mounted) setHasError(true);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    void fetchSpotify();
    const interval = window.setInterval(() => void fetchSpotify(), 30000);
    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const activeTrack = data?.isPlaying ? data.track : null;

  useEffect(() => {
    setLiveProgressMs(activeTrack ? activeTrack.progressMs : 0);
  }, [activeTrack]);

  useEffect(() => {
    if (!activeTrack?.durationMs) return;
    const duration = activeTrack.durationMs;
    const interval = window.setInterval(() => {
      setLiveProgressMs((prev) => Math.min(prev + 1000, duration));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [activeTrack]);

  const label = isLoading
    ? "syncing..."
    : data?.status === "unconfigured"
      ? "not configured"
      : hasError
        ? "spotify offline"
        : activeTrack
          ? `${activeTrack.title} — ${activeTrack.artist}`
          : "nothing playing";

  const durationMs = activeTrack?.durationMs ?? 0;
  const safeProgress =
    durationMs > 0 ? Math.min(liveProgressMs, durationMs) : 0;
  const progressPercent =
    durationMs > 0 ? (safeProgress / durationMs) * 100 : 0;

  const fmt = (ms: number) => {
    if (!Number.isFinite(ms) || ms <= 0) return "--:--";
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  return (
    <div
      className={cn(
        "border border-border bg-card/80 backdrop-blur-sm px-3 py-2.5",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          ♫ spotify
        </span>
        <span
          className={cn(
            "font-mono text-[9px] uppercase tracking-[0.15em]",
            activeTrack ? "text-green-500/80" : "text-muted-foreground/60",
          )}
        >
          {activeTrack ? "live" : "idle"}
        </span>
      </div>

      {isLoading ? (
        <p className="text-xs text-muted-foreground font-mono">{label}</p>
      ) : activeTrack ? (
        <>
          <div className="flex items-center gap-3">
            {activeTrack.albumImage ? (
              <img
                src={activeTrack.albumImage}
                alt={`${activeTrack.title} album art`}
                className="h-12 w-12 shrink-0 object-cover border border-border/60"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-dashed border-border/60 text-muted-foreground text-lg">
                ♫
              </span>
            )}

            <div className="min-w-0 flex-1">
              <a
                href={activeTrack.songUrl}
                target="_blank"
                rel="noreferrer"
                className="block min-w-0 group"
              >
                <p className="truncate text-xs font-medium text-foreground group-hover:text-foreground/75 transition-colors">
                  {activeTrack.title}
                </p>
                <p className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground">
                  {activeTrack.artist}
                </p>
              </a>

              <div className="mt-1.5 flex items-end gap-[2px]">
                <span className="spotify-wave h-[7px] w-[2px] bg-foreground/50" />
                <span className="spotify-wave h-[10px] w-[2px] bg-foreground/50 [animation-delay:0.12s]" />
                <span className="spotify-wave h-[7px] w-[2px] bg-foreground/50 [animation-delay:0.24s]" />
              </div>
            </div>

            <a
              href={activeTrack.songUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="open on spotify"
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors text-sm font-mono"
            >
              ↗
            </a>
          </div>

          <div className="mt-2.5 space-y-1">
            <div className="h-[2px] w-full bg-border/60">
              <span
                className="block h-full bg-foreground/40 transition-[width] duration-700 ease-linear"
                style={{
                  width: `${Math.max(0, Math.min(progressPercent, 100))}%`,
                }}
              />
            </div>
            <div className="flex justify-between font-mono text-[9px] text-muted-foreground/70">
              <span>{fmt(safeProgress)}</span>
              <span>{fmt(durationMs)}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center border border-dashed border-border/60 text-muted-foreground text-sm shrink-0">
            ♫
          </span>
          <p className="font-mono text-[10px] text-muted-foreground">{label}</p>
        </div>
      )}
    </div>
  );
}
