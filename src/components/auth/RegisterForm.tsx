"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import ErrorMsg from "../admin/ErrorMsg";
import SuccessMsg from "../admin/SuccessMsg";
import { AiOutlineUser } from "react-icons/ai";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import SubmitButton from "../admin/SubmitButton";
import Input from "../ui/Input";

export default function RegisterForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState("");
  const [steps, setSteps] = useState(1);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  const handleSentOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const phoneRegex = /^(\+98|0)?9\d{9}$/;
      if (!phone || !phoneRegex.test(phone)) {
        setError("شماره مویابل معتبر نیست");
        return;
      }

      const res = await fetch("/api/user/sent-opt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, type: "register" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "خطا در ثبت‌نام");
      } else {
        setSuccess("کد تاییدی ارسال شد");
        setSteps(2);
      }
    } catch (err) {
      console.error("handleSentOtp error:", err);
      setError("مشکلی در اتصال به سرور پیش آمد");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp || otp.length !== 6) {
      setError("کد تایید باید 6 رقمی باشد.");
      return;
    }

    setLoading(true);

    try {
      // First verify OTP with your API
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: otp, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "خطایی سمت سرور رخ داده است.");
        return;
      }

      // Then sign in using credentials
      const result = await signIn("credentials", {
        redirect: false,
        phone,
        code: otp,
        callbackUrl: `/user/${session?.user?.id}`, // Add explicit callback
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.url) {
        router.push(result.url);
      } else {
        router.push("/auth/user-profile");
      }
    } catch (error) {
      console.error("handleVerifyOtp error:", error);
      setError("خطایی رخ داده است.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex h-[70vh] items-center justify-center p-10'>
      <div className='xl:w-1/2 rounded-2xl border border-red/30 md:shadow-xl'>
        <div className='grid md:grid-cols-2 p-5'>
          <div>
            <Image
              width={300}
              height={300}
              className='object-cover'
              src='/images/register.webp'
              alt='ثبت نام'
            />
          </div>
          <div className='flex items-center justify-center'>
            {steps === 1 ? (
              <form onSubmit={handleSentOtp}>
                <h1 className='text-center font-extrabold uppercase text-red'>
                  فورم ثبت نام کاربر
                </h1>
                <br />
                {error && <ErrorMsg text={error} />}
                {success && <SuccessMsg text={success} />}
                <Input
                  type='text'
                  value={name}
                  setValue={setName}
                  placeholder='نام کامل خود را وارد کنید'
                  icon={<AiOutlineUser />}
                />
                <Input
                  type='text'
                  value={phone}
                  setValue={setPhone}
                  placeholder='شماره مبایل خود را وارد کنید'
                  icon={<IoPhonePortraitOutline />}
                />
                <SubmitButton loading={loading} title='ثبت نام' />
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                {error && <ErrorMsg text={error} />}
                {success && <SuccessMsg text={success} />}
                <div
                  className='flex justify-center gap-2 mb-3 flex-row-reverse'
                  dir='rtl'>
                  <div className='mb-4'>
                    <input
                      type='text'
                      inputMode='numeric'
                      maxLength={6}
                      dir='rtl'
                      className={`w-full rounded-xl border border-darker-black/20 px-4 pr-10 sm:py-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red/70`}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder='کد تأیید ۶ رقمی'
                    />
                  </div>
                </div>
                <SubmitButton loading={loading} title='تایید کد' />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
