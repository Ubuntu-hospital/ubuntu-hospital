"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import styles from "./confirm-modal.module.css";

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = true,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div
        className={styles.modalBackdrop}
        onClick={isLoading ? undefined : onCancel}
      />
      <div className={styles.modalContainer}>
        <div className={styles.modalCard}>
          <div className={styles.modalHeader}>
            <div
              className={
                isDestructive
                  ? `${styles.iconWrap} ${styles.destructive}`
                  : styles.iconWrap
              }
            >
              <AlertTriangle size={20} />
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onCancel}
              disabled={isLoading}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          <div className={styles.modalBody}>
            <h3 className={styles.modalTitle}>{title}</h3>
            <p className={styles.modalMessage}>{message}</p>
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className={
                isDestructive
                  ? `${styles.confirmButton} ${styles.destructiveBtn}`
                  : styles.confirmButton
              }
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
