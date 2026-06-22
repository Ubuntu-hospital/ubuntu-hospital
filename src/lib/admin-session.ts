import { SignJWT, jwtVerify, type JWTPayload } from "jose";

import { getAdminSessionSecret } from "@/lib/env";
import type { AdminRole, AdminSessionData } from "@/types/admin";

type SessionPayload = JWTPayload & {
  email: string;
  name: string;
  role: AdminRole;
};

const SESSION_ISSUER = "ubuntu-hospital-admin";
const SESSION_AUDIENCE = "ubuntu-hospital-dashboard";
const SESSION_DURATION_SECONDS = 60 * 60 * 24;

function getSessionSecret() {
  return new TextEncoder().encode(getAdminSessionSecret());
}

export async function createAdminSessionToken({
  email,
  name,
  role,
}: Omit<AdminSessionData, "expiresAt">) {
  const expiresAtSeconds =
    Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;

  const token = await new SignJWT({
    email,
    name,
    role,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setSubject(email)
    .setIssuedAt()
    .setIssuer(SESSION_ISSUER)
    .setAudience(SESSION_AUDIENCE)
    .setExpirationTime(expiresAtSeconds)
    .sign(getSessionSecret());

  return {
    token,
    expiresAt: new Date(expiresAtSeconds * 1000).toISOString(),
  };
}

export async function verifyAdminSessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret(), {
      issuer: SESSION_ISSUER,
      audience: SESSION_AUDIENCE,
    });

    const typedPayload = payload as SessionPayload;

    if (
      typeof typedPayload.email !== "string" ||
      typeof typedPayload.name !== "string" ||
      typedPayload.role !== "admin" ||
      typeof typedPayload.exp !== "number"
    ) {
      return null;
    }

    return {
      email: typedPayload.email,
      name: typedPayload.name,
      role: typedPayload.role,
      expiresAt: new Date(typedPayload.exp * 1000).toISOString(),
    } satisfies AdminSessionData;
  } catch {
    return null;
  }
}
