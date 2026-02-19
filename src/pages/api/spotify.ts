import type { APIRoute } from "astro";
import "dotenv/config";

const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

type SpotifyTrack = {
  title: string;
  artist: string;
  songUrl: string;
};

const getAccessToken = async () => {
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!refreshToken || !clientId || !clientSecret) {
    return null;
  }

  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Spotify token error:", errorText);
    throw new Error("Failed to get Spotify access token.");
  }

  return response.json() as Promise<{ access_token: string }>;
};

const fetchNowPlaying = async (accessToken: string) => {
  const response = await fetch(SPOTIFY_NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Spotify now playing error:", errorText);
    throw new Error("Failed to fetch now playing track.");
  }

  return response.json();
};

export const GET: APIRoute = async () => {
  try {
    const tokenResponse = await getAccessToken();

    if (!tokenResponse) {
      return new Response(
        JSON.stringify({
          isPlaying: false,
          track: null,
          status: "unconfigured",
          error: "Spotify environment variables are missing",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const { access_token: accessToken } = tokenResponse;
    const nowPlaying = await fetchNowPlaying(accessToken);

    const isPlaying = Boolean(nowPlaying?.is_playing && nowPlaying?.item);

    const track: SpotifyTrack | null = isPlaying
      ? {
        title: nowPlaying.item.name,
        artist: nowPlaying.item.artists
          .map((artist: { name: string }) => artist.name)
          .join(", "),
        songUrl: nowPlaying.item.external_urls.spotify,
      }
      : null;

    return new Response(
      JSON.stringify({
        isPlaying,
        track,
        status: "ok",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=30",
        },
      },
    );
  } catch (error) {
    console.error("Spotify API route error:", error);

    return new Response(
      JSON.stringify({
        isPlaying: false,
        track: null,
        status: "error",
        error: "Unable to fetch Spotify data",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
