"use client";

import { useState, useEffect, useRef } from "react";
import { BiChevronDown } from "react-icons/bi";

interface Option {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  label?: string;
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomDropdown({
  label,
  options,
  selected,
  onChange,
  placeholder = "انتخاب کنید",
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((o) => o.value === selected)?.label || placeholder;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className='relative w-full z-50' ref={dropdownRef}>
      {label && (
        <label className='block mb-1 text-sm font-medium text-right'>
          {label}
        </label>
      )}
      <div
        className={`relative z-10 border border-darker-black/70/30 px-4 py-2 rounded-lg cursor-pointer  transition-all shadow-sm ${
          open ? "ring-2 ring-darker-black/70" : ""
        }`}
        onClick={() => setOpen((prev) => !prev)}>
        <div className='flex justify-between items-center'>
          <span
            className={`text-sm ${
              selected ? "text-darker-black" : "text-gray-400"
            }`}>
            {selectedLabel}
          </span>
          <BiChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
        {open && (
          <ul className='absolute z-30 left-0 right-0 top-full bg-darker bg-light border-darker-black/70/30 shadow-lg  mt-2 rounded-lg max-h-60 overflow-y-auto text-sm'>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation(); // ✅ prevent bubbling to dropdown's onClick
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`px-4 py-2 hover:bg-darker-black/5 border-b border-darker-black/10 transition-colors cursor-pointer ${
                  selected === option.value ? " font-medium" : ""
                }`}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
