"use client";

import Image from "next/image";
import Link from "next/link";

interface MenuItem {
  image?: string;
  title: string;
  category?: string;
}

interface Props {
  data?: MenuItem[];
}

export default function Menu({ data }: Props) {
  return (
    <div className='flex items-center lg:pt-32 pt-16 relative'>
      {/* Left fade */}
      <div className='pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-light to-transparent z-10' />

      <ul
        className='hide-scrollbar w-full flex md:gap-10 gap-5 justify-start overflow-x-auto whitespace-nowrap px-4 scroll-smooth snap-x snap-mandatory touch-pan-x'
        style={{
          WebkitOverflowScrolling: "touch", // iOS smooth scroll
          scrollBehavior: "smooth",
        }}>
        {data?.map((item, index) => (
          <li
            key={index}
            className='flex-shrink-0 flex flex-col items-center rounded-full text-center group snap-start'>
            <Link
              href={`/${item.category}`}
              className='relative w-16 h-16 sm:w-22 sm:h-22 md:w-22 md:h-22 rounded-full shadow-xl transform transition-transform duration-200 hover:scale-105 active:scale-95'>
              <Image
                src={item.image || "/placeholder.jpg"}
                alt={item.title}
                fill
                className='object-cover z-20 rounded-full border-2 bg-light border-light overflow-hidden group-hover:shadow-xl transition-all duration-200'
              />
              <div className='absolute inset-0 bg-red z-10 rounded-full group-hover:opacity-0 transition-all duration-200' />
            </Link>
            <p className='mt-2 text-center w-full sm:text-[14px] text-[12px] text-wrap font-medium text-darker-black/70'>
              {item.title}
            </p>
          </li>
        ))}
      </ul>

      {/* Right fade */}
      <div className='pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-light to-transparent z-10' />
    </div>
  );
}
