import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import {
  GIIYO_EATS_LOGO_HEIGHT,
  GIIYO_EATS_LOGO_PATH,
  GIIYO_EATS_LOGO_WIDTH,
  hasApprovedLogo,
} from "@/lib/brand";
import "./globals.css";

const display = Baloo_2({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-baloo",
  display: "swap",
});

const body = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

const description =
  "Giiyo Eats is bringing fresh lunches to Bonamoussadi and Makepe from 23 November 2026. 3,000 FCFA per meal, delivery included. Share your interest. This is not an order.";

const title = "Good lunch is coming to work | Giiyo Eats";

const ogImages = hasApprovedLogo
  ? [
      {
        url: GIIYO_EATS_LOGO_PATH,
        width: GIIYO_EATS_LOGO_WIDTH,
        height: GIIYO_EATS_LOGO_HEIGHT,
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
