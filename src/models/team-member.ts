import { Schema, model, models, type Model } from "mongoose";

export interface TeamMemberDocument {
  name: string;
  role: string;
  unit: string;
  image: string;
  imageAlt: string;
  group: string;
  sortOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const teamMemberSchema = new Schema<TeamMemberDocument>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    role: { type: String, required: true, trim: true, maxlength: 160 },
    unit: { type: String, required: true, trim: true, maxlength: 160 },
    image: { type: String, required: true, trim: true },
    imageAlt: { type: String, required: true, trim: true, maxlength: 240 },
    group: { type: String, required: true, trim: true, maxlength: 160 },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "team_members" },
);

teamMemberSchema.index({ active: 1, group: 1, sortOrder: 1 });

export const TeamMemberModel =
  (models.TeamMember as Model<TeamMemberDocument>) ||
  model<TeamMemberDocument>("TeamMember", teamMemberSchema);
