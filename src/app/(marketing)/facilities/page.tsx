import type { Metadata } from "next";

import { FacilitiesPage } from "@/components/sections/facilities/facilities-page";
import { hospitalConfig } from "@/config/hospital";
import { getManagedFacilitySpaces } from "@/lib/facility-images";

export const metadata: Metadata = {
  title: `Facilities | ${hospitalConfig.name}`,

  description:
    "Explore the clinical, recovery, and patient support facilities available at Ubuntu Orthopaedic & Spine Hospital.",
};

export default async function FacilitiesRoute() {
  const managedSpaces = await getManagedFacilitySpaces();
  return <FacilitiesPage managedSpaces={managedSpaces} />;
}
