
import { dbConnect } from "@/libs/db";
import Otp from "@/models/Otp";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { phone, code, name } = await req.json();
 
    console.log("🚀 ~ POST ~ body:", {phone,name,code});
    if (!phone || !code || !name) {
      return new Response(
        JSON.stringify({ message: "فیلد ها الزامی میباشند" }),
        {
          status: 400,
        }
      );
    }
    const otp = await Otp.findOne({ phone, code });
    if (!otp) {
      return NextResponse.json({ message: "کد درست نمیباشد" }, { status: 400 });
    }
    if (otp.expiresAt < new Date()) {
      return new Response(JSON.stringify({ message: "کد منقضی شده است" }), {
        status: 400,
      });
    }

    const user = await User.create({
      name,
      phone,
      email: "example@example.com",
      isActive: true,
      role: "کاربر",
    });

    return NextResponse.json(
      { message: "کاربر موفقانه ثبت نام کرد", user },
      { status: 201 }
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { message: "خطا برای تایید کد OTP" },
      { status: 500 }
    );
  }
}
