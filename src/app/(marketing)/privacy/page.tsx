import type { Metadata } from "next";

import LegalPage from "@/components/sections/legal/legal-page";
import JsonLd from "@/components/seo/json-ld";
import { getPageMetadata, getBreadcrumbJsonLd, routes } from "@/config/seo";
import { legalSiteContent } from "@/content/legal";

export const metadata: Metadata = getPageMetadata("privacy");

export default function PrivacyRoute() {
  const breadcrumbsSchema = getBreadcrumbJsonLd([
    { name: "Privacy Policy", path: routes.privacy },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbsSchema} />
      <LegalPage document={legalSiteContent.privacy} />
    </>
  );
}
