import type { Metadata } from "next";

import { hospitalConfig } from "@/config/hospital";
import { galleryPageContent } from "@/content/gallery";
import GalleryPage from "@/components/sections/gallery/gallery-page";

export const metadata: Metadata = {
  title: `Gallery | ${hospitalConfig.name}`,
  description: galleryPageContent.hero.text,
};

export default function GalleryRoute() {
  return <GalleryPage />;
}
