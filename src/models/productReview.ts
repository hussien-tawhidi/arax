import mongoose, { model, models } from "mongoose";

export interface IReview {
  _id?: string;
  username: string;
  profileImage?: string;
  rating: number;
  comment: string;
  date: Date;
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    username: { type: String, required: true },
    profileImage: { type: String },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { _id: true }
);

const ProductReview =
  models.ProductReview || model<IReview>("ProductReview", reviewSchema);
export default ProductReview;
