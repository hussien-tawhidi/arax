"use client";

import Image from "next/image";
import StepHeader from "../checkout/StepHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import OrderSummary from "./OrderSummary";
import { useEffect, useState } from "react";
import { decreaseQty, increaseQty } from "@/store/slice/cartSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const discountAmount = applied ? 50000 : 0; // Example logic, adjust as needed

  const router = useRouter();
  const dispatch = useDispatch();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // avoid hydration issues by only rendering on client
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // wait until after client-side mount

  const deliveryCost = "رایگان";
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const handleSubmit = () => {
    router.push("/checkout");
  };
  return (
    <div className='w-[90%] mx-auto px-4 py-8'>
      <StepHeader step={1} />
      <h1 className='text-2xl font-bold mb-6 text-right'>سبد خرید</h1>
      <div className='flex md:flex-row flex-col md:gap-5 gap-3'>
        <div className='flex-2/3'>
          {cartItems.length === 0 ? (
            <p className='text-center text-gray-500'>سبد خرید شما خالی است.</p>
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
                    className='rounded'
                  />
                  <div className='flex-1'>
                    <h2 className='font-semibold text-right'>{item.name}</h2>
                    <div className='flex items-center gap-4 mt-2'>
                      <button
                        className='bg-gray-200 px-2 rounded'
                        onClick={() => dispatch(decreaseQty(item._id))}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className='bg-gray-200 px-2 rounded'
                        onClick={() => dispatch(increaseQty(item._id))}>
                        +
                      </button>
                      <span className='ml-auto text-gray-600'>
                        {item.price.toLocaleString()} تومان
                      </span>
                      <button
                        // onClick={() => handleRemove(item.id)}
                        className='text-red hover:underline text-sm'>
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='space-y-4 flex-1/3'>
          <OrderSummary
            loading={false}
            code={code}
            setCode={setCode}
            applied={applied}
            setApplied={setApplied}
            discountAmount={discountAmount}
            totalPrice={totalPrice}
            deliveryCost={deliveryCost}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
