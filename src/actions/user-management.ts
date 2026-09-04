"use server";

import { revalidatePath } from "next/cache";
import { requireSuperAdminSession } from "@/lib/admin-auth";
import { hashPassword } from "@/lib/password";
import { getBootstrapAdminCredentials } from "@/lib/env";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function required(value: string, fieldName: string) {
  if (!value) {
    throw new Error(`${fieldName} is required.`);
  }
  return value;
}

export async function createAdminUserAction(formData: FormData) {
  await requireSuperAdminSession();

  const name = required(text(formData, "name"), "Full Name");
  const email = required(
    text(formData, "email"),
    "Email Address",
  ).toLowerCase();
  const password = required(text(formData, "password"), "Password");
  const roleInput = text(formData, "role") || "staff";
  const role = roleInput === "admin" ? "admin" : "staff";

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  const [{ connectToDatabase }, { AdminUserModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/admin-user"),
  ]);
  await connectToDatabase();

  const existing = await AdminUserModel.findOne({ email });
  if (existing) {
    throw new Error(`A user with the email "${email}" already exists.`);
  }

  const passwordHash = await hashPassword(password);

  await AdminUserModel.create({
    name,
    email,
    passwordHash,
    role,
    lastLoginAt: null,
  });

  revalidatePath("/admin/users");
  return {
    success: true,
    message: `Account for "${name}" (${role === "admin" ? "Super Admin" : "Staff"}) created successfully.`,
  };
}

export async function updateAdminUserAction(formData: FormData) {
  const session = await requireSuperAdminSession();

  const id = required(text(formData, "id"), "User ID");
  const name = required(text(formData, "name"), "Full Name");
  const email = required(
    text(formData, "email"),
    "Email Address",
  ).toLowerCase();
  const roleInput = text(formData, "role") || "staff";
  const role = roleInput === "admin" ? "admin" : "staff";
  const newPassword = text(formData, "password");

  const [{ connectToDatabase }, { AdminUserModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/admin-user"),
  ]);
  await connectToDatabase();

  const targetUser = await AdminUserModel.findById(id);
  if (!targetUser) {
    throw new Error("User account not found.");
  }

  // Check email uniqueness if email changed
  if (targetUser.email !== email) {
    const existing = await AdminUserModel.findOne({ email });
    if (existing) {
      throw new Error(`A user with the email "${email}" already exists.`);
    }
  }

  // Prevent demoting self from admin to staff
  if (targetUser.email === session.email && role !== "admin") {
    throw new Error("You cannot remove your own Super Admin role.");
  }

  targetUser.name = name;
  targetUser.email = email;
  targetUser.role = role;

  if (newPassword) {
    if (newPassword.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }
    targetUser.passwordHash = await hashPassword(newPassword);
  }

  await targetUser.save();

  revalidatePath("/admin/users");
  return {
    success: true,
    message: `Updated account details for "${name}".`,
  };
}

export async function deleteAdminUserAction(formData: FormData) {
  const session = await requireSuperAdminSession();
  const id = required(text(formData, "id"), "User ID");

  const [{ connectToDatabase }, { AdminUserModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/admin-user"),
  ]);
  await connectToDatabase();

  const targetUser = await AdminUserModel.findById(id);
  if (!targetUser) {
    throw new Error("User account not found.");
  }

  // Prevent deleting self
  if (targetUser.email.toLowerCase() === session.email.toLowerCase()) {
    throw new Error("You cannot delete your own active account.");
  }

  // Prevent deleting bootstrap admin
  const bootstrap = getBootstrapAdminCredentials();
  if (
    bootstrap.email &&
    targetUser.email.toLowerCase() === bootstrap.email.toLowerCase()
  ) {
    throw new Error(
      "The primary system administrator account cannot be deleted.",
    );
  }

  await AdminUserModel.findByIdAndDelete(id);

  revalidatePath("/admin/users");
  return {
    success: true,
    message: `User account "${targetUser.name}" removed successfully.`,
  };
}
