import mongoose, { Schema, Document, Model } from "mongoose";
import { CartItem } from "@/store/slice/cartSlice";
import { IUser } from "./User";

export interface IOrder extends Document {
  province: string;
  user: IUser;
  city: string;
  address: string;
  houseNumber: string;
  unit?: string;
  name: string;
  phone: string;
  selectedDelivery: string;
  selectedPayment: string;
  totalPrice: number;
  deliveryCost: string;
  discountCode?: string;
  discountApplied: boolean;
  cartItems: CartItem[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: [String], required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    province: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    houseNumber: { type: String, required: true },
    unit: { type: String },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    selectedDelivery: { type: String, required: true },
    selectedPayment: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    deliveryCost: { type: String, required: true },
    discountCode: { type: String },
    discountApplied: { type: Boolean, default: false },
    cartItems: { type: [CartItemSchema], required: true },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
