import type { Metadata } from "next";

import { ContactPage } from "@/components/sections/contact/contact-page";
import { hospitalConfig } from "@/config/hospital";
import JsonLd from "@/components/seo/json-ld";
import { getPageMetadata, getBreadcrumbJsonLd, routes } from "@/config/seo";
import { getSectionImage } from "@/lib/section-images";

export const metadata: Metadata = getPageMetadata("contact");

export const dynamic = "force-dynamic";

export default async function ContactRoute() {
  const heroImage = await getSectionImage(
    "hero-contact",
    hospitalConfig.hero.buildingImage,
    hospitalConfig.hero.buildingAlt,
  );

  const breadcrumbsSchema = getBreadcrumbJsonLd([
    { name: "Contact & Directions", path: routes.contact },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbsSchema} />
      <ContactPage heroImageOverride={heroImage} />
    </>
  );
}
