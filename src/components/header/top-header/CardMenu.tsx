"use client";

import { RootState } from "@/store/store";
import { PiShoppingCartSimple } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toPersianDigits } from "@/utils/priceConverter";
import Image from "next/image";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "@/store/slice/cartSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function CardMenu() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // 💥 prevents hydration mismatch

  return (
    <div
      className='relative'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}>
      {/* Cart Items Popover */}
      {isHovering && (
        <div className='absolute left-0 top-4 z-50 w-[400px] bg-light shadow-lg rounded-lg border border-darker-black/20 overflow-hidden animate-fadeIn'>
          {cartItems.length > 0 ? (
            <>
              <div
                className='p-3 font-medium text-light text-center bg-red/90 hover:bg-red transition-all cursor-pointer'
                onClick={() => router.push("/cart")}>
                مشاهده سبد خرید
              </div>
              <div className='p-3 font-medium flex justify-between text-darker-black text-center bg-darker-black/5 cursor-pointer'>
                <span> مجموع: </span>
                {cartItems
                  .reduce(
                    (total, item) => total + item.price * (item.quantity || 1),
                    0
                  )
                  .toLocaleString("fa-IR")}{" "}
                تومان
              </div>

              <div className='max-h-60 overflow-y-auto w-full scrollbar-thin'>
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className='p-3 border-b flex gap-x-3 w-full border-darker-black/10 last:border-0 hover:bg-darker-black/5'>
                    <div
                      className='flex-shrink-0 w-12 h-12 relative'
                      onClick={() =>
                        router.push(`/products/${item.productCode}`)
                      }>
                      <Image
                        src={item.image[0] || "/images/placeholder.png"}
                        alt={item.name}
                        fill
                        className='object-cover rounded'
                      />
                    </div>
                    <div className='flex-1'>
                      <p className='flex justify-between text-sm font-medium'>
                        <span className='truncate'>{item.name}</span>
                      </p>
                      {item.price && (
                        <p className='text-[10px] text-darker-black/50 mt-1'>
                          تومان{" "}
                          {toPersianDigits(item.price.toLocaleString("fa-IR"))}
                        </p>
                      )}
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                      <div className='border border-darker-black/20 rounded-md'>
                        <button
                          onClick={() => dispatch(decreaseQty(item._id))}
                          className='px-2 py-1 rounded text-sm'>
                          -
                        </button>
                        <span className='text-sm'>{item.quantity}</span>
                        <button
                          onClick={() => dispatch(increaseQty(item._id))}
                          className='px-2 py-1 rounded text-sm'>
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className='text-red'>
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className='text-center max-h-60 text-darker-black/70 p-6 text-sm'>
              🛒 سبد خرید شما خالی است
            </div>
          )}
        </div>
      )}

      {/* Cart Icon */}
      <div className='relative inline-block'>
        {cartItems.length > 0 && (
          <span className='absolute top-0 right-0 bg-red text-light text-[10px] rounded-full h-4 w-4 flex items-center justify-center'>
            {cartItems.length}
          </span>
        )}

        <button
          aria-label='سبد خرید'
          className='p-2 transition hover:scale-105 active:scale-95 rounded-full focus:outline-none hover:bg-darker-black/10'>
          <PiShoppingCartSimple className='text-2xl text-darker-black/80' />
        </button>
      </div>
    </div>
  );
}
