export interface Writings {
  title: string;
  tldr: string;
  content: any;
  slug: { current: string };
  _createdAt: string;
}

export interface Works {
  title: string;
  href: string;
  description: string;
  role: string;
}

// export interface ArchiveImages {
//   title: string;
//   image: any;
// }