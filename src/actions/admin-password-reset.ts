"use server";

import crypto from "crypto";
import { hashPassword } from "@/lib/password";
import { sendPasswordResetEmail } from "@/lib/admin-email";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function requestPasswordResetAction(formData: FormData) {
  const email = text(formData, "email").toLowerCase();

  if (!email) {
    throw new Error("Please enter your email address.");
  }

  const [{ connectToDatabase }, { AdminUserModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/admin-user"),
  ]);
  await connectToDatabase();

  const user = await AdminUserModel.findOne({ email });

  // For security, always show success even if email is not found
  if (!user) {
    return {
      success: true,
      message:
        "If an account with that email exists, a password reset link has been sent.",
    };
  }

  const rawResetToken = crypto.randomBytes(32).toString("hex");
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(rawResetToken)
    .digest("hex");

  user.resetPasswordToken = hashedResetToken;
  user.resetPasswordExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  await user.save();

  try {
    await sendPasswordResetEmail({
      email: user.email,
      name: user.name,
      resetToken: rawResetToken,
    });
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw new Error(
      "Unable to send reset email at this time. Please try again later.",
    );
  }

  return {
    success: true,
    message:
      "If an account with that email exists, a password reset link has been sent.",
  };
}

export async function resetPasswordAction(formData: FormData) {
  const email = text(formData, "email").toLowerCase();
  const token = text(formData, "token");
  const password = text(formData, "password");
  const confirmPassword = text(formData, "confirmPassword");

  if (!email || !token) {
    throw new Error("Invalid or missing password reset link.");
  }

  if (!password) {
    throw new Error("Please enter a new password.");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  const [{ connectToDatabase }, { AdminUserModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/admin-user"),
  ]);
  await connectToDatabase();

  const hashedResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await AdminUserModel.findOne({
    email,
    resetPasswordToken: hashedResetToken,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new Error(
      "The password reset link is invalid or has expired. Please request a new one.",
    );
  }

  user.passwordHash = await hashPassword(password);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  return {
    success: true,
    message: "Your password has been reset successfully. You can now sign in.",
  };
}
