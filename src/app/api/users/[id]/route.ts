/* eslint-disable @typescript-eslint/no-explicit-any */
import { dbConnect } from "@/libs/db";
import User from "@/models/User";
import { saveUploadedFile } from "@/utils/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: any) {
  const id = await params.id;

  await dbConnect();

  try {
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "کاربر پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "کاربر با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ DELETE error:", error);
    return NextResponse.json(
      { message: "خطا در حذف کاربر", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  const param = await params;
  const id = await param.id;
  await dbConnect();

  try {
    const formdata = await req.formData();
    console.log("🚀 ~ PUT ~ formdata:", formdata);
    const userName = formdata.get("userName")?.toString();
    const gender = formdata.get("gender")?.toString();
    const bio = formdata.get("bio")?.toString();
    const birthday = formdata.get("birthday")?.toString();
    const userEmail = formdata.get("userEmail")?.toString();
    const userPhone = formdata.get("userPhone")?.toString();
    const role = formdata.get("role")?.toString();
    const file = formdata.get("avatar") as File;

    const userFinded = await User.findById(id);
    let imagePath = userFinded.avatar;

    if (file instanceof File && file.size > 0) {
      // File was changed
      imagePath = await saveUploadedFile(file);
    }
    const user = await User.findByIdAndUpdate(
      id,
      {
        name: userName,
        gender: gender,
        bio: bio,
        birthday: birthday,
        email: userEmail,
        phone: userPhone,
        role,
        avatar: imagePath,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "کاربر با موفقیت حذف شد", user },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ uodate error:", error);
    return NextResponse.json(
      { message: "خطا در ویرایش کاربر", error },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, { params }: any) {
  const param = await params;
  const id = await param.id;
  await dbConnect();

  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "کاربر پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ get category by ID error:", error);
    return NextResponse.json(
      { message: "خطا در دریافت کاربر", error },
      { status: 500 }
    );
  }
}
