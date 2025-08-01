"use client";

import { BiCheckCircle, BiTag } from "react-icons/bi";

interface Props {
  code: string;
  setCode: (value: string) => void;
  applied: boolean;
  setApplied: (value: boolean) => void;
}

export default function DiscountCode({
  code,
  setCode,
  applied,
  setApplied,
}: Props) {
  const applyCode = () => {
    if (code.trim()) setApplied(true);
  };

  return (
    <div className='rounded-2xl p-5 space-y-4 transition'>
      <div className='flex items-center gap-2 text-darker-black/79'>
        <BiTag className='w-5 h-5 text-red' />
        <h2 className='text-lg font-bold'>استفاده از کد تخفیف</h2>
      </div>

      <div className='flex gap-2 rtl:flex-row-reverse'>
        <input
          type='text'
          placeholder='مثلاً: OFF50'
          className='w-full px-4 py-2 text-sm rounded-xl border border-darker-black/30 focus:ring-2 focus:ring-red focus:outline-none transition'
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            if (applied) setApplied(false);
          }}
        />
        <button
          onClick={applyCode}
          disabled={!code.trim()}
          className={`${
            !code.trim()
              ? "bg-darker-black/30 cursor-not-allowed"
              : "bg-red hover:bg-red/90"
          } text-light text-sm px-5 py-2 rounded-xl transition`}>
          اعمال
        </button>
      </div>

      {applied && (
        <div className='flex items-center gap-2 text-red text-sm'>
          <BiCheckCircle className='w-4 h-4' />
          <span>کد با موفقیت اعمال شد</span>
        </div>
      )}
    </div>
  );
}
