import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import {
  GIIYO_EATS_WORDMARK_HEIGHT,
  GIIYO_EATS_WORDMARK_PATH,
  GIIYO_EATS_WORDMARK_WIDTH,
  hasApprovedWordmark,
} from "@/lib/brand";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm",
  display: "swap",
});

const description =
  "Giiyo Eats is bringing fresh lunches to Douala from 23 November 2026. 3,000 FCFA per meal, delivery included. Share your interest. This is not an order.";

const title = "Good lunch is coming to work | Giiyo Eats";

const ogImages = hasApprovedWordmark
  ? [
      {
        url: GIIYO_EATS_WORDMARK_PATH,
        width: GIIYO_EATS_WORDMARK_WIDTH,
        height: GIIYO_EATS_WORDMARK_HEIGHT,
        alt: "Giiyo Eats",
      },
    ]
  : undefined;

export const metadata: Metadata = {
  metadataBase: new URL("https://eats.giiyo.com"),
  title,
  description,
  applicationName: "Giiyo Eats",
  alternates: { canonical: "/join" },
  openGraph: {
    title,
    description,
    url: "/join",
    siteName: "Giiyo Eats",
    type: "website",
    locale: "en",
    images: ogImages,
  },
  twitter: {
    card: ogImages ? "summary_large_image" : "summary",
    title,
    description,
    images: ogImages?.map((image) => image.url),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
