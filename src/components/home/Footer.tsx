"use client";

import {
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";

export default function Footer() {
  return (
    <footer className='text-darker-black/60 mt-10'>
      <div className='max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm'>
        {/* درباره ما */}
        <div>
          <h4 className='font-bold text-base mb-4'>درباره ما</h4>
          <p className='leading-relaxed text-justify'>
            فروشگاه آراکس با ارائه‌ی مجموعه‌ای شیک از کیف، کفش، اکسسوری و پوشاک،
            همراه شما در انتخاب استایلی خاص و متفاوت است. با تضمین کیفیت و
            پشتیبانی حرفه‌ای در خدمت شما هستیم.
          </p>
        </div>

        {/* لینک‌های مهم */}
        <div>
          <h4 className='font-bold text-base mb-4'>لینک‌های مهم</h4>
          <ul className='space-y-2'>
            <li>
              <a href='#' className='hover:text-darker-black transition'>
                خانه
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-darker-black transition'>
                محصولات
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-darker-black transition'>
                سوالات متداول
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-darker-black transition'>
                تماس با ما
              </a>
            </li>
          </ul>
        </div>

        {/* اطلاعات تماس */}
        <div>
          <h4 className='font-bold text-base mb-4'>اطلاعات تماس</h4>
          <ul className='space-y-3'>
            <li className='flex items-center gap-2'>
              <FaPhoneAlt /> ۰۹۱۲xxx۹xxx
            </li>
            <li className='flex items-center gap-2'>
              <BiMailSend /> info@arax.com
            </li>
          </ul>
        </div>

        {/* شبکه‌های اجتماعی */}
        <div>
          <h4 className='font-bold text-base mb-4'>ما را دنبال کنید</h4>
          <div className='flex items-center gap-4 text-xl'>
            <a href='#' className='hover:text-[#E4405F]'>
              <FaInstagram />
            </a>
            <a href='#' className='hover:text-[#0088cc]'>
              <FaTelegramPlane />
            </a>
            <a href='#' className='hover:text-[#25D366]'>
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* کپی‌رایت */}
      <div className='text-center text-xs py-4 border-t border-darker-black/20 text-darker-black/70'>
        © {new Date().getFullYear()} کلیه حقوق این وب‌سایت متعلق به فروشگاه
        آراکس است.
      </div>
    </footer>
  );
}
