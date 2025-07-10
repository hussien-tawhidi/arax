"use client";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { motion } from "framer-motion";

interface Section {
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    title: "چگونه تمام سال از آراکس تخفیف بگیریم؟",
    content: (
      <p>
        امکان خریدی با تخفیف اصولاً تجربه لذت بخشی برای همه است و همه ما به
        دنبال خریدهای هیجان‌انگیز با تخفیف‌های ویژه هستیم. خرید اینترنتی نیز
        زمانی که راحتی و آسایش با قیمت‌های ارزان همراه شود، تجربه‌ای شیرین برای
        مشتریان خواهد بود. اما همیشه پیدا کردن کد تخفیف کار ساده‌ای نیست.
        <br />
        معمولاً دو روش اصلی برای دریافت کوپن تخفیف وجود دارد: از طریق خبرنامه یا
        نوتیفیکیشن اپ‌ها. اما در آراکس روش‌های دیگری هم وجود دارد که در ادامه
        معرفی می‌کنیم.
      </p>
    ),
  },
  {
    title: "تخفیف خرید اول",
    content: (
      <p>
        به تمام مشتریانی که اولین بار حساب کاربری ایجاد کرده و اولین خرید خود را
        انجام دهند، کد تخفیف تعلق می‌گیرد.
      </p>
    ),
  },
  {
    title: "دریافت کد تخفیف با عضویت در خبرنامه",
    content: (
      <p>
        ارسال این کد تخفیف در حال حاضر غیرفعال است. به‌محض فعال شدن از طریق سایت
        اطلاع‌رسانی خواهد شد.
      </p>
    ),
  },
  {
    title: "کد تخفیف از طریق نصب اپلیکیشن",
    content: (
      <p>
        با نصب اپلیکیشن آراکس روی سیستم‌عامل‌های iOS و Android می‌توانید از کد
        تخفیف بهره‌مند شوید.
      </p>
    ),
  },
  {
    title: "دریافت کد تخفیف از طریق اینستاگرام",
    content: (
      <p>
        جشنواره‌های فروش، کدهای تخفیف، جوایز و … از طریق پست و استوری در
        اینستاگرام آراکس اطلاع‌رسانی می‌شود. برای اطلاع از این تخفیف‌ها پیج{" "}
        <strong>@arax</strong> را دنبال کنید.
      </p>
    ),
  },
  {
    title: "شرایط استفاده از کدهای تخفیف",
    content: (
      <ul className='list-disc pr-6 space-y-1'>
        <li>دو کد تخفیف هم‌زمان قابل استفاده نیستند.</li>
        <li>امکان دریافت مبلغ ریالی تخفیف وجود ندارد.</li>
        <li>
          کدهای مناسبتی فقط در بازه زمانی مشخص معتبر هستند و تمدید نمی‌شوند.
        </li>
        <li>
          کدهای دریافتی از اپ یا پیامک فقط برای همان حساب کاربری (شماره تلفن)
          معتبر هستند.
        </li>
      </ul>
    ),
  },
];

function Accordion({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className='border border-darker-black/10 rounded-xl p-4'>
      <summary
        onClick={() => setOpen(!open)}
        className='cursor-pointer flex items-center justify-between font-medium text-right'>
        <span>{title}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}>
          <MdKeyboardArrowDown className='w-5 h-5' />
        </motion.span>
      </summary>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className='pt-4 text-sm text-darker-black/60 leading-7'>
          {content}
        </motion.div>
      )}
    </div>
  );
}

export default function DiscountGuide() {
  return (
    <div className='space-y-4 md:mt-20 mt-10'>
      {sections.map((sec, i) => (
        <Accordion key={i} title={sec.title} content={sec.content} />
      ))}
    </div>
  );
}
