"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { productsData } from "@/products";

const Slide = dynamic(() => import("./special-offer/Slider"), {
  ssr: false, // 👈 disables SSR
});

export default function ClothSet() {
  const products = productsData.filter(
    (item) => item.subcategory === "لباس زنانه"
  );

  return (
    <>
      <Image
        src={"/images/set/set-banner.jpg"}
        alt='banner'
        width={800}
        height={300}
        className='object-cover md:hidden flex'
      />
      <Slide products={products} banner='/images/set/set.jpg' special />
    </>
  );
}
