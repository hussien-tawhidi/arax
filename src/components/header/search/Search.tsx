"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchForm from "./SearchForm";
import SearchSuggestion from "./SearchSuggestion";

export default function Search({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  const saveToRecentSearches = (term: string) => {
    const updated = [term, ...recentSearches.filter((q) => q !== term)].slice(
      0,
      5
    );
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setRecentSearches(updated);
  };

  useEffect(() => {
    if (query.trim()) {
      setResults([
        `${query} محصول ۱`,
        `${query} محصول ۲`,
        `${query} برند معروف`,
        `دسته بندی ${query}`,
      ]);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSelectResult = (term: string) => {
    saveToRecentSearches(term);
    console.log("Selected:", term);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className='fixed sm:inset-0 top-0 w-screen h-screen bg-dark/50 z-50 flex sm:items-center items-start justify-center'
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          ref={formRef}
          className='md:w-[50%] sm:w-[90%] w-full bg-light sm:mt-0 pt-5 sm:rounded-xl md:p-10 sm:p-5 p-2'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}>
          <SearchForm
            query={query}
            setQuery={setQuery}
            onSubmit={(val) => {
              saveToRecentSearches(val);
              console.log("Search submitted:", val);
              onClose();
            }}
            onClose={onClose}
          />

          {/* Results */}
          <motion.div
            className='mt-4 space-y-2'
            initial='hidden'
            animate='visible'
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}>
            {results.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => handleSelectResult(item)}
                className='block w-full text-right px-4 py-2 bg-dark/10 hover:bg-dark/20 rounded transition'
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}>
                {item}
              </motion.button>
            ))}
          </motion.div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <motion.div
              className='mt-6'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}>
              <p className='text-dark/60 mb-2'>جستجوهای اخیر:</p>
              <div className='flex flex-wrap gap-2'>
                {recentSearches.map((item, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setQuery(item)}
                    className='bg-dark/10 hover:bg-dark/20 text-dark/80 px-3 py-1 rounded-full text-sm transition'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}>
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          <SearchSuggestion />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
