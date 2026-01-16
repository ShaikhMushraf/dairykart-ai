import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/lib/models/Order";
import jwt from "jsonwebtoken";

/**
 * Helper: verify JWT token
 */
type JwtPayload = {
  id: string;
  // add other properties if your JWT contains more fields
  [key: string]: unknown;
};

function verifyToken(req: Request): JwtPayload | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
}

/**
    const decoded = verifyToken(req);
 */
export async function POST(req: Request) {
  try {
    await connectDB();

    const decoded: JwtPayload | null = verifyToken(req);
    if (!decoded) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { items, totalAmount, address } = body;

    if (!items || !address) {
      return NextResponse.json(
        { message: "Invalid order data" },
        { status: 400 }
      );
    }

    const order = await Order.create({
      userId: decoded.id,
      items,
      totalAmount,
      address,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

/**
 * GET: User Orders
 */
export async function GET(req: Request) {
  try {
    await connectDB();

    const decoded: JwtPayload | null = verifyToken(req);
    if (!decoded) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const orders = await Order.find({
      userId: decoded.id,
    }).sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
