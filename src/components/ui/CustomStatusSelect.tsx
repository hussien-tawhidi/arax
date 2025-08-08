"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";


interface Option {
  value: string;
  label: string;
}

interface CustomStatusSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
}
export default function CustomStatusSelect({ value, onChange,options }: CustomStatusSelectProps) {
  const [open, setOpen] = useState(false);

  const selected = options?.find((opt) => opt.value === value);

  return (
    <div className='relative w-48 text-right'>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className='w-full border border-darker-black/20 px-4 py-2 rounded-md flex items-center justify-between bg-light hover:shadow-sm transition'>
        <span>{selected?.label}</span>
        <IoChevronDown
          className={`transform transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown List */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className='absolute right-0 mt-1 w-full bg-light border border-darker-black/20 rounded-md shadow-md z-10'>
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-darker-black/5 flex items-center justify-between ${
                  opt.value === value ? "bg-red/10 text-red font-medium" : ""
                }`}>
                <span>{opt.label}</span>
                {opt.value === value && <FaCheck className='text-sm' />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
