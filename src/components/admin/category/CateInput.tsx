"use client";

import React from "react";

interface SubcategoryInputProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function CateInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = true,
  className = "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
}: SubcategoryInputProps) {
  return (
    <div className='mb-4'>
      {label && (
        <label htmlFor={id} className='block mb-1 font-semibold'>
          {label}
        </label>
      )}
      <input
        id={id}
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={className}
      />
    </div>
  );
}
