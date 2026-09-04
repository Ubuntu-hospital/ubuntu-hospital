import type { Metadata } from "next";

import { patientPageContent } from "@/content/patients";
import { PatientsPage } from "@/components/sections/patients/patients-page";
import JsonLd from "@/components/seo/json-ld";
import { getPageMetadata, getBreadcrumbJsonLd, routes } from "@/config/seo";
import { getSectionImage } from "@/lib/section-images";

export const metadata: Metadata = getPageMetadata("patients");

export const dynamic = "force-dynamic";

export default async function PatientsRoute() {
  const heroImage = await getSectionImage(
    "hero-patients",
    patientPageContent.hero.image,
    patientPageContent.hero.imageAlt,
  );

  const breadcrumbsSchema = getBreadcrumbJsonLd([
    { name: "Patients & Visitors", path: routes.patients },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbsSchema} />
      <PatientsPage heroImageOverride={heroImage} />
    </>
  );
}
