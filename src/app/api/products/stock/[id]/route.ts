
import { dbConnect } from "@/libs/db";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }:any
) {
  await dbConnect();
  const id = params.id;

  try {
    const formData = await req.formData();
    const stock = formData.get("stock");

    if (!stock) {
      return NextResponse.json(
        { message: "مقدار موجودی الزامی است" },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { stock: Number(stock) },
      { new: true }
    );

    if (!product) {
      return NextResponse.json({ message: "محصول یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({
      message: "موجودی با موفقیت بروزرسانی شد",
      product,
    });
  } catch (error) {
    console.error("Update stock error:", error);
    return NextResponse.json(
      { message: "خطا در بروزرسانی موجودی" },
      { status: 500 }
    );
  }
}
