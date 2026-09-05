import type { Metadata } from "next";

import { galleryPageContent } from "@/content/gallery";
import GalleryPage from "@/components/sections/gallery/gallery-page";
import JsonLd from "@/components/seo/json-ld";
import { getPageMetadata, getBreadcrumbJsonLd, routes } from "@/config/seo";
import { listGalleryAdditions } from "@/lib/gallery-images";

export const metadata: Metadata = getPageMetadata("gallery");

export const dynamic = "force-dynamic";

export default async function GalleryRoute() {
  const additions = await listGalleryAdditions();
  const breadcrumbsSchema = getBreadcrumbJsonLd([
    { name: "Hospital Gallery", path: routes.gallery },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbsSchema} />
      <GalleryPage images={[...galleryPageContent.images, ...additions]} />
    </>
  );
}
