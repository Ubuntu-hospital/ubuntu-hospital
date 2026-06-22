import type { Metadata } from "next";

import { hospitalConfig } from "@/config/hospital";
import { redirectIfAuthenticatedAdmin } from "@/lib/admin-auth";

import { AdminLoginForm } from "./login-form.client";
import styles from "../admin.module.css";

export const metadata: Metadata = {
  title: `Admin Login | ${hospitalConfig.name}`,
  description: "Secure admin access for Ubuntu Hospital booking management.",
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  await redirectIfAuthenticatedAdmin();

  return (
    <div className={styles.loginWrap}>
      <section className={styles.loginCard}>
        <p className={styles.eyebrow}>Admin authentication</p>
        <h1>Manage booking requests securely.</h1>
        <p className={styles.loginIntro}>
          Sign in to access the protected Ubuntu Hospital booking dashboard.
        </p>

        <AdminLoginForm redirectTo="/admin" />
      </section>
    </div>
  );
}
