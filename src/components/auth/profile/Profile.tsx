"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import ErrorMsg from "@/components/admin/ErrorMsg";
import SuccessMsg from "@/components/admin/SuccessMsg";

export default function Profile() {
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

      const res = await fetch("/api/auth/sent-opt", {
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
                <div className='relative mb-3'>
                  <input
                    type='text'
                    className='w-full rounded-2xl border placeholder:text-sm border-darker-black/20 px-5 py-3 outline-red/70 pr-12'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='نام کامل خود را وارد کنید'
                  />
                  <AiOutlineUser className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none' />
                </div>

                <div className='mb-3 relative'>
                  <input
                    type='text'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className='w-full rounded-2xl border placeholder:text-sm border-darker-black/20 px-5 py-3 outline-red/70 pr-12'
                    placeholder='شماره مبایل خود را وارد کنید'
                  />
                  <IoPhonePortraitOutline className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none' />
                </div>

                <button
                  className='mb-3 w-full rounded-2xl bg-red px-5 py-3 font-semibold text-light'
                  disabled={loading}>
                  {loading ? "در حال ارسال کد..." : "ثبت نام"}
                </button>
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
                      className='w-full rounded-xl border border-gray-300 px-4 py-3 text-right outline-none focus:border-red-500'
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder='کد تأیید ۶ رقمی'
                    />
                  </div>
                </div>

                <button
                  className='mb-3 w-full rounded-2xl bg-red px-5 py-3 font-semibold text-light'
                  disabled={loading}>
                  {loading ? "در حال ورود..." : "تایید کد"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
