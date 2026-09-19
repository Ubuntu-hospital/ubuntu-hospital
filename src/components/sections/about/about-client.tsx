"use client";

import Facilities from "../home/facilities/facilities";
import Testimonials from "../home/testimonials/testimonials.client";
import FinalCta from "../home/final-cta/final-cta";
import About from "../home/about/about";
import UbuntuStandard from "../home/ubuntu-standard/ubuntu-standard";

import type { ManagedTestimony } from "@/lib/testimonies";
import type { ManagedFacilitySectionItem } from "@/lib/facility-images";

export function AboutPage({
  visionImage,
  aboutImage,
  testimonies,
  facilityItems,
}: {
  visionImage?: { image: string; alt: string };
  aboutImage?: { image: string; alt: string };
  testimonies?: ManagedTestimony[];
  facilityItems?: ManagedFacilitySectionItem[];
}) {
  return (
    <>
      <UbuntuStandard visionImageOverride={visionImage} />
      <About imageOverride={aboutImage} />
      <Facilities items={facilityItems} />
      <Testimonials items={testimonies} />
      <FinalCta />
    </>
  );
}
