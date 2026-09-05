import "server-only";

import { Resend } from "resend";

import { hospitalConfig } from "@/config/hospital";
import { getResendApiKey, getResendFromEmail } from "@/lib/env";
import { getCanonicalUrl, routes } from "@/config/seo";

let resendClient: Resend | null = null;

function getResendClient() {
  if (!resendClient) {
    resendClient = new Resend(getResendApiKey());
  }
  return resendClient;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function sendEmail(payload: Parameters<Resend["emails"]["send"]>[0]) {
  const resend = getResendClient();
  const response = await resend.emails.send(payload);

  if (response.error) {
    throw new Error(response.error.message || "Email delivery failed.");
  }

  return response.data;
}

export async function sendUserInvitationEmail({
  email,
  name,
  role,
  initialPassword,
  resetToken,
}: {
  email: string;
  name: string;
  role: "admin" | "staff";
  initialPassword: string;
  resetToken: string;
}) {
  const from = getResendFromEmail();
  const loginUrl = getCanonicalUrl(routes.admin.login);
  const setPasswordUrl = `${getCanonicalUrl(routes.admin.resetPassword)}?token=${encodeURIComponent(
    resetToken,
  )}&email=${encodeURIComponent(email)}`;
  const roleLabel =
    role === "admin"
      ? "Super Admin (Full Access)"
      : "Staff Member (Bookings Only)";

  const html = `
    <div style="background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 16px; color: #1e293b;">
      <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #ff6d12, #ea580c); padding: 28px 32px; text-align: left;">
          <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">
            ${escapeHtml(hospitalConfig.name)}
          </h1>
          <p style="margin: 4px 0 0; color: #ffedd5; font-size: 13px; font-weight: 500;">
            Hospital Administration Portal
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 32px;">
          <h2 style="margin-top: 0; margin-bottom: 12px; color: #0f172a; font-size: 18px; font-weight: 600;">
            Welcome, ${escapeHtml(name)}!
          </h2>
          <p style="color: #475569; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
            An account has been created for you on the <strong>Ubuntu Hospital Admin Portal</strong>. You have been assigned the <strong>${escapeHtml(roleLabel)}</strong> role.
          </p>

          <!-- Credentials Box -->
          <div style="background-color: #f1f5f9; border-radius: 10px; padding: 20px; margin-bottom: 24px; border: 1px solid #cbd5e1;">
            <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px;">
              Your Account Details
            </div>
            <div style="margin-bottom: 10px;">
              <span style="font-size: 13px; color: #64748b; display: block;">Portal Link:</span>
              <a href="${loginUrl}" style="font-size: 14px; color: #ff6d12; font-weight: 600; text-decoration: none;">${loginUrl}</a>
            </div>
            <div style="margin-bottom: 10px;">
              <span style="font-size: 13px; color: #64748b; display: block;">Email:</span>
              <strong style="font-size: 14px; color: #0f172a;">${escapeHtml(email)}</strong>
            </div>
            <div>
              <span style="font-size: 13px; color: #64748b; display: block;">Initial Password:</span>
              <code style="font-size: 15px; font-family: monospace; font-weight: 700; color: #0f172a; background: #ffffff; padding: 4px 10px; border-radius: 6px; border: 1px solid #cbd5e1; display: inline-block; margin-top: 4px;">${escapeHtml(initialPassword)}</code>
            </div>
          </div>

          <!-- Set Password CTA -->
          <div style="text-align: center; margin: 32px 0 24px;">
            <p style="color: #475569; font-size: 13px; line-height: 1.5; margin-bottom: 16px;">
              For security, you can use the button below to set your own password anytime:
            </p>
            <a href="${setPasswordUrl}" style="display: inline-block; background-color: #ff6d12; color: #ffffff; font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 8px; text-decoration: none; box-shadow: 0 2px 6px rgba(255, 109, 18, 0.3);">
              Set or Reset Your Password
            </a>
          </div>

          <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
            If the button above does not work, copy and paste this link into your browser:<br />
            <a href="${setPasswordUrl}" style="color: #ff6d12; word-break: break-all;">${setPasswordUrl}</a>
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
          <p style="margin: 0; color: #94a3b8; font-size: 12px;">
            &copy; ${new Date().getFullYear()} ${escapeHtml(hospitalConfig.name)}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  `;

  const text = [
    `Welcome to ${hospitalConfig.name} Admin Portal, ${name}!`,
    "",
    `An account has been created for you with the role: ${roleLabel}`,
    "",
    "YOUR ACCOUNT DETAILS:",
    `Portal Login: ${loginUrl}`,
    `Email: ${email}`,
    `Initial Password: ${initialPassword}`,
    "",
    "SET OR RESET YOUR PASSWORD:",
    `You can set your own password anytime using this link:`,
    setPasswordUrl,
    "",
    "Thank you,",
    `${hospitalConfig.name} Team`,
  ].join("\n");

  await sendEmail({
    from,
    to: email,
    subject: `Welcome to ${hospitalConfig.name} - Your Account Credentials`,
    text,
    html,
  });
}

export async function sendPasswordResetEmail({
  email,
  name,
  resetToken,
}: {
  email: string;
  name: string;
  resetToken: string;
}) {
  const from = getResendFromEmail();
  const resetPasswordUrl = `${getCanonicalUrl(routes.admin.resetPassword)}?token=${encodeURIComponent(
    resetToken,
  )}&email=${encodeURIComponent(email)}`;

  const html = `
    <div style="background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 16px; color: #1e293b;">
      <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #ff6d12, #ea580c); padding: 28px 32px; text-align: left;">
          <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">
            ${escapeHtml(hospitalConfig.name)}
          </h1>
          <p style="margin: 4px 0 0; color: #ffedd5; font-size: 13px; font-weight: 500;">
            Password Reset Request
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 32px;">
          <h2 style="margin-top: 0; margin-bottom: 12px; color: #0f172a; font-size: 18px; font-weight: 600;">
            Hello, ${escapeHtml(name)}
          </h2>
          <p style="color: #475569; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
            A request was received to reset your password for the <strong>Ubuntu Hospital Admin Portal</strong>. Click the button below to choose a new password.
          </p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetPasswordUrl}" style="display: inline-block; background-color: #ff6d12; color: #ffffff; font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 8px; text-decoration: none; box-shadow: 0 2px 6px rgba(255, 109, 18, 0.3);">
              Reset Your Password
            </a>
          </div>

          <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin-bottom: 16px;">
            This password reset link will expire in <strong>24 hours</strong>. If you did not request a password reset, you can safely ignore this email.
          </p>

          <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
            If the button above does not work, copy and paste this link into your browser:<br />
            <a href="${resetPasswordUrl}" style="color: #ff6d12; word-break: break-all;">${resetPasswordUrl}</a>
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
          <p style="margin: 0; color: #94a3b8; font-size: 12px;">
            &copy; ${new Date().getFullYear()} ${escapeHtml(hospitalConfig.name)}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  `;

  const text = [
    `Password Reset Request for ${hospitalConfig.name} Admin Portal`,
    "",
    `Hello ${name},`,
    "",
    "A request was received to reset your password for the Ubuntu Hospital Admin Portal.",
    "Click the link below to set a new password (valid for 24 hours):",
    resetPasswordUrl,
    "",
    "If you did not request a password reset, you can safely ignore this email.",
    "",
    "Thank you,",
    `${hospitalConfig.name} Team`,
  ].join("\n");

  await sendEmail({
    from,
    to: email,
    subject: `Password Reset - ${hospitalConfig.name} Admin Portal`,
    text,
    html,
  });
}
