import mongoose, { Schema } from "mongoose";

/**
 * Category Schema
 * Used to group products
 */
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
