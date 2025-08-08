"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { sidebarItems } from "./data";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaSignOutAlt,
  FaUserCog,
  FaUserCircle,
} from "react-icons/fa";
import { useToast } from "@/components/ToastContext";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const adminProfile = {
    name: "حسین توحیدی",
    role: "مدیر کل",
    avatar: "/avatar.png", // fallback if no image
  };

  const { addToast } = useToast();

  const handleLogout = () => {
    signOut();
    addToast("شما از سیستم خارج شدید");
  };

  return (
    <div className='sticky top-0 right-0 left-0 '>
      <div className='w-64 h-screen p-4 shadow-lg text-right flex flex-col justify-between'>
        {/* Top: Admin Profile */}
        <div className='flex flex-col justify-between'>
          {/* Sidebar Navigation */}
          <div className='flex flex-col pb-3 border-b border-darker-black/70/30'>
            {adminProfile.avatar ? (
              <Image
                width={100}
                height={100}
                src={adminProfile.avatar}
                alt='Admin Avatar'
                className='w-16 h-16 rounded-full object-cover border-2 border-darker-black/70/30 shadow'
              />
            ) : (
              <div className='w-16 h-16 rounded-full bg-darker-black/70 flex items-center text-4xl text-darker-black shadow'>
                <FaUserCircle />
              </div>
            )}

            <div className='mt-3'>
              <h3 className='font-semibold text-base'>{adminProfile.name}</h3>
              <p className='text-xs text-darker-black/50'>
                {adminProfile.role}
              </p>
            </div>

            {/* Dropdown Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className='mt-2 text-sm  transition-all flex items-center gap-1'>
              گزینه‌ها
              <FaChevronDown
                className={`transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Items */}
            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className='mt-2 w-full text-sm text-darker-black space-y-2'>
                  <li
                    className='cursor-pointer transition flex items-center gap-2'
                    onClick={() => router.push("/admin/profile")}>
                    <FaUserCog /> پروفایل
                  </li>
                  <li
                    className='cursor-pointer transition flex items-center gap-2'
                    onClick={() => router.push("/admin/settings")}>
                    <FaUserCog /> تنظیمات
                  </li>
                  <li
                    className='cursor-pointer hover:text-red-400 transition flex items-center gap-2'
                    onClick={handleLogout}>
                    <FaSignOutAlt /> خروج
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          <div className='h-full mt-10'>
            <h2 className='text-xl font-bold mb-6'>منوی مدیریت</h2>
            <ul className='space-y-5'>
              {sidebarItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => router.push(item.href)}
                  className='flex items-center text-darker-black/60 justify-start gap-2 cursor-pointer transition-all duration-200'>
                  <span className='text-lg'>{item.icon && <item.icon />}</span>
                  <span className='font-light'>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Optional Bottom Info */}
        <div className='text-xs text-darker-black/40 text-center pt-6 border-t border-white/10'>
          نسخه پنل ۱.۰.۰
        </div>
      </div>
    </div>
  );
}
