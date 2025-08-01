"use client";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdAccessTime,
  MdSend,
} from "react-icons/md";
import { motion } from "framer-motion";
import { toPersianDigits } from "@/utils/priceConverter";

export default function ContactDetails() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='shadow rounded-xl p-5 text-sm sm:text-base leading-7 space-y-6'>
      <h2 className='text-lg font-bold border-b pb-2'>ارتباط با آراکس</h2>

      <div className='space-y-2 text-darker-black/70'>
        <div className='flex items-center gap-2'>
          <MdPhone className='text-red w-5 h-5' />
          <span>{toPersianDigits("021-3456789")}</span>
        </div>

        <div className='flex items-center gap-2'>
          <MdEmail className='text-red w-5 h-5' />
          <span>support@arax.com</span>
        </div>

        <div className='flex items-start gap-2'>
          <MdLocationOn className='text-red w-5 h-5 mt-1' />
          <span>
            تهران، کیلومتر ۸ جاده مخصوص کرج، بعد از تقاطع اتوبان آزادگان، خیابان
            شانزدهم
          </span>
        </div>

        <div className='flex items-start gap-2'>
          <MdAccessTime className='text-red w-5 h-5 mt-1' />
          <div>
            <p>شنبه تا چهارشنبه: ۸:۰۰ الی ۱۸:۰۰</p>
            <p>پنج‌شنبه‌ها: ۸:۰۰ الی ۱۶:۰۰</p>
          </div>
        </div>
      </div>

      {/* دکمه ارسال پیام */}
      <button className='flex items-center justify-center gap-2 bg-red text-light px-4 py-2 rounded-lg transition'>
        <MdSend className='w-5 h-5' />
        ارسال پیام به پشتیبانی
      </button>

      {/* نقشه گوگل */}
      <div className='rounded-xl overflow-hidden shadow mt-6'>
        <iframe
          title='modiseh location'
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.206746302773!2d51.248343714738396!3d35.69394798019156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e06679c0e8db5%3A0x769bd8a7a57a44e3!2sModiseh!5e0!3m2!1sen!2s!4v1719498760000'
          width='100%'
          height='300'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'></iframe>
      </div>
    </motion.div>
  );
}
