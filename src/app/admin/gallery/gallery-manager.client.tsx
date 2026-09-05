"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, Sparkles, Tag, Eye, Star } from "lucide-react";
import {
  createGalleryImageAction,
  deleteGalleryImageAction,
} from "@/actions/content-management";
import { useToast } from "@/components/ui/toast/toast-context";
import ConfirmModal from "@/components/ui/confirm-modal/confirm-modal.client";
import GalleryForm from "./gallery-form.client";
import styles from "../admin.module.css";

interface GalleryImageItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  featured?: boolean;
}

export default function GalleryManager({
  images,
}: {
  images: GalleryImageItem[];
}) {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingImage, setDeletingImage] = useState<GalleryImageItem | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();

  function triggerDelete(item: GalleryImageItem) {
    setDeletingImage(item);
  }

  async function handleConfirmDelete() {
    if (!deletingImage) return;

    const formData = new FormData();
    formData.set("id", deletingImage.id);

    startTransition(async () => {
      try {
        const result = await deleteGalleryImageAction(formData);
        toast.success(
          typeof result === "object" && result?.message
            ? result.message
            : "Gallery image removed.",
        );
        setDeletingImage(null);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to remove image.",
        );
      }
    });
  }

  // When NO data exists: only show the form, centered with spacious width
  if (!images.length) {
    return (
      <div className={styles.centeredPageWrapper}>
        <GalleryForm
          action={createGalleryImageAction}
          initialOpen={true}
          isAlone={true}
        />
      </div>
    );
  }

  // When data exists: hide form by default, show "+ Add Image" CTA button at top
  return (
    <div className={styles.adminPageContainer}>
      <ConfirmModal
        isOpen={Boolean(deletingImage)}
        title="Remove Gallery Image"
        message={`Are you sure you want to remove "${deletingImage?.title}"? This photo will no longer appear on the website.`}
        confirmText="Remove Image"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingImage(null)}
      />

      <section className={styles.pageHeaderCard}>
        <div className={styles.pageHeaderLeft}>
          <div className={styles.headerTagRow}>
            <span className={styles.eyebrow}>
              <Sparkles size={13} className={styles.eyebrowIcon} />
              Media Gallery
            </span>
            <span className={styles.countBadge}>
              {images.length} {images.length === 1 ? "Image" : "Images"}
            </span>
          </div>
          <h1>Gallery Management</h1>
        </div>

        <div className={styles.pageHeaderActions}>
          <button
            type="button"
            className={styles.primaryActionButton}
            onClick={() => setShowAddForm((prev) => !prev)}
            aria-expanded={showAddForm}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>{showAddForm ? "Hide form" : "Add Image"}</span>
          </button>
        </div>
      </section>

      {showAddForm ? (
        <section className={styles.collapsibleFormSection}>
          <GalleryForm
            action={createGalleryImageAction}
            initialOpen={true}
            onClose={() => setShowAddForm(false)}
          />
        </section>
      ) : null}

      <section className={styles.contentSection}>
        <div className={styles.galleryCardGrid}>
          {images.map((item) => (
            <article key={item.id} className={styles.galleryItemCard}>
              <div className={styles.galleryImageWrap}>
                <img
                  src={item.image}
                  alt={item.alt || item.title}
                  className={styles.galleryImage}
                  loading="lazy"
                />
                <div className={styles.imageOverlayTags}>
                  <span className={styles.categoryPill}>
                    <Tag size={11} />
                    {item.category}
                  </span>
                  {item.featured ? (
                    <span className={styles.featuredPill}>
                      <Star size={11} fill="currentColor" />
                      Featured
                    </span>
                  ) : null}
                </div>
              </div>

              <div className={styles.galleryItemContent}>
                <div className={styles.galleryItemMeta}>
                  <h3 className={styles.galleryItemTitle} title={item.title}>
                    {item.title}
                  </h3>
                </div>

                <div className={styles.galleryItemFooter}>
                  <a
                    href={item.image}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.viewImageLink}
                    title="Open full size image"
                  >
                    <Eye size={14} />
                    <span>View full size</span>
                  </a>

                  <button
                    type="button"
                    className={styles.deleteIconButton}
                    onClick={() => triggerDelete(item)}
                    disabled={isPending}
                    aria-label={`Remove ${item.title}`}
                    title="Remove from gallery"
                  >
                    <Trash2 size={15} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
