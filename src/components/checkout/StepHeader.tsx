"use client";

import { BiCheck } from "react-icons/bi";


type Props = { step: number };

const steps = ["سبد خرید", "اطلاعات ارسال", "پرداخت"];

export default function StepHeader({ step }: Props) {
  return (
    <div className='w-full px-4 pt-6 pb-4'>
      <div className='relative flex items-center justify-between'>
        {/* Connector Lines */}
        <div className='absolute top-4 right-0 left-0 z-0 h-0.5 bg-gray-300'>
          <div
            className='h-full bg-red transition-all duration-500 ease-in-out'
            style={{
              width: `${((step - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        {steps.map((label, i) => {
          const isCompleted = i + 1 < step;
          const isActive = i + 1 === step;

          return (
            <div
              key={i}
              className='relative z-10 flex flex-col items-center w-full text-center'>
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all
                ${
                  isCompleted
                    ? "bg-red text-white border-red"
                    : isActive
                    ? "bg-white text-red border-red"
                    : "bg-white text-gray-400 border-gray-300"
                }`}>
                {isCompleted ? <BiCheck size={18} /> : i + 1}
              </div>
              <div
                className={`mt-2 text-xs sm:text-sm font-medium ${
                  isActive ? "text-red" : "text-gray-500"
                }`}>
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
