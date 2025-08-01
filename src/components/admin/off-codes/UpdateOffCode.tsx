/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import FormInput from "../products/add-products/Input";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import StatusCheckBox from "./StatusCheckBox";

export default function UpdateOffCode({ id }: { id: string }) {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [experirDate, setExperirDate] = useState<any>(new Date());
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/off-codes/${id}`);
        setCode(data?.discount?.code || "");
        console.log("🚀 ~ fetchData ~ data:", data);
        setDiscount(data?.discount?.discount || "");
        setIsActive(data?.discount?.isActive || "");
        setExperirDate(data?.discount?.expireAt || "0");
      } catch (err) {
        console.error("❌ خطا در دریافت دسته‌بندی‌ها:", err);
        setError("خطا در بارگذاری دسته‌بندی‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (discount.length < 0 || discount.length > 100) {
        return setError("درصد را درست وارد کنید");
      }
      const payload = {
        code,
        discount: Number(discount),
        isActive,
        expiresAt: experirDate?.toDate?.() || new Date(), // convert to JS Date
      };

      await axios.put(`/api/off-codes/${id}`, payload);

      setSuccess(true);
      router.push("/admin/off-codes");
    } catch (err: any) {
      console.error("❌ خطا در افزودن کد تخفیف:", err);
      setError(err.response?.data?.message || "خطا در افزودن کد تخفیف");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-[90%] mx-auto mt-10 p-6 rounded-xl shadow'>
      <h2 className='text-xl font-bold mb-4 text-darker-black'>
        افزودن کد تخفیف
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <FormInput
          label='کد تخفیف'
          type='text'
          id='code'
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <FormInput
          label='درصد تخفیف'
          type='text'
          id='discount'
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />

        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium'>تاریخ انقضاء</label>
          <DatePicker
            value={experirDate}
            onChange={setExperirDate}
            calendar={persian}
            locale={persian_fa}
            calendarPosition='bottom-right'
            className='!w-full border rounded p-2 text-right'
            inputClass='w-full py-2 px-3 border border-gray-300 rounded'
          />
        </div>
        <StatusCheckBox isActive={isActive} setIsActive={setIsActive} />
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        {success && (
          <p className='text-green-600 text-sm'>کد تخفیف با موفقیت اضافه شد.</p>
        )}

        <button
          type='submit'
          disabled={loading}
          className='w-full text-darker-black/60 border border-darker-black/70 py-2 rounded-lg transition font-semibold'>
          {loading ? (
            "در حال ارسال..."
          ) : (
            <span className='flex items-center justify-center gap-1'>
              بروزرسانی کد <IoAddSharp className='text-xl' />
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
