import mongoose, { Schema, Document, model, models } from "mongoose";
import { IReview } from "./productReview";

export interface IProduct extends Document {
  name: string;
  description: string;
  sku?: string;
  price: number;
  category: string;
  subcategory: string;
  type: string;
  productCode: string;
  ageRange?: string;
  gender?: string;
  pattern?: string;
  stock: number;
  views?: number;
  imageUrl: string[];
  brand?: string;
  material?: string;
  discount?: number;
  ratings?: number;
  sales?: number;
  numReviews?: number;
  colorsAvailable?: string[];
  sizesAvailable?: string[];
  weight?: number;
  dimensions?: { width: number; height: number; depth: number };
  warranty?: string;
  reviews?: IReview[];
}
const reviewSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    profileImage: { type: String },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { _id: true }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    material: {
      type: String,
      trim: true,
    },
    pattern: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },
    subcategory: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    productCode: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: [String],
    },
    brand: {
      type: String,
      default: "اراکس",
    },
    ageRange: {
      type: String,
      default: "همه",
    },
    gender: {
      type: String,
      default: "همه",
    },
    sku: {
      type: String,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    views: {
      type: Number,
      min: 0,
      default: 0,
    },
    sales: {
      type: Number,
      min: 0,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    colorsAvailable: {
      type: [String],
      default: [],
    },
    sizesAvailable: {
      type: [String], // Example: ["S", "M", "L", "XL"]
      default: [],
    },
    weight: {
      type: Number, // in grams or kg
    },
    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
    },
    warranty: {
      type: String, // Example: "1 year"
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

// 🔹 Indexing for search performance
ProductSchema.index({
  name: "text",
  category: "text",
  brand: "text",
  type: "text",
});

const Product = models.Product || model<IProduct>("Product", ProductSchema);
export default Product;
