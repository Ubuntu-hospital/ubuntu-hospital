"use client";

import { useState, useTransition, useRef } from "react";
import {
  ExternalLink,
  Camera,
  CheckCircle2,
  Image as ImageIcon,
  Loader2,
  Check,
  X,
} from "lucide-react";
import { uploadFile } from "@/lib/cloudinary-upload";
import { useToast } from "@/components/ui/toast/toast-context";
import styles from "../admin.module.css";

type FacilityAction = (
  formData: FormData,
) => Promise<{ success: boolean; message: string } | void> | void;

export default function FacilityCard({
  action,
  facilityId,
  title,
  imageAlt,
  currentImage,
  isOverridden,
  folder,
}: {
  action: FacilityAction;
  facilityId: string;
  title: string;
  imageAlt: string;
  currentImage: string;
  isOverridden: boolean;
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

  // Upload to Cloudinary and immediately save to MongoDB in one smooth action!
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
      formData.set("facilityId", facilityId);
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
              : "Failed to save photo record.",
          );
        } finally {
          setIsUploading(false);
        }
      });
    } catch (uploadErr) {
      setIsUploading(false);
      toast.error(
        uploadErr instanceof Error ? uploadErr.message : "Upload failed.",
      );
    }
  }

  const isBusy = isUploading || isPending;

  return (
    <article className={styles.facilityCard}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenFileInput}
        id={`facility-file-${facilityId}`}
        onChange={handleFileSelect}
        disabled={isBusy}
      />

      <div className={styles.facilityCardHeader}>
        <div className={styles.facilityTitleWrap}>
          <h3 className={styles.facilityCardTitle}>{title}</h3>
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
          className={styles.facilityPreviewImg}
          loading="lazy"
        />
        {previewUrl ? (
          <div className={styles.previewActiveBadge}>
            Preview (Click Confirm below to save)
          </div>
        ) : null}
      </div>

      {previewUrl ? (
        <div className={styles.previewConfirmationBox}>
          <div className={styles.previewInfoRow}>
            <span className={styles.selectedFileName}>
              {selectedFile?.name} (
              {(Number(selectedFile?.size || 0) / (1024 * 1024)).toFixed(2)} MB)
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
              <span>Discard</span>
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
                  <span>Saving to website...</span>
                </>
              ) : (
                <>
                  <Check size={15} />
                  <span>Confirm & Upload Photo</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : null}

      <div className={styles.facilityCardFooter}>
        <a
          href="/facilities#facility-explorer"
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
        >
          <Camera size={14} />
          <span>Change photo</span>
        </button>
      </div>
    </article>
  );
}
