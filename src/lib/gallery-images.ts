import type { GalleryImage } from "@/content/gallery";

export async function listGalleryAdditions(): Promise<GalleryImage[]> {
  const [{ connectToDatabase }, { GalleryImageModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/gallery-image"),
  ]);
  await connectToDatabase();
  const images = await GalleryImageModel.find({ active: true })
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean();
  return images.map((item) => ({
    id: `managed-${item._id.toString()}`,
    title: item.title,
    category: item.category,
    image: item.image,
    alt: item.alt,
    featured: item.featured,
  }));
}

export async function listGalleryAdditionsForAdmin() {
  const [{ connectToDatabase }, { GalleryImageModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/gallery-image"),
  ]);
  await connectToDatabase();
  const images = await GalleryImageModel.find()
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean();
  return images.map((item) => ({
    id: item._id.toString(),
    title: item.title,
    category: item.category,
    image: item.image,
    alt: item.alt,
    featured: item.featured,
    active: item.active,
  }));
}
