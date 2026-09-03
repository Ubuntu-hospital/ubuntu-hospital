import type { Metadata } from "next";

import { hospitalConfig } from "@/config/hospital";
import { teamPageContent } from "@/content/team";
import { TeamPage } from "@/components/sections/team/team-page";
import { listTeamMembers } from "@/lib/team-members";

export const metadata: Metadata = {
  title: `Team | ${hospitalConfig.name}`,
  description: teamPageContent.hero.text,
};

export const dynamic = "force-dynamic";

export default async function TeamRoute() {
  const managedMembers = await listTeamMembers();
  return <TeamPage managedMembers={managedMembers} />;
}
