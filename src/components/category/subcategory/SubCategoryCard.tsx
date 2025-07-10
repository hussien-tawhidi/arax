"use client";
import { toPersianDigits } from "@/utils/priceConverter";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  discount?: number;
  image: string[];
  title: string;
  price: number;
  productCode: string;
}

export default function SubCategoryCard({
  discount,
  image,
  title,
  price,
  productCode,
}: Props) {
  const discountAmount = discount ? (price * discount) / 100 : 0;
  const finalPrice = price - discountAmount;
  const router = useRouter();
  return (
    <div
      className='rounded-lg cursor-pointer overflow-hidden shadow hover:shadow-md transition'
      onClick={() => router.push(`/products/${productCode}`)}>
      {/* ✅ Product Image */}
      <div className='relative w-full aspect-square'>
        {image?.[0] ? (
          <Image src={image[0]} alt={title} fill className='object-cover' />
        ) : (
          <div className='flex items-center justify-center h-full text-dark/50 bg-light'>
            No Image
          </div>
        )}
        {discount && (
          <span className='absolute top-0 left-0 bg-red text-light text-xs px-2 py-0.5 rounded-br-xl'>
            %{discount} تخفیف
          </span>
        )}
      </div>

      {/* ✅ Product Info */}
      <div className='mt-2 px-2 md:px-3 text-right'>
        <h3 className='text-sm font-semibold truncate text-dark/80'>{title}</h3>

        {discount ? (
          <>
            <p className='text-dark/50 line-through font-light sm:text-sm text-[10px]'>
              {toPersianDigits(price)} تومان
            </p>
            <p className='text-dark/70 font-semibold text-left'>
              {toPersianDigits(finalPrice)} تومان
            </p>
          </>
        ) : (
          <p className='text-dark/70 font-semibold text-left'>
            {toPersianDigits(price)} تومان
          </p>
        )}
      </div>
    </div>
  );
}
