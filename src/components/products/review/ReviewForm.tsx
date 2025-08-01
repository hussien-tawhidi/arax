"use client";

import { useState } from "react";
import Input from "../../ui/Input";
import TextAreaInput from "../../ui/TextAreaInput";
import { IoAddSharp } from "react-icons/io5";
import axios from "axios";
import RatingSelector from "./RatingSelector";
import StatusCheckBox from "@/components/admin/off-codes/StatusCheckBox";
import ErrorMsg from "@/components/admin/ErrorMsg";
import SuccessMsg from "@/components/admin/SuccessMsg";
import Review from "../review/Review";

export type RatingCategory = "quality" | "price" | "buyingCost";

export default function ProductReviewForm({
  productId,
}: {
  productId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [recommend, setRecommend] = useState(true);
  const [ratings, setRatings] = useState<Record<RatingCategory, number>>({
    quality: 0,
    price: 0,
    buyingCost: 0,
  });

  const handleStarClick = (category: RatingCategory, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      comment,
      recommend,
      ratings,
      productId,
    };
    console.log("🚀 ~ handleSubmit ~ payload:", payload);
    setLoading(true);
    try {
      await axios.post("/api/comments", payload);
      setSuccess("کمنت شما موفقانه ساخته شد");
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      setError("خطا در ایجاد کمنت");
    } finally {
      setLoading(false);
      setTitle("");
      setComment("");
      setRecommend(false);
      setRatings({ price: 1, quality: 1, buyingCost: 1 });
    }
  };

  return (
    <div className='p-4' dir='rtl'>
      <div className=''>
        <h2 className='text-lg font-bold text-darker-black/80 relative '>
          <span className='absolute top-0 bottom-0 h-full w-1 bg-red -right-2'></span>
          نظرات کاربران
        </h2>
        <p className='text-sm text-gray-500'>نظر شما درباره این کالا</p>
      </div>
      <form onSubmit={handleSubmit} className='mt-2 rounded-lg '>
        <div className='flex flex-col lg:flex-row-reverse gap-4'>
          {/* Left Side */}
          <div className='flex-1 space-y-3'>
            {/* Title input */}
            <Input
              setValue={setTitle}
              value={title}
              type='text'
              placeholder='خلاصه'
            />
            <TextAreaInput
              onChange={setComment}
              value={comment}
              placeholder='نظر خودرا وارد کنید'
            />
            <StatusCheckBox
              isActive={recommend}
              setIsActive={setRecommend}
              title='پیشنهاد میکنم'
            />
          </div>
          {/* Right Side Ratings */}
          <RatingSelector ratings={ratings} onChange={handleStarClick} />;
        </div>
        {error && <ErrorMsg text={error} />}
        {success && <SuccessMsg text={success} />}
        <button
          disabled={loading}
          className='text-darker-black/60 w-full justify-center border border-darker-black/70 py-2 px-4 rounded-xl transition-all duration-300 hover:bg-darker-black/70 flex items-center my-2 text-sm hover:text-light'>
          <IoAddSharp />
          {loading ? "...در حال ارسال" : "ارسال نظر"}
        </button>
      </form>
      <Review productId={productId} />
    </div>
  );
}
