"use client";

import { useRouter } from "next/navigation";
import { BiHomeSmile } from "react-icons/bi";
import { RiMenuSearchLine, RiUser3Line } from "react-icons/ri";
import { TfiShoppingCartFull } from "react-icons/tfi";

export default function MobileHeader() {
  const router = useRouter();
  return (
    <div className='fixed z-30 bottom-0 left-0 right-0 bg-light'>
      <ul className='flex justify-between sm:w-[90%] w-[95%] mx-auto sm:py-5 py-3 border-t border-darker-black/30'>
        <li
          className='flex-1 flex items-center text-sm flex-col sm:text-xl text-darker-black/60 gap-1.5'
          onClick={() => router.push("/user")}>
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
          onClick={() => router.push("/")}
          className='flex-1 flex items-center flex-col text-sm sm:text-xl text-darker-black/60 gap-1.5'>
          <TfiShoppingCartFull className='text-[30px]' />
          <p>سبد خرید</p>
        </li>
      </ul>
    </div>
  );
}
