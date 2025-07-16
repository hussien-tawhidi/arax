"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ProductType } from "../../../../types/productTypes";

// Dynamically import the Slider component with no SSR
const Slide = dynamic(() => import("./Slider"), {
  ssr: false,
});

export default function SpecialOffer() {
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
        const filtered = res.data.filter((item) => item.discount > 25);
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
    <div className='md:py-20 py-10'>
      {error && <div className='text-center text-red/60 py-4'>{error}</div>}

      <Slide
        products={products}
        loading={loading}
        imageBg='bg-light'
        // banner='/images/best-offs/poster.jpg'
        bg='bg-red'
        discount
      />
    </div>
  );
}
