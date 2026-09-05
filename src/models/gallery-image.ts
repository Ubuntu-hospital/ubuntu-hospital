import { Schema, model, models, type Model } from "mongoose";

export interface GalleryImageDocument {
  title: string;
  category: "hospital" | "care" | "facilities" | "patients";
  image: string;
  alt: string;
  publicId: string | null;
  featured: boolean;
  sortOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const galleryImageSchema = new Schema<GalleryImageDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    category: {
      type: String,
      enum: ["hospital", "care", "facilities", "patients"],
      required: true,
    },
    image: { type: String, required: true, trim: true },
    alt: { type: String, required: true, trim: true, maxlength: 240 },
    publicId: { type: String, default: null },
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "gallery_images" },
);

galleryImageSchema.index({ active: 1, sortOrder: 1, createdAt: -1 });

export const GalleryImageModel =
  (models.GalleryImage as Model<GalleryImageDocument>) ||
  model<GalleryImageDocument>("GalleryImage", galleryImageSchema);
