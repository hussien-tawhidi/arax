"use client";
import { MdDone } from "react-icons/md";

export default function SuccessMsg({ text }: { text: string }) {
  return (
    <p className='text-green flex items-center gap-3 text-sm border border-green/30 py-2 px-5 my-3'>
      <MdDone className='w-6 h-6 rounded-full border border-green/30 flex items-center justify-center' />{" "}
      {text}
    </p>
  );
}
