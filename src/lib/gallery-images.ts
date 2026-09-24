import type { GalleryImage } from "@/content/gallery";
import { galleryPageContent } from "@/content/gallery";

export async function ensureDefaultGalleryImagesSeeded(): Promise<void> {
  try {
    const [{ connectToDatabase }, { GalleryImageModel }] = await Promise.all([
      import("@/lib/mongodb"),
      import("@/models/gallery-image"),
    ]);
    await connectToDatabase();

    const existingImages = await GalleryImageModel.find()
      .select("title")
      .lean();
    const existingTitles = new Set(
      existingImages.map((img) => img.title.toLowerCase().trim()),
    );

    const toInsert = [];
    let orderIndex = 1;

    for (const item of galleryPageContent.images) {
      const normalizedTitle = item.title.toLowerCase().trim();
      if (!existingTitles.has(normalizedTitle)) {
        toInsert.push({
          title: item.title,
          category: item.category,
          image: item.image,
          alt: item.alt,
          publicId: null,
          featured: Boolean(item.featured),
          sortOrder: orderIndex,
          active: true,
        });
        existingTitles.add(normalizedTitle);
      }
      orderIndex++;
    }

    if (toInsert.length > 0) {
      await GalleryImageModel.insertMany(toInsert);
    }
  } catch (error) {
    console.error("Failed to ensure default gallery images seeded:", error);
  }
}

export async function listGalleryImages(): Promise<GalleryImage[]> {
  try {
    const [{ connectToDatabase }, { GalleryImageModel }] = await Promise.all([
      import("@/lib/mongodb"),
      import("@/models/gallery-image"),
    ]);
    await connectToDatabase();
    await ensureDefaultGalleryImagesSeeded();

    const images = await GalleryImageModel.find({ active: true })
      .sort({ sortOrder: 1, createdAt: 1 })
      .lean();

    if (!images || images.length === 0) {
      return [...galleryPageContent.images];
    }

    return images.map((item) => ({
      id: item._id.toString(),
      title: item.title,
      category: item.category,
      image: item.image,
      alt: item.alt,
      featured: item.featured,
    }));
  } catch (error) {
    console.error("Failed to load gallery images from database:", error);
    return [...galleryPageContent.images];
  }
}

export async function listGalleryAdditions(): Promise<GalleryImage[]> {
  return listGalleryImages();
}

export async function listGalleryAdditionsForAdmin() {
  const [{ connectToDatabase }, { GalleryImageModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/gallery-image"),
  ]);
  await connectToDatabase();
  await ensureDefaultGalleryImagesSeeded();

  const images = await GalleryImageModel.find()
    .sort({ sortOrder: 1, createdAt: 1 })
    .lean();

  return images.map((item) => ({
    id: item._id.toString(),
    title: item.title,
    category: item.category,
    image: item.image,
    alt: item.alt,
    featured: item.featured,
    active: item.active,
    sortOrder: item.sortOrder,
  }));
}
