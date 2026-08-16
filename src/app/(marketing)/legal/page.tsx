import type { Metadata } from "next";

import LegalPage from "@/components/sections/legal/legal-page";
import { hospitalConfig } from "@/config/hospital";
import { legalSiteContent } from "@/content/legal";

export const metadata: Metadata = {
  title: `Terms of Use | ${hospitalConfig.name}`,
  description: legalSiteContent.legal.introduction,
};

export default function LegalRoute() {
  return <LegalPage document={legalSiteContent.legal} />;
}
