import type { Metadata } from "next";

import { hospitalConfig } from "@/config/hospital";
import { redirectIfAuthenticatedAdmin } from "@/lib/admin-auth";

import { AdminLoginForm } from "./login-form.client";
import styles from "../admin.module.css";

export const metadata: Metadata = {
  title: `Admin Login | ${hospitalConfig.name}`,
  description: "Sign in to Ubuntu Hospital Admin Portal.",
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  await redirectIfAuthenticatedAdmin();

  return (
    <div className={styles.loginWrap}>
      <section className={styles.loginCard}>
        <h1>Sign In</h1>
        <p className={styles.loginIntro}>
          Enter your credentials to access the admin portal.
        </p>

        <AdminLoginForm redirectTo="/admin" />
      </section>
    </div>
  );
}
