import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    image: {
      type: String, // image URL (later Cloudinary / S3)
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // relation
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true, // soft delete support
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
