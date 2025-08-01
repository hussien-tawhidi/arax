import mongoose, { Schema } from "mongoose";
import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId; // Mongoose document id (optional because before creation)
  name: string;
  email?: string;
  phone: string;
  isActive?: boolean;
  role: string;
  bio?: string;
  orders?: number[];
  addresses?: string[];
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
      require: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      trim: true,
      require: true,
    },
    bio: {
      type: String,
      default: "",
    },
    orders: [
      {
        type: Number,
        default: 0,
      },
    ],
    addresses: [
      {
        type: String,
        trim: true,
      },
    ],
    avatar: {
      type: String,
      default: "/avatar.png",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
