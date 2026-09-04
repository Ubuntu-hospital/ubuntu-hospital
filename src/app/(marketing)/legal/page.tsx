import type { Metadata } from "next";

import LegalPage from "@/components/sections/legal/legal-page";
import JsonLd from "@/components/seo/json-ld";
import { getPageMetadata, getBreadcrumbJsonLd, routes } from "@/config/seo";
import { legalSiteContent } from "@/content/legal";

export const metadata: Metadata = getPageMetadata("legal");

export default function LegalRoute() {
  const breadcrumbsSchema = getBreadcrumbJsonLd([
    { name: "Terms & Legal", path: routes.legal },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbsSchema} />
      <LegalPage document={legalSiteContent.legal} />
    </>
  );
}
