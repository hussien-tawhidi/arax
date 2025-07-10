"use client";

import { productsData } from "@/products";
import { menu } from "../header/data";
import ProductBreadCumb from "./ProductBreadCumb";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import ProductSpecs from "./ProductSpecs";
import dynamic from "next/dynamic";
import Review, { ReviewType } from "./Review";
import StickyCard from "./StickyCard";
import { useState } from "react";
import ReviewForm from "./ReviewForm";
const Slide = dynamic(() => import("../home/special-offer/Slider"), {
  ssr: false, // 👈 disables SSR
});
export default function ProductDetail({
  productCode,
}: {
  productCode: string;
}) {
  const product = productsData.find((item) => item.productCode === productCode);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  const addReview = (newReview: ReviewType) => {
    setReviews((prev) => [newReview, ...prev]);
  };
  const suggestion = productsData.filter(
    (item) => item.category === product?.category
  );

  if (!product) {
    return (
      <div className='max-w-6xl mx-auto p-4 text-center text-red'>
        محصولی با این کد یافت نشد.
      </div>
    );
  }

  const category = menu.find((item) => item.title === product.category);

  const subcategory = category?.submenus.find(
    (item) => item.title === product.subcategory
  );

  const specs = [
    { key: "برند", value: product.brand },
    { key: "جنس", value: product.material },
    { key: "رنگ‌ها", value: product.colorsAvailable?.join(" / ") },
    { key: "طرح", value: product.pattern },
    { key: "رده سنی", value: product.ageRange },
    { key: "جنسیت", value: product.gender },
    { key: "توضیحات", value: product.description },
  ].filter((item) => item.value);

  return (
    <div className=' md:w-[90%] w-[98%] mx-auto p-4 font-sans'>
      {/* Breadcrumb */}
      <ProductBreadCumb
        category={
          category
            ? { category: category.category, title: category.title }
            : undefined
        }
        subcategory={
          subcategory
            ? { subcategory: subcategory.subcategory, title: subcategory.title }
            : undefined
        }
        product={{ name: product.name }}
      />

      <div className='flex flex-col md:flex-row gap-6'>
        {/* Images */}
        <ProductImages images={product.imageUrl ?? []} />
        <ProductInfo product={product} />
      </div>
      <div className=''>
        <Slide products={suggestion.slice(0, 12)} special />
      </div>
      {/* Details */}
      <div className='relative'>
        <div className='flex gap-3'>
          <div className='md:w-[70%] w-full'>
            <ProductSpecs specs={specs} />
            <ReviewForm onSubmit={addReview} />

            {product.reviews.map((item) => (
              <Review key={item.id} review={item} />
            ))}
          </div>
          <div className='w-[30%] md:block hidden h-full sticky top-0 right-0 left-0'>
            <StickyCard
              image={product.imageUrl[0]}
              price={product.price}
              title={product.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
