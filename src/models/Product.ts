import mongoose, { Schema, Document, model, models } from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true },
});

export interface IProduct extends Document {
  name: string;
  description: string;
  sku: string;
  price: number;
  category: string;
  subcategories: string;
  stock: number;
  images: { public_id: string; url: string }[];
  brand: string;
  discount?: number;
  ratings: number;
  numReviews: number;
  isFeatured: boolean;
  color?: string[];
  size?: string[];
  weight?: number;
  dimensions?: { width: number; height: number; depth: number };
  warranty?: string;
}

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
    subcategories: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    images: [imageSchema],

    brand: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
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
    isFeatured: {
      type: Boolean,
      default: false,
    },
    color: [
      {
        name: { type: String, required: true, trim: true },
        hex: { type: String, required: true, trim: true },
      },
    ],
    size: {
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
  },
  { timestamps: true }
);

// 🔹 Indexing for search performance
ProductSchema.index({ name: "text", category: "text", brand: "text" });

const Product = models.Product || model<IProduct>("Product", ProductSchema);
export default Product;
