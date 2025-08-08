"use client";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, mostSearchedDummy } from "./data";
import Image from "next/image";

export default function SearchSuggestion() {
  return (
    <motion.div
      className='mt-5'
      initial='hidden'
      animate='visible'
      variants={containerVariants}>
      {/* Title */}
      <motion.h3
        variants={itemVariants}
        className='text-lg font-semibold text-darker-black/70 mb-3'>
        پربازدیدترین جستجوها
      </motion.h3>

      {/* Tags */}
      <motion.div variants={containerVariants} className=''>
        {mostSearchedDummy.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className='flex items-start gap-4 text-darker-black/80 px-4 py-2 text-sm transition mb-3 border-b border-darker-black/10 hover:bg-gray-50 rounded-md cursor-pointer'>
            <Image
              src={item.image}
              alt={item.title || "image"}
              width={80}
              height={80}
              className='object-cover rounded-md flex-shrink-0'
            />
            <div className='flex flex-col justify-center flex-grow'>
              <p className='text-base font-semibold text-darker-black/60 mb-1'>
                {item.title}
              </p>
              <p className='text-darker-black/50 text-sm'>{item.count} جستجو</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
