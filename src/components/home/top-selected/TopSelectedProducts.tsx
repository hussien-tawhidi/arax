"use client";

import { productsData } from "@/products";
import TopSelectedProductsRow from "./TopSelectedProductsRow";

export default function TopSelectedProducts() {
  const topProdcuts = productsData.filter((item) => item.sales > 350);
  return (
    <div className='py-10'>
      <div className=''>
        <h4 className='text-cente my-3 py-2 md:text-xl font-bold relative text-dark/80'>
          منتخب ترین محصولات{" "}
          <span className='absolute bottom-0 right-0  w-[70px] h-[5px] rounded-xl bg-red'></span>
        </h4>
      </div>
      <div className='mt-10'>
        <TopSelectedProductsRow data={topProdcuts.slice(0, 6)} />
        <TopSelectedProductsRow data={topProdcuts.slice(6, 12)} />
        <TopSelectedProductsRow data={topProdcuts.slice(12, 18)} />
      </div>
    </div>
  );
}
