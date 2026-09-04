"use client";

import { useState, useTransition } from "react";
import { Plus, X, Sparkles, Check, Eye, EyeOff } from "lucide-react";
import CustomSelect from "@/components/ui/custom-select/custom-select.client";
import { useToast } from "@/components/ui/toast/toast-context";
import {
  createAdminUserAction,
  updateAdminUserAction,
} from "@/actions/user-management";
import type { ManagedUser } from "@/types/admin";
import styles from "../admin.module.css";

const roleOptions = [
  { value: "staff", label: "Staff Member (Bookings Only)" },
  { value: "admin", label: "Super Admin (Full Access)" },
];

export default function UserForm({
  user,
  initialOpen = true,
  onClose,
  isAlone = false,
}: {
  user?: ManagedUser | null;
  initialOpen?: boolean;
  onClose?: () => void;
  isAlone?: boolean;
}) {
  const isEditing = Boolean(user);
  const { toast } = useToast();
  const [role, setRole] = useState<string>(user?.role || "staff");
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(initialOpen);
  const [isPending, startTransition] = useTransition();

  if (!open && !isAlone) {
    return (
      <button
        className={styles.primaryActionButton}
        type="button"
        onClick={() => setOpen(true)}
      >
        <Plus size={16} strokeWidth={2.5} />
        <span>Add user account</span>
      </button>
    );
  }

  function handleClose() {
    setOpen(false);
    onClose?.();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("role", role);

    startTransition(async () => {
      try {
        if (isEditing && user) {
          formData.set("id", user.id);
          const result = await updateAdminUserAction(formData);
          toast.success(result?.message || "User updated successfully.");
        } else {
          const result = await createAdminUserAction(formData);
          toast.success(result?.message || "User created successfully.");
        }
        if (!isAlone) {
          handleClose();
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to save user.",
        );
      }
    });
  }

  return (
    <div
      className={
        isAlone ? styles.centeredFormContainer : styles.createPanelCard
      }
    >
      <div className={styles.formCardHeader}>
        <div className={styles.formTitleGroup}>
          <span className={styles.eyebrow}>
            <Sparkles size={13} className={styles.eyebrowIcon} />
            Access Control
          </span>
          <h2>
            {isEditing ? `Edit Account: ${user?.name}` : "Add User Account"}
          </h2>
        </div>
        {!isAlone ? (
          <button
            type="button"
            className={styles.closePanelButton}
            onClick={handleClose}
            aria-label="Close form"
          >
            <X size={18} />
          </button>
        ) : null}
      </div>

      <form className={styles.spaciousForm} onSubmit={handleSubmit}>
        <div className={styles.formGridTwoCols}>
          <label className={styles.formLabel}>
            <span>Full name</span>
            <input
              name="name"
              defaultValue={user?.name || ""}
              placeholder="e.g. Dr. Kwame Mensah"
              required
              disabled={isPending}
            />
          </label>

          <label className={styles.formLabel}>
            <span>Email address</span>
            <input
              type="email"
              name="email"
              defaultValue={user?.email || ""}
              placeholder="name@ubuntuhospital.org"
              required
              disabled={isPending}
            />
          </label>
        </div>

        <div className={styles.formGridTwoCols}>
          <div className={styles.formLabel}>
            <span>Role & Permission</span>
            <CustomSelect
              name="role"
              value={role}
              options={roleOptions}
              onChange={(val) => setRole(val)}
            />
          </div>

          <label className={styles.formLabel}>
            <span>
              {isEditing
                ? "New password (leave blank to keep current)"
                : "Account password"}
            </span>
            <div className={styles.passwordInputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={isEditing ? "••••••••" : "Minimum 6 characters"}
                required={!isEditing}
                minLength={6}
                disabled={isPending}
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
        </div>

        <div className={styles.formActionFooter}>
          {!isAlone ? (
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </button>
          ) : null}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isPending}
          >
            {isPending ? (
              <span>Saving...</span>
            ) : isEditing ? (
              <>
                <Check size={16} />
                <span>Save changes</span>
              </>
            ) : (
              <>
                <Plus size={16} strokeWidth={2.5} />
                <span>Create user account</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
