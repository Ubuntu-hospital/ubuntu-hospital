import type { Metadata } from "next";

import { hospitalConfig } from "@/config/hospital";
import { getBaseUrl, getHospitalJsonLd, getWebSiteJsonLd } from "@/config/seo";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import JsonLd from "@/components/seo/json-ld";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: hospitalConfig.name,
    template: `%s | ${hospitalConfig.name}`,
  },
  description: hospitalConfig.description,
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
    <html lang="en">
      <head>
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
