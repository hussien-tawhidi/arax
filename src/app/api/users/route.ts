
import { dbConnect } from "@/libs/db";
import User from "@/models/User";
import { saveUploadedFile } from "@/utils/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect(); // اتصال به MongoDB

  try {
    const formdata = await req.formData();
    const userName = formdata.get("userName")?.toString();
    const userEmail = formdata.get("userEmail")?.toString();
    const userPhone = formdata.get("userPhone")?.toString();
    const role = formdata.get("role")?.toString();
    const file = formdata.get("avatar") as File;
    console.log("🚀 ~ POST ~ file:", file)

    let imagePath = "";

    if (file) {
      imagePath = await saveUploadedFile(file);
    }

    const newUser = await User.create({
      name: userName,
      email: userEmail,
      phone: userPhone,
      role,
      avatar: imagePath,
    });

    return NextResponse.json(
      { message: "کاربر با موفقیت ایجاد شد.", newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ ایجاد کاربر با خطا مواجه شد:", error);
    return NextResponse.json(
      { message: "خطا در ایجاد کاربر." },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();
  try {
    const users = await User.find();

    return NextResponse.json(
      { message: "دسته بندی ها در دیتابیس", users },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
  }
}
