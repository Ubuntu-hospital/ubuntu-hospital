"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { signInAdminAction } from "@/actions/admin-auth";
import { routes } from "@/config/routes";
import { initialAdminAuthActionState } from "@/types/admin";

import styles from "../admin.module.css";

export function AdminLoginForm({ redirectTo }: { redirectTo: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(
    signInAdminAction,
    initialAdminAuthActionState,
  );

  return (
    <form action={formAction} className={styles.loginForm}>
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <label className={styles.field}>
        <span>Email Address</span>
        <input
          type="email"
          name="email"
          autoComplete="username"
          placeholder="name@ubuntuhospital.org"
          aria-invalid={Boolean(state.fieldErrors.email)}
          required
        />
        {state.fieldErrors.email ? (
          <small className={styles.fieldError}>{state.fieldErrors.email}</small>
        ) : null}
      </label>

      <label className={styles.field}>
        <span>Password</span>
        <div className={styles.passwordInputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            aria-invalid={Boolean(state.fieldErrors.password)}
            required
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
        {state.fieldErrors.password ? (
          <small className={styles.fieldError}>
            {state.fieldErrors.password}
          </small>
        ) : null}
      </label>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "-6px",
        }}
      >
        <Link
          href={routes.admin.forgotPassword}
          style={{
            fontSize: "12px",
            color: "var(--orange, #ff6d12)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Forgot password?
        </Link>
      </div>

      {state.message ? (
        <p className={styles.authMessage} aria-live="polite">
          {state.message}
        </p>
      ) : null}

      <button
        className={styles.submitButton}
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
