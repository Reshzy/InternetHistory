import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/museum.css";
import {
  MUSEUM_DESCRIPTION,
  MUSEUM_TITLE,
  resolveSiteUrl,
} from "@/lib/museumMeta";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-museum-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const siteUrl = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: MUSEUM_TITLE,
  description: MUSEUM_DESCRIPTION,
  applicationName: "NET//HISTORY",
  authors: [{ name: "NET//HISTORY" }],
  keywords: [
    "web history",
    "internet museum",
    "GSAP",
    "scroll experience",
    "frontend",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "NET//HISTORY",
    title: MUSEUM_TITLE,
    description: MUSEUM_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: MUSEUM_TITLE,
    description: MUSEUM_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-mono">{children}</body>
    </html>
  );
}
