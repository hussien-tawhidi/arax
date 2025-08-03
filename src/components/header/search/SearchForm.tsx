"use client";

import { FormEvent, useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { TfiClose } from "react-icons/tfi";
import { motion } from "framer-motion";

interface SearchFormProps {
  query: string;
  setQuery: (val: string) => void;
  onSubmit: (val: string) => void;
  onClose: () => void;
  autoFocus?: boolean;
  showBtnMore?: boolean;
}

export default function SearchForm({
  query,
  setQuery,
  onSubmit,
  onClose,
  showBtnMore,
  autoFocus = true,
}: SearchFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length > 0) {
      onSubmit(trimmed);
    }
  };

  return (
    <motion.form
      ref={formRef}
      role='search'
      aria-label='جستجو'
      className='relative bg-light pb-1.5'
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}>
      {/* Input */}
      <div className='relative'>
        {/* Close Button */}
        <motion.button
          type='button'
          aria-label='بستن'
          onClick={onClose}
          className='absolute left-2 -translate-y-1/2 top-1/2 p-1 text-darker-black/50 hover:text-black transition'>
          <TfiClose size={20} />
        </motion.button>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='rounded-full w-full sm:px-10 sm:py-3 py-2 px-5 sm:border-2 border-1 border-transparent focus:outline-none focus:border-black/20 placeholder-darker-black/40 transition-all duration-300 shadow-md'
          placeholder='جستجو کنید ...'
          required
          type='text'
          autoFocus={autoFocus}
        />
        {/* Search Icon */}
        <motion.button
          type='submit'
          aria-label='جستجو'
          className='absolute sm:flex hidden right-3 -translate-y-1/2 top-1/2 p-1 text-darker-black/50 hover:text-black transition'
          onClick={handleSubmit}>
          <BiSearchAlt size={20} />
        </motion.button>
      </div>
      {showBtnMore && (
        <motion.button
          type='button'
          onClick={() => onSubmit(query.trim())} // or a custom handler
          className='ml-auto block my-3 font-semibold cursor-pointer text-darker-black/70 hover:text-darker-black/90 transition-all text-sm border-b border-darker-black/50'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}>
          نمایش نتایج بیشتر
        </motion.button>
      )}
    </motion.form>
  );
}
