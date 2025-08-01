"use client";

import { toPersianDigits } from "@/utils/priceConverter";
import { useEffect, useRef, useState } from "react";

interface PriceRangeSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
}

export default function PriceRangeSlider({
  value,
  onChange,
  min = 0,
  max = 2000000,
}: PriceRangeSliderProps) {
  const [localMin, localMax] = value;
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMinChange = (v: number) => {
    const newMin = Math.min(Math.max(min, v), localMax);
    onChange([newMin, localMax]);
  };

  const handleMaxChange = (v: number) => {
    const newMax = Math.max(Math.min(max, v), localMin);
    onChange([localMin, newMax]);
  };

  const handleMouseDownMin = () => {
    setIsDraggingMin(true);
  };

  const handleMouseDownMax = () => {
    setIsDraggingMax(true);
  };

  const handleTouchStartMin = () => {
    setIsDraggingMin(true);
  };

  const handleTouchStartMax = () => {
    setIsDraggingMax(true);
  };

  const calculateValueFromPosition = (clientX: number) => {
    if (!sliderRef.current) return 0;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.min(
      Math.max(0, (clientX - rect.left) / rect.width),
      1
    );
    return Math.round(percentage * (max - min) + min);
  };

  const handleMove = (clientX: number) => {
    const newValue = calculateValueFromPosition(clientX);

    if (isDraggingMin) {
      handleMinChange(newValue);
    } else if (isDraggingMax) {
      handleMaxChange(newValue);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    // Prevent scrolling while dragging
    if (isDraggingMin || isDraggingMax) {
      e.preventDefault();
    }
    handleMove(e.touches[0].clientX);
  };

  const handleEnd = () => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  };

  useEffect(() => {
    // Mouse events
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleEnd);

    // Touch events
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleEnd);

    return () => {
      // Clean up mouse events
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);

      // Clean up touch events
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDraggingMin, isDraggingMax]);

  return (
    <div className='space-y-4 border border-darker-black/10 rounded p-4' dir='rtl'>
      <h3 className='font-semibold text-darker-black/60 mb-2'>قیمت (تومان)</h3>

      {/* Numeric Inputs */}
      <div className='flex flex-col items-center gap-4'>
        <div className='flex-1'>
          <label className='text-sm text-darker-black/50 block mb-1'>حداقل</label>
          <input
            type='text'
            className='w-full border-b border-darker-black/30 focus:ring-0 outline-0 ring-0 rounded p-2 text-right'
            value={toPersianDigits(localMin)}
            onChange={(e) => {
              const englishValue = e.target.value.replace(/[۰-۹]/g, (d) =>
                String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))
              );
              handleMinChange(Number(englishValue));
            }}
            min={min}
            max={localMax}
          />
        </div>

        <div className='flex-1'>
          <label className='text-sm text-darker-black/50 block mb-1'>حداکثر</label>
          <input
            type='text'
            className='w-full border-b rounded border-darker-black/30 ring-0 p-2 text-right'
            value={toPersianDigits(localMax)}
            onChange={(e) => {
              const englishValue = e.target.value.replace(/[۰-۹]/g, (d) =>
                String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))
              );
              handleMaxChange(Number(englishValue));
            }}
            min={localMin}
            max={max}
          />
        </div>
      </div>

      {/* Slider Track */}
      <div className='relative h-8 flex items-center  mt-4' ref={sliderRef}>
        {/* Background track */}
        <div
          className='absolute h-2 w-full bg-red/10 rounded'
          style={{ direction: "rtl" }}></div>

        {/* Active range track */}
     
        <div
          className='absolute h-2 bg-red rounded'
          style={{
            left: `${((localMin - min) / (max - min)) * 100}%`,
            width: `${((localMax - localMin) / (max - min)) * 100}%`,
          }}></div>

        {/* Min thumb */}
       
        <div
          className='absolute w-4 h-4 bg-red rounded-full cursor-pointer -translate-x-1/2 -translate-y-1/2 z-10'
          style={{
            left: `${((localMin - min) / (max - min)) * 100}%`,
            top: "50%",
          }}
          onMouseDown={handleMouseDownMin}
          onTouchStart={handleTouchStartMin}></div>

        {/* Max thumb */}
    
        <div
          className='absolute w-4 h-4 bg-red rounded-full cursor-pointer -translate-x-1/2 -translate-y-1/2 z-10'
          style={{
            left: `${((localMax - min) / (max - min)) * 100}%`,
            top: "50%",
          }}
          onMouseDown={handleMouseDownMax}
          onTouchStart={handleTouchStartMax}></div>
      </div>

      <div className='flex justify-between text-sm text-gray-700 mt-2'>
        <span>{toPersianDigits(localMax.toLocaleString("fa-IR"))} تومان</span>
        <span>{toPersianDigits(localMin.toLocaleString("fa-IR"))} تومان</span>
      </div>
    </div>
  );
}
