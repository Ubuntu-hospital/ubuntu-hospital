"use client";

import { useState, useTransition } from "react";
import { Plus, X, Sparkles } from "lucide-react";
import CloudinaryFileUpload from "@/components/ui/cloudinary-file-upload/cloudinary-file-upload.client";
import CustomSelect from "@/components/ui/custom-select/custom-select.client";
import { useToast } from "@/components/ui/toast/toast-context";
import styles from "../admin.module.css";

type TeamAction = (
  formData: FormData,
) => Promise<{ success: boolean; message: string } | void> | void;

export default function TeamCreateForm({
  action,
  groups,
  initialOpen = true,
  onClose,
  isAlone = false,
}: {
  action: TeamAction;
  groups: string[];
  initialOpen?: boolean;
  onClose?: () => void;
  isAlone?: boolean;
}) {
  const { toast } = useToast();
  const [group, setGroup] = useState(groups[0] ?? "");
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
        <span>Add team member</span>
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
      toast.error("Please upload a specialist photo before saving.");
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
            : "Team member added successfully.",
        );
        if (!isAlone) {
          handleClose();
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to add team member.",
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
            Specialist Team
          </span>
          <h2>Add Specialist / Team Member</h2>
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
            <span>Full name</span>
            <input
              name="name"
              placeholder="e.g. Dr. Kwame Mensah"
              required
              disabled={isPending}
            />
          </label>

          <label className={styles.formLabel}>
            <span>Role / Title</span>
            <input
              name="role"
              placeholder="e.g. Consultant Orthopaedic Surgeon"
              required
              disabled={isPending}
            />
          </label>
        </div>

        <div className={styles.formGridTwoCols}>
          <label className={styles.formLabel}>
            <span>Unit / Department</span>
            <input
              name="unit"
              placeholder="e.g. Orthopaedics & Spine"
              required
              disabled={isPending}
            />
          </label>

          <label className={styles.formLabel}>
            <span>Team group</span>
            <CustomSelect
              name="group"
              value={group}
              options={groups}
              placeholder="Select group"
              onChange={setGroup}
            />
          </label>
        </div>

        <div className={styles.uploaderSection}>
          <span className={styles.formSectionLabel}>Profile photo</span>
          <CloudinaryFileUpload
            folder="ubuntu-hospital/team"
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
            {isPending ? "Adding specialist..." : "Add team member"}
          </button>
        </div>
      </form>
    </div>
  );
}
