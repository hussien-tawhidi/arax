"use client"
import { toPersianDigits } from '@/utils/priceConverter';
import Image from 'next/image';

interface props{
    image: string
    title: string
    price:number
}

export default function StickyCard({image,title,price}:props) {
  return (
    <div className=' rounded-xl shadow-md p-4 flex-col items-start space-y-3 hover:shadow-lg transition'>
      <div className='flex items-center space-x-3 rtl:space-x-reverse'>
        <Image
          src={image}
          width={100}
          height={100}
          className='object-cover rounded-md'
          alt={title}
        />
        <h3 className='text-darker-black/80 font-semibold'>{title}</h3>
      </div>

      <p className='text-lg text-center w-full text-darker-black/70'>
        {toPersianDigits(price)} تومان
      </p>

      <button className=' text-darker-black/70 border border-darker-black/30 px-4 py-2 rounded-md hover:bg-darker-black/5 transition w-full text-center'>
        خرید کنید
      </button>
    </div>
  );
}
