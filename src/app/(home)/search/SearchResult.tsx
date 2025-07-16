"use client";

import { ProductResult } from "@/components/header/search/types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export default function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<ProductResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) return;
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/search?query=${encodeURIComponent(query)}`
        );
        if (!res.ok) throw new Error("Server error");
        const data = await res.json();
        setResults(data.results);
      } catch (err) {
        console.error(err);
        setError("خطا در دریافت نتایج");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  if (!query.trim())
    return (
      <p className='text-center text-gray-500'>
        لطفا عبارتی برای جستجو وارد کنید.
      </p>
    );

  if (loading)
    return (
      <p className='text-center text-darker-black/60'>در حال بارگذاری...</p>
    );

  if (error) return <p className='text-center text-red-500'>{error}</p>;

  if (results.length === 0)
    return <p className='text-center text-gray-500'>هیچ نتیجه‌ای یافت نشد.</p>;

  const groupedByCategory = results.reduce<Record<string, ProductResult[]>>(
    (acc, product) => {
      acc[product.category] = acc[product.category] || [];
      acc[product.category].push(product);
      return acc;
    },
    {}
  );

  return (
    <div className='max-w-4xl mx-auto px-4 py-6'>
      {Object.entries(groupedByCategory).map(([category, items]) => (
        <div key={category} className='mb-8'>
          <h3 className='text-xl font-bold text-darker-black border-b border-black/10 pb-2 mb-4'>
            {category}
          </h3>
          <motion.div
            className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'
            initial='hidden'
            animate='visible'
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}>
         
            {items.map((item, i) => (
              <motion.div
                key={i}
                className='bg-white rounded-lg shadow hover:shadow-lg border border-black/5 p-4 text-right cursor-pointer transition-all duration-300 hover:bg-darker-black/5'
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.02 }}>
                <div className='font-semibold text-black'>{item.name}</div>
                <div className='text-sm text-darker-black/70 mt-1'>
                  برند: {item.brand}
                </div>
                <div className='text-sm text-darker-black/70 mt-1'>
                  قیمت: ${item.price}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
