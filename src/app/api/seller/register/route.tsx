import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";

/**
 * SELLER REGISTRATION API
 * POST /api/seller/register
 */
export async function POST(req: Request) {
  try {
    await dbConnect();

    const {
      name,
      email,
      password,
      storeName,
      phone,
      address,
    } = await req.json();

    // ✅ basic validation
    if (!name || !email || !password || !storeName) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ❌ duplicate seller check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Seller already exists" },
        { status: 409 }
      );
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ create seller
    const seller = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "seller",
      storeName,
      phone,
      address,
    });

    // 🔑 generate JWT
    const token = jwt.sign(
      { id: seller._id, role: seller.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Seller registered successfully",
      user: {
        id: seller._id,
        name: seller.name,
        email: seller.email,
        role: seller.role,
        storeName: seller.storeName,
      },
      token,
    });
  } catch (error) {
    console.error("SELLER REGISTER ERROR:", error);

    return NextResponse.json(
      { message: "Seller registration failed" },
      { status: 500 }
    );
  }
}
