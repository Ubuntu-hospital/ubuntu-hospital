"use client";

import Link from "next/link";
import {
  Calendar,
  Users,
  Building2,
  Images,
  Layers,
  MessageSquareQuote,
  Menu,
  X,
  ShieldCheck,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { signOutAdminAction } from "@/actions/admin-auth";
import { useToast } from "@/components/ui/toast/toast-context";
import styles from "./admin.module.css";

const navigation = [
  { href: "/admin", label: "Bookings", icon: Calendar },
  { href: "/admin/team", label: "Specialist team", icon: Users },
  { href: "/admin/facilities", label: "Facilities", icon: Building2 },
  { href: "/admin/sections", label: "Sections", icon: Layers },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  {
    href: "/admin/testimonies",
    label: "Testimonies",
    icon: MessageSquareQuote,
  },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isLoggingOut, startTransition] = useTransition();
  const { toast } = useToast();

  function handleSignOut(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      try {
        toast.info("Signing out...");
        await signOutAdminAction();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to sign out.",
        );
      }
    });
  }

  return (
    <>
      {/* Mobile Hamburger Menu button placed at left of header - hidden when sidebar is open */}
      {!open ? (
        <button
          type="button"
          className={styles.sidebarTrigger}
          aria-expanded={open}
          aria-controls="admin-sidebar"
          onClick={() => setOpen(true)}
        >
          <Menu size={18} strokeWidth={2.2} aria-hidden="true" />
          <span>Menu</span>
        </button>
      ) : null}

      {open ? (
        <button
          className={styles.sidebarBackdrop}
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        id="admin-sidebar"
        className={`${styles.adminSidebar} ${open ? styles.adminSidebarOpen : ""}`}
      >
        <div className={styles.sidebarHeading}>
          <div className={styles.sidebarWorkspaceTag}>
            <ShieldCheck size={14} className={styles.workspaceIcon} />
            <span>Workspace</span>
          </div>
          <strong>Hospital Admin</strong>
          <button
            type="button"
            className={styles.sidebarClose}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <nav className={styles.adminNav} aria-label="Admin sections">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? styles.adminNavActive : undefined}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <Icon size={17} className={styles.navIcon} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* View live site inside mobile menu */}
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className={styles.mobileLiveSiteLink}
            onClick={() => setOpen(false)}
          >
            <ExternalLink size={16} className={styles.navIcon} />
            <span>View live website</span>
          </a>
        </nav>

        {/* Sidebar Footer with user details and Sign Out button across all screens */}
        <div className={styles.sidebarFooter}>
          <div className={styles.userSection}>
            <div className={styles.userAvatar}>
              {email.slice(0, 2).toUpperCase()}
            </div>
            <div className={styles.userInfo}>
              <span>Signed in as</span>
              <strong title={email}>{email}</strong>
            </div>
          </div>

          <form onSubmit={handleSignOut} className={styles.signOutForm}>
            <button
              type="submit"
              className={styles.sidebarSignOutBtn}
              disabled={isLoggingOut}
              title="Sign out of Admin Portal"
            >
              <LogOut size={15} />
              <span>{isLoggingOut ? "Signing out..." : "Sign out"}</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
