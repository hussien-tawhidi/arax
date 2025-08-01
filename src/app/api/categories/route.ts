import { dbConnect } from "@/libs/db";
import Category from "@/models/Categories";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect(); // اتصال به MongoDB
  const data = await req.json();
  try {
  

    const newCategory = await Category.create({
      category: data.category,
      subcategory: data.subcategory,
      productType: data.productType,
    });

    return NextResponse.json(
      { message: "دسته‌بندی با موفقیت ایجاد شد.", category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ ایجاد دسته‌بندی با خطا مواجه شد:", error);
    return NextResponse.json(
      { message: "خطا در ایجاد دسته‌بندی." },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();
  try {
    const categories = await Category.find();

    return NextResponse.json(
      { message: "دسته بندی ها در دیتابیس", categories },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
  }
}
