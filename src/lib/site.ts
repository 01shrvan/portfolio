export const SITE = {
  name: "Shrvan Benke",
  aka: "astra",
  role: "Full-stack engineer",
  focus: "Web apps, front-end heavy",
  location: "Mumbai, India",
  email: "benkeshrvan@gmail.com",
  phone: "+91 79777 88679",
  url: "https://shrvans-space.vercel.app",
  description:
    "Full-stack engineer in Mumbai who mostly lives on the front end. I build web apps end to end and care how they feel, not just whether they work.",
} as const;

export const NAV = [
  { href: "/works", label: "Works" },
  { href: "/writings", label: "Writing" },
  { href: "/connect", label: "Connect" },
] as const;

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/01shrvan" },
  { label: "LinkedIn", href: "https://linkedin.com/in/shrvanbenke" },
  { label: "X", href: "https://x.com/01shrvan" },
] as const;

export const EXPERIENCE = [
  {
    company: "Ayritech",
    role: "Full Stack Engineer",
    place: "Mumbai",
    period: "Jul — Oct 2025",
    note: "built an in-house web builder platform and the company site. owned features end to end — planning, shipping, and the bugs that showed up after.",
  },
  {
    company: "DreamSkrin",
    role: "Frontend Engineer",
    place: "Remote",
    period: "Oct 2024 — Sep 2025",
    note: "responsive interfaces for bootcamp campaigns and in-house production sites, with a side of designing and publishing the LinkedIn creatives.",
  },
] as const;

/* Straight off the resume, verbatim. Add a row when you actually pick
   something up — don't let this drift into a wish list. */
export const STACK = [
  {
    layer: "Languages",
    tools: [
      { name: "JavaScript", url: "https://developer.mozilla.org/docs/Web/JavaScript" },
      { name: "TypeScript", url: "https://typescriptlang.org" },
      { name: "HTML", url: "https://developer.mozilla.org/docs/Web/HTML" },
      { name: "CSS", url: "https://developer.mozilla.org/docs/Web/CSS" },
      { name: "C", url: "https://en.cppreference.com/w/c" },
      { name: "C++", url: "https://isocpp.org" },
    ],
  },
  {
    layer: "Frontend",
    tools: [
      { name: "Next.js", url: "https://nextjs.org" },
      { name: "React.js", url: "https://react.dev" },
      { name: "React Native", url: "https://reactnative.dev" },
      { name: "shadcn/ui", url: "https://ui.shadcn.com" },
      { name: "TailwindCSS", url: "https://tailwindcss.com" },
      { name: "Redux", url: "https://redux.js.org" },
    ],
  },
  {
    layer: "Backend",
    tools: [
      { name: "Node.js", url: "https://nodejs.org" },
      { name: "Express.js", url: "https://expressjs.com" },
      { name: "tRPC", url: "https://trpc.io" },
      { name: "RESTful APIs", url: "https://developer.mozilla.org/docs/Glossary/REST" },
    ],
  },
  {
    layer: "Databases",
    tools: [
      { name: "MongoDB", url: "https://mongodb.com" },
      { name: "Mongoose", url: "https://mongoosejs.com" },
      { name: "Supabase", url: "https://supabase.com" },
      { name: "DrizzleORM", url: "https://orm.drizzle.team" },
      { name: "SQLite", url: "https://sqlite.org" },
    ],
  },
  {
    layer: "Tools",
    tools: [
      { name: "Git", url: "https://git-scm.com" },
      { name: "Postman", url: "https://postman.com" },
      { name: "Figma", url: "https://figma.com" },
      { name: "Vercel", url: "https://vercel.com" },
      { name: "Netlify", url: "https://netlify.com" },
    ],
  },
] as const;
