import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";
import jwt from "jsonwebtoken";

/**
 * Add product (Seller only)
 */
export async function POST(req: Request) {
  try {
    await dbConnect();

    /* ---------------- AUTH CHECK ---------------- */
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: string; role: string };

    if (decoded.role !== "seller") {
      return NextResponse.json(
        { message: "Seller access only" },
        { status: 403 }
      );
    }
    

    /* ---------------- BODY ---------------- */
    const { name, price, image, stock, category } =
      await req.json();

    // 🛑 Validate required fields
    if (!name || !price || !image || stock === undefined || !category) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ---------------- CATEGORY HANDLING ---------------- */
    // Find category by name
    let categoryDoc = await Category.findOne({ name: category });

    // If category does not exist, create it
    if (!categoryDoc) {
      categoryDoc = await Category.create({ name: category });
    }

    /* ---------------- CREATE PRODUCT ---------------- */
    const product = await Product.create({
      name,
      price,
      image,
      stock,
      category: categoryDoc._id, // ✅ ObjectId
      sellerId: decoded.id,       // ✅ Correct field
      isActive: true,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);

    return NextResponse.json(
      { message: "Failed to add product" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json([], { status: 200 }); // ✅ ALWAYS JSON
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: string; role: string };

    if (decoded.role !== "seller") {
      return NextResponse.json([], { status: 200 });
    }

    const products = await Product.find({
      sellerId: decoded.id,
      isActive: true,
    }).populate("category");

    return NextResponse.json(products); // ✅ SAFE
  } catch (error) {
    console.error("SELLER PRODUCTS ERROR:", error);
    return NextResponse.json([], { status: 200 }); // ✅ NEVER BREAK JSON
  }
}
