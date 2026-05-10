import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shrvan Benke",
    template: "%s — Shrvan Benke",
  },
  description: "full-stack developer. building things end-to-end — from data layer to the pixel.",
  keywords: ["shrvan benke", "full-stack developer", "next.js", "react", "typescript", "python", "web development", "portfolio"],
  authors: [{ name: "Shrvan Benke", url: "https://github.com/01shrvan" }],
  creator: "Shrvan Benke",
  metadataBase: new URL("https://shrvans-space.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Shrvan Benke — Full-Stack Developer",
    description: "building things end-to-end. from data layer to the pixel. care about craft, not just shipping.",
    siteName: "Shrvan Benke",
  },
  twitter: {
    card: "summary",
    title: "Shrvan Benke — Full-Stack Developer",
    description: "building things end-to-end. care about craft, not just shipping.",
    creator: "@01shrvan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${cormorant.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
