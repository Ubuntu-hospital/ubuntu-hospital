"use client";

import { useActionState } from "react";

import { signInAdminAction } from "@/actions/admin-auth";
import { initialAdminAuthActionState } from "@/types/admin";

import styles from "../admin.module.css";

export function AdminLoginForm({
  redirectTo,
}: {
  redirectTo: string;
}) {
  const [state, formAction, isPending] = useActionState(
    signInAdminAction,
    initialAdminAuthActionState,
  );

  return (
    <form action={formAction} className={styles.loginForm}>
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <label className={styles.field}>
        <span>Email address</span>
        <input
          type="email"
          name="email"
          autoComplete="username"
          placeholder="admin@ubuntuhospital.com"
          aria-invalid={Boolean(state.fieldErrors.email)}
          required
        />
        {state.fieldErrors.email ? (
          <small className={styles.fieldError}>{state.fieldErrors.email}</small>
        ) : null}
      </label>

      <label className={styles.field}>
        <span>Password</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter the admin password"
          aria-invalid={Boolean(state.fieldErrors.password)}
          required
        />
        {state.fieldErrors.password ? (
          <small className={styles.fieldError}>
            {state.fieldErrors.password}
          </small>
        ) : null}
      </label>

      {state.message ? (
        <p className={styles.authMessage} aria-live="polite">
          {state.message}
        </p>
      ) : null}

      <button className={styles.submitButton} type="submit" disabled={isPending}>
        {isPending ? "Signing in..." : "Open dashboard"}
      </button>
    </form>
  );
}
