/* eslint-disable @typescript-eslint/no-explicit-any */

import { dbConnect } from "@/libs/db";
import Discount from "@/models/Discount";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(req: NextRequest, { params }: Params) {
  const id = await params.id;

  await dbConnect();

  try {
    await Discount.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "کد تحفیف با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ discount code error:", error);
    return NextResponse.json(
      { message: "خطا در حذف کد تخفیف", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  console.log("🚀 ~ PUT ~ params:", params)
  const id = await params.id;
  const data = await req.json();


  const { code, discount, isActive, expiresAt } = data;
  await dbConnect();
  try {
    if (!id) {
      return NextResponse.json(
        { message: "شناسه معتبر نیست" },
        { status: 400 }
      );
    }

    await Discount.findByIdAndUpdate(
      id,
      {
        code,
        discount,
        isActive,
        expireAt: expiresAt,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "discount code updated success" },
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

export async function GET(req: NextRequest, { params }: Params) {
  console.log("🚀 ~ GET ~ params:", params);
  const param = await params;
  const id = param.id;
  await dbConnect();

  try {
    const discount = await Discount.findById(id);

    if (!discount) {
      return NextResponse.json({ message: "محصول پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({ discount }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ get product by ID error:", error);
    return NextResponse.json(
      { message: "خطا در دریافت محصول", error },
      { status: 500 }
    );
  }
}
