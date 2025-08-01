"use client";

import { toPersianDigits } from "@/utils/priceConverter";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface cardType {
  imageUrl: string[];
  price: number;
  discount: number;
  productCode: string;
}

interface props {
  data: cardType[];
  loading?: boolean;
}

export default function TopSelectedProductsRow({ data, loading }: props) {
  const router = useRouter();

  // Number of skeleton items to show
  const skeletonCount = 6;

  return (
    <div className='flex items-center'>
      <ul className='hide-scrollbar w-full flex justify-between mx-auto overflow-x-auto whitespace-nowrap'>
        {loading
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <li
                key={index}
                className='flex-shrink-0 relative text-center border-[0.1px] border-darker-black/5 p-3 w-[202.8px] animate-pulse'>
                <div className='relative'>
                  <div className='bg-darker-black/50 rounded-lg w-[70%] mx-auto h-[150px]' />
                </div>
                <span className='absolute top-0 left-0 w-10 h-6 bg-darker-black/50 rounded-br-xl' />
                <div className='mt-3 space-y-2'>
                  <div className='h-4 bg-darker-black/50 rounded w-[80%] mx-auto' />
                  <div className='h-4 bg-darker-black/50 rounded w-[60%] mx-auto' />
                </div>
              </li>
            ))
          : data.map((item, index) => {
              const discountAmount = (item.price * item.discount) / 100;
              const finalPrice = item.price - discountAmount;
              return (
                <li
                  key={index}
                  className='flex-shrink-0 relative text-center group border-[0.1px] border-darker-black/5 p-3 w-[202.8px]'>
                  <div className='relative'>
                    <Image
                      src={item.imageUrl[0]}
                      alt={"some text for alt"}
                      onClick={() =>
                        router.push(`/products/${item.productCode}`)
                      }
                      width={300}
                      height={300}
                      className='object-cover w-[70%] mx-auto cursor-pointer'
                    />
                  </div>
                  <span className='absolute top-0 left-0 text-sm bg-red text-light p-1.5 rounded-br-xl'>
                    {toPersianDigits(item.discount.toLocaleString("fa-IR"))}%
                  </span>
                  <div className='mt-3'>
                    <p className='line-through text-darker-black/30 italic text-right'>
                      {toPersianDigits(item.price.toLocaleString("fa-IR"))}
                    </p>
                    <p className='text-left font-semibold text-darker-black/70'>
                      {toPersianDigits(finalPrice.toLocaleString("fa-IR"))}
                    </p>
                  </div>
                </li>
              );
            })}
      </ul>
    </div>
  );
}
