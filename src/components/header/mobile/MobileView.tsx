"use client";

import Image from "next/image";
import { menu } from "../data";
import { useRouter } from "next/navigation";

export default function MobileView() {
  const router = useRouter();
  return (
    <div className='grid grid-cols-2'>
      {menu.map((m, i) => (
        <div className='relative' key={i}>
          <Image
            src={m.image || "/"}
            alt={`${m.title}`}
            width={400}
            height={400}
            className='object-cover w-full h-full'
            onClick={() => router.push(`/mobile-view/${m.category}`)}
          />
          <p className='absolute top-[15%] right-0 bg-light px-2 py-1'>
            {m.title}
          </p>
        </div>
      ))}
    </div>
  );
}
