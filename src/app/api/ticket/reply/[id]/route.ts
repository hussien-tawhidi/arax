/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Ticket from "@/models/Ticket";
import { dbConnect } from "@/libs/db";

export async function PUT(req: NextRequest, { params }: any) {
  await dbConnect();
 const param = await params;
 console.log("🚀 ~ GET ~ param:", param);
 const id = await param.id;
  const { message, status, replier } = await req.json();

  if (!message || !status) {
    return NextResponse.json(
      { message: "همه فیلدها الزامی هستند" },
      { status: 400 }
    );
  }

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      {
        $push: {
          replies: {
            sender: replier,
            message,
          },
        },
        status,
      },
      { new: true }
    );

    if (!ticket) {
      return NextResponse.json({ message: "تیکت پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({ ticket });
  } catch (err) {
    console.log("🚀 ~ PUT ~ err:", err);
    return NextResponse.json({ message: "خطا در ارسال پاسخ" }, { status: 500 });
  }
}
export async function GET(req: NextRequest, { params }: any) {
  await dbConnect();
  try {
    const param = await params;
    const id = await param.id;
    const ticket = await Ticket.findById(id);

    return NextResponse.json({ ticket });
  } catch (err) {
    console.log("🚀 ~ PUT ~ err:", err);
    return NextResponse.json({ message: "خطا در ارسال پاسخ" }, { status: 500 });
  }
}
