import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function adminMiddleware(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Not authorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔒 Check admin role
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { message: "Admin access only" },
        { status: 403 }
      );
    }

    return NextResponse.next();
  } catch {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
