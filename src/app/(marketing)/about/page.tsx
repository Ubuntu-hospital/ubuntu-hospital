import type { Metadata } from "next";

import { hospitalConfig } from "@/config/hospital";
import { AboutPage } from "@/components/sections/about/about-client";
import JsonLd from "@/components/seo/json-ld";
import { getPageMetadata, getBreadcrumbJsonLd, routes } from "@/config/seo";
import { getSectionImage } from "@/lib/section-images";
import { listTestimonies } from "@/lib/testimonies";

export const metadata: Metadata = getPageMetadata("about");

export const dynamic = "force-dynamic";

export default async function AboutRoute() {
  const [visionImage, aboutImage, testimonies] = await Promise.all([
    getSectionImage(
      "about-our-vision",
      hospitalConfig.standard.vision.image,
      hospitalConfig.standard.vision.imageAlt,
    ),
    getSectionImage(
      "about-the-hospital",
      hospitalConfig.about.image,
      hospitalConfig.about.imageAlt,
    ),
    listTestimonies(),
  ]);

  const breadcrumbsSchema = getBreadcrumbJsonLd([
    { name: "About Us", path: routes.about },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbsSchema} />
      <AboutPage
        visionImage={visionImage}
        aboutImage={aboutImage}
        testimonies={testimonies}
      />
    </>
  );
}
