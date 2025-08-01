"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface menuItemTypes {
  image: string;
  title: string;
  category?: string;
  subcategory?: string;
}

export default function MobileViewCategory({
  image,
  title,
  category,
  subcategory,
}: menuItemTypes) {
  const router = useRouter();

  return (
    <div className='relative'>
      <Image
        src={image || "/"}
        alt={`${title}`}
        width={400}
        height={400}
        className='object-cover w-full h-full'
        onClick={() => router.push(`/${category}/${subcategory}`)}
      />
      <p className='absolute top-[15%] right-0 bg-light px-2 py-1'>{title}</p>
    </div>
  );
}
