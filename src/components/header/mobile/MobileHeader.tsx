"use client";

import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiHomeSmile } from "react-icons/bi";
import { RiMenuSearchLine, RiSearchLine, RiUser3Line } from "react-icons/ri";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Search from "../search/Search";

export default function MobileHeader() {
  const { data: session } = useSession();
  const [search, setSearch] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearch(false);
      }
    }
    if (search) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [search]);
  return (
    <div className='fixed z-[999] bottom-0 left-0 right-0 gradient-overlay-mobile-menu'>
      {/* Background bar */}

      <ul className='flex justify-between sm:w-[90%] w-[95%] mx-auto py-3 relative'>
        <li
          className='flex-1 flex items-center text-sm flex-col sm:text-xl text-darker-black/90 gap-1.5'
          onClick={() =>
            router.push(`/user/${session ? session.user?.id : "login"}`)
          }>
          <RiUser3Line className='sm:text-[30px] text-[24px]' />
          <p>اراکس من</p>
        </li>

        <li
          className='flex-1 flex items-center text-sm flex-col sm:text-xl text-darker-black/90 gap-1.5'
          onClick={() => router.push("/mobile-view")}>
          <RiMenuSearchLine className='sm:text-[30px] text-[24px]' />
          <p>دسته‌بندی‌ها</p>
        </li>

        {/* Spacer for floating button */}
        <li className='flex-1'></li>

        <li
          onClick={() => router.push("/")}
          className='flex-1 flex items-center text-sm flex-col sm:text-xl text-darker-black/90 gap-1.5'>
          <BiHomeSmile className='sm:text-[30px] text-[24px]' />
          <p>خانه</p>
        </li>

        <li
          onClick={() => router.push("/cart")}
          className='flex-1 flex items-center relative flex-col text-sm sm:text-xl text-darker-black/90 gap-1.5'>
          <TfiShoppingCartFull className='sm:text-[30px] text-[24px]' />
          {mounted && (
            <span className='absolute -top-2 right-3 bg-darker-black sm:w-8 w-6 sm:h-8 h-6 rounded-full flex items-center justify-center text-light'>
              {cartItems.length}
            </span>
          )}
          <p>سبد خرید</p>
        </li>
      </ul>

      {search && (
        <div ref={searchRef} className='0'>
          <Search onClose={() => setSearch((prev) => !prev)} />
        </div>
      )}
      {/* Floating Search Button */}
      <div className='absolute -top-2 left-1/2 transform -translate-x-1/2'>
        <button
          onClick={() => setSearch((prev) => !prev)}
          className='bg-red text-light rounded-full sm:p-4 p-2.5 shadow-lg'>
          <RiSearchLine className='sm:text-[35px] text-[30px]' />
        </button>
      </div>
    </div>
  );
}
