import type { Metadata } from "next";

import { hospitalConfig } from "@/config/hospital";
import { galleryPageContent } from "@/content/gallery";
import GalleryPage from "@/components/sections/gallery/gallery-page";
import { listGalleryAdditions } from "@/lib/gallery-images";

export const metadata: Metadata = {
  title: `Gallery | ${hospitalConfig.name}`,
  description: galleryPageContent.hero.text,
};

export const dynamic = "force-dynamic";

export default async function GalleryRoute() {
  const additions = await listGalleryAdditions();
  return <GalleryPage images={[...galleryPageContent.images, ...additions]} />;
}
