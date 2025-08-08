import { bankOptions } from "@/components/auth/bank-account/data";
import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IBankAccount extends Document {
  userId?: mongoose.Schema.Types.ObjectId;
  bankName: string;
  _id: string;
  accountNumber: string;
  cardNumber: string;
  shabaNumber?: string;
  ownerName: string;
  isDefault: boolean;
  status: "active" | "inactive" | "pending";
}

const bankAccountSchema = new Schema<IBankAccount>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    bankName: {
      type: String,
      required: [true, "Bank name is required"],
      enum: {
        values: bankOptions.map((b) => b.value),
        message: "نام بانک معتبر نیست",
      },
    },
    accountNumber: {
      type: String,
      required: [true, "Account number is required"],
      validate: {
        validator: (v: string) => /^\d{2,3}-\d{6,7}-\d{1,2}$/.test(v),
        message: "Invalid account number format",
      },
    },
    cardNumber: {
      type: String,
      required: [true, "Card number is required"],
      validate: {
        validator: (v: string) =>
          /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(v.replace(/\*/g, "0")),
        message: "Invalid card number format",
      },
    },
    shabaNumber: {
      type: String,
      validate: {
        validator: (v?: string) => !v || /^IR[0-9]{24}$/.test(v),
        message: "Invalid SHABA number format",
      },
    },
    ownerName: {
      type: String,
      required: [true, "Owner name is required"],
      minlength: [3, "Owner name too short"],
      maxlength: [100, "Owner name too long"],
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one default account per user
bankAccountSchema.pre("save", async function (next) {
  if (this.isDefault) {
    await this.model("BankAccount").updateMany(
      { userId: this.userId, _id: { $ne: this._id } },
      { $set: { isDefault: false } }
    );
  }
  next();
});

export default models.BankAccount ||
  model<IBankAccount>("BankAccount", bankAccountSchema);
