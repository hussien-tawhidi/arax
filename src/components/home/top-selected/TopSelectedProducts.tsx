"use client";
import TopSelectedProductsRow from "./TopSelectedProductsRow";
import { useEffect, useState } from "react";
import { ProductType } from "../../../../types/productTypes";
import axios from "axios";

export default function TopSelectedProducts() {
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
        const filtered = res.data.filter((item) => item.sales > 350);
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
    <div className='py-10'>
      <div className=''>
        <h4 className='text-cente my-3 py-2 md:text-xl font-bold relative text-darker-black/80'>
          منتخب ترین محصولات{" "}
          <span className='absolute bottom-0 right-0  w-[70px] h-[5px] rounded-xl bg-red'></span>
        </h4>
      </div>
      {error && <div className='text-center text-red/60 py-4'>{error}</div>}
      <div className='mt-10'>
        <TopSelectedProductsRow data={products.slice(0, 6)} loading={loading} />
        <TopSelectedProductsRow
          data={products.slice(6, 12)}
          loading={loading}
        />
        <TopSelectedProductsRow
          data={products.slice(12, 18)}
          loading={loading}
        />
      </div>
    </div>
  );
}
