import { Schema, model, models, type Model } from "mongoose";

import { bookingStatusValues, type BookingStatus } from "@/types/booking";

export interface BookingDocument {
  fullName: string;
  phone: string;
  email: string | null;
  preferredDate: string;
  service: string;
  note: string | null;
  source: "website";
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<BookingDocument>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 40,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
      maxlength: 160,
    },
    preferredDate: {
      type: String,
      required: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    note: {
      type: String,
      trim: true,
      default: null,
      maxlength: 1200,
    },
    source: {
      type: String,
      enum: ["website"],
      default: "website",
      required: true,
    },
    status: {
      type: String,
      enum: [...bookingStatusValues],
      default: "new",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "bookings",
  },
);

bookingSchema.index({
  createdAt: -1,
});

export const BookingModel =
  (models.Booking as Model<BookingDocument>) ||
  model<BookingDocument>("Booking", bookingSchema);
