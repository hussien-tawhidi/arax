"use client";

import Image from "next/image";
import Link from "next/link";

interface MenuItem {
  image?: string;
  title: string;
  category?: string;
  subcategory?: string;
}

export default function CategoryMenu({
  image,
  title,
  category,
  subcategory,
}: MenuItem) {
  return (
    
        <li className='flex-shrink-0 flex flex-col items-center rounded-full text-center group'>
          <Link
            href={`/${category}/${subcategory}`}
            className='relative w-12 h-12 sm:w-22 sm:h-22 md:w-22 md:h-22 rounded-full shadow-xl'>
            <Image
              src={image || "/placeholder.jpg"}
              alt={title}
              fill
              className='object-cover z-20 rounded-full border-2 bg-light border-light overflow-hidden group-hover:shadow-xl transition-all duration-200'
            />
            <div className='absolute inset-0 bg-red z-10 rounded-full group-hover:opacity-0 transition-all duration-200' />
          </Link>
          <p className='mt-2 text-center w-full sm:text-[14px] text-[8px] text-wrap font-medium text-darker-black/70'>
            {title}
          </p>
        </li>
      
  );
}
