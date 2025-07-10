"use client";

import { useState } from "react";
import { toPersianDigits } from "@/utils/priceConverter"; // یا هر تابع دلخواه برای تبدیل ارقام
import { ProductType } from "../../../types/productTypes";
import { GoStarFill } from "react-icons/go";
import Image from "next/image";

interface ProductInfoProps {
  product: ProductType;
}

const content = [
  { image: "/images/icon/size-guid.png", title: "راهنمای سایز" },
  { image: "/arax-logo.png", title: "250 امتیاز با خرید ای محصول" },
  { image: "/images/icon/part.png", title: "پرداخت در 4 قسط" },
  { image: "/images/icon/loved.png", title: "افزدودن به لیست خرید ها" },
];

export default function ProductInfo({ product }: ProductInfoProps) {
  const [size, setSize] = useState<string>("");

  return (
    <div className='flex-1 flex flex-col space-y-4'>
      {/* Title */}
      <h1 className='md:text-xl text-darker-black/70'>
        {product.name} کد محصول: {product.productCode}
      </h1>

      {/* Product Code */}
      <div className='flex items-center gap-1 text-sm text-darker-black/60 border-t border-darker-black/10 py-5'>
        <span className='text-darker-black'>
          نظرات ({product.reviews?.length || 0})
        </span>
        {product.reviews && product.reviews.length > 0 && (
          <>
            <span className='mx-1'>|</span>
            <span className='flex items-center gap-1.5'>
              میانگین امتیاز:{" "}
              {(
                product.reviews.reduce((sum, r) => sum + r.rating, 0) /
                product.reviews.length
              ).toFixed(1)}
              <GoStarFill className='text-[#f7932e]' />
            </span>
          </>
        )}
      </div>

      {/* Sizes */}
      <div className='flex items-center gap-2 py-5 border-t border-darker-black/20'>
        <label className='text-darker-black/60 font-medium'>انتخاب سایز:</label>
        <div className='flex gap-2 flex-wrap'>
          {product.sizesAvailable.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-2 py-0.5 border border-darker-black/30 rounded-md cursor-pointer transition ${
                size === s ? "bg-darker-black/70 text-light" : "bg-light text-darker-black/40"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <p className='md:text-2xl text-left md:py-5'>
        {toPersianDigits(product.price.toLocaleString("fa-IR"))} تومان
      </p>

      <div className='flex flex-col gap-3 md:mt-10 pt-5'>
        {content.map((item, index) => (
          <div className='flex items-center md:gap-3 gap-1.5' key={index}>
            <Image
              src={item.image}
              width={30}
              height={30}
              className='object-cover'
              alt=''
            />
            <p className='md:text-md text-sm'>{item.title}</p>
          </div>
        ))}
      </div>
      {/* Action Buttons */}
      <button
        disabled={!size}
        className={`${
          !size
            ? "bg-light text-red border-red border pointer-events-none"
            : "bg-red text-light hover:bg-red/80"
        }  py-3 rounded  mr-auto md:w-[50%] w-[100%]  transition justify-self-start`}>
        افزودن به سبد خرید
      </button>
      <div className='mt-5 py-3 text-darker-black/70 border-t border-darker-black/20'>
        <span className='text-red'>شرایط مرجوع کردن کالا:</span> درخواست مرجوع
        کردن کالا با دلیل انصراف از خرید تنها در صورتی مورد قبول است که کالا در
        شرایط اولیه باشد و در صورت پلمپ بودن ، کالا نباید باز شده باشد.
      </div>
      {/* Trust Info */}
      <div className='text-gray-600 text-sm space-y-1 mt-4'>
        <p>💯 ضمانت اصالت کالا</p>
        <p>🚚 ارسال رایگان برای سفارش‌های بالای ۸۰۰٬۰۰۰ تومان</p>
        <p>↩️ ۷ روز ضمانت بازگشت</p>
      </div>
    </div>
  );
}
