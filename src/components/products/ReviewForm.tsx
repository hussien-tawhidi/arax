"use client";

import { useState } from "react";
import { GoStarFill } from "react-icons/go";
import { ReviewType } from "./Review";

interface ReviewFormProps {
  onSubmit: (review: ReviewType) => void;
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !comment || rating < 1) return;

    const newReview: ReviewType = {
      id: Date.now().toString(),
      username,
      rating,
      comment,
      date: new Date().toISOString(),
    };

    onSubmit(newReview);
    setUsername("");
    setRating(0);
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='border border-darker-black/10 mt-5 rounded-lg p-4 space-y-4 shadow-sm'>
      <h2 className='text-lg font-bold text-darker-black/80'>ثبت نظر شما</h2>

      <div className='flex flex-col gap-1'>
        <label className='text-sm text-darker-black/60'>نام شما</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='border-b ring-0 border-darker-black/30 px-3 py-2 text-sm focus:outline-none '
          placeholder='نام خود را وارد کنید'
          required
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-sm text-darker-black/60'>امتیاز شما</label>
        <div className='flex items-center gap-1'>
          {Array.from({ length: 5 }, (_, i) => (
            <button
              type='button'
              key={i}
              onClick={() => setRating(i + 1)}
              className='focus:outline-none'>
              <GoStarFill
                className={`w-6 h-6 ${
                  i < rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-sm text-darker-black/60'>نظر شما</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='border rounded border-darker-black/30 px-3 py-2 text-sm focus:outline-none'
          rows={3}
          placeholder='نظر خود را وارد کنید'
          required
        />
      </div>

      <button
        type='submit'
        className='bg-darker-black/70 text-light py-2 rounded hover:bg-darker-black/80 transition w-full'>
        ثبت نظر
      </button>
    </form>
  );
}
