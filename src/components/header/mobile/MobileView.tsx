"use client";

import { menu } from "../data";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { LiaArrowLeftSolid } from "react-icons/lia";
import Link from "next/link";
import MobileImage from "./MobileImage";

export default function MobileView() {
  const router = useRouter();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className='flex flex-col gap-6 p-4'
      variants={container}
      initial='hidden'
      animate='show'>
      <div className='flex gap-2 items-end text-darker-black/70 text-2xl justify-center flex-col'>
        <Link href={"/"}>
          <LiaArrowLeftSolid className='' />
        </Link>
        <p className='font-semibold text-xl'>دسته‌بندی‌ها </p>
      </div>
      {menu.map((m, i) => (
        <motion.div
          key={i}
          variants={item}
          onClick={() => router.push(`/mobile-view/${m.category}`)}
          className='relative w-full h-36 rounded-2xl overflow-hidden shadow-xl cursor-pointer group'
          whileHover={{ scale: 0.98 }}
          whileTap={{ scale: 0.95 }}>
          {/* Banner Image with improved loading */}
          <MobileImage src={m.image} alt={m.title} priority={i < 3} />

          {/* Improved gradient overlay */}
          <div className='absolute inset-0 gradient-overlay pointer-events-none'></div>
          {/* Enhanced text container */}
          <div className='absolute bottom-0 left-0 right-0 p-5 text-light space-y-2'>
            <motion.h2
              className='text-xl md:text-2xl font-bold tracking-tight drop-shadow-lg'
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}>
              {m.title || "Untitled"}
            </motion.h2>

            <motion.p
              className='text-sm opacity-90 flex items-center gap-1'
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}>
              جزییات بیشتر
              <span className='inline-block transition-transform group-hover:translate-x-1'>
                <HiOutlineArrowNarrowRight />
              </span>
            </motion.p>
          </div>

          {/* Pulse effect on hover */}
          <div className='absolute inset-0 hidden group-hover:block animate-pulse opacity-10 bg-light pointer-events-none'></div>
        </motion.div>
      ))}
    </motion.div>
  );
}
