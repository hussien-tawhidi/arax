
import { dbConnect } from "@/libs/db";
import Discount from "@/models/Discount";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("🚀 ~ POST ~ data:", data);
  const { code, discount, isActive, expiresAt } = data;
  await dbConnect();
  try {
    const creatDiscount = await Discount.create({
      code,
      discount,
      isActive,
      expireAt: expiresAt,
    });

    return NextResponse.json(
      { creatDiscount, message: "discount code created success" },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { message: "error in creating discount code", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const discount = await Discount.find();
    return NextResponse.json({ data: discount }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا دریافت کد های تخفیف", error },
      { status: 500 }
    );
  }
}
