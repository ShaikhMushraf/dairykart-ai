import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const product = await Product.findOne({
      _id: params.id,
      isActive: true,
    }).populate("category", "name");

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: "Invalid product ID" },
      { status: 400 }
    );
  }
}
