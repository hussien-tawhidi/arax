import { Schema, models, model } from "mongoose";

const ticketSchema = new Schema(
  {
    subject: String,
    message: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "pending", "closed"],
      default: "open",
    },
    replies: [
      {
        sender: {
          type: String, // "admin" or "user"
          enum: ["admin", "user"],
          required: true,
        },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);


export default models.Ticket || model("Ticket", ticketSchema);
