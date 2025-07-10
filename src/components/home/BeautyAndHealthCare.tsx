"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const data = [
  {
    id: 1,
    link: "/",
    image: "/images/beauty/poster-1.jpg",
    subcategory: "beautician",
    category: "beauty",
  },
  {
    id: 2,
    link: "/",
    image: "/images/beauty/poster-2.jpg",

    subcategory: "beautician",
    category: "beauty",
  },
  {
    id: 3,
    link: "/",
    image: "/images/beauty/poster-3.jpg",
    subcategory: "lips",
    category: "beauty",
  },
  {
    id: 4,
    link: "/",
    image: "/images/beauty/poster-4.jpg",
    subcategory: "body-care",
    category: "beauty",
  },
  {
    id: 5,
    link: "/",
    image: "/images/beauty/poster-5.jpg",
    category: "beauty",
    subcategory: "skin-care",
  },
  {
    id: 6,
    link: "/",
    image: "/images/beauty/poster-6.jpg",
    subcategory: "cleaners",
    category: "supermarket",
  },
];

export default function BeautyAndHealthCare() {
  const router = useRouter();
  return (
    <div className='grid md:gap-10 sm:grid-cols-3 grid-cols-2 gap-2 md:py-10 py-5'>
      {data.map((item) => (
        <div className='relative overflow-hidden group' key={item.id}>
          <Image
            key={item.id}
            src={item.image}
            onClick={() => router.push(`/${item.category}/${item.subcategory}`)}
            alt={`عکس محصول /`}
            width={400}
            height={200}
            className='object-cover rounded-xl'
          />
          <span className='pointer-events-none absolute -top-[5rem] bottom-0 right-0 opacity-0 -translate-x-[20rem] rotate-30 group-hover:translate-x-[100px] duration-500 transition-all group-hover:opacity-100 left-0 w-[60px] h-[200%] bg-gradient-to-r from-transparent to-light'></span>
        </div>
      ))}
    </div>
  );
}
