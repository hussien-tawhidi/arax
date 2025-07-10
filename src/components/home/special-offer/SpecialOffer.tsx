"use client";
import { productsData } from "@/products";
import dynamic from "next/dynamic";

const Slide = dynamic(() => import("./Slider"), {
  ssr: false, // 👈 disables SSR
});

export default function SpecialOffer() {
  const products = productsData.filter((item) => item.discount > 25);
  return (
    <div className='md:py-20 py-10'>
      <Slide
        products={products}
        imageBg='bg-light'
        banner='/images/best-offs/poster.jpg'
        bg='bg-red'
        discount
      />
    </div>
  );
}
