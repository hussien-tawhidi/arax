"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";
import { ProductType } from "../../../types/productTypes";
import axios from "axios";

const Slide = dynamic(() => import("./special-offer/Slider"), {
  ssr: false, // 👈 disables SSR
});

export default function ClothSet() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get<ProductType[]>("/api/products", {
          signal: controller.signal,
        });

        // Apply discount filtering on client
        const filtered = res.data.filter(
          (item) => item.subcategory === "لباس زنانه"
        );
        setProducts(filtered);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching products:", err);
          setError("خطا در دریافت محصولات");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Image
        src={"/images/set/set-banner.jpg"}
        alt='banner'
        width={800}
        height={300}
        className='object-cover md:hidden flex'
      />
      {error && <div className='text-center text-red/60 py-4'>{error}</div>}
      <Slide
        products={products}
        banner='/images/set/set.jpg'
        special
        loading={loading}
      />
    </>
  );
}
