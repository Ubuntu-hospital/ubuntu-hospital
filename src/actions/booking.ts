"use server";

import { revalidatePath } from "next/cache";

import { hospitalConfig } from "@/config/hospital";
import { startOfToday } from "@/lib/dates";
import type { BookingActionState } from "@/types/booking";

function readTextField(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function isValidEmailAddress(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function requestAppointmentAction(
  _previousState: BookingActionState,
  formData: FormData,
): Promise<BookingActionState> {
  const fullName = readTextField(formData, "fullName");
  const phone = readTextField(formData, "phone");
  const email = readTextField(formData, "email");
  const preferredDate = readTextField(formData, "preferredDate");
  const service = readTextField(formData, "service");
  const note = readTextField(formData, "note");

  const fieldErrors: BookingActionState["fieldErrors"] = {};
  const validServices = new Set<string>(
    hospitalConfig.services.map((hospitalService) => hospitalService.title),
  );

  if (fullName.length < 2) {
    fieldErrors.fullName = "Enter the patient's full name.";
  }

  if (!/^[0-9+\s()-]{7,}$/.test(phone)) {
    fieldErrors.phone = "Enter a valid phone number.";
  }

  if (email && !isValidEmailAddress(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
    fieldErrors.preferredDate = "Choose a preferred appointment date.";
  } else {
    const today = startOfToday();
    const requestedDate = new Date(`${preferredDate}T00:00:00`);

    if (Number.isNaN(requestedDate.getTime()) || requestedDate < today) {
      fieldErrors.preferredDate =
        "Choose today or a future date for the appointment.";
    }
  }

  if (!validServices.has(service)) {
    fieldErrors.service = "Select one of the listed hospital services.";
  }

  if (note.length > 1000) {
    fieldErrors.note = "Keep the additional note under 1000 characters.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      fieldErrors,
      submittedAt: null,
    };
  }

  const { createBooking } = await import("@/lib/bookings");

  const booking = await createBooking({
    fullName,
    phone,
    email: email || null,
    preferredDate,
    service,
    note: note || null,
    source: "website",
  });

  revalidatePath("/admin");

  try {
    const { sendBookingEmails } = await import("@/lib/booking-email");
    const emailResult = await sendBookingEmails(booking);

    return {
      status: "success",
      message: emailResult.sentPatientConfirmation
        ? "Appointment request received. A confirmation email has been sent and the hospital team will contact you shortly."
        : "Appointment request received. The hospital team will contact you shortly.",
      fieldErrors: {},
      submittedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Booking email delivery failed.", error);

    return {
      status: "warning",
      message:
        "Appointment request was saved, but the email notification could not be sent. Please call the hospital directly if your request is urgent.",
      fieldErrors: {},
      submittedAt: new Date().toISOString(),
    };
  }
}
