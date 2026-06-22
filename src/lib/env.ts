export const ADMIN_SESSION_COOKIE_NAME = "ubuntu_admin_session";
export const ADMIN_LOGIN_PATH = "/admin/login";
export const ADMIN_HOME_PATH = "/admin";

export function getOptionalEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    return null;
  }

  const trimmedValue = value.trim();
  return trimmedValue ? trimmedValue : null;
}

export function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value?.trim()) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

export function getMongoUri() {
  return getRequiredEnv("MONGODB_URI");
}

export function getAdminSessionSecret() {
  return getRequiredEnv("ADMIN_SESSION_SECRET");
}

export function getBootstrapAdminCredentials() {
  const email = getOptionalEnv("ADMIN_EMAIL");
  const name = getOptionalEnv("ADMIN_NAME") ?? "Ubuntu Admin";
  const password = process.env.ADMIN_PASSWORD ?? "";

  return {
    email: email ? email.toLowerCase() : null,
    name,
    password,
  };
}

export function getResendApiKey() {
  return getRequiredEnv("RESEND_API_KEY");
}

export function getResendFromEmail() {
  return getRequiredEnv("RESEND_FROM_EMAIL");
}
