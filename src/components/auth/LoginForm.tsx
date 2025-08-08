/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useState } from "react";
import ErrorMsg from "../admin/ErrorMsg";
import SuccessMsg from "../admin/SuccessMsg";
import Input from "../ui/Input";
import { signIn, useSession } from "next-auth/react";
import SubmitButton from "../admin/SubmitButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState(1);

  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const phoneRegex = /^(\+98|0)?9\d{9}$/;
    if (!phone || !phoneRegex.test(phone)) {
      setError("شماره تلفن وارد شده صحیح نیست.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/user/sent-opt", {
        phone,
        type: "login",
      });
      console.log("🚀 ~ handleSendOtp ~ res:", res);
      router.push(`/user/${userId}`);

      setSuccess("کد تایید برای شما ارسال شد.");
      setStep(2);
    } catch (error: any) {
      console.log("🚀 ~ handleSendOtp ~ error:", error);
      const message =
        error?.response?.data?.message || "خطایی سمت سرور رخ داده است.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp || otp.length !== 6) {
      setError("کد تایید باید 6 رقمی باشد.");
      return;
    }

    setLoading(true);

    const result = await signIn("credentials", {
      phone,
      code: otp,
      redirect: false,
    });

    if (!result.ok) {
      setError(result.error || "خطایی رخ داده است.");
    } else {
      setSuccess("ورود موفقیت آمیز بود.");
    }

    setLoading(false);
  };
  return (
    <div className='flex justify-center items-center h-[70vh]'>
      <div className='flex justify-center border border-red/30 rounded-xl'>
        <div>
          <div className='grid md:grid-cols-2 p-5'>
            {/* Image Section */}
            <Image
              width={300}
              height={300}
              className='object-cover'
              src='/images/register.webp'
              alt='ثبت نام'
            />

            {/* Form Section */}
            <div className='flex items-center justify-center'>
              <div>
                <h2
                  className='text-center mb-4 font-bold'
                  style={{ color: "#212529" }}>
                  ورود به سیستم
                </h2>

                {error && <ErrorMsg text={error} />}
                {success && <SuccessMsg text={success} />}

                {/* Step 1: Phone input */}
                {step === 1 && (
                  <form onSubmit={handleSendOtp} className='space-y-4'>
                    <Input
                      type='text'
                      placeholder='شماره مبایل خودرا وارد کنید'
                      value={phone}
                      setValue={setPhone}
                    />
                    <SubmitButton loading={loading} title='ورود' />

                    {/* Register link */}
                    <p className='text-center text-sm text-darker-black/60'>
                      حساب کاربری ندارید؟{" "}
                      <button
                        type='button' onClick={()=>router.push("/user/register")}
                        className='text-red hover:underline font-semibold'>
                        ثبت نام
                      </button>
                    </p>
                  </form>
                )}

                {/* Step 2: OTP input */}
                {step === 2 && (
                  <form onSubmit={handleLogin} className='space-y-4'>
                    <Input
                      type='text'
                      placeholder='کد تایید را وارد کنید'
                      value={otp}
                      setValue={setOtp}
                    />
                    <SubmitButton loading={loading} title='تایید کد' />
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
