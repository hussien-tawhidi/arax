"use client";

import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { removeFromFavorites } from "@/store/slice/cartSlice";
import { useEffect, useState } from "react";

export default function Favourites() {
  const [hasMounted, setHasMounted] = useState(false);
  const dispath = useDispatch();

  useEffect(() => {
    setHasMounted(true);
  }, []);
  const favoriteItems = useSelector((state: RootState) => state.cart.favorites);
  if (!hasMounted) return null; // Prevent mismatched SSR/CSR

  if (!favoriteItems?.length) {
    return (
      <div className='text-center py-20'>
        <h2 className='text-xl font-semibold'>
          هیچ محصولی در علاقه‌مندی‌ها نیست
        </h2>
        <p className='text-gray-500 mt-2'>
          محصولاتی که دوست دارید را به علاقه‌مندی‌ها اضافه کنید.
        </p>
        <Link
          href='/'
          className='mt-4 inline-block bg-red text-light px-4 py-2 rounded hover:bg-red/90'>
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div className='p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {favoriteItems.map((item) => (
        <div
          key={item._id}
          className='group relative rounded-2xl p-4 hover:shadow-lg border border-darker-black/20 transition-all duration-300 flex flex-col justify-between'>
          <div className='relative w-full overflow-hidden rounded-xl'>
            <Image
              src={item.image[0]}
              alt={item.name}
              width={300}
              height={300}
              className='object-cover group-hover:scale-105 transition-transform duration-300'
            />
          </div>

          <div className='mt-4 flex flex-col gap-1 text-right'>
            <h3 className='font-semibold text-lg text-darker-black/80 line-clamp-2'>
              {item.name}
            </h3>
            <p className='mt-1 font-bold text-red'>
              {item.price.toLocaleString()} تومان
            </p>
          </div>

          <div className='mt-4 flex justify-between items-center'>
            <Link
              href={`/product/${item.productCode}`}
              className='text-sm text-red hover:text-red/90 transition'>
              مشاهده محصول
            </Link>

            {/* Optional Remove Button */}
            <button
              onClick={() => dispath(removeFromFavorites(item._id))}
              className='text-xs px-3 py-1 rounded-full bg-darker-black/5 hover:bg-darker-black/20 text-darker-black/60'
              title='حذف از علاقه‌مندی‌ها'>
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
