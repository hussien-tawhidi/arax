import React, { useState, useEffect } from "react";

function toPersianNumber(str: string) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return str.replace(/\d/g, (d) => persianDigits[+d]);
}

function toEnglishNumber(str: string) {
  const englishDigits = "0123456789";
  return str.replace(/[۰-۹]/g, (d) => englishDigits["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
}

interface PersianNumberInputProps {
  value: number;
  onChange: (num: number) => void;
  label: string;
  min?: number;
  max?: number;
}

export default function PersianNumberInput({
  value,
  onChange,
  label,
  min,
  max,
}: PersianNumberInputProps) {
  const [inputValue, setInputValue] = useState(
    toPersianNumber(value.toString())
  );

  // Keep input in sync when external value changes
  useEffect(() => {
    const persian = toPersianNumber(value.toString());
    if (persian !== inputValue) {
      setInputValue(persian);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Allow empty string
    if (val === "") {
      setInputValue(val);
      onChange(0);
      return;
    }

    // Accept only Persian digits (۰-۹)
    if (/^[۰-۹]+$/.test(val)) {
      setInputValue(val);
      const english = toEnglishNumber(val);
      const num = Number(english);
      if (!isNaN(num)) {
        if (
          (min !== undefined && num < min) ||
          (max !== undefined && num > max)
        ) {
          // Ignore out of range inputs
          return;
        }
        onChange(num);
      }
    }
  };

  return (
    <div className='flex-1'>
      <label className='text-sm text-darker-black/50 block mb-1'>{label}</label>
      <input
        type='text'
        inputMode='numeric'
        pattern='[۰-۹]*'
        value={inputValue}
        onChange={handleChange}
        className='w-full border border-darker-black/30 rounded p-2 text-right'
        placeholder='۰'
      />
    </div>
  );
}
