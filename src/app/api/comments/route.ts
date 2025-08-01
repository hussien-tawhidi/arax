import { dbConnect } from "@/libs/db";
import Comments from "@/models/Comments";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const data = await req.json();
    console.log("🚀 ~ POST ~ data:", data);
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "کاربر مجاز نیست" }, { status: 401 });
    }

    const comment = await Comments.create({
      comment: data.comment,
      title: data.title,
      isRecommended: data.recommend,
      rating: data.ratings,
      productId: data.productId,
      user: session.user?.id,
    });

    return NextResponse.json(
      { message: "کامنت با موفقیت ذخیره شد", comment },
      { status: 201 }
    );
  } catch (error) {
    console.error("🚀 ~ POST error:", error);
    return NextResponse.json(
      { error: `خطا در ذخیره کامنت: ${error}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();
  const comments = await Comments.find()
    .sort({ createdAt: -1 })
    .populate("user", "name email phone avatar");;
  return NextResponse.json({ data: comments }, { status: 200 });
}
