"use client";
import { BiError } from "react-icons/bi";

export default function ErrorMsg({text}:{text:string}) {
  return (
    <p className='text-red border flex items-center gap-3 border-red/30 py-2 px-5 w-auto text-sm my-3'>
      <BiError className='w-6 h-6 rounded-full border border-red/30 flex items-center justify-center' />{" "}
      {text}
    </p>
  );
}
