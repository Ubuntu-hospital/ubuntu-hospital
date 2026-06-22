export type AdminRole = "admin";

export interface AdminSessionData {
  email: string;
  name: string;
  role: AdminRole;
  expiresAt: string;
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
