import mongoose, { Schema, type Model } from "mongoose";

export interface ISectionImage {
  _id?: mongoose.Types.ObjectId;
  sectionId: string;
  image: string;
  imageAlt?: string | null;
  publicId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const SectionImageSchema = new Schema<ISectionImage>(
  {
    sectionId: { type: String, required: true, unique: true, index: true },
    image: { type: String, required: true },
    imageAlt: { type: String, default: null },
    publicId: { type: String, default: null },
  },
  { timestamps: true },
);

export const SectionImageModel: Model<ISectionImage> =
  mongoose.models.SectionImage ||
  mongoose.model<ISectionImage>("SectionImage", SectionImageSchema);
