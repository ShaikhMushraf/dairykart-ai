import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

type CloudinaryUploadResult = {
  secure_url: string;
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "dairykart/products" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as CloudinaryUploadResult);
            }
          )
          .end(buffer);
      }
    );

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("CLOUDINARY UPLOAD ERROR:", error);
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}
