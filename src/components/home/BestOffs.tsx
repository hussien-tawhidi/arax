"use client";

import Image from "next/image";
import Link from "next/link";

interface offs {
  id: number;
  link: string;
  image: string;
  category?: string;
  subcategory?: string;
}

interface props {
  data: offs[];
}
export default function BestOffs({ data }: props) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
      {data.map((item) => (
        <Link
          key={item.id}
          href={`/${item.category}/${item.subcategory}`}
          className='block relative overflow-hidden group'>
          <span className='pointer-events-none absolute -top-[5rem] bottom-0 right-0 opacity-0 -translate-x-[20rem] rotate-30 group-hover:translate-x-[100px] duration-500 transition-all group-hover:opacity-100 left-0 w-[60px] h-[200%] bg-gradient-to-r from-transparent to-white'></span>

          <Image
            src={item.image}
            alt='best-off'
            width={300}
            height={300}
            className='rounded-lg object-cover w-full h-auto'
          />
        </Link>
      ))}
    </div>
  );
}
