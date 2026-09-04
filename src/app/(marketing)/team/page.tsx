import type { Metadata } from "next";

import { TeamPage } from "@/components/sections/team/team-page";
import JsonLd from "@/components/seo/json-ld";
import {
  getPageMetadata,
  getBreadcrumbJsonLd,
  getPhysiciansJsonLd,
  routes,
} from "@/config/seo";
import { listTeamMembers } from "@/lib/team-members";

export const metadata: Metadata = getPageMetadata("team");

export const dynamic = "force-dynamic";

export default async function TeamRoute() {
  const managedMembers = await listTeamMembers();
  const breadcrumbsSchema = getBreadcrumbJsonLd([
    { name: "Specialist Team", path: routes.team },
  ]);
  const physiciansSchema = getPhysiciansJsonLd(managedMembers);

  return (
    <>
      <JsonLd data={breadcrumbsSchema} />
      <JsonLd data={physiciansSchema} />
      <TeamPage managedMembers={managedMembers} />
    </>
  );
}
