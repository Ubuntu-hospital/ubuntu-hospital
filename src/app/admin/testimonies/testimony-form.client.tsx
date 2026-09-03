"use client";

import { useState, useTransition } from "react";
import { Plus, X, Sparkles } from "lucide-react";
import CloudinaryFileUpload from "@/components/ui/cloudinary-file-upload/cloudinary-file-upload.client";
import { useToast } from "@/components/ui/toast/toast-context";
import styles from "../admin.module.css";

type TestimonyAction = (
  formData: FormData,
) => Promise<{ success: boolean; message: string } | void> | void;

export default function TestimonyForm({
  action,
  initialOpen = true,
  onClose,
  isAlone = false,
}: {
  action: TestimonyAction;
  initialOpen?: boolean;
  onClose?: () => void;
  isAlone?: boolean;
}) {
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(initialOpen);
  const [valid, setValid] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!open && !isAlone) {
    return (
      <button
        className={styles.primaryActionButton}
        type="button"
        onClick={() => setOpen(true)}
      >
        <Plus size={16} strokeWidth={2.5} />
        <span>Add Testimony</span>
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
    if (imageUrl) {
      formData.set("image", imageUrl);
    }

    startTransition(async () => {
      try {
        const result = await action(formData);
        toast.success(
          typeof result === "object" && result?.message
            ? result.message
            : "Testimony added successfully.",
        );
        if (!isAlone) {
          handleClose();
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to add testimony.",
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
            Patient Voices
          </span>
          <h2>Add Patient Testimony</h2>
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

      <form
        className={styles.spaciousForm}
        onSubmit={handleSubmit}
        onInput={(event) => setValid(event.currentTarget.checkValidity())}
      >
        <div className={styles.formGridTwoCols}>
          <label className={styles.formLabel}>
            <span>Patient name</span>
            <input
              name="name"
              placeholder="e.g. Ama Serwaa"
              required
              disabled={isPending}
            />
          </label>

          <label className={styles.formLabel}>
            <span>Care received / Department</span>
            <input
              name="context"
              placeholder="e.g. Orthopaedic care or Physiotherapy"
              required
              disabled={isPending}
            />
          </label>
        </div>

        <label className={styles.formLabel}>
          <span>Testimony / Feedback quote</span>
          <textarea
            name="quote"
            rows={4}
            placeholder="Share the patient's feedback or experience..."
            required
            disabled={isPending}
          />
        </label>

        <div className={styles.uploaderSection}>
          <span className={styles.formSectionLabel}>
            Patient photo (optional)
          </span>
          <CloudinaryFileUpload
            folder="ubuntu-hospital/testimonies"
            onUploaded={setImageUrl}
          />
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
            className={styles.submitButton}
            type="submit"
            disabled={!valid || isPending}
          >
            {isPending ? "Adding testimony..." : "Add testimony"}
          </button>
        </div>
      </form>
    </div>
  );
}
