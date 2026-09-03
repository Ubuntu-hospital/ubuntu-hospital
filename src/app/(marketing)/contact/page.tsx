import type { Metadata } from "next";

import { ContactPage } from "@/components/sections/contact/contact-page";
import { hospitalConfig } from "@/config/hospital";

import { getSectionImage } from "@/lib/section-images";

export const metadata: Metadata = {
  title: `Contact | ${hospitalConfig.name}`,

  description:
    "Contact Ubuntu Orthopaedic & Spine Hospital for appointments, directions, hospital enquiries, WhatsApp support, and specialist care guidance.",
};

export const dynamic = "force-dynamic";

export default async function ContactRoute() {
  const heroImage = await getSectionImage(
    "hero-contact",
    hospitalConfig.hero.buildingImage,
    hospitalConfig.hero.buildingAlt,
  );

  return <ContactPage heroImageOverride={heroImage} />;
}
