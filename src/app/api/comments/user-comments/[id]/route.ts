/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/libs/db";
import Comments from "@/models/Comments";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const { id } = params;

  // ✅ Validate MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "شناسه کاربر نامعتبر است" },
      { status: 400 }
    );
  }

  try {
    const comments = await Comments.find({ user: id })
      .populate({
        path: "productId",
        select: "name imageUrl", // ✅ Populate useful product info
      })
      .sort({ createdAt: -1 }); // Optional: newest first

    if (!comments || comments.length === 0) {
      return NextResponse.json(
        { message: "هیچ نظری برای این کاربر یافت نشد", comments: [] },
        { status: 200 }
      );
    }

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("❌ خطا در دریافت نظرات:", error);
    return NextResponse.json({ error: "خطا در دریافت نظرات" }, { status: 500 });
  }
}
