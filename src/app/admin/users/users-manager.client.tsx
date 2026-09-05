"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, Edit2, X, Mail } from "lucide-react";
import {
  deleteAdminUserAction,
  resendUserInviteOrResetAction,
} from "@/actions/user-management";
import { useToast } from "@/components/ui/toast/toast-context";
import ConfirmModal from "@/components/ui/confirm-modal/confirm-modal.client";
import UserForm from "./user-form.client";
import type { ManagedUser } from "@/types/admin";
import styles from "../admin.module.css";

function formatDate(isoString: string | null) {
  if (!isoString) return "Never";
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

export default function UsersManager({ users }: { users: ManagedUser[] }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<ManagedUser | null>(null);
  const [sendingInviteId, setSendingInviteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  function handleSendReset(u: ManagedUser) {
    setSendingInviteId(u.id);
    startTransition(async () => {
      try {
        const res = await resendUserInviteOrResetAction(u.id);
        toast.success(res.message);
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to send reset email.",
        );
      } finally {
        setSendingInviteId(null);
      }
    });
  }

  function handleConfirmDelete() {
    if (!deletingUser) return;
    const userToDelete = deletingUser;

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.set("id", userToDelete.id);
        const result = await deleteAdminUserAction(formData);
        toast.success(result?.message || "User account removed.");
        setDeletingUser(null);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to delete user.",
        );
      }
    });
  }

  return (
    <div className={styles.adminPageContainer}>
      <ConfirmModal
        isOpen={Boolean(deletingUser)}
        title="Remove User Account"
        message={`Are you sure you want to remove ${deletingUser?.name} (${deletingUser?.email})?`}
        confirmText="Remove User"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingUser(null)}
      />

      <section className={styles.pageHeaderCard}>
        <div className={styles.pageHeaderLeft}>
          <div className={styles.headerTagRow}>
            <span className={styles.countBadge}>
              {users.length} {users.length === 1 ? "User" : "Users"}
            </span>
          </div>
          <h1>Users</h1>
        </div>

        <div className={styles.pageHeaderActions}>
          <button
            type="button"
            className={styles.primaryActionButton}
            onClick={() => {
              setShowAddForm((prev) => !prev);
              setEditingUser(null);
            }}
            aria-expanded={showAddForm}
          >
            {showAddForm ? (
              <X size={16} strokeWidth={2.5} />
            ) : (
              <Plus size={16} strokeWidth={2.5} />
            )}
            <span>{showAddForm ? "Close" : "Add User"}</span>
          </button>
        </div>
      </section>

      {showAddForm ? (
        <section className={styles.collapsibleFormSection}>
          <UserForm initialOpen={true} onClose={() => setShowAddForm(false)} />
        </section>
      ) : null}

      {editingUser ? (
        <section className={styles.collapsibleFormSection}>
          <UserForm
            user={editingUser}
            initialOpen={true}
            onClose={() => setEditingUser(null)}
          />
        </section>
      ) : null}

      <section className={styles.contentSection}>
        {/* Desktop Table View */}
        <div className={styles.desktopListing}>
          <div className={styles.tableWrap}>
            <table className={styles.bookingsTable}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created</th>
                  <th>Last Active</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => {
                  const isAdmin = u.role === "admin";
                  const isBeingEdited = editingUser?.id === u.id;

                  return (
                    <tr key={u.id}>
                      <td>
                        <strong className={styles.patientName}>{u.name}</strong>
                      </td>

                      <td>
                        <span className={styles.phoneLink}>{u.email}</span>
                      </td>

                      <td>
                        <span
                          className={
                            isAdmin
                              ? `${styles.statusBadge} ${styles.statusBadgeScheduled}`
                              : `${styles.statusBadge} ${styles.statusBadgeContacted}`
                          }
                        >
                          {isAdmin ? "Super Admin" : "Staff (Bookings)"}
                        </span>
                      </td>

                      <td>
                        <span className={styles.submittedTime}>
                          {new Date(u.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </td>

                      <td>
                        <span className={styles.submittedTime}>
                          {formatDate(u.lastLoginAt)}
                        </span>
                      </td>

                      <td>
                        <div className={styles.actionGroup}>
                          <button
                            type="button"
                            className={styles.actionButton}
                            onClick={() => handleSendReset(u)}
                            disabled={isPending && sendingInviteId === u.id}
                            title="Send password reset or invite email"
                          >
                            <Mail size={13} />
                            <span>
                              {sendingInviteId === u.id
                                ? "Sending..."
                                : "Send Reset"}
                            </span>
                          </button>

                          <button
                            type="button"
                            className={styles.actionButton}
                            onClick={() => {
                              setEditingUser(isBeingEdited ? null : u);
                              setShowAddForm(false);
                            }}
                            title="Edit user"
                          >
                            <Edit2 size={13} />
                            <span>{isBeingEdited ? "Close" : "Edit"}</span>
                          </button>

                          <button
                            type="button"
                            className={styles.actionButton}
                            style={{
                              color: "#ef4444",
                              borderColor: "#fee2e2",
                              cursor: "pointer",
                            }}
                            onClick={() => setDeletingUser(u)}
                            disabled={isPending}
                            title="Delete user"
                          >
                            <Trash2 size={13} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Responsive Cards View */}
        <div className={styles.mobileListing}>
          {users.map((u) => {
            const isAdmin = u.role === "admin";
            const isBeingEdited = editingUser?.id === u.id;

            return (
              <article key={u.id} className={styles.bookingCard}>
                <div className={styles.bookingCardHeader}>
                  <div className={styles.bookingCardTitleGroup}>
                    <p className={styles.patientName}>{u.name}</p>
                    <span className={styles.phoneLink}>{u.email}</span>
                  </div>
                  <span
                    className={
                      isAdmin
                        ? `${styles.statusBadge} ${styles.statusBadgeScheduled}`
                        : `${styles.statusBadge} ${styles.statusBadgeContacted}`
                    }
                  >
                    {isAdmin ? "Super Admin" : "Staff"}
                  </span>
                </div>

                <dl className={styles.bookingDetails}>
                  <div className={styles.detailItem}>
                    <dt>Created</dt>
                    <dd>
                      <time dateTime={u.createdAt}>
                        {new Date(u.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </dd>
                  </div>

                  <div className={styles.detailItem}>
                    <dt>Last Active</dt>
                    <dd>{formatDate(u.lastLoginAt)}</dd>
                  </div>
                </dl>

                <div className={styles.actionGroup}>
                  <button
                    type="button"
                    className={styles.actionButton}
                    onClick={() => handleSendReset(u)}
                    disabled={isPending && sendingInviteId === u.id}
                    title="Send password reset or invite email"
                  >
                    <Mail size={13} />
                    <span>
                      {sendingInviteId === u.id ? "Sending..." : "Send Reset"}
                    </span>
                  </button>

                  <button
                    type="button"
                    className={styles.actionButton}
                    onClick={() => {
                      setEditingUser(isBeingEdited ? null : u);
                      setShowAddForm(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    title="Edit user"
                  >
                    <Edit2 size={13} />
                    <span>{isBeingEdited ? "Close" : "Edit"}</span>
                  </button>

                  <button
                    type="button"
                    className={styles.actionButton}
                    style={{
                      color: "#ef4444",
                      borderColor: "#fee2e2",
                      cursor: "pointer",
                    }}
                    onClick={() => setDeletingUser(u)}
                    disabled={isPending}
                    title="Delete user"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
