"use client";

import { useRouter } from "next/navigation";
import { IoAddSharp } from "react-icons/io5";

export default function AddBtn({
  link,
  title,
}: {
  link: string;
  title: string;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(link)}
      className='text-darker-black/60 border border-darker-black/70 py-2 px-4 rounded-xl transition-all duration-300 hover:bg-darker-black/70 flex items-center my-2 text-sm hover:text-light'>
      <IoAddSharp /> {title}
    </button>
  );
}
