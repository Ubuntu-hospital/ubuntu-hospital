import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ADMIN_HOME_PATH,
  ADMIN_LOGIN_PATH,
  ADMIN_SESSION_COOKIE_NAME,
  getBootstrapAdminCredentials,
} from "@/lib/env";
import {
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "@/lib/admin-session";
import type { AdminSessionData } from "@/types/admin";

const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

function normalizeEmailAddress(email: string) {
  return email.trim().toLowerCase();
}

async function syncBootstrapAdminUser() {
  const bootstrapAdmin = getBootstrapAdminCredentials();

  if (!bootstrapAdmin.email || !bootstrapAdmin.password) {
    return null;
  }

  const [
    { connectToDatabase },
    { hashPassword, verifyPassword },
    { AdminUserModel },
  ] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/lib/password"),
    import("@/models/admin-user"),
  ]);

  await connectToDatabase();

  const adminUser = await AdminUserModel.findOne({
    email: bootstrapAdmin.email,
  });

  if (!adminUser) {
    return AdminUserModel.create({
      name: bootstrapAdmin.name,
      email: bootstrapAdmin.email,
      passwordHash: await hashPassword(bootstrapAdmin.password),
      role: "admin",
    });
  }

  const shouldUpdatePassword = !(await verifyPassword(
    bootstrapAdmin.password,
    adminUser.passwordHash,
  ));

  let hasChanges = false;

  if (adminUser.name !== bootstrapAdmin.name) {
    adminUser.name = bootstrapAdmin.name;
    hasChanges = true;
  }

  if (adminUser.role !== "admin") {
    adminUser.role = "admin";
    hasChanges = true;
  }

  if (shouldUpdatePassword) {
    adminUser.passwordHash = await hashPassword(bootstrapAdmin.password);
    hasChanges = true;
  }

  if (hasChanges) {
    await adminUser.save();
  }

  return adminUser;
}

export async function authenticateAdmin(email: string, password: string) {
  const bootstrapAdmin = getBootstrapAdminCredentials();

  if (!bootstrapAdmin.email || !bootstrapAdmin.password) {
    throw new Error(
      "Admin credentials are not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD before signing in.",
    );
  }

  const [{ AdminUserModel }, { verifyPassword }] = await Promise.all([
    import("@/models/admin-user"),
    import("@/lib/password"),
  ]);

  await syncBootstrapAdminUser();

  const adminUser = await AdminUserModel.findOne({
    email: normalizeEmailAddress(email),
  });

  if (!adminUser) {
    return null;
  }

  const passwordIsValid = await verifyPassword(
    password,
    adminUser.passwordHash,
  );

  if (!passwordIsValid) {
    return null;
  }

  adminUser.lastLoginAt = new Date();
  await adminUser.save();

  return {
    email: adminUser.email,
    name: adminUser.name,
    role: adminUser.role,
    expiresAt: "",
  } satisfies AdminSessionData;
}

export async function createAdminSession(
  sessionData: Omit<AdminSessionData, "expiresAt">,
) {
  const cookieStore = await cookies();
  const { token, expiresAt } = await createAdminSessionToken(sessionData);

  cookieStore.set(ADMIN_SESSION_COOKIE_NAME, token, {
    ...sessionCookieOptions,
    expires: new Date(expiresAt),
  });

  return {
    ...sessionData,
    expiresAt,
  } satisfies AdminSessionData;
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE_NAME);
}

export async function readAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyAdminSessionToken(token);
}

export async function requireAdminSession() {
  const session = await readAdminSession();

  if (!session) {
    redirect(ADMIN_LOGIN_PATH);
  }

  return session;
}

export async function redirectIfAuthenticatedAdmin() {
  const session = await readAdminSession();

  if (session) {
    redirect(ADMIN_HOME_PATH);
  }
}
