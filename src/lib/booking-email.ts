import "server-only";

import { Resend } from "resend";

import { hospitalConfig } from "@/config/hospital";
import { getOptionalEnv, getResendApiKey, getResendFromEmail } from "@/lib/env";
import type { BookingRecord } from "@/types/booking";

let resendClient: Resend | null = null;

function getResendClient() {
  if (!resendClient) {
    resendClient = new Resend(getResendApiKey());
  }

  return resendClient;
}

function getBookingRecipientEmail() {
  return (
    getOptionalEnv("RESEND_BOOKING_TO_EMAIL") ?? hospitalConfig.contact.email
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildHospitalNotificationHtml(booking: BookingRecord) {
  const note = booking.note
    ? escapeHtml(booking.note)
    : "No additional note provided.";
  const email = booking.email
    ? escapeHtml(booking.email)
    : "No email provided.";

  return `
    <div style="font-family: Arial, sans-serif; color: #172033; line-height: 1.6;">
      <h1 style="margin-bottom: 16px; color: #ff6d12;">New appointment request</h1>
      <p>A new appointment request has been submitted on the website.</p>
      <table style="border-collapse: collapse; width: 100%; margin-top: 18px;">
        <tr><td style="padding: 8px 0; font-weight: 700;">Full name</td><td style="padding: 8px 0;">${escapeHtml(booking.fullName)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Phone</td><td style="padding: 8px 0;">${escapeHtml(booking.phone)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Preferred date</td><td style="padding: 8px 0;">${escapeHtml(booking.preferredDate)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Service</td><td style="padding: 8px 0;">${escapeHtml(booking.service)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Note</td><td style="padding: 8px 0;">${note}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Submitted</td><td style="padding: 8px 0;">${escapeHtml(new Date(booking.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }))}</td></tr>
      </table>
    </div>
  `;
}

function buildHospitalNotificationText(booking: BookingRecord) {
  return [
    "New appointment request",
    "",
    `Full name: ${booking.fullName}`,
    `Phone: ${booking.phone}`,
    `Email: ${booking.email ?? "No email provided."}`,
    `Preferred date: ${booking.preferredDate}`,
    `Service: ${booking.service}`,
    `Note: ${booking.note ?? "No additional note provided."}`,
    `Submitted: ${new Date(booking.createdAt).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    })}`,
  ].join("\n");
}

function buildPatientConfirmationHtml(booking: BookingRecord) {
  return `
    <div style="font-family: Arial, sans-serif; color: #172033; line-height: 1.6;">
      <h1 style="margin-bottom: 16px; color: #ff6d12;">Appointment request received</h1>
      <p>Hello ${escapeHtml(booking.fullName)},</p>
      <p>We have received your appointment request for <strong>${escapeHtml(booking.service)}</strong> on <strong>${escapeHtml(booking.preferredDate)}</strong>.</p>
      <p>The Ubuntu Hospital team will review it and contact you shortly.</p>
      <p>If your request is urgent, please call <strong>${escapeHtml(hospitalConfig.contact.phoneNumbers[0].display)}</strong>.</p>
    </div>
  `;
}

function buildPatientConfirmationText(booking: BookingRecord) {
  return [
    `Hello ${booking.fullName},`,
    "",
    `We have received your appointment request for ${booking.service} on ${booking.preferredDate}.`,
    "The Ubuntu Hospital team will review it and contact you shortly.",
    `If your request is urgent, please call ${hospitalConfig.contact.phoneNumbers[0].display}.`,
  ].join("\n");
}

async function sendEmail(payload: Parameters<Resend["emails"]["send"]>[0]) {
  const resend = getResendClient();
  const response = await resend.emails.send(payload);

  if (response.error) {
    throw new Error(response.error.message || "Resend email delivery failed.");
  }

  return response.data;
}

export async function sendBookingEmails(booking: BookingRecord) {
  const from = getResendFromEmail();
  const recipient = getBookingRecipientEmail();

  await sendEmail({
    from,
    to: recipient,
    subject: `New appointment request: ${booking.fullName}`,
    replyTo: booking.email ?? undefined,
    text: buildHospitalNotificationText(booking),
    html: buildHospitalNotificationHtml(booking),
  });

  if (!booking.email) {
    return {
      sentPatientConfirmation: false,
    };
  }

  await sendEmail({
    from,
    to: booking.email,
    subject: "We received your appointment request",
    text: buildPatientConfirmationText(booking),
    html: buildPatientConfirmationHtml(booking),
  });

  return {
    sentPatientConfirmation: true,
  };
}
