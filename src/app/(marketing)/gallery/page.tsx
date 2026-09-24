import type { Metadata } from "next";

import GalleryPage from "@/components/sections/gallery/gallery-page";
import JsonLd from "@/components/seo/json-ld";
import { getPageMetadata, getBreadcrumbJsonLd, routes } from "@/config/seo";
import { listGalleryImages } from "@/lib/gallery-images";

export const metadata: Metadata = getPageMetadata("gallery");

export const dynamic = "force-dynamic";

export default async function GalleryRoute() {
  const images = await listGalleryImages();
  const breadcrumbsSchema = getBreadcrumbJsonLd([
    { name: "Hospital Gallery", path: routes.gallery },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbsSchema} />
      <GalleryPage images={images} />
    </>
  );
}
