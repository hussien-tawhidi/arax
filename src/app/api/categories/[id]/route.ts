
import { dbConnect } from "@/libs/db";
import Category from "@/models/Categories";
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
    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "دسته‌بندی پیدا نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "دسته‌بندی با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ DELETE error:", error);
    return NextResponse.json(
      { message: "خطا در حذف دسته‌بندی", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = params;
  const data = await req.json();
  console.log("🚀 ~ PUT ~ data:", data)

  await dbConnect();

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        category: data.category,
        subcategory: data.subcategory,
        productType: data.productType,
      },
      { new: true }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { message: "دسته‌بندی پیدا نشد." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "دسته‌بندی با موفقیت ویرایش شد.", category: updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ خطا در ویرایش دسته‌بندی:", error);
    return NextResponse.json(
      { message: "خطا در ویرایش دسته‌بندی.", error },
      { status: 500 }
    );
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: NextRequest, { params }: any) {
  const id = await params.id;
  await dbConnect();

  try {
    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { message: "دسته‌بندی پیدا نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ get category by ID error:", error);
    return NextResponse.json(
      { message: "خطا در دریافت دسته‌بندی", error },
      { status: 500 }
    );
  }
}
