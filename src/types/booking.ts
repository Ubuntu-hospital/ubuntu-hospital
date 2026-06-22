export const bookingStatusValues = [
  "new",
  "contacted",
  "scheduled",
] as const;

export type BookingStatus = (typeof bookingStatusValues)[number];

export type BookingFieldName =
  | "fullName"
  | "phone"
  | "email"
  | "preferredDate"
  | "service"
  | "note";

export interface BookingActionState {
  status: "idle" | "success" | "warning" | "error";
  message: string;
  fieldErrors: Partial<Record<BookingFieldName, string>>;
  submittedAt: string | null;
}

export interface CreateBookingInput {
  fullName: string;
  phone: string;
  email: string | null;
  preferredDate: string;
  service: string;
  note: string | null;
  source: "website";
}

export interface BookingRecord extends CreateBookingInput {
  id: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export const initialBookingActionState: BookingActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  submittedAt: null,
};
