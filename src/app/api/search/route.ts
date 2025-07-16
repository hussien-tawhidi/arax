// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import { dbConnect } from "@/libs/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.trim();

    if (!query || query.length < 1) {
      return NextResponse.json({ results: [] });
    }

    // Connect to MongoDB
    await dbConnect();

    // Case-insensitive search using regex
    const results = await Product.find({
      name: { $regex: query, $options: "i" },
    })
      .select("name category brand price -_id")
      .lean();

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
