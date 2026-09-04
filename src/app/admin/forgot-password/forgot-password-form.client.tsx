"use client";

import { useState, useTransition } from "react";
import { CheckCircle2 } from "lucide-react";
import { requestPasswordResetAction } from "@/actions/admin-password-reset";
import { useToast } from "@/components/ui/toast/toast-context";
import styles from "../admin.module.css";

export default function ForgotPasswordForm() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        const result = await requestPasswordResetAction(formData);
        toast.success(result.message);
        setIsSuccess(true);
      } catch (error) {
        const msg =
          error instanceof Error ? error.message : "Failed to send reset link.";
        setErrorMessage(msg);
        toast.error(msg);
      }
    });
  }

  if (isSuccess) {
    return (
      <div style={{ textAlign: "center", padding: "12px 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <CheckCircle2 size={44} color="#16a34a" />
        </div>
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#0f172a",
            marginBottom: "8px",
          }}
        >
          Reset Link Sent
        </h2>
        <p
          style={{
            color: "#64748b",
            fontSize: "14px",
            lineHeight: 1.5,
            marginBottom: "20px",
          }}
        >
          If an account exists for that email address, an email with
          instructions to reset your password has been sent. Please check your
          inbox.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <label className={styles.field}>
        <span>Email Address</span>
        <input
          type="email"
          name="email"
          placeholder="name@ubuntuhospital.org"
          required
          disabled={isPending}
          autoComplete="email"
        />
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
        {isPending ? "Sending Reset Link..." : "Send Reset Link"}
      </button>
    </form>
  );
}
