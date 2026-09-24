"use client";

import { useState, useTransition } from "react";
import { Plus, X, Sparkles } from "lucide-react";
import CloudinaryFileUpload from "@/components/ui/cloudinary-file-upload/cloudinary-file-upload.client";
import CustomSelect from "@/components/ui/custom-select/custom-select.client";
import { useToast } from "@/components/ui/toast/toast-context";
import styles from "../admin.module.css";

type GalleryFormAction = (
  formData: FormData,
) => Promise<{ success: boolean; message: string } | void> | void;

const categoryOptions = [
  { value: "hospital", label: "Hospital Facility" },
  { value: "care", label: "Clinical Care" },
  { value: "facilities", label: "Equipment & Spaces" },
  { value: "patients", label: "Patient Recovery" },
];

export default function GalleryForm({
  action,
  initialOpen = true,
  onClose,
  isAlone = false,
}: {
  action: GalleryFormAction;
  initialOpen?: boolean;
  onClose?: () => void;
  isAlone?: boolean;
}) {
  const { toast } = useToast();
  const [category, setCategory] = useState("hospital");
  const [open, setOpen] = useState(initialOpen);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
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
        <span>Add image</span>
      </button>
    );
  }

  function handleClose() {
    setOpen(false);
    onClose?.();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!imageUrl) {
      toast.error("Please upload a photo before submitting.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.set("image", imageUrl);

    startTransition(async () => {
      try {
        const result = await action(formData);
        toast.success(
          typeof result === "object" && result?.message
            ? result.message
            : "Image added to gallery.",
        );
        if (!isAlone) {
          handleClose();
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to add image to gallery.",
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
            Gallery
          </span>
          <h2>Add Gallery Image</h2>
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
            <span>Title</span>
            <input
              name="title"
              placeholder="e.g. Modern Inpatient Ward"
              required
              disabled={isPending}
            />
          </label>

          <label className={styles.formLabel}>
            <span>Category</span>
            <CustomSelect
              name="category"
              value={category}
              options={categoryOptions}
              placeholder="Select category"
              onChange={setCategory}
            />
          </label>
        </div>

        <div className={styles.checkboxWrapper}>
          <label className={styles.customCheckboxLabel}>
            <input name="featured" type="checkbox" disabled={isPending} />
            <div className={styles.checkboxInfo}>
              <strong>Mark as Featured</strong>
              <small>Highlight in spotlight showcases</small>
            </div>
          </label>
        </div>

        <div className={styles.uploaderSection}>
          <span className={styles.formSectionLabel}>Photo</span>
          <CloudinaryFileUpload
            folder="ubuntu-hospital/gallery"
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
            disabled={!imageUrl || !valid || isPending}
          >
            {isPending ? "Adding image..." : "Add to gallery"}
          </button>
        </div>
      </form>
    </div>
  );
}
