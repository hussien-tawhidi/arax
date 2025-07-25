// src/app/api/products/route.ts

import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { dbConnect } from "@/libs/db";

export async function GET() {
  await dbConnect();

  const products = await Product.find().lean();

  return NextResponse.json(products);
}
