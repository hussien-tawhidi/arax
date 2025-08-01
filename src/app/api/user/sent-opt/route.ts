import { dbConnect } from "@/libs/db";

import { sendOTP } from "@/libs/otpSms";
import Otp from "@/models/Otp";
import User from "@/models/User";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

// Constants
const OTP_EXPIRY_MINUTES = 10;
const OTP_RATE_LIMIT_MINUTES = 2;

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    console.log("🚀 ~ POST ~ body:", body);
    const { phone, type } = body;

    // Validate request type
    if (!type || !["register", "login"].includes(type)) {
      return NextResponse.json(
        { message: "نوع درخواست نامعتبر است." },
        { status: 400 }
      );
    }

    // Validate phone number format
    const phoneRegex = /^(\+98|0)?9\d{9}$/;
    if (!phone || !phoneRegex.test(phone)) {
      return NextResponse.json(
        { message: "شماره تلفن وارد شده صحیح نیست." },
        { status: 400 }
      );
    }

    // Check for existing OTP requests (rate limiting)
    const recentOtp = await Otp.findOne({
      phone,
      createdAt: {
        $gt: new Date(Date.now() - OTP_RATE_LIMIT_MINUTES * 60 * 1000),
      },
    });

    if (recentOtp) {
      return NextResponse.json(
        {
          message: `لطفاً ${OTP_RATE_LIMIT_MINUTES} دقیقه صبر کنید قبل از درخواست کد جدید.`,
        },
        { status: 429 }
      );
    }

    // User validation based on request type
    if (type === "register") {
      const existingUser = await User.findOne({ phone });
      if (existingUser) {
        return NextResponse.json(
          { message: "کاربری با این شماره قبلا ثبت نام کرده است." },
          { status: 400 }
        );
      }
    } else {
      const user = await User.findOne({ phone });
      if (!user) {
        return NextResponse.json(
          { message: "کاربری با این شماره ثبت نام نکرده است." },
          { status: 404 }
        );
      }
    }

    // Generate secure OTP
    const otpCode = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    // Save OTP to database
    await Otp.create({
      phone,
      code: otpCode,
      kind: type === "register" ? 1 : 2,
      expiresAt,
      verified: false,
    });

    // Send OTP via Kavenegar
    const smsResult = await sendOTP(phone, otpCode);
    console.log("🚀 ~ POST ~ smsResult:", smsResult);

    if (!smsResult.success) {
      // Delete the OTP record if SMS failed
      await Otp.deleteOne({ phone, code: otpCode });
      return NextResponse.json(
        { message: "خطا در ارسال پیامک. لطفاً دوباره تلاش کنید." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "کد تایید برای شما ارسال شد." },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("OTP Service Error:", error);
    return NextResponse.json(
      { message: "خطای سرور. لطفاً بعداً تلاش کنید." },
      { status: 500 }
    );
  }
}
