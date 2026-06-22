import { Schema, model, models, type Model } from "mongoose";

import type { AdminRole } from "@/types/admin";

export interface AdminUserDocument {
  name: string;
  email: string;
  passwordHash: string;
  role: AdminRole;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const adminUserSchema = new Schema<AdminUserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: 160,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
      required: true,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "admin_users",
  },
);

export const AdminUserModel =
  (models.AdminUser as Model<AdminUserDocument>) ||
  model<AdminUserDocument>("AdminUser", adminUserSchema);
