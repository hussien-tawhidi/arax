"use client";

import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiHomeSmile } from "react-icons/bi";
import { RiMenuSearchLine, RiUser3Line } from "react-icons/ri";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function MobileHeader() {
  const { data: session } = useSession();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className='fixed z-30 bottom-0 left-0 right-0 bg-light'>
      <ul className='flex justify-between sm:w-[90%] w-[95%] mx-auto sm:py-5 py-3 border-t border-darker-black/30'>
        <li
          className='flex-1 flex items-center text-sm flex-col sm:text-xl text-darker-black/60 gap-1.5'
          onClick={() =>
            router.push(`/user/${session ? session.user?.id : "login"}`)
          }>
          <RiUser3Line className='text-[30px]' />
          <p>اراکس من</p>
        </li>

        <li
          className='flex-1 flex items-center text-sm flex-col sm:text-xl text-darker-black/60 gap-1.5'
          onClick={() => router.push("/mobile-view")}>
          <RiMenuSearchLine className='text-[30px]' />
          <p>دسته‌بندی‌ها</p>
        </li>

        <li
          onClick={() => router.push("/")}
          className='flex-1 flex items-center text-sm flex-col sm:text-xl text-darker-black/60 gap-1.5'>
          <BiHomeSmile className='text-[30px]' />
          <p>خانه</p>
        </li>

        <li
          onClick={() => router.push("/cart")}
          className='flex-1 flex items-center relative flex-col text-sm sm:text-xl text-darker-black/60 gap-1.5'>
          <TfiShoppingCartFull className='text-[30px]' />
          {mounted && (
            <span className='absolute -top-2 -right-0 bg-darker-black w-8 rounded-full flex items-center justify-center h-8 text-light'>
              {cartItems.length}
            </span>
          )}
          <p>سبد خرید</p>
        </li>
      </ul>
    </div>
  );
}
