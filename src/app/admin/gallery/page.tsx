import type { Metadata } from "next";

import { listGalleryAdditionsForAdmin } from "@/lib/gallery-images";
import { requireAdminSession } from "@/lib/admin-auth";
import { hospitalConfig } from "@/config/hospital";
import GalleryManager from "./gallery-manager.client";

export const metadata: Metadata = {
  title: `Gallery Management | ${hospitalConfig.name}`,
};

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  await requireAdminSession();
  const images = await listGalleryAdditionsForAdmin();

  return <GalleryManager images={images} />;
}
