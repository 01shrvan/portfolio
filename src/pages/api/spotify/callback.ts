import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return new Response(`Spotify auth error: ${error}`, {
      status: 400,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  if (!code) {
    return new Response("Missing Spotify auth code.", {
      status: 400,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  return new Response(
    `Spotify authorization code captured.\n\nCopy this code and exchange it for a refresh token:\n\n${code}`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
};
