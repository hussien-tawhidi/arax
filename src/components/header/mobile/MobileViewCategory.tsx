"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GrView } from "react-icons/gr";

interface MenuItemTypes {
  image: string;
  title: string;
  category?: string;
  subcategory?: string;
}

export default function MobileViewCategory({
  image,
  title,
  category,
  subcategory,
}: MenuItemTypes) {
  const router = useRouter();

  const handleClick = () => {
    if (category && subcategory) {
      router.push(`/${category}/${subcategory}`);
    }
  };

  return (
    <motion.div
      className='relative w-full aspect-square rounded-xl overflow-hidden shadow-md cursor-pointer'
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}>
      {/* Background Image with improved loading */}
      <Image
        src={image || "/placeholder.jpg"}
        alt={title || "Category"}
        fill
        sizes='(max-width: 768px) 100vw, 50vw'
        className='object-cover transition-transform duration-500 hover:scale-105'
        quality={85}
        priority
        placeholder='blur'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      />

      {/* Gradient overlay for better text visibility */}
      <div className='absolute inset-0 bg-gradient-to-t from-darker-black/60 via-darker-black/20 to-transparent' />

      {/* Category title with better styling */}
      <div className='absolute bottom-4 left-4 right-4'>
        <motion.p
          className='text-light text-lg font-bold drop-shadow-lg px-3 py-2 bg-darker-black/30 backdrop-blur-sm rounded-lg'
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}>
          {title}
        </motion.p>
      </div>

      {/* Interactive indicator */}
      <div className='absolute top-3 right-3 bg-light/90 text-darker-black text-xs font-medium px-2 py-1 rounded-full shadow-sm'>
        <GrView />
      </div>
    </motion.div>
  );
}
