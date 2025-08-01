"use client";

import { ReactNode } from "react";
import { IoAddSharp } from "react-icons/io5";

interface SubmitButtonProps {
  loading: boolean;
  title: string;
  icon?: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  disabled?: boolean;
}

export default function SubmitButton({
  loading,
  title,
  icon,
  type = "submit",
  className = "",
  disabled = false,
}: SubmitButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`w-full bg-red text-light py-2 px-5 rounded-lg transition disabled:opacity-70 ${className}`}>
      {loading ? (
        "در حال ارسال..."
      ) : (
        <span className='flex items-center justify-center gap-1'>
          {title ? title : "ارسال درخواست'"} {icon ? icon : <IoAddSharp />}
        </span>
      )}
    </button>
  );
}
