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
}

export default function SearchForm({
  query,
  setQuery,
  onSubmit,
  onClose,
}: SearchFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      onSubmit(trimmed);
    }
  };

  return (
    <motion.form
      ref={formRef}
      className='relative'
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}>
      {/* Close Button */}
      <motion.button
        type='button'
        onClick={onClose}
        className='absolute sm:left-2 left-1 -translate-y-1/2 top-1/2 p-1 text-darker-black/50 hover:text-black transition'
        whileHover={{ scale: 1.1 }}>
        <TfiClose size={20} />
      </motion.button>

      {/* Input */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='rounded-full w-full sm:px-10 sm:py-3 py-2 px-5 sm:border-2 border-1 border-transparent focus:outline-none focus:border-black/70 placeholder-darker-black/40 transition-all duration-300 shadow-md'
        placeholder='جستجو کنید ...'
        required
        type='text'
        autoFocus
      />

      {/* Search Icon */}
      <motion.button
        type='submit'
        className='absolute sm:flex hidden right-3 -translate-y-1/2 top-1/2 p-1 text-darker-black/50 hover:text-black transition'
        whileHover={{ scale: 1.1 }}>
        <BiSearchAlt size={20} />
      </motion.button>
    </motion.form>
  );
}
