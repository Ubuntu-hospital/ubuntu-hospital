import { Schema, model, models, type Model } from "mongoose";

export interface FacilityImageDocument {
  facilityId: string;
  image: string;
  imageAlt: string;
  publicId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const facilityImageSchema = new Schema<FacilityImageDocument>(
  {
    facilityId: { type: String, required: true, unique: true, trim: true },
    image: { type: String, required: true, trim: true },
    imageAlt: { type: String, required: true, trim: true, maxlength: 240 },
    publicId: { type: String, default: null },
  },
  { timestamps: true, collection: "facility_images" },
);

export const FacilityImageModel =
  (models.FacilityImage as Model<FacilityImageDocument>) ||
  model<FacilityImageDocument>("FacilityImage", facilityImageSchema);
