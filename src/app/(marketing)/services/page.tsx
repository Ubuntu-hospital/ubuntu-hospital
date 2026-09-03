import type { Metadata } from "next";

import { hospitalConfig } from "@/config/hospital";
import { servicesPageContent } from "@/content/services";
import ServicesPage from "@/components/sections/services/services-page";

import { getSectionImage } from "@/lib/section-images";

export const metadata: Metadata = {
  title: `Services | ${hospitalConfig.name}`,
  description: servicesPageContent.hero.text,
};

export const dynamic = "force-dynamic";

export default async function ServicesRoute() {
  const [heroImage, beforeYouVisitImage] = await Promise.all([
    getSectionImage(
      "hero-services",
      servicesPageContent.hero.image,
      servicesPageContent.hero.imageAlt,
    ),
    getSectionImage(
      "services-before-you-visit",
      servicesPageContent.support.image,
      servicesPageContent.support.imageAlt,
    ),
  ]);

  return (
    <main>
      <ServicesPage
        heroImageOverride={heroImage}
        beforeYouVisitImageOverride={beforeYouVisitImage}
      />
    </main>
  );
}
