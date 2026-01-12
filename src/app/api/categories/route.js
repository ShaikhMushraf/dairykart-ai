import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Category from "@/lib/models/Category";

/**
 * GET /api/categories
 * Public API – Fetch all categories
 */
export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find().sort({ createdAt: -1 });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Fetch categories error:", error);
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
