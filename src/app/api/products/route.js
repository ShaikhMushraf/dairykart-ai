// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Product from "@/lib/models/Product";

// /**
//  * GET /api/products
//  * Public endpoint to fetch all active products
//  */
// export async function GET() {
//   try {
//     await connectDB();

//     const products = await Product.find({ isActive: true })
//       .populate("category")
//       .sort({ createdAt: -1 });

//     return NextResponse.json(products);
//   } catch (error) {
//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    // Pagination
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Filters
    const keyword = searchParams.get("search");
    const category = searchParams.get("category");

    let query = { isActive: true };

    // Search by product name
    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query)
      .populate("category", "name")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    return NextResponse.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
