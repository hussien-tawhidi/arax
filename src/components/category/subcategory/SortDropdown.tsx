"use client";
import { useState } from "react";
import { PiSortAscendingLight } from "react-icons/pi";

export type SortOption =
  | "newest"
  | "cheapest"
  | "mostExpensive"
  | "mostViewed"
  | "bestSelling"
  | "biggestDiscount";

interface Props {
  sortOption: SortOption;
  setSortOption: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "جدیدترین" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "mostExpensive", label: "گران‌ترین" },
  { value: "mostViewed", label: "پربازدیدترین" },
  { value: "bestSelling", label: "پرفروش‌ترین" },
  { value: "biggestDiscount", label: "پرتخفیف‌ترین" },
];

export default function SortDropdown({ sortOption, setSortOption }: Props) {
  const [show, setShow] = useState(false);
  return (
    <div className='w-full relative'>
      {/* Desktop buttons */}
      <button
        className='md:hidden flex justify-center items-center px-3 py-1.5 w-full border-l text-center border-t border-darker-black/30 text-darker-black/80 sm:text-sm text-[14px]'
        onClick={() => setShow(!show)}>
        <PiSortAscendingLight />
        <p>مرتب‌سازی</p>
      </button>
      <div className='hidden md:flex gap-2 flex-wrap md:border-b w-full'>
        <p className='md:flex hidden'>مرتب‌سازی:</p>
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSortOption(option.value)}
            className={`px-3 mb-1 py-1 text-sm ${
              sortOption === option.value
                ? "font-semibold border-red text-red"
                : "text-darker-black/70"
            }`}>
            {option.label}
          </button>
        ))}
      </div>

      {/* MOBILE: Custom Dropdown */}
      <div
        className={
          show
            ? "block absolute top-full left-0 right-0 bg-light border border-darker-black/30 w-full"
            : "hidden"
        }>
        <div className='flex md:flex-row flex-col gap-2 flex-wrap md:border-b w-full'>
          <p className='md:flex hidden'>مرتب‌سازی:</p>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortOption(option.value)}
              className={`px-3 mb-1 py-1 text-sm ${
                sortOption === option.value
                  ? "font-semibold border-red text-red"
                  : "text-darker-black/70"
              }`}>
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
