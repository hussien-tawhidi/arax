"use client";

import React from "react";

interface FormInputProps {
  id: string;
  label: string;
  value: string|number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  min?: number;
  max?: number;
}

export default function FormInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  min,
  max,
}: FormInputProps) {
  return (
    <div className=''>
      <label htmlFor={id} className='block mb-1 text-sm font-medium '>
        {label}
      </label>
      <input
        type={type}
        min={min}
        max={max}
        id={id}
        value={value}
        placeholder={label}
        onChange={onChange}
        required={required}
        className='w-full border bg-transparent border-darker-black/70 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-darker-black/70'
      />
    </div>
  );
}
