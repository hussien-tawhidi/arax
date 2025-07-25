"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BsArrowLeft } from "react-icons/bs";

interface slider {
  id: number;
  title: string;
  image: string;
  imageSm: string;
}

interface props {
  data: slider[];
}

export default function HeroSlider({ data }: props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1: next, -1: prev

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='relative overflow-hidden w-full xl:h-[40vh] lg:h-[30vh] md:h-[30vh] sm:h-[25vh] h-[120px] shadow-lg'>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={data[index].id}
          className='absolute inset-0 w-full h-full'
          custom={direction}
          initial={{
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          exit={{
            x: direction > 0 ? -300 : 300,
            opacity: 0,
            scale: 0.95,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
          }}>
          <Image
            src={data[index].image}
            alt={data[index].title}
            fill
            className='object-cover sm:flex hidden'
            priority
          />
          <Image
            src={data[index].imageSm}
            alt={data[index].title}
            fill
            className='object-cover sm:hidden flex'
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className='absolute left-3 sm:flex hidden top-1/2 -translate-y-1/2 bg-light/70 hover:bg-light text-darker-black p-2 rounded-full shadow'>
        <BsArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        className='absolute right-3 top-1/2 sm:flex hidden -translate-y-1/2 bg-light/70 hover:bg-light text-darker-black p-2 rounded-full shadow'>
        <BsArrowLeft className='rotate-180' />
      </button>
      {/* Pagination Dots */}
      <div className='absolute sm:bottom-4 bottom-1 w-full flex justify-center gap-2'>
        {data.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`sm:w-6 w-3 sm:h-1.5 h-1 rounded transition-all duration-300 ${
              i === index ? "bg-light shadow-lg scale-110" : "bg-light/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
