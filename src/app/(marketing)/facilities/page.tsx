import type { Metadata } from "next";

import { FacilitiesPage } from "@/components/sections/facilities/facilities-page";
import JsonLd from "@/components/seo/json-ld";
import { getPageMetadata, getBreadcrumbJsonLd, routes } from "@/config/seo";
import { getManagedFacilitySpaces } from "@/lib/facility-images";

export const metadata: Metadata = getPageMetadata("facilities");

export const dynamic = "force-dynamic";

export default async function FacilitiesRoute() {
  const managedSpaces = await getManagedFacilitySpaces();
  const breadcrumbsSchema = getBreadcrumbJsonLd([
    { name: "Facilities", path: routes.facilities },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbsSchema} />
      <FacilitiesPage managedSpaces={managedSpaces} />
    </>
  );
}
