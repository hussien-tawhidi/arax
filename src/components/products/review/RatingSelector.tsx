"use client";

import { GoStarFill } from "react-icons/go";
import { RatingCategory } from "./ReviewForm";

interface RatingSelectorProps {
  ratings: Record<RatingCategory, number>;
  onChange: (category: RatingCategory, value: number) => void;
}

const ratingLabels: Record<RatingCategory, string> = {
  quality: "کیفیت",
  price: "قیمت",
  buyingCost: "ارزش خرید",
};

export default function RatingSelector({
  ratings,
  onChange,
}: RatingSelectorProps) {
  return (
    <div className='flex flex-col gap-4 w-full lg:w-60 justify-start'>
      {Object.entries(ratingLabels).map(([key, label]) => (
        <div key={key} className='flex items-center justify-between gap-2'>
          <span className='text-sm text-gray-700'>{label}</span>
          <div className='flex gap-1'>
            {Array.from({ length: 5 }, (_, i) => (
              <button
                key={i}
                type='button'
                onClick={() => onChange(key as RatingCategory, i + 1)}
                className='focus:outline-none'>
                <GoStarFill
                  className={`w-4 h-4 ${
                    ratings[key as RatingCategory] > i
                      ? "text-red"
                      : "text-darker-black/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
