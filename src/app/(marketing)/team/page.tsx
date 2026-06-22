import type { Metadata } from "next";

import { hospitalConfig } from "@/config/hospital";
import { teamPageContent } from "@/content/team";
import { TeamPage } from "@/components/sections/team/team-page";

export const metadata: Metadata = {
  title: `Team | ${hospitalConfig.name}`,
  description: teamPageContent.hero.text,
};

export default function TeamRoute() {
  return <TeamPage />;
}
