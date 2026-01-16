import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import Product from "@/lib/models/Product";

interface JwtPayload {
  id: string;
  role: string;
}

export async function POST(req: Request) {
  try {
    // 🔐 1. Read token
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // 🔐 2. Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    if (decoded.role !== "admin") {
      return NextResponse.json(
        { message: "Admin access required" },
        { status: 403 }
      );
    }

    await dbConnect();

    // 📦 3. Read body
    const { name, description, price, stock, category, image } =
      await req.json();

    if (!name || !price || !category) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🧠 4. Create product
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      image,
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
