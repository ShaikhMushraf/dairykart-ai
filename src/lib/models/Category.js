import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // No duplicate categories like "Milk"
      trim: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
