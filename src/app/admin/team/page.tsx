import type { Metadata } from "next";

import {
  getTeamFallbackGroups,
  listTeamMembersForAdmin,
} from "@/lib/team-members";
import { requireAdminSession } from "@/lib/admin-auth";
import { requireSuperAdminSession } from "@/lib/admin-auth";
import { hospitalConfig } from "@/config/hospital";
import TeamManager from "./team-manager.client";

export const metadata: Metadata = {
  title: `Specialist Team Management | ${hospitalConfig.name}`,
};

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  await requireAdminSession();
  await requireSuperAdminSession();
  const members = await listTeamMembersForAdmin();
  const groups = getTeamFallbackGroups().map((group) => group.title);

  return <TeamManager members={members} groups={groups} />;
}
