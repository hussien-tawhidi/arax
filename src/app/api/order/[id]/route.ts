import { dbConnect } from "@/libs/db";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(Request: NextRequest, { params }:any) {
 
  const { id } =await params;
  await dbConnect();
  try {
    const product = await Product.findById(id);
    console.log("🚀 ~ GET ~ product:", product)
    return NextResponse.json(product, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    return NextResponse.json("محصول یافت نشد", error);
  }
}
