"use client";
import {
  MdLocalShipping,
  MdSupportAgent,
  MdDiscount,
  MdStorefront,
  MdVerified,
} from "react-icons/md";
import { motion } from "framer-motion";

const services = [
  {
    title: "تحویل سریع",
    description:
      "آراکس سفارشات شما را در کمترین زمان ممکن از طریق پیک یا پست ارسال می‌کند.",
    icon: MdLocalShipping,
  },
  {
    title: "پشتیبانی حرفه‌ای",
    description:
      "تیم پشتیبانی آراکس آماده پاسخگویی به سوالات و مشکلات شما در تمام ایام کاری است.",
    icon: MdSupportAgent,
  },
  {
    title: "تخفیف‌های همیشگی",
    description:
      "با جشنواره‌های فروش، کدهای تخفیف، اپلیکیشن و خبرنامه همیشه خریدی ارزان داشته باشید.",
    icon: MdDiscount,
  },
  {
    title: "فروشگاه اینترنتی کامل",
    description:
      "از پوشاک و لوازم آرایشی گرفته تا لوازم خانه، همه را یک‌جا در آراکس پیدا می‌کنید.",
    icon: MdStorefront,
  },
  {
    title: "اصالت کالا و ضمانت",
    description: "همه کالاها دارای تضمین اصالت، بازگشت وجه و کیفیت هستند.",
    icon: MdVerified,
  },
];

export default function About() {
  return (
    <div className='max-w-6xl mx-auto px-4 py-10 text-right space-y-10'>
      {/* درباره آراکس */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='rounded-xl shadow p-6 leading-7 text-darker-black/70'>
        <h2 className='text-2xl font-bold mb-4'>درباره فروشگاه آراکس</h2>
        <p>
          فروشگاه اینترنتی آراکس با هدف ارائه تجربه‌ای لذت‌بخش از خرید آنلاین،
          محصولات متنوعی را از برندهای معتبر در زمینه پوشاک، لوازم آرایشی، خانه
          و آشپزخانه، دیجیتال و سبک زندگی عرضه می‌کند. آراکس با تکیه بر تیم
          تخصصی، تحویل سریع، ضمانت اصالت کالا و تخفیف‌های جذاب توانسته اعتماد
          بسیاری از مشتریان را جلب کند.
        </p>
      </motion.div>

      {/* خدمات آراکس */}
      <div>
        <h3 className='text-xl font-semibold mb-6 text-darker-black/80'>
          خدمات ما
        </h3>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {services.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className='p-5 border border-dadarker-blackk/30 rounded-xl shadow hover:shadow-md transition'>
              <div className='flex items-center gap-3 mb-3'>
                <item.icon className='text-red w-6 h-6' />
                <h4 className='text-base font-semibold'>{item.title}</h4>
              </div>
              <p className='text-sm text-darker-black/50'>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
