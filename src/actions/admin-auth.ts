"use server";

import { redirect } from "next/navigation";

import { ADMIN_HOME_PATH, ADMIN_LOGIN_PATH } from "@/lib/env";
import type { AdminAuthActionState } from "@/types/admin";

function readTextField(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

export async function signInAdminAction(
  _previousState: AdminAuthActionState,
  formData: FormData,
): Promise<AdminAuthActionState> {
  const email = readTextField(formData, "email");
  const password = readTextField(formData, "password");
  const redirectTo = readTextField(formData, "redirectTo");
  const safeRedirectTarget = redirectTo.startsWith(ADMIN_HOME_PATH)
    ? redirectTo
    : ADMIN_HOME_PATH;

  const fieldErrors: AdminAuthActionState["fieldErrors"] = {};

  if (!email) {
    fieldErrors.email = "Enter the admin email address.";
  }

  if (!password) {
    fieldErrors.password = "Enter the admin password.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Enter the admin credentials to continue.",
      fieldErrors,
    };
  }

  try {
    const { authenticateAdmin, createAdminSession } =
      await import("@/lib/admin-auth");

    const adminSession = await authenticateAdmin(email, password);

    if (!adminSession) {
      return {
        status: "error",
        message: "The email or password is incorrect.",
        fieldErrors: {},
      };
    }

    await createAdminSession({
      email: adminSession.email,
      name: adminSession.name,
      role: adminSession.role,
    });
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unable to sign in right now.",
      fieldErrors: {},
    };
  }

  redirect(safeRedirectTarget);
}

export async function signOutAdminAction() {
  const { clearAdminSession } = await import("@/lib/admin-auth");

  await clearAdminSession();
  redirect(ADMIN_LOGIN_PATH);
}
