import { Schema, Document, models, model } from "mongoose";

interface cateTypes {
  name: string;
  typeOf: string;
}

export interface ICategory extends Document {
  category: cateTypes;
  subcategory: cateTypes;
  productType: cateTypes;
}

const cateTypesSchema = new Schema<cateTypes>({
  name: { type: String, required: true, trim: true },
  typeOf: { type: String, required: true, trim: true },
});

const CategorySchema = new Schema<ICategory>(
  {
    category: { type: cateTypesSchema, required: true },
    subcategory: { type: cateTypesSchema, required: true },
    productType: { type: cateTypesSchema, required: true },
  },
  {
    timestamps: true,
  }
);

// Avoid model overwrite error in dev
const Category =
  models.Category || model<ICategory>("Category", CategorySchema);

export default Category;
