import type { Metadata } from "next";

import { hospitalConfig } from "@/config/hospital";
import { patientPageContent } from "@/content/patients";
import { PatientsPage } from "@/components/sections/patients/patients-page";

import { getSectionImage } from "@/lib/section-images";

export const metadata: Metadata = {
  title: `Patients | ${hospitalConfig.name}`,
  description: patientPageContent.hero.text,
};

export const dynamic = "force-dynamic";

export default async function PatientsRoute() {
  const heroImage = await getSectionImage(
    "hero-patients",
    patientPageContent.hero.image,
    patientPageContent.hero.imageAlt,
  );

  return <PatientsPage heroImageOverride={heroImage} />;
}
