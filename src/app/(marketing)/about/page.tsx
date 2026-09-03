import type { Metadata } from "next";

import { hospitalConfig } from "@/config/hospital";
import { AboutPage } from "@/components/sections/about/about-client";

import { getSectionImage } from "@/lib/section-images";
import { listTestimonies } from "@/lib/testimonies";

export const metadata: Metadata = {
  title: `About | ${hospitalConfig.name}`,

  description:
    "Learn about Ubuntu Orthopaedic & Spine Hospital, its patient-focused approach, mission, vision, values, modern facility, and commitment to specialist care.",
};

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

  return (
    <AboutPage
      visionImage={visionImage}
      aboutImage={aboutImage}
      testimonies={testimonies}
    />
  );
}
