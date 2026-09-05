import type { Metadata } from "next";
import nextDynamic from "next/dynamic";

import Hero from "@/components/sections/home/hero/hero.client";
import Tour from "@/components/sections/home/tour/tour.client";
import Booking from "@/components/sections/home/booking/booking";
import Testimonials from "@/components/sections/home/testimonials/testimonials";
import Specialists from "@/components/sections/home/specialists/specialists";
import PatientJourney from "@/components/sections/home/patient-journey/patient-journey";
import Facilities from "@/components/sections/home/facilities/facilities";
import JsonLd from "@/components/seo/json-ld";
import { getPageMetadata, getFaqJsonLd } from "@/config/seo";
import { listTeamMembers } from "@/lib/team-members";

const Tour = nextDynamic(
  () => import("@/components/sections/home/tour/tour.client"),
);
const Facilities = nextDynamic(
  () => import("@/components/sections/home/facilities/facilities"),
);
const Specialists = nextDynamic(
  () => import("@/components/sections/home/specialists/specialists"),
);
const PatientJourney = nextDynamic(
  () => import("@/components/sections/home/patient-journey/patient-journey"),
);
const Testimonials = nextDynamic(
  () => import("@/components/sections/home/testimonials/testimonials"),
);
const Booking = nextDynamic(
  () => import("@/components/sections/home/booking/booking"),
);

export const metadata: Metadata = getPageMetadata("home");

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const managedMembers = await listTeamMembers();
  const faqSchema = getFaqJsonLd();

  return (
    <main>
      <JsonLd data={faqSchema} />
      <Hero />
      <Tour />
      <Facilities />
      <Specialists people={managedMembers} />
      <PatientJourney />
      <Testimonials />
      <Booking />
    </main>
  );
}
