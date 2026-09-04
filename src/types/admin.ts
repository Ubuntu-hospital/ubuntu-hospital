export const adminRoles = ["admin", "staff"] as const;
export type AdminRole = (typeof adminRoles)[number];

export interface AdminSessionData {
  email: string;
  name: string;
  role: AdminRole;
  expiresAt: string;
}

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  lastLoginAt: string | null;
  createdAt: string;
}

export type AdminAuthFieldName = "email" | "password";

export interface AdminAuthActionState {
  status: "idle" | "error";
  message: string;
  fieldErrors: Partial<Record<AdminAuthFieldName, string>>;
}

export const initialAdminAuthActionState: AdminAuthActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
