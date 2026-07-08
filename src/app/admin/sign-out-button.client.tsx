"use client";

import { useFormStatus } from "react-dom";

import styles from "./admin.module.css";

export function SignOutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      className={styles.signOutButton}
      disabled={pending}
      type="submit"
    >
      {pending ? "Signing out..." : "Sign out"}
    </button>
  );
}
