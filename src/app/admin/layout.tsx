import type { ReactNode } from "react";

import Brand from "@/components/layout/brand/brand";
import { readAdminSession } from "@/lib/admin-auth";

import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await readAdminSession();

  return (
    <div className={styles.adminShell}>
      <div className={styles.adminFrame}>
        <div className={styles.adminTopbar}>
          <Brand />

          <a className={styles.adminTopbarLink} href={session ? "/" : "/"}>
            Return to site
          </a>
        </div>

        {children}
      </div>
    </div>
  );
}
