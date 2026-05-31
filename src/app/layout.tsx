import type { Metadata } from "next";

import { hospitalConfig } from "@/config/hospital";

// Suppress TS error for side-effect CSS import when no type declarations are present
// @ts-ignore
import "./globals.css";

export const metadata: Metadata = {
  title: hospitalConfig.name,
  description: hospitalConfig.description,
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