import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";
import Seller from "@/lib/models/Seller";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const {
      firstName,
      lastName,
      email,
      password,
      storeName,
      phone,
      address,
    } = await req.json();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !storeName ||
      !phone ||
      !address
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1️⃣ Find or create USER (role ALWAYS user)
    let user = await User.findOne({ email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: "user", // 🔒 NEVER seller
      });
    }

    // 2️⃣ Check if seller already exists
    const existingSeller = await Seller.findOne({ userId: user._id });
    if (existingSeller) {
      return NextResponse.json(
        { message: "Seller already exists for this account" },
        { status: 409 }
      );
    }

    // 3️⃣ Create seller record
    await Seller.create({
      userId: user._id,
      storeName,
      phone,
      address,
    });

    // 4️⃣ Seller JWT (role only for token)
    const token = jwt.sign(
      { id: user._id, role: "seller" },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Seller registered successfully",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: "seller",
      },
    });
  } catch (error) {
    console.error("SELLER REGISTER ERROR:", error);
    return NextResponse.json(
      { message: "Seller registration failed" },
      { status: 500 }
    );
  }
}
