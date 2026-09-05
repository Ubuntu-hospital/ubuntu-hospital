"use client";

import { useState, useTransition } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Sparkles,
  Quote,
  MessageSquareQuote,
  Check,
  X,
} from "lucide-react";
import {
  createTestimonyAction,
  updateTestimonyAction,
  deleteTestimonyAction,
} from "@/actions/content-management";
import { useToast } from "@/components/ui/toast/toast-context";
import ConfirmModal from "@/components/ui/confirm-modal/confirm-modal.client";
import CloudinaryFileUpload from "@/components/ui/cloudinary-file-upload/cloudinary-file-upload.client";
import type { ManagedTestimony } from "@/lib/testimonies";
import TestimonyForm from "./testimony-form.client";
import styles from "../admin.module.css";

function InlineTestimonyEditForm({
  testimony,
  onClose,
  isPending,
  onUpdate,
}: {
  testimony: ManagedTestimony;
  onClose: () => void;
  isPending: boolean;
  onUpdate: (formData: FormData) => void;
}) {
  const [newImage, setNewImage] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("id", testimony.id);
    if (newImage) {
      formData.set("image", newImage);
    }
    onUpdate(formData);
  }

  return (
    <form className={styles.inlineEditForm} onSubmit={handleSubmit}>
      <div className={styles.inlineEditHeader}>
        <h4>Edit Testimony Details</h4>
        <span className={styles.editingBadge}>Editing</span>
      </div>

      <div className={styles.formGridTwoCols}>
        <label className={styles.formLabel}>
          <span>Patient name</span>
          <input
            name="name"
            defaultValue={testimony.name}
            required
            disabled={isPending}
          />
        </label>

        <label className={styles.formLabel}>
          <span>Care received / Department</span>
          <input
            name="context"
            defaultValue={testimony.context}
            required
            disabled={isPending}
          />
        </label>
      </div>

      <label className={styles.formLabel}>
        <span>Testimony / Feedback quote</span>
        <textarea
          name="quote"
          defaultValue={testimony.quote}
          rows={3}
          required
          disabled={isPending}
        />
      </label>

      <div className={styles.uploaderSection}>
        <span className={styles.formSectionLabel}>Change photo (optional)</span>
        <CloudinaryFileUpload
          folder="ubuntu-hospital/testimonies"
          onUploaded={setNewImage}
        />
      </div>

      <div className={styles.editFormActions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onClose}
          disabled={isPending}
        >
          Cancel
        </button>

        <button
          className={styles.saveEditButton}
          type="submit"
          disabled={isPending}
        >
          <Check size={14} />
          <span>{isPending ? "Saving..." : "Save changes"}</span>
        </button>
      </div>
    </form>
  );
}

export default function TestimoniesManager({
  testimonies,
}: {
  testimonies: ManagedTestimony[];
}) {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingTestimony, setDeletingTestimony] =
    useState<ManagedTestimony | null>(null);
  const [isPending, startTransition] = useTransition();

  function triggerDelete(item: ManagedTestimony) {
    setDeletingTestimony(item);
  }

  function handleConfirmDelete() {
    if (!deletingTestimony) return;
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.set("id", deletingTestimony.id);
        const result = await deleteTestimonyAction(formData);
        toast.success(result?.message || "Testimony removed.");
        setDeletingTestimony(null);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to remove testimony.",
        );
      }
    });
  }

  function handleUpdate(formData: FormData) {
    startTransition(async () => {
      try {
        const result = await updateTestimonyAction(formData);
        toast.success(result?.message || "Testimony updated successfully.");
        setEditingId(null);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update testimony.",
        );
      }
    });
  }

  // When no testimonies exist: show only the spacious form centered
  if (!testimonies.length) {
    return (
      <div className={styles.centeredPageWrapper}>
        <TestimonyForm
          action={createTestimonyAction}
          initialOpen={true}
          isAlone={true}
        />
      </div>
    );
  }

  return (
    <div className={styles.adminPageContainer}>
      <ConfirmModal
        isOpen={Boolean(deletingTestimony)}
        title="Remove Testimony"
        message={`Are you sure you want to remove the testimony from "${deletingTestimony?.name}"?`}
        confirmText="Remove Testimony"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTestimony(null)}
      />

      <section className={styles.pageHeaderCard}>
        <div className={styles.pageHeaderLeft}>
          <div className={styles.headerTagRow}>
            <span className={styles.eyebrow}>
              <Sparkles size={13} className={styles.eyebrowIcon} />
              Patient Voices
            </span>
            <span className={styles.countBadge}>
              {testimonies.length}{" "}
              {testimonies.length === 1 ? "Testimony" : "Testimonies"}
            </span>
          </div>
          <h1>Patient Testimonies</h1>
        </div>

        <div className={styles.pageHeaderActions}>
          <button
            type="button"
            className={styles.primaryActionButton}
            onClick={() => setShowAddForm((prev) => !prev)}
            aria-expanded={showAddForm}
          >
            {showAddForm ? (
              <X size={16} strokeWidth={2.5} />
            ) : (
              <Plus size={16} strokeWidth={2.5} />
            )}
            <span>{showAddForm ? "Hide form" : "Add Testimony"}</span>
          </button>
        </div>
      </section>

      {showAddForm ? (
        <section className={styles.collapsibleFormSection}>
          <TestimonyForm
            action={createTestimonyAction}
            initialOpen={true}
            onClose={() => setShowAddForm(false)}
          />
        </section>
      ) : null}

      <section className={styles.contentSection}>
        <div className={styles.teamCardList}>
          {testimonies.map((item) => {
            const isEditing = editingId === item.id;

            return (
              <article key={item.id} className={styles.teamMemberCard}>
                <div className={styles.teamCardMain}>
                  <div className={styles.teamPortraitWrap}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.imageAlt || item.name}
                        className={styles.teamPortraitImg}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        <Quote size={28} className={styles.quoteIcon} />
                        <span>{item.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.teamMemberInfo}>
                    <div className={styles.teamMemberHeader}>
                      <div>
                        <h3 className={styles.teamMemberName}>{item.name}</h3>
                        <p className={styles.teamMemberRole}>
                          <MessageSquareQuote
                            size={14}
                            className={styles.infoIcon}
                          />
                          {item.context}
                        </p>
                      </div>
                    </div>

                    <blockquote className={styles.testimonyQuoteText}>
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  </div>

                  <div className={styles.teamCardActions}>
                    <button
                      type="button"
                      className={styles.secondarySmallButton}
                      onClick={() => setEditingId(isEditing ? null : item.id)}
                      title="Edit testimony"
                    >
                      <Edit2 size={14} />
                      <span>{isEditing ? "Close" : "Edit"}</span>
                    </button>

                    <button
                      type="button"
                      className={styles.deleteIconButton}
                      onClick={() => triggerDelete(item)}
                      disabled={isPending}
                      aria-label={`Remove testimony from ${item.name}`}
                      title="Remove testimony"
                    >
                      <Trash2 size={15} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <InlineTestimonyEditForm
                    testimony={item}
                    onClose={() => setEditingId(null)}
                    isPending={isPending}
                    onUpdate={handleUpdate}
                  />
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
