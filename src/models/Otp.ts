import { Schema, Document, models, model } from "mongoose";

export interface Otp extends Document {
  phone: string;
  code: string;
  kind: number;
  expiresAt: Date;
}

const OtpSchema = new Schema<Otp>(
  {
    phone: {
      type: String,
      required: [true, "انتخاب نام برای دسته‌بندی لازم است"],
      trim: true,
    },
    code: {
      type: String,
      required: [true, "وارد کردن کد برای دسته‌بندی لازم است"],
      trim: true,
      unique: true,
    },
    kind: {
      type: Number,
      default: 0, // e.g., 0 = default, 1 = featured, etc.
    },
    expiresAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// Avoid model overwrite error in dev
const Otp = models.Otp || model<Otp>("Otp", OtpSchema);

export default Otp;
