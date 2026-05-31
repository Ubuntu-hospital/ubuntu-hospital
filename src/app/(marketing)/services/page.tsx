import type { Metadata } from "next";

import { hospitalConfig } from "@/config/hospital";
import { servicesPageContent } from "@/content/services";
import ServicesPage from "@/components/sections/services/services-page";

export const metadata: Metadata = {
  title: `Services | ${hospitalConfig.name}`,
  description: servicesPageContent.hero.text,
};

export default function ServicesRoute() {
  return (
    <main>
      <ServicesPage />
    </main>
  );
}
