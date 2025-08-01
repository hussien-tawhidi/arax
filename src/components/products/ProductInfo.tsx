"use client";

import { useState } from "react";
import { toPersianDigits } from "@/utils/priceConverter"; // یا هر تابع دلخواه برای تبدیل ارقام
import { ProductType } from "../../../types/productTypes";
import { GoStarFill } from "react-icons/go";
import Image from "next/image";
import AddToCartButton from "../ui/AddToCartButton";
import { PiShoppingBagThin } from "react-icons/pi";
import { content, features } from "./data";

interface ProductInfoProps {
  product: ProductType;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [size, setSize] = useState<string>("");

  return (
    <div className='flex-2/3 flex flex-col space-y-4'>
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
                size === s
                  ? "bg-darker-black/70 text-light"
                  : "bg-light text-darker-black/40"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <p className='md:text-2xl text-left flex flex-wrap justify-end items-center gap-4'>
        {/* Original Price */}
        <del className='text-darker-black/60 italic text-sm'>
          {toPersianDigits(product.price.toLocaleString("fa-IR"))} تومان
        </del>

        {/* Final Price */}
        <span className='font-bold text-black'>
          {toPersianDigits(
            (Math.round(product.price * product.discount) / 100).toLocaleString(
              "fa-IR"
            )
          )}{" "}
          تومان
        </span>

        {/* Discount Percent */}
        <span className='py-1 px-2 bg-red text-white rounded-md text-sm'>
          {toPersianDigits(product.discount)}٪ تخفیف
        </span>
      </p>
      <div className='text-sm text-darker-black/70'>
        <span className='font-medium'>موجودی: </span>
        {product.stock > 0 ? (
          <span className='text-green'>
            {toPersianDigits(product.stock.toString())} عدد
          </span>
        ) : (
          <span className='text-red'>ناموجود</span>
        )}
      </div>
      <div className='flex flex-col gap-3'>
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
      <AddToCartButton
        Icon={PiShoppingBagThin}
        _id={product._id}
        discountPrice={10}
        image={product.imageUrl}
        name={product.name}
        price={product.price}
        text='افزودن به سبد خرید'
        className='bg-red text-light w-full px-5 py-2 rounded-md flex items-center justify-center'
        color={[{ name: "black", hex: "#000" }]}
      />
      <div className='mt-5 py-3 text-darker-black/70 border-t border-darker-black/20'>
        <span className='text-red'>شرایط مرجوع کردن کالا:</span> درخواست مرجوع
        کردن کالا با دلیل انصراف از خرید تنها در صورتی مورد قبول است که کالا در
        شرایط اولیه باشد و در صورت پلمپ بودن ، کالا نباید باز شده باشد.
      </div>
      {/* Trust Info */}
      <div className='grid gap-2 mt-4 text-sm text-darker-black/70 sm:grid-cols-3'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='flex items-center gap-2 p-3 rounded-md border border-darker-black/20'>
            <span className={`${feature.color} text-xl`}>{feature.icon}</span>
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
