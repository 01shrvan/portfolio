import { useEffect, useState } from "react";
import { Dithering, ImageDithering } from "@paper-design/shaders-react";

type Ink = { back: string; front: string; mid: string };
type Track = { song: string; artist: string; art: string; url: string } | null;
type TrackState = Track | undefined;

const DARK: Ink = { back: "#2b2723", front: "#f2e8c9", mid: "#e08a45" };
const LIGHT: Ink = { back: "#f4eddc", front: "#2b2723", mid: "#a8482c" };

const readInk = (): Ink =>
  document.documentElement.classList.contains("light") ? LIGHT : DARK;

export default function Figure({ discordId }: { discordId?: string }) {
  const [ink, setInk] = useState<Ink>(() =>
    typeof document === "undefined" ? DARK : readInk(),
  );
  const [mode, setMode] = useState<"pending" | "shader" | "static">("pending");
  const [track, setTrack] = useState<TrackState>(undefined);

  useEffect(() => {
    setInk(readInk());

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode("static");
    } else {
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
        setMode(gl ? "shader" : "static");
      } catch {
        setMode("static");
      }
    }

    const observer = new MutationObserver(() => setInk(readInk()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!discordId) {
      setTrack(null);
      return;
    }

    const poll = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
        if (!res.ok) return;
        const { data } = await res.json();
        const s = data?.spotify;
        setTrack(
          s?.song
            ? {
                song: s.song,
                artist: s.artist.split(";")[0].trim(),
                art: s.album_art_url,
                url: `https://open.spotify.com/track/${s.track_id}`,
              }
            : null,
        );
      } catch {
        setTrack(null);
      }
    };

    poll();
    const id = setInterval(poll, 30000);
    return () => clearInterval(id);
  }, [discordId]);

  const loading = track === undefined;

  const plate =
    mode === "shader" && track ? (
      <ImageDithering
        className="h-full w-full"
        image={track.art}
        colorBack={ink.back}
        colorFront={ink.front}
        colorHighlight={ink.mid}
        colorSteps={7}
        type="8x8"
        size={1}
      />
    ) : mode === "shader" ? (
      <Dithering
        className="h-full w-full"
        colorBack={ink.back}
        colorFront={ink.mid}
        shape="sphere"
        type="4x4"
        size={0.32}
        speed={0.35}
      />
    ) : (
      <div
        className="h-full w-full"
        style={{
          backgroundImage: `radial-gradient(circle, ${ink.mid} 0.9px, transparent 0.9px)`,
          backgroundSize: "4px 4px",
        }}
      />
    );

  const body = (
    <>
      <div
        className={`size-[92px] overflow-hidden border bg-surface ${
          loading ? "animate-pulse" : ""
        }`}
        style={loading ? undefined : { background: ink.back }}
      >
        {loading ? null : plate}
      </div>
      <figcaption className="data mt-1.5 w-[92px] lowercase text-ink-soft">
        {loading ? (
          <span className="block h-[0.66rem] w-12 animate-pulse rounded-[1px] bg-surface" />
        ) : track ? (
          <span className="block truncate" title={`${track.song} · ${track.artist}`}>
            {track.song}
          </span>
        ) : (
          <span>fig. 1</span>
        )}
      </figcaption>
    </>
  );

  return (
    <figure className="shrink-0">
      {track ? (
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-opacity duration-200 hover:opacity-80"
          title={`listening to ${track.song} by ${track.artist}`}
        >
          {body}
        </a>
      ) : (
        body
      )}
    </figure>
  );
}
