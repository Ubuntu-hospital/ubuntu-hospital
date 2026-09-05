"use client";

import { useEffect, useRef, useState } from "react";
import {
  UploadCloud,
  CheckCircle2,
  Loader2,
  Check,
  X,
  Camera,
} from "lucide-react";
import { uploadFile } from "@/lib/cloudinary-upload";
import { emitAdminToast } from "@/components/ui/toast/toast-context";
import styles from "./cloudinary-file-upload.module.css";

export default function CloudinaryFileUpload({
  name = "image",
  multiple = false,
  folder = "ubuntu-hospital",
  onUploaded,
  initialImage,
}: {
  name?: string;
  multiple?: boolean;
  folder?: string;
  onUploaded?: (url: string | null) => void;
  initialImage?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>(initialImage ?? "");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    return () => {
      if (localPreview && !localPreview.startsWith("http")) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || !files.length) return;

    const file = files[0];
    setPendingFile(file);
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);
  }

  function handleDiscard() {
    if (localPreview && !localPreview.startsWith("http")) {
      URL.revokeObjectURL(localPreview);
    }
    setPendingFile(null);
    setLocalPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function handleConfirmUpload() {
    if (!pendingFile) return;

    setUploading(true);
    emitAdminToast({
      type: "info",
      title: "Uploading",
      message: "Uploading photo to cloud storage...",
    });

    try {
      const result = await uploadFile(pendingFile, { folder });
      const secureUrl = result.secureUrl;

      setUploadedUrl(secureUrl);
      setPendingFile(null);
      setLocalPreview(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      onUploaded?.(secureUrl);

      emitAdminToast({
        type: "success",
        title: "Upload Successful",
        message: "Photo uploaded and ready to save.",
      });
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to upload photo.";
      emitAdminToast({
        type: "error",
        title: "Upload Failed",
        message: errorMsg,
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        className={styles.input}
        id={`${name}-upload`}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileSelect}
        disabled={uploading}
      />

      {/* 1. Pending Local Preview (Unconfirmed selection) */}
      {localPreview ? (
        <div className={styles.pendingPreviewContainer}>
          <div className={styles.previewImageWrap}>
            <img src={localPreview} alt="Local preview" />
            <span className={styles.previewBadge}>
              Preview (Not uploaded yet)
            </span>
          </div>

          <div className={styles.fileDetailsRow}>
            <span className={styles.fileNameText}>
              {pendingFile?.name} (
              {(Number(pendingFile?.size || 0) / (1024 * 1024)).toFixed(2)} MB)
            </span>
          </div>

          <div className={styles.previewActionRow}>
            <button
              type="button"
              className={styles.discardButton}
              onClick={handleDiscard}
              disabled={uploading}
            >
              <X size={14} />
              <span>Cancel</span>
            </button>

            <button
              type="button"
              className={styles.confirmUploadBtn}
              onClick={handleConfirmUpload}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 size={15} className={styles.spinIcon} />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Check size={15} />
                  <span>Upload</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : null}

      {/* 2. Uploaded Cloud Photo State (when no pending local preview) */}
      {!localPreview && uploadedUrl ? (
        <div className={styles.currentImage}>
          <div className={styles.currentImageContainer}>
            <img src={uploadedUrl} alt="Uploaded photo" />
            <span className={styles.uploadedBadge}>
              <CheckCircle2 size={13} />
              Photo Confirmed
            </span>
          </div>
          <button
            type="button"
            className={styles.updateButton}
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            <Camera size={14} />
            <span>Change Photo</span>
          </button>
        </div>
      ) : null}

      {/* 3. Empty State File Dropzone */}
      {!localPreview && !uploadedUrl ? (
        <label
          className={
            uploading
              ? `${styles.dropzone} ${styles.dropzoneDisabled}`
              : styles.dropzone
          }
          htmlFor={`${name}-upload`}
        >
          <span className={styles.icon} aria-hidden="true">
            <UploadCloud size={20} />
          </span>
          <span className={styles.title}>Click to choose specialist photo</span>
          <span className={styles.meta}>JPG, PNG or WEBP · Up to 10 MB</span>
        </label>
      ) : null}

      {/* Hidden input for form data serialization */}
      {uploadedUrl ? (
        <input type="hidden" name={name} value={uploadedUrl} />
      ) : null}
    </div>
  );
}
