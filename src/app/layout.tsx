import type { Metadata } from "next";

import { hospitalConfig } from "@/config/hospital";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ubuntuhospital.com"),
  title: hospitalConfig.name,
  description: hospitalConfig.description,
  openGraph: {
    title: hospitalConfig.name,
    description: hospitalConfig.description,
    images: ["/opengraph-image"],
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
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
