import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import "@/lib/models/Category"; // ✅ REQUIRED for populate

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const keyword = searchParams.get("search");
    const category = searchParams.get("category");

    const query = { isActive: true };

    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const products = await Product.find(query)
      .populate("category", "name")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    return NextResponse.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
