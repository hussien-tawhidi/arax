"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";

interface OptionType {
  id: number|string;
  name: string;
  slug: string;
  province_id?: number;
  county_id?: number;
  tel_prefix?: string;
}

interface Props {
  label?: string;
  options: OptionType[];
  value:  number;
  onChange: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
}


export default function SelectOption({
  label,
  options,
  value,
  onChange,
  placeholder = "انتخاب کنید",
  disabled = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterText, setFilterText] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Filtered options based on user input
  const filteredOptions = options?.filter((opt) =>
    opt.name.toLowerCase().includes(filterText.toLowerCase())
  );

  useEffect(() => {
    setFilterText(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className='relative w-full'>
      {label && (
        <label className=' text-sm text-muted-foreground text-darker-black/50 mb-1'>
          {label}
        </label>
      )}
      <div
        className={`
          "relative  border border-darker-black/30 rounded-lg p-2 w-full flex items-center justify-between gap-2 cursor-pointer transition-all",
          ${disabled && "opacity-50 pointer-events-none"}`}
        onClick={() => setIsOpen((prev) => !prev)}>
        <span
          className={`"truncate", ${
            !value && "text-muted-foreground text-darker-black/70"
          }`}>
          {options?.find((opt) => opt.id === value)?.name || placeholder}
        </span>
        <IoIosArrowDown
          className={` "text-muted-foreground transition-transform duration-200",
            ${isOpen && "rotate-180"}`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='absolute left-0 right-0 z-50 mt-1  max-h-60 overflow-y-auto custom-scrollbar  bg-light shadow-xl border-none  rounded-md p-1'>
            <li className='relative px-2 py-1'>
              <IoIosSearch className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none' />
              <input
                className='border border-darker-black/20 w-full rounded-xl pr-10 pl-3 py-2 text-sm outline-none'
                placeholder='جستجو...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </li>

            {filteredOptions?.length > 0 ? (
              filteredOptions.map((opt) => (
                <motion.li
                  key={opt.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // @ts-nocheck
                    onChange(opt.id);
                    setIsOpen(false);
                    setSearchTerm("");
                    setFilterText("");
                  }}
                  className={`"text-sm px-3 py-2 hover:bg-gray-100 text-darker-black/70 cursor-pointer rounded",
                    ${value === opt.id && "bg-muted text-primary"}`}>
                  {opt.name}
                </motion.li>
              ))
            ) : (
              <li className='text-center text-sm text-muted-foreground p-3 text-darker-black/70'>
                موردی یافت نشد.
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
