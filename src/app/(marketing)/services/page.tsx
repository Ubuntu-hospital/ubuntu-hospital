import type { Metadata } from "next";

import { servicesPageContent } from "@/content/services";
import ServicesPage from "@/components/sections/services/services-page";
import JsonLd from "@/components/seo/json-ld";
import {
  getPageMetadata,
  getBreadcrumbJsonLd,
  getMedicalServicesJsonLd,
  routes,
} from "@/config/seo";
import { getSectionImage } from "@/lib/section-images";

export const metadata: Metadata = getPageMetadata("services");

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

  const breadcrumbsSchema = getBreadcrumbJsonLd([
    { name: "Clinical Services", path: routes.services },
  ]);
  const medicalServicesSchema = getMedicalServicesJsonLd();

  return (
    <main>
      <JsonLd data={breadcrumbsSchema} />
      <JsonLd data={medicalServicesSchema} />
      <ServicesPage
        heroImageOverride={heroImage}
        beforeYouVisitImageOverride={beforeYouVisitImage}
      />
    </main>
  );
}
