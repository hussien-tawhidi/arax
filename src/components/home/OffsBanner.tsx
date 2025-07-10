import Image from "next/image";
import React from "react";

export default function OffsBanner() {
  return (
    <div className='md:py-16 py-10 relative overflow-hidden group'>
      <span className='pointer-events-none absolute -top-[5rem] bottom-0 right-0 opacity-0 -translate-x-[70rem] rotate-30 group-hover:translate-x-[100px] duration-500 transition-all group-hover:opacity-100 left-0 w-[60px] h-[200%] bg-gradient-to-r from-transparent to-white'></span>
      <div className='md:flex hidden'>
        <Image
          src={"/images/offer-banner.jpg"}
          alt='محصولات'
          width={2000}
          height={400}
          className='object-cover rounded-2xl'
        />
      </div>
      <div className='md:hidden flex'>
        <Image
          src={"/images/offer-banner-sm.jpg"}
          alt='محصولات'
          width={2000}
          height={500}
          className='object-cover'
        />
      </div>
    </div>
  );
}
