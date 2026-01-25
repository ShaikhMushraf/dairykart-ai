import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";
import { sendResetEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      // 🔒 Security: don't reveal user existence
      return NextResponse.json({
        message: "If email exists, reset link will be sent",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    await sendResetEmail(email, resetUrl);

    return NextResponse.json({
      message: "Password reset link sent to email",
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    return NextResponse.json(
      { message: "Failed to send reset email" },
      { status: 500 }
    );
  }
}
