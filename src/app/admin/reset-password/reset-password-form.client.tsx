"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { resetPasswordAction } from "@/actions/admin-password-reset";
import { useToast } from "@/components/ui/toast/toast-context";
import { routes } from "@/config/routes";
import styles from "../admin.module.css";

export default function ResetPasswordForm({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    formData.set("token", token);
    formData.set("email", email);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await resetPasswordAction(formData);
        toast.success(result.message);
        setIsSuccess(true);
      } catch (error) {
        const msg =
          error instanceof Error ? error.message : "Failed to reset password.";
        setErrorMessage(msg);
        toast.error(msg);
      }
    });
  }

  if (isSuccess) {
    return (
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <CheckCircle2 size={48} color="#16a34a" />
        </div>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: "8px",
          }}
        >
          Password Reset Complete
        </h2>
        <p
          style={{
            color: "#64748b",
            fontSize: "14px",
            lineHeight: 1.5,
            marginBottom: "24px",
          }}
        >
          Your new password is now active. You can sign in to the admin portal
          with your credentials.
        </p>
        <button
          type="button"
          className={styles.submitButton}
          style={{ width: "100%" }}
          onClick={() => router.push(routes.admin.login)}
        >
          Sign In Now
        </button>
      </div>
    );
  }

  if (!token || !email) {
    return (
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <p className={styles.authMessage}>
          This password reset link is invalid or missing required parameters.
        </p>
        <button
          type="button"
          className={styles.submitButton}
          style={{ width: "100%", marginTop: "16px" }}
          onClick={() => router.push(routes.admin.forgotPassword)}
        >
          Request New Link
        </button>
      </div>
    );
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div style={{ marginBottom: "6px" }}>
        <span style={{ fontSize: "13px", color: "#64748b" }}>
          Resetting password for:
        </span>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}>
          {email}
        </div>
      </div>

      <label className={styles.field}>
        <span>New Password</span>
        <div className={styles.passwordInputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Minimum 6 characters"
            required
            minLength={6}
            disabled={isPending}
            autoComplete="new-password"
          />
          <button
            type="button"
            className={styles.passwordToggleBtn}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </label>

      <label className={styles.field}>
        <span>Confirm New Password</span>
        <div className={styles.passwordInputWrapper}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm new password"
            required
            minLength={6}
            disabled={isPending}
            autoComplete="new-password"
          />
          <button
            type="button"
            className={styles.passwordToggleBtn}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            title={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </label>

      {errorMessage ? (
        <p className={styles.authMessage} aria-live="polite">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isPending}
        style={{ marginTop: "8px" }}
      >
        {isPending ? "Updating Password..." : "Save New Password"}
      </button>
    </form>
  );
}
