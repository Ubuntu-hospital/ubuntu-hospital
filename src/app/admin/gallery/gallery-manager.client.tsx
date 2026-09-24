"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, Sparkles, Tag, Eye, Star, Pencil } from "lucide-react";
import {
  createGalleryImageAction,
  updateGalleryImageAction,
  deleteGalleryImageAction,
} from "@/actions/content-management";
import { useToast } from "@/components/ui/toast/toast-context";
import ConfirmModal from "@/components/ui/confirm-modal/confirm-modal.client";
import GalleryForm, { type GalleryFormItem } from "./gallery-form.client";
import styles from "../admin.module.css";

interface GalleryImageItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  featured?: boolean;
  sortOrder?: number;
}

export default function GalleryManager({
  images,
}: {
  images: GalleryImageItem[];
}) {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImageItem | null>(
    null,
  );
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
          <p className={styles.headerDescription}>
            Manage, edit, or upload photos shown on the public gallery page.
          </p>
        </div>

        <div className={styles.pageHeaderActions}>
          <button
            type="button"
            className={styles.primaryActionButton}
            onClick={() => {
              setEditingImage(null);
              setShowAddForm((prev) => !prev);
            }}
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

      {editingImage ? (
        <section
          className={styles.collapsibleFormSection}
          style={{ marginBottom: "28px" }}
        >
          <GalleryForm
            action={updateGalleryImageAction}
            initialData={editingImage as GalleryFormItem}
            initialOpen={true}
            onClose={() => setEditingImage(null)}
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
                  {item.alt && item.alt !== item.title ? (
                    <p className={styles.galleryItemAlt} title={item.alt}>
                      {item.alt}
                    </p>
                  ) : null}
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
                    <span>View</span>
                  </a>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <button
                      type="button"
                      className={styles.editIconButton}
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingImage(item);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      disabled={isPending}
                      aria-label={`Edit ${item.title}`}
                      title="Edit gallery item"
                    >
                      <Pencil size={13} />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      className={styles.deleteIconButton}
                      onClick={() => triggerDelete(item)}
                      disabled={isPending}
                      aria-label={`Remove ${item.title}`}
                      title="Remove from gallery"
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
