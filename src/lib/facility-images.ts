import { facilitySpaces } from "@/content/facilities";
import { hospitalConfig } from "@/config/hospital";

export type ManagedFacilitySectionItem = {
  id: string;
  title: string;
  text: string;
  image: string;
  alt: string;
};

export async function listFacilityImageOverrides() {
  try {
    const [{ connectToDatabase }, { FacilityImageModel }] = await Promise.all([
      import("@/lib/mongodb"),
      import("@/models/facility-image"),
    ]);
    await connectToDatabase();
    const overrides = await FacilityImageModel.find().lean();
    return overrides.map((item) => ({
      facilityId: item.facilityId,
      image: item.image,
      imageAlt: item.imageAlt,
    }));
  } catch (error) {
    console.error("Failed to load facility image overrides:", error);
    return [];
  }
}

export async function getManagedFacilitySpaces() {
  const overrides = await listFacilityImageOverrides();
  const overrideMap = new Map(overrides.map((item) => [item.facilityId, item]));
  return facilitySpaces.map((space) => ({
    ...space,
    ...(overrideMap.get(space.id) ?? {}),
  }));
}

export async function getManagedFacilitySectionItems(): Promise<
  ManagedFacilitySectionItem[]
> {
  const overrides = await listFacilityImageOverrides();
  const overrideMap = new Map(overrides.map((item) => [item.facilityId, item]));

  const defaultMapping: Record<string, string> = {
    "Modern wards": "wards",
    "Operating rooms": "operating-rooms",
    "Consultation spaces": "consultation",
    "Physiotherapy support": "physiotherapy",
  };

  return hospitalConfig.facilities.items.map((item) => {
    const rawItem = item as {
      id?: string;
      title: string;
      text: string;
      image: string;
      alt: string;
    };

    const facilityId =
      rawItem.id ??
      defaultMapping[rawItem.title] ??
      rawItem.title.toLowerCase().replace(/\s+/g, "-");

    const override =
      overrideMap.get(facilityId) ??
      (facilityId === "consultation"
        ? overrideMap.get("reception-opd")
        : undefined);

    return {
      id: facilityId,
      title: rawItem.title,
      text: rawItem.text,
      image: override?.image || rawItem.image,
      alt: override?.imageAlt || rawItem.alt,
    };
  });
}
