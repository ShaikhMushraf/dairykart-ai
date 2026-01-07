import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Category from "@/lib/models/Category";

export async function POST(req) {
  try {
    await connectDB();

    // 🔐 Admin check
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return NextResponse.json(
        { message: "Admin access only" },
        { status: 403 }
      );
    }

    // 📦 Create category
    const { name, description } = await req.json();

    const category = await Category.create({ name, description });

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
