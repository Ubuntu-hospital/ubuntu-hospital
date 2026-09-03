import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

import Brand from "@/components/layout/brand/brand";
import { ToastProvider } from "@/components/ui/toast/toast-context";
import { readAdminSession } from "@/lib/admin-auth";
import AdminSidebar from "./admin-sidebar.client";

import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await readAdminSession();

  return (
    <ToastProvider>
      <div className={styles.adminShell}>
        <div className={styles.adminTopbar}>
          <div className={styles.topbarLeft}>
            {/* Logo on desktop, hidden on mobile */}
            <div className={styles.adminBrand}>
              <Brand />
            </div>
            <span className={styles.adminBadge}>Admin Portal</span>
          </div>

          <div className={styles.topbarRight}>
            {/* View live site on desktop header, hidden on mobile header */}
            <a
              className={styles.adminTopbarLink}
              href="/"
              target="_blank"
              rel="noreferrer"
            >
              <span>View live website</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        <div className={styles.adminFrame}>
          {session ? (
            <div className={styles.adminWorkspace}>
              <AdminSidebar email={session.email} />
              <main className={styles.adminContent}>{children}</main>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </ToastProvider>
  );
}
