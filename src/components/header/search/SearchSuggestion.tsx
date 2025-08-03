"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, mostSearchedDummy } from "./data";



export default function SearchSuggestion() {
  return (
    <motion.div
      className='mt-5'
      initial='hidden'
      animate='visible'
      variants={containerVariants}>
      {/* Banner */}
      <motion.div variants={itemVariants} className='mb-4'>
        <Image
          src='/images/search/banner.jpg'
          alt='search banner'
          width={2000}
          height={490}
          className='object-cover rounded-xl'
        />
      </motion.div>

      {/* Title */}
      <motion.h3 variants={itemVariants} className='text-lg font-semibold mb-3'>
        پربازدیدترین جستجوها
      </motion.h3>

      {/* Tags */}
      <motion.div variants={containerVariants} className='flex flex-wrap gap-2'>
        {mostSearchedDummy.map((item, index) => (
          <motion.button
            key={index}
            variants={itemVariants}
            className='bg-darker-black/5 hover:bg-darker-black/30 text-darker-black/80 px-4 py-1 rounded-full text-sm transition shadow-sm'>
            {item.term}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
