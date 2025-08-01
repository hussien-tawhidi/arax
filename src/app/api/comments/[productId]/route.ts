import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/libs/db";
import Comments from "@/models/Comments";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  await dbConnect();

  const { productId } = params;

  console.log("productId:", productId);
  const isValidId = mongoose.Types.ObjectId.isValid(productId);
  console.log("isValid:", isValidId);

  if (!isValidId) {
    return NextResponse.json(
      { error: "شناسه محصول نامعتبر است" },
      { status: 400 }
    );
  }

  try {
    const comments = await Comments.find({ productId })
      .sort({ createdAt: -1 })
      .populate("user", "name email phone avatar"); // 👈 Only fetch name & avatar
    return NextResponse.json({ comments });
  } catch (error) {
    console.error("خطا در دریافت کامنت‌ها:", error);
    return NextResponse.json({ error: "خطا در دریافت نظرات" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  console.log("🚀 ~ PUT ~ params:", params);
  const id = await params.productId;
  await dbConnect();

  try {
    const updated = await Comments.findByIdAndDelete(id);
    if (!updated) {
      return new Response("Not found", { status: 404 });
    }
    return Response.json(updated);
  } catch (error) {
    console.log("🚀 ~ PUT ~ error:", error);
    return new Response("Error updating", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { productId: string } }
) {
  const id = await params.productId;
  const data = await req.json();
  await dbConnect();

  try {
    const updated = await Comments.findByIdAndUpdate(
      id,
      { isApproved: data.isApproved },
      { new: true }
    );
    if (!updated) {
      return new Response("Not found", { status: 404 });
    }
    return Response.json(updated);
  } catch (error) {
    console.log("🚀 ~ PUT ~ error:", error);
    return new Response("Error updating", { status: 500 });
  }
}
