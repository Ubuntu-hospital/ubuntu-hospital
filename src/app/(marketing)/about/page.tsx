import type { Metadata } from "next";

import { hospitalConfig } from "@/config/hospital";
import { AboutPage } from "@/components/sections/about/about-client";

export const metadata: Metadata = {
  title: `About | ${hospitalConfig.name}`,

  description:
    "Learn about Ubuntu Orthopaedic & Spine Hospital, its patient-focused approach, mission, vision, values, modern facility, and commitment to specialist care.",
};

export default function AboutRoute() {
  return <AboutPage />;
}
