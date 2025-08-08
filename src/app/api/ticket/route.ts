import { NextRequest, NextResponse } from "next/server";
import Ticket from "@/models/Ticket";
import { dbConnect } from "@/libs/db";
import { auth } from "../../../../auth";
export async function GET() {
  await dbConnect();

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ message: "احراز هویت نشدید" }, { status: 401 });
  }

  try {
    const tickets = await Ticket.find({ user: userId }).sort({ createdAt: -1 });
    return NextResponse.json({ tickets });
  } catch (err) {
    console.log("🚀 ~ GET ~ err:", err)
    return NextResponse.json(
      { message: "خطا در دریافت تیکت‌ها" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ message: "احراز هویت نشدید" }, { status: 401 });
  }

  const { subject, message } = await req.json();

  if (!subject || !message) {
    return NextResponse.json(
      { message: "تمام فیلدها الزامی هستند" },
      { status: 400 }
    );
  }

  try {
    const ticket = await Ticket.create({
      subject,
      message,
      user: userId,
    });
    return NextResponse.json({ ticket }, { status: 201 });
  } catch (err) {
    console.log("🚀 ~ POST ~ err:", err)
    return NextResponse.json({ message: "خطا در ثبت تیکت" }, { status: 500 });
  }
}
