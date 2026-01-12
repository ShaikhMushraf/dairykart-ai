import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export async function GET() {
  try {
    await dbConnect();

    const products = await Product.find({ isActive: true })
      .populate("category", "name")
      .lean();

    return NextResponse.json({
      products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
