import type { Metadata } from "next";
import {
  requireSuperAdminSession,
  listAdminUsersForManagement,
} from "@/lib/admin-auth";
import { hospitalConfig } from "@/config/hospital";
import UsersManager from "./users-manager.client";

export const metadata: Metadata = {
  title: `User Management | ${hospitalConfig.name} Admin`,
  description: "Manage admin and staff accounts and permission levels.",
};

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  await requireSuperAdminSession();
  const users = await listAdminUsersForManagement();

  return <UsersManager users={users} />;
}
