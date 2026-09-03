"use client";

import { useState, useTransition } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Sparkles,
  Stethoscope,
  Building,
  Check,
  X,
} from "lucide-react";
import {
  createTeamMemberAction,
  deleteTeamMemberAction,
  updateTeamMemberAction,
} from "@/actions/content-management";
import { useToast } from "@/components/ui/toast/toast-context";
import CustomSelect from "@/components/ui/custom-select/custom-select.client";
import ConfirmModal from "@/components/ui/confirm-modal/confirm-modal.client";
import TeamCreateForm from "./team-create-form.client";
import styles from "../admin.module.css";

interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  unit: string;
  group: string;
  image: string;
  imageAlt?: string;
  sortOrder?: number;
}

function InlineTeamEditForm({
  member,
  groups,
  onClose,
  isPending,
  onUpdate,
}: {
  member: TeamMemberItem;
  groups: string[];
  onClose: () => void;
  isPending: boolean;
  onUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [selectedGroup, setSelectedGroup] = useState(
    member.group || groups[0] || "",
  );

  return (
    <div className={styles.inlineEditPanel}>
      <div className={styles.editPanelHeader}>
        <h4>Edit Specialist: {member.name}</h4>
        <button
          type="button"
          className={styles.closePanelButton}
          onClick={onClose}
          aria-label="Close edit panel"
        >
          <X size={16} />
        </button>
      </div>

      <form className={styles.spaciousForm} onSubmit={onUpdate}>
        <input type="hidden" name="id" value={member.id} />

        <div className={styles.formGridTwoCols}>
          <label className={styles.formLabel}>
            <span>Full name</span>
            <input
              name="name"
              defaultValue={member.name}
              required
              disabled={isPending}
            />
          </label>

          <label className={styles.formLabel}>
            <span>Role / Title</span>
            <input
              name="role"
              defaultValue={member.role}
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
              defaultValue={member.unit}
              required
              disabled={isPending}
            />
          </label>

          <label className={styles.formLabel}>
            <span>Team group</span>
            <CustomSelect
              name="group"
              value={selectedGroup}
              options={groups}
              placeholder="Select group"
              onChange={setSelectedGroup}
            />
          </label>
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
            type="submit"
            className={styles.submitButton}
            disabled={isPending}
          >
            <Check size={15} />
            <span>{isPending ? "Saving changes..." : "Save changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default function TeamManager({
  members,
  groups,
}: {
  members: TeamMemberItem[];
  groups: string[];
}) {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [deletingMember, setDeletingMember] = useState<TeamMemberItem | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();

  function triggerDelete(member: TeamMemberItem) {
    setDeletingMember(member);
  }

  async function handleConfirmDelete() {
    if (!deletingMember) return;

    const formData = new FormData();
    formData.set("id", deletingMember.id);

    startTransition(async () => {
      try {
        const result = await deleteTeamMemberAction(formData);
        toast.success(
          typeof result === "object" && result?.message
            ? result.message
            : "Team member removed.",
        );
        setDeletingMember(null);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to remove team member.",
        );
      }
    });
  }

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      try {
        const result = await updateTeamMemberAction(formData);
        toast.success(
          typeof result === "object" && result?.message
            ? result.message
            : "Specialist details updated.",
        );
        setEditingMemberId(null);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update team member.",
        );
      }
    });
  }

  // When NO data exists: show only the form, centered with spacious width
  if (!members.length) {
    return (
      <div className={styles.centeredPageWrapper}>
        <TeamCreateForm
          action={createTeamMemberAction}
          groups={groups}
          initialOpen={true}
          isAlone={true}
        />
      </div>
    );
  }

  // When data exists: hide form by default, show "+ Add Team Member" CTA button at top
  return (
    <div className={styles.adminPageContainer}>
      <ConfirmModal
        isOpen={Boolean(deletingMember)}
        title="Remove Specialist"
        message={`Are you sure you want to remove "${deletingMember?.name}" from the specialist directory?`}
        confirmText="Remove Specialist"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingMember(null)}
      />

      <section className={styles.pageHeaderCard}>
        <div className={styles.pageHeaderLeft}>
          <div className={styles.headerTagRow}>
            <span className={styles.eyebrow}>
              <Sparkles size={13} className={styles.eyebrowIcon} />
              Hospital Staff
            </span>
            <span className={styles.countBadge}>
              {members.length}{" "}
              {members.length === 1 ? "Specialist" : "Specialists"}
            </span>
          </div>
          <h1>Specialist Team Directory</h1>
        </div>

        <div className={styles.pageHeaderActions}>
          <button
            type="button"
            className={styles.primaryActionButton}
            onClick={() => setShowAddForm((prev) => !prev)}
            aria-expanded={showAddForm}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>{showAddForm ? "Hide form" : "Add Team Member"}</span>
          </button>
        </div>
      </section>

      {showAddForm ? (
        <section className={styles.collapsibleFormSection}>
          <TeamCreateForm
            action={createTeamMemberAction}
            groups={groups}
            initialOpen={true}
            onClose={() => setShowAddForm(false)}
          />
        </section>
      ) : null}

      <section className={styles.contentSection}>
        <div className={styles.teamCardList}>
          {members.map((member) => {
            const isEditing = editingMemberId === member.id;

            return (
              <article key={member.id} className={styles.teamMemberCard}>
                <div className={styles.teamCardMain}>
                  <div className={styles.teamPortraitWrap}>
                    <img
                      src={member.image}
                      alt={member.imageAlt || member.name}
                      className={styles.teamPortraitImg}
                      loading="lazy"
                    />
                  </div>

                  <div className={styles.teamMemberInfo}>
                    <div className={styles.teamMemberHeader}>
                      <div>
                        <h3 className={styles.teamMemberName}>{member.name}</h3>
                        <p className={styles.teamMemberRole}>
                          <Stethoscope size={14} className={styles.infoIcon} />
                          {member.role}
                        </p>
                      </div>
                      <span className={styles.teamGroupBadge}>
                        <Building size={12} />
                        {member.group}
                      </span>
                    </div>

                    <div className={styles.teamMetaRow}>
                      <span className={styles.metaPill}>
                        <strong>Unit:</strong> {member.unit}
                      </span>
                    </div>
                  </div>

                  <div className={styles.teamCardActions}>
                    <button
                      type="button"
                      className={styles.secondarySmallButton}
                      onClick={() =>
                        setEditingMemberId(isEditing ? null : member.id)
                      }
                      title="Edit specialist details"
                    >
                      <Edit2 size={14} />
                      <span>{isEditing ? "Close" : "Edit"}</span>
                    </button>

                    <button
                      type="button"
                      className={styles.deleteIconButton}
                      onClick={() => triggerDelete(member)}
                      disabled={isPending}
                      aria-label={`Remove ${member.name}`}
                      title="Remove specialist"
                    >
                      <Trash2 size={15} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Inline Editing Form using beautiful custom input components */}
                {isEditing ? (
                  <InlineTeamEditForm
                    member={member}
                    groups={groups}
                    onClose={() => setEditingMemberId(null)}
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
