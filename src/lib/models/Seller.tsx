import mongoose, { Schema, models } from "mongoose";

/**
 * Seller Schema
 * ----------------
 * Each seller is linked to a User
 * A user can become a seller only once
 */
const SellerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // 🔒 one seller per user
    },

    storeName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    isApproved: {
      type: Boolean,
      default: true, // later admin can approve sellers
    },
  },
  { timestamps: true }
);

/**
 * Prevent model overwrite error in Next.js
 */
export default models.Seller || mongoose.model("Seller", SellerSchema);
