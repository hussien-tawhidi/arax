"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ShoesBanners() {
  const router = useRouter();
  return (
    <div className='grid md:grid-cols-2 gap-2 py-10 '>
      <Image
        src={"/images/men-shoes-banner.jpg"}
        alt='any'
        width={800}
        onClick={() => router.push("/men/shoes")}
        height={300}
        className='object-cover rounded-xl'
      />
      <Image
        src={"/images/women-shoes-banner.jpg"}
        alt='any'
        width={800}
        onClick={() => router.push("/women/shoes")}
        height={300}
        className='object-cover rounded-xl'
      />
    </div>
  );
}
