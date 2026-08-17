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
    stamp: "2025",
    period: "Jul — Oct",
    note: "built an in-house web builder platform and the company site. owned features end to end — planning, shipping, and the bugs that showed up after.",
  },
  {
    company: "DreamSkrin",
    role: "Frontend Engineer",
    place: "Remote",
    stamp: "2024 — 25",
    period: "Oct — Sep",
    note: "responsive interfaces for bootcamp campaigns and in-house production sites, with a side of designing and publishing the LinkedIn creatives.",
  },
] as const;

export const STACK = [
  {
    layer: "Languages",
    tools: [
      { name: "JavaScript", url: "https://developer.mozilla.org/docs/Web/JavaScript", icon: "javascript" },
      { name: "TypeScript", url: "https://typescriptlang.org", icon: "typescript" },
      { name: "HTML", url: "https://developer.mozilla.org/docs/Web/HTML", icon: "html5" },
      { name: "CSS", url: "https://developer.mozilla.org/docs/Web/CSS", icon: "css" },
      { name: "C", url: "https://en.cppreference.com/w/c", icon: "c" },
      { name: "C++", url: "https://isocpp.org", icon: "cplusplus" },
    ],
  },
  {
    layer: "Frontend",
    tools: [
      { name: "Next.js", url: "https://nextjs.org", icon: "nextdotjs" },
      { name: "React.js", url: "https://react.dev", icon: "react" },
      { name: "React Native", url: "https://reactnative.dev", icon: "react" },
      { name: "shadcn/ui", url: "https://ui.shadcn.com", icon: "shadcnui" },
      { name: "TailwindCSS", url: "https://tailwindcss.com", icon: "tailwindcss" },
      { name: "Redux", url: "https://redux.js.org", icon: "redux" },
    ],
  },
  {
    layer: "Backend",
    tools: [
      { name: "Node.js", url: "https://nodejs.org", icon: "nodedotjs" },
      { name: "Express.js", url: "https://expressjs.com", icon: "express" },
      { name: "tRPC", url: "https://trpc.io", icon: "trpc" },
      { name: "RESTful APIs", url: "https://developer.mozilla.org/docs/Glossary/REST" },
    ],
  },
  {
    layer: "Databases",
    tools: [
      { name: "MongoDB", url: "https://mongodb.com", icon: "mongodb" },
      { name: "Mongoose", url: "https://mongoosejs.com", icon: "mongoose" },
      { name: "Supabase", url: "https://supabase.com", icon: "supabase" },
      { name: "DrizzleORM", url: "https://orm.drizzle.team", icon: "drizzle" },
      { name: "SQLite", url: "https://sqlite.org", icon: "sqlite" },
    ],
  },
  {
    layer: "Tools",
    tools: [
      { name: "Git", url: "https://git-scm.com", icon: "git" },
      { name: "Postman", url: "https://postman.com", icon: "postman" },
      { name: "Figma", url: "https://figma.com", icon: "figma" },
      { name: "Vercel", url: "https://vercel.com", icon: "vercel" },
      { name: "Netlify", url: "https://netlify.com", icon: "netlify" },
    ],
  },
] as const;
