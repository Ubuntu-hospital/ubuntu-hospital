import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { hospitalConfig } from "@/config/hospital";
import { redirectIfAuthenticatedAdmin } from "@/lib/admin-auth";
import { routes } from "@/config/routes";
import ForgotPasswordForm from "./forgot-password-form.client";
import styles from "../admin.module.css";

export const metadata: Metadata = {
  title: `Forgot Password | ${hospitalConfig.name} Admin`,
  description: "Request a password reset link for the admin portal.",
};

export const dynamic = "force-dynamic";

export default async function ForgotPasswordPage() {
  await redirectIfAuthenticatedAdmin();

  return (
    <div className={styles.loginWrap}>
      <section className={styles.loginCard}>
        <div style={{ marginBottom: "16px" }}>
          <Link
            href={routes.admin.login}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#64748b",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            <ArrowLeft size={14} />
            <span>Back to Sign In</span>
          </Link>
        </div>

        <h1>Forgot Password</h1>
        <p className={styles.loginIntro}>
          Enter your registered email address and we will send you a link to
          reset your password.
        </p>

        <ForgotPasswordForm />
      </section>
    </div>
  );
}
