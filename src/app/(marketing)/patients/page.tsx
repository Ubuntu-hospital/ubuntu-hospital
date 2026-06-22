import type { Metadata } from "next";

import { hospitalConfig } from "@/config/hospital";
import { patientPageContent } from "@/content/patients";
import { PatientsPage } from "@/components/sections/patients/patients-page";

export const metadata: Metadata = {
  title: `Patients | ${hospitalConfig.name}`,
  description: patientPageContent.hero.text,
};

export default function PatientsRoute() {
  return <PatientsPage />;
}
