"use client";

import { ReactNode } from "react";

interface InputProps {
  value: string;
  type?: string;
  placeholder?: string;
  setValue: (value: string) => void;
  icon?: ReactNode;
}

export default function Input({
  value,
  setValue,
  type = "text",
  placeholder = "",
  icon,
}: InputProps) {
  return (
    <div className='mb-3 relative w-full'>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-darker-black/20 px-4 pr-10 sm:py-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red/70`}
      />
      {icon && (
        <span className='absolute inset-y-0 right-3 flex items-center text-gray-400'>
          {icon}
        </span>
      )}
    </div>
  );
}
