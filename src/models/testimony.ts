import mongoose, { Schema, type Model } from "mongoose";

export interface ITestimony {
  _id?: mongoose.Types.ObjectId;
  name: string;
  context: string;
  quote: string;
  image?: string | null;
  imageAlt?: string | null;
  publicId?: string | null;
  active: boolean;
  sortOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const TestimonySchema = new Schema<ITestimony>(
  {
    name: { type: String, required: true, trim: true },
    context: { type: String, required: true, trim: true },
    quote: { type: String, required: true, trim: true },
    image: { type: String, default: null },
    imageAlt: { type: String, default: null },
    publicId: { type: String, default: null },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const TestimonyModel: Model<ITestimony> =
  mongoose.models.Testimony ||
  mongoose.model<ITestimony>("Testimony", TestimonySchema);
