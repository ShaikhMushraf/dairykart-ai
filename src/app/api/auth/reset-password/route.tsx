import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { token, password } = await req.json();

    if (!token || !password || password.length < 6) {
      return NextResponse.json(
        { message: "Invalid request" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const isSame = await bcrypt.compare(password, user.password);

    if (isSame) {
      return NextResponse.json(
        { message: "New password must be different from old password" },
        { status: 400 }
      );
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return NextResponse.json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    return NextResponse.json(
      { message: "Password reset failed" },
      { status: 500 }
    );
  }
}
