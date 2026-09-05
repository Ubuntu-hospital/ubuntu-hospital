import { hospitalConfig } from "@/config/hospital";

export type ManagedTestimony = {
  id: string;
  name: string;
  context: string;
  quote: string;
  image?: string | null;
  imageAlt?: string | null;
  active: boolean;
  sortOrder: number;
};

function serialize(item: {
  _id: { toString(): string };
  name: string;
  context: string;
  quote: string;
  image?: string | null;
  imageAlt?: string | null;
  active?: boolean;
  sortOrder?: number;
}): ManagedTestimony {
  return {
    id: item._id.toString(),
    name: item.name,
    context: item.context,
    quote: item.quote,
    image: item.image || null,
    imageAlt: item.imageAlt || `${item.name} - ${item.context}`,
    active: item.active !== false,
    sortOrder: item.sortOrder ?? 0,
  };
}

export async function listTestimonies(): Promise<ManagedTestimony[]> {
  try {
    const [{ connectToDatabase }, { TestimonyModel }] = await Promise.all([
      import("@/lib/mongodb"),
      import("@/models/testimony"),
    ]);
    await connectToDatabase();
    const docs = await TestimonyModel.find({ active: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    if (docs.length > 0) {
      return docs.map(serialize);
    }
  } catch (error) {
    console.error("Failed to load testimonies from DB, using fallback:", error);
  }

  // Fallback to static config items
  return hospitalConfig.testimonials.items.map((item, index) => ({
    id: `static-testimony-${index + 1}`,
    name: item.name,
    context: item.context,
    quote: item.quote,
    image: null,
    imageAlt: `${item.name} - ${item.context}`,
    active: true,
    sortOrder: index + 1,
  }));
}

export async function listTestimoniesForAdmin(): Promise<ManagedTestimony[]> {
  const [{ connectToDatabase }, { TestimonyModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/testimony"),
  ]);
  await connectToDatabase();
  const docs = await TestimonyModel.find()
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean();

  return docs.map(serialize);
}
