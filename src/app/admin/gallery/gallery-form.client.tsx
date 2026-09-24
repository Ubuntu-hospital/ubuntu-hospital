"use client";

import { useState, useTransition } from "react";
import {
  Plus,
  X,
  Sparkles,
  Image as ImageIcon,
  UploadCloud,
} from "lucide-react";
import CloudinaryFileUpload from "@/components/ui/cloudinary-file-upload/cloudinary-file-upload.client";
import CustomSelect from "@/components/ui/custom-select/custom-select.client";
import { useToast } from "@/components/ui/toast/toast-context";
import styles from "../admin.module.css";

export interface GalleryFormItem {
  id?: string;
  title: string;
  category: string;
  image: string;
  alt?: string;
  featured?: boolean;
  sortOrder?: number;
}

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
  initialData,
  initialOpen = true,
  onClose,
  isAlone = false,
}: {
  action: GalleryFormAction;
  initialData?: GalleryFormItem | null;
  initialOpen?: boolean;
  onClose?: () => void;
  isAlone?: boolean;
}) {
  const isEditing = Boolean(initialData?.id);
  const { toast } = useToast();
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "hospital");
  const [alt, setAlt] = useState(initialData?.alt ?? "");
  const [featured, setFeatured] = useState(Boolean(initialData?.featured));
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialData?.image ?? null,
  );
  const [showUploader, setShowUploader] = useState(!initialData?.image);
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
    formData.set("title", title.trim());
    formData.set("category", category);
    formData.set("image", imageUrl);
    formData.set("alt", alt.trim() || title.trim());
    if (featured) {
      formData.set("featured", "on");
    } else {
      formData.delete("featured");
    }

    if (isEditing && initialData?.id) {
      formData.set("id", initialData.id);
      if (initialData.sortOrder !== undefined) {
        formData.set("sortOrder", String(initialData.sortOrder));
      }
    }

    startTransition(async () => {
      try {
        const result = await action(formData);
        toast.success(
          typeof result === "object" && result?.message
            ? result.message
            : isEditing
              ? "Gallery image updated."
              : "Image added to gallery.",
        );
        if (!isAlone) {
          handleClose();
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : isEditing
              ? "Failed to update gallery image."
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
          <h2>{isEditing ? "Edit Gallery Image" : "Add Gallery Image"}</h2>
          {isEditing ? (
            <p className={styles.formSubtitle}>
              Update image details, category, or replace the photo.
            </p>
          ) : null}
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
            <span>Title</span>
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

        <label className={styles.formLabel}>
          <span>Alt Text (Descriptive text for accessibility & SEO)</span>
          <input
            name="alt"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="e.g. Spacious hospital consultation room with ergonomic seating"
            disabled={isPending}
          />
        </label>

        <div className={styles.checkboxWrapper}>
          <label className={styles.customCheckboxLabel}>
            <input
              name="featured"
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              disabled={isPending}
            />
            <div className={styles.checkboxInfo}>
              <strong>Mark as Featured</strong>
              <small>Highlight in prominent gallery showcase spots</small>
            </div>
          </label>
        </div>

        <div className={styles.uploaderSection}>
          <div className={styles.previewInfoRow}>
            <span className={styles.formSectionLabel}>Photo</span>
            {isEditing && imageUrl && !showUploader ? (
              <button
                type="button"
                className={styles.viewImageLink}
                onClick={() => setShowUploader(true)}
              >
                <UploadCloud size={14} />
                <span>Change Photo</span>
              </button>
            ) : null}
          </div>

          {imageUrl && !showUploader ? (
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "340px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
                background: "#0f172a",
              }}
            >
              <img
                src={imageUrl}
                alt={title || "Gallery preview"}
                style={{
                  display: "block",
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "8px",
                  left: "8px",
                  background: "rgba(15, 23, 42, 0.8)",
                  backdropFilter: "blur(6px)",
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "3px 8px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <ImageIcon size={12} />
                Current Photo
              </div>
            </div>
          ) : (
            <div>
              <CloudinaryFileUpload
                folder="ubuntu-hospital/gallery"
                onUploaded={(url) => {
                  setImageUrl(url);
                  setShowUploader(false);
                }}
              />
              {isEditing && imageUrl ? (
                <button
                  type="button"
                  onClick={() => setShowUploader(false)}
                  style={{
                    marginTop: "8px",
                    background: "none",
                    border: "none",
                    color: "#64748b",
                    fontSize: "12px",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Keep current photo
                </button>
              ) : null}
            </div>
          )}
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
            disabled={!imageUrl || !title.trim() || isPending}
          >
            {isPending
              ? isEditing
                ? "Updating..."
                : "Adding image..."
              : isEditing
                ? "Save changes"
                : "Add to gallery"}
          </button>
        </div>
      </form>
    </div>
  );
}
