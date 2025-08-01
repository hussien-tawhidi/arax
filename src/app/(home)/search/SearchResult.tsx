"use client";

import { ProductResult } from "@/components/header/search/types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BiSearch } from "react-icons/bi";
import { RiLoader2Fill } from "react-icons/ri";
import { FiAlertCircle } from "react-icons/fi";

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
        setError("خطا در دریافت نتایج. لطفا دوباره تلاش کنید.");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  if (!query.trim()) {
    return (
      <div className='text-center text-gray-500 py-8'>
        <BiSearch className='mx-auto mb-2 text-4xl text-gray-400' />
        لطفاً عبارتی برای جستجو وارد کنید.
      </div>
    );
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center py-10'>
        <RiLoader2Fill className='animate-spin text-gray-600 w-6 h-6' />
        <span className='ml-3 text-gray-600'>در حال بارگذاری نتایج...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center text-red-600 py-6'>
        <FiAlertCircle className='mx-auto mb-2 text-4xl' />
        {error}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className='text-center text-gray-500 py-8'>
        <BiSearch className='mx-auto mb-2 text-4xl text-gray-400' />
        هیچ نتیجه‌ای یافت نشد.
      </div>
    );
  }

  const groupedByCategory = results.reduce<Record<string, ProductResult[]>>(
    (acc, product) => {
      acc[product.category] = acc[product.category] || [];
      acc[product.category].push(product);
      return acc;
    },
    {}
  );

  return (
    <div className='max-w-5xl mx-auto px-4 py-6 space-y-10'>
      {Object.entries(groupedByCategory).map(([category, items]) => (
        <div key={category}>
          <h3 className='text-2xl font-bold text-darker-black border-b-2 border-gray-200 pb-3 mb-4 flex items-center justify-between'>
            <span>{category}</span>
            <span className='bg-black text-white text-xs rounded-full px-2 py-0.5'>
              {items.length} مورد
            </span>
          </h3>

          <motion.div
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
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
                className='bg-white rounded-xl shadow border border-gray-100 p-5 text-right hover:shadow-md transition-all duration-300 hover:bg-gray-50 cursor-pointer'
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.01 }}>
                <div className='text-lg font-semibold text-gray-900 truncate'>
                  {item.name}
                </div>
                <div className='text-sm text-gray-500 mt-2'>
                  <span className='font-medium text-gray-600'>برند:</span>{" "}
                  {item.brand}
                </div>
                <div className='text-sm text-green-700 mt-2 font-bold'>
                  قیمت: {item.price.toLocaleString("fa-IR")} تومان
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
