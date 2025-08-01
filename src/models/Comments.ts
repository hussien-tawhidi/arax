import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isRecommended: {
      type: Boolean,
      required: true,
    },
    rating: {
      price: {
        type: Number,
        default: 1,
        min: 1,
        max: 5,
      },
      quality: {
        type: Number,
        default: 1,
        min: 1,
        max: 5,
      },
      buyingCost: {
        type: Number,
        default: 1,
        min: 1,
        max: 5,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Comments ||
  mongoose.model("Comments", commentSchema);
