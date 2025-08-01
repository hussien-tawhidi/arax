import { dbConnect } from "@/libs/db";
import Product from "@/models/Product";
import { productsData } from "@/products";
import { NextResponse } from "next/server";

export async function POST() {
  await dbConnect();

  try {
    // Insert all mock orders into DB
    await Product.insertMany(productsData);

    return NextResponse.json({ message: "Mock products seeded successfully" });
  } catch (error) {
    console.error("Error seeding products:", error);
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}
