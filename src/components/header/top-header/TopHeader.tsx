"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Search from "../search/Search";
import { LuPhone } from "react-icons/lu";
import { useRouter } from "next/navigation";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";
import CardMenu from "./CardMenu";

export default function TopHeader() {
  const [search, setSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session } = useSession();
  // Close search on outside click
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
    <div className=''>
      <div className='flex justify-between items-center md:px-10 sm:p-3 p-2 border-b border-darker-black/10'>
        {/* right */}
        <div className='flex items-center gap-4'>
          <Image
            src='/arax-logo.png'
            alt='لوگوی فروشگاه'
            width={50}
            height={50}
            onClick={() => router.push("/")}
            className='md:h-12 h-10 w-auto object-cover cursor-pointer'
          />

          <button
            aria-label='جستجو'
            onClick={() => setSearch((prev) => !prev)}
            className='p-2 rounded border border-darker-black/20 transition hover:scale-105 active:scale-95 focus:outline-none'>
            <CiSearch className='md:text-2xl sm:text-xl text-darker-black/80' />
          </button>
        </div>

        {/* left */}
        <div className='md:flex hidden items-center gap-3'>
          <CardMenu />
          {!session ? (
            <button
              aria-label='سبد خرید'
              className='p-2 transition hover:scale-105 active:scale-95 rounded focus:outline-none'>
              ورود / ثبت‌نام
            </button>
          ) : (
            <UserMenu id={session?.user?.id} />
          )}
        </div>
        <button className='md:hidden flex border border-darker-black/30 rounded-2xl py-2 px-5 text-darker-black/60'>
          <p className='sm:text-sm text-[12px]'>تماس با تیم پشتیبانی</p>
          <LuPhone className='sm:text-2xl mr-3' />
        </button>
      </div>
      {/* Search dropdown */}
      {search && (
        <div ref={searchRef} className='0'>
          <Search onClose={() => setSearch((prev) => !prev)} />
        </div>
      )}
    </div>
  );
}
