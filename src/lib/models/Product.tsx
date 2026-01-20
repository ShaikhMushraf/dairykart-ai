import mongoose, { Schema, Document } from "mongoose";

/**
 * Product document interface (TypeScript safety)
 */
export interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
  stock: number;
  category: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  isActive: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    // 🔗 Reference to Category collection
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // 🔗 Reference to Seller collection
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
