export const SITE = {
  name: "Shrvan Benke",
  role: "Full-stack engineer",
  location: "Pune, India",
  email: "benkeshrvan@gmail.com",
  url: "https://shrvans-space.vercel.app",
  description:
    "Full-stack engineer in Pune. I build software end to end — the data layer through to the interface.",
} as const;

export const NAV = [
  { href: "/works", label: "Works" },
  { href: "/writings", label: "Writing" },
  { href: "/connect", label: "Connect" },
] as const;

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/01shrvan" },
  { label: "X", href: "https://x.com/01shrvan" },
] as const;

/* Exactly the tools the site has always listed — nothing aspirational.
   Add a row when you pick something up; don't let it drift into a wish list. */
export const STACK = [
  {
    layer: "Interface",
    tools: [
      { name: "React", url: "https://react.dev" },
      { name: "Next.js", url: "https://nextjs.org" },
      { name: "Astro", url: "https://astro.build" },
      { name: "TypeScript", url: "https://typescriptlang.org" },
      { name: "Tailwind", url: "https://tailwindcss.com" },
    ],
  },
  {
    layer: "Server",
    tools: [
      { name: "Node.js", url: "https://nodejs.org" },
      { name: "Python", url: "https://python.org" },
    ],
  },
  {
    layer: "Data",
    tools: [{ name: "PostgreSQL", url: "https://postgresql.org" }],
  },
  {
    layer: "Models",
    tools: [{ name: "OpenAI", url: "https://openai.com" }],
  },
] as const;
