import type { Metadata } from "next";

import LegalPage from "@/components/sections/legal/legal-page";
import { hospitalConfig } from "@/config/hospital";
import { legalSiteContent } from "@/content/legal";

export const metadata: Metadata = {
  title: `Privacy Policy | ${hospitalConfig.name}`,
  description: legalSiteContent.privacy.introduction,
};

export default function PrivacyRoute() {
  return <LegalPage document={legalSiteContent.privacy} />;
}
