"use client";

import { useState, useTransition, useRef } from "react";
import {
  ExternalLink,
  Camera,
  CheckCircle2,
  Loader2,
  Check,
  X,
  Layers,
} from "lucide-react";
import { uploadFile } from "@/lib/cloudinary-upload";
import { useToast } from "@/components/ui/toast/toast-context";
import styles from "../admin.module.css";

type SectionAction = (
  formData: FormData,
) => Promise<{ success: boolean; message: string } | void> | void;

export default function SectionCard({
  action,
  sectionId,
  title,
  page,
  location,
  imageAlt,
  currentImage,
  isOverridden,
  publicUrl,
  folder,
}: {
  action: SectionAction;
  sectionId: string;
  title: string;
  page: string;
  location: string;
  imageAlt: string;
  currentImage: string;
  isOverridden: boolean;
  publicUrl: string;
  folder: string;
}) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || !files.length) return;
    const file = files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleDiscard() {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleConfirmAndSave() {
    if (!selectedFile) {
      toast.error("Please choose a photo to upload.");
      return;
    }

    setIsUploading(true);
    toast.info("Uploading photo to storage...");

    try {
      // 1. Upload to Cloudinary
      const uploadResult = await uploadFile(selectedFile, { folder });
      const secureUrl = uploadResult.secureUrl;

      // 2. Save directly to DB via Server Action
      const formData = new FormData();
      formData.set("sectionId", sectionId);
      formData.set("image", secureUrl);
      formData.set("imageAlt", imageAlt || title);

      startTransition(async () => {
        try {
          const result = await action(formData);
          toast.success(
            typeof result === "object" && result?.message
              ? result.message
              : `Photo for ${title} updated successfully.`,
          );
          handleDiscard();
        } catch (dbErr) {
          toast.error(
            dbErr instanceof Error
              ? dbErr.message
              : "Failed to save section photo.",
          );
        } finally {
          setIsUploading(false);
        }
      });
    } catch (uploadErr) {
      toast.error(
        uploadErr instanceof Error
          ? uploadErr.message
          : "Photo upload failed. Please try again.",
      );
      setIsUploading(false);
    }
  }

  const isBusy = isUploading || isPending;

  return (
    <article className={styles.facilityCard}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif"
        className={styles.hiddenFileInput}
        id={`section-file-${sectionId}`}
        onChange={handleFileSelect}
        disabled={isBusy}
      />

      <div className={styles.facilityCardHeader}>
        <div className={styles.facilityTitleWrap}>
          <div className={styles.headerTagRow}>
            <span className={styles.categoryPill}>
              <Layers size={11} />
              {page}
            </span>
          </div>
          <h3 className={styles.facilityCardTitle}>{title}</h3>
          <p className={styles.teamMemberRole}>{location}</p>
        </div>

        {isOverridden ? (
          <span className={styles.managedBadgeActive}>
            <CheckCircle2 size={12} />
            <span>Custom Photo</span>
          </span>
        ) : null}
      </div>

      <div className={styles.facilityImageWrapper}>
        <img
          src={previewUrl || currentImage}
          alt={imageAlt || title}
          className={styles.facilityCoverImage}
          loading="lazy"
        />

        {previewUrl ? (
          <div className={styles.pendingOverlayBadge}>
            <span>Pending upload</span>
          </div>
        ) : null}
      </div>

      {previewUrl ? (
        <div className={styles.previewConfirmationBox}>
          <div className={styles.previewInfoRow}>
            <span className={styles.selectedFileName}>
              {selectedFile?.name}
            </span>
          </div>

          <div className={styles.confirmationActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleDiscard}
              disabled={isBusy}
            >
              <X size={14} />
              <span>Cancel</span>
            </button>

            <button
              type="button"
              className={styles.primaryActionButton}
              onClick={handleConfirmAndSave}
              disabled={isBusy}
            >
              {isBusy ? (
                <>
                  <Loader2 size={15} className={styles.spinIcon} />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check size={15} />
                  <span>Upload & Save</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : null}

      <div className={styles.facilityCardFooter}>
        <a
          href={publicUrl}
          target="_blank"
          rel="noreferrer"
          className={styles.facilityExploreLink}
        >
          <span>View on public site</span>
          <ExternalLink size={13} />
        </a>

        <button
          type="button"
          className={styles.secondarySmallButton}
          onClick={() => fileInputRef.current?.click()}
          disabled={isBusy}
          title="Choose photo from device"
        >
          <Camera size={14} />
          <span>Change photo</span>
        </button>
      </div>
    </article>
  );
}
