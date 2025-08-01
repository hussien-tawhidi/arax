import mongoose, { Schema } from "mongoose";

const discountSchema = new Schema(
  {
    code: {
      type: String,
      require: true,
      trim: true,
    },
    discount: {
      type: String,
      require: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      require: true,
    },
    expireAt: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Discount ||
  mongoose.model("Discount", discountSchema);
