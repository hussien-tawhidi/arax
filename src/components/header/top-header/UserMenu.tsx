"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiUser, BiLogOut, BiHeart, BiPackage, BiWallet } from "react-icons/bi";
import { FaCoins } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function UserMenu({ id }: { id?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div
      className='relative'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}>
      <button
        className='text-darker-black/80 px-4 py-1 rounded hover:scale-105 transition-all'
        aria-label='ورود یا ثبت‌نام'>
        <BiUser className='text-2xl' />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className='absolute left-0 mt-4 top-0 w-64 bg-light shadow-xl rounded-xl p-4 z-50 text-sm'>
            <p className='text-darker-black/60 mb-2 text-[12px]'>کاربر عزیز</p>
            <ul className='space-y-2 text-darker-black/60 '>
              <li
                className='flex items-center gap-2 hover:bg-darker-black/5 p-2 rounded cursor-pointer'
                onClick={() => router.push(`/user/${id}`)}>
                <BiUser /> حساب کاربری مشتری
              </li>
              <li
                className='flex items-center gap-2 hover:bg-darker-black/5 p-2 rounded cursor-pointer'
                onClick={() => router.push(`/user/${id}`)}>
                <BiPackage /> سفارش‌ها
              </li>
              <li
                className='flex items-center gap-2 hover:bg-darker-black/5 p-2 rounded cursor-pointer'
                onClick={() => router.push(`/user/${id}/bank-info`)}>
                <BiWallet /> اعتبار کیف پول
              </li>
              <li
                className='flex items-center gap-2 hover:bg-darker-black/5 p-2 rounded cursor-pointer'
                onClick={() => router.push(`/user/${id}/arax-city`)}>
                <FaCoins className='text-red' /> شهر آراکس
              </li>
              <li
                className='flex items-center gap-2 hover:bg-darker-black/5 p-2 rounded cursor-pointer'
                onClick={() => router.push(`/user/${id}/wishlist`)}>
                <BiHeart /> لیست علاقه‌مندی‌ها
              </li>
              <li
                className='flex items-center gap-2 hover:bg-red hover:text-light p-2 rounded cursor-pointer text-red border-t pt-2 mt-2'
                onClick={() => signOut()}>
                <BiLogOut /> خروج از حساب کاربری
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
