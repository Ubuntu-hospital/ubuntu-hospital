import { facilitySpaces } from "@/content/facilities";

export async function listFacilityImageOverrides() {
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
}

export async function getManagedFacilitySpaces() {
  const overrides = await listFacilityImageOverrides();
  const overrideMap = new Map(overrides.map((item) => [item.facilityId, item]));
  return facilitySpaces.map((space) => ({
    ...space,
    ...(overrideMap.get(space.id) ?? {}),
  }));
}
