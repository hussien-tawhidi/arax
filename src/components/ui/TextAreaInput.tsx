"use client";

import React from "react";

type CommentInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
};

export default function TextAreaInput({
  value,
  onChange,
  placeholder = "نظر خود را وارد کنید",
  label = "نظر شما",
  required = false,
}: CommentInputProps) {
  return (
    <div className='flex flex-col gap-1'>
      <label className='text-sm text-darker-black/60'>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='border border-darker-black/30 px-3 py-2 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-red resize-none'
        rows={3}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
