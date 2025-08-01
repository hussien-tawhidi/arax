"use client";

import { GoStarFill } from "react-icons/go";

type StarRatingProps = {
  rating: number;
  onChange: (value: number) => void;
  label?: string;
  max?: number;
};

export default function StarRating({
  rating,
  onChange,
  label = "امتیاز شما",
  max = 5,
}: StarRatingProps) {
  return (
    <div className='flex flex-col gap-1'>
      <label className='text-sm text-darker-black/60'>{label}</label>
      <div className='flex items-center gap-1'>
        {Array.from({ length: max }, (_, i) => (
          <button
            key={i}
            type='button'
            onClick={() => onChange(i + 1)}
            className='focus:outline-none'>
            <GoStarFill
              className={`w-6 h-6 transition-colors ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
