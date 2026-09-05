import type { Metadata, Viewport } from "next";
import { Sora, Fraunces } from "next/font/google";

import { hospitalConfig } from "@/config/hospital";
import { getBaseUrl, getHospitalJsonLd, getWebSiteJsonLd } from "@/config/seo";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import JsonLd from "@/components/seo/json-ld";

import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sora",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-fraunces",
});

export const viewport: Viewport = {
  themeColor: "#fc6206",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: hospitalConfig.name,
    template: `%s | ${hospitalConfig.name}`,
  },
  description: hospitalConfig.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: hospitalConfig.name,
    description: hospitalConfig.description,
    images: ["/opengraph-image"],
    siteName: hospitalConfig.name,
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: hospitalConfig.name,
    description: hospitalConfig.description,
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hospitalSchema = getHospitalJsonLd();
  const webSiteSchema = getWebSiteJsonLd();

  return (
    <html lang="en" className={`${sora.variable} ${fraunces.variable}`}>
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <JsonLd data={hospitalSchema} />
        <JsonLd data={webSiteSchema} />
      </head>
      <body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        {children}
      </body>
    </html>
  );
}
