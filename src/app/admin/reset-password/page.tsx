import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { hospitalConfig } from "@/config/hospital";
import { redirectIfAuthenticatedAdmin } from "@/lib/admin-auth";
import { routes } from "@/config/routes";
import ResetPasswordForm from "./reset-password-form.client";
import styles from "../admin.module.css";

export const metadata: Metadata = {
  title: `Set New Password | ${hospitalConfig.name} Admin`,
  description: "Set or reset your admin account password.",
};

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  await redirectIfAuthenticatedAdmin();

  const resolvedParams = await searchParams;
  const token = resolvedParams.token || "";
  const email = resolvedParams.email || "";

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

        <h1>Set New Password</h1>
        <p className={styles.loginIntro}>
          Choose a secure password with at least 6 characters.
        </p>

        <ResetPasswordForm token={token} email={email} />
      </section>
    </div>
  );
}
