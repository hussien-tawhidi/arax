"use client";

import Image from "next/image";
import StepHeader from "../checkout/StepHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import OrderSummary from "./CartDetails";
import { useEffect, useState } from "react";
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "@/store/slice/cartSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();
  const dispatch = useDispatch();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const deliveryCost = "رایگان";
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handleSubmit = () => router.push("/checkout");

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <StepHeader step={1} />
      <h1 className='text-2xl font-bold mb-6 text-right'>سبد خرید</h1>

      {cartItems.length > 1 && (
        <button
          className='py-2 px-4 border border-red/50 mb-6 rounded text-red text-sm hover:bg-red/10 transition'
          onClick={() => dispatch(clearCart())}>
          حذف همه
        </button>
      )}

      <div className='flex flex-col md:flex-row gap-6'>
        {/* Left side - Cart Items */}
        <div className='flex-[2]'>
          {cartItems.length === 0 ? (
            <p className='text-center text-darker-black/50 text-sm'>
              سبد خرید شما خالی است.
            </p>
          ) : (
            <div className='space-y-6'>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className='flex items-center gap-4 border-b pb-4'>
                  <Image
                    src={item.image[0]}
                    alt={item.name}
                    width={80}
                    height={80}
                    className='rounded object-cover'
                  />
                  <div className='flex-1 w-full text-right'>
                    <h2 className='font-semibold'>{item.name}</h2>
                    <div className='flex flex-wrap items-center gap-3 mt-2 justify-between'>
                      <div className='flex items-center gap-2'>
                        <button
                          disabled={item.quantity <= 1}
                          className='bg-darker-black/20 px-2 py-1 rounded text-sm disabled:cursor-not-allowed'
                          onClick={() => dispatch(decreaseQty(item._id))}>
                          −
                        </button>
                        <span className='w-6 text-center'>{item.quantity}</span>
                        <button
                          className='bg-darker-black/20 px-2 py-1 rounded text-sm disabled:cursor-not-allowed'
                          onClick={() => dispatch(increaseQty(item._id))}>
                          +
                        </button>
                      </div>
                      <div className='flex justify-center items-end flex-col-reverse gap-3'>
                        <span className='text-darker-black/60 md:text-md text-sm'>
                          {item.price.toLocaleString()} تومان
                        </span>
                        <button
                          onClick={() => dispatch(removeFromCart(item._id))}
                          className='bg-red text-light hover:bg-transparent hover:text-red transition p-2 rounded'>
                          <RiDeleteBin6Line size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right side - Summary */}
        <div className='flex-[1]'>
          <OrderSummary
            totalPrice={totalPrice}
            deliveryCost={deliveryCost}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
