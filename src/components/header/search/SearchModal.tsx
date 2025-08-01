"use client";

import { AnimatePresence, motion } from "framer-motion";
import SearchForm from "./SearchForm";
import SearchSuggestion from "./SearchSuggestion";

interface ProductResult {
  name: string;
  brand: string;
  category: string;
  price: number;
}

interface SearchModalProps {
  query: string;
  setQuery: (q: string) => void;
  recentSearches: string[];
  results: ProductResult[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  onClose: () => void;
  onSubmit: (term: string) => void;
  onSelectResult: (term: string) => void;
  onLoadMore: (nextPage: number) => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

export default function SearchModal({
  query,
  setQuery,
  recentSearches,
  results,

  loading,
  error,
  hasMore,
  page,
  onClose,
  onSubmit,
  onSelectResult,
  onLoadMore,
  formRef,
}: SearchModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        role='dialog'
        aria-modal='true'
        className='fixed inset-0 w-screen h-screen bg-darker-black/50 z-50 flex sm:items-center items-start justify-center'
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          ref={formRef}
          className='md:w-[50%] relative sm:w-[90%] w-full bg-light sm:mt-0 sm:rounded-xl md:px-10 sm:px-5 px-2 pb-3 max-h-[80vh] overflow-y-auto scrollbar-thin'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}>
          {/* Sticky Search Form */}
          <div className='sticky top-0 left-0 right-0 bg-light pt-3 z-10'>
            <SearchForm
              query={query}
              setQuery={setQuery}
              onSubmit={onSubmit}
              onClose={onClose}
            />
          </div>

          {/* Loading / Error */}
          {loading && (
            <p className='text-darker-black/60 mt-4'>در حال جستجو...</p>
          )}
          {error && <p className='text-red-500 mt-4'>{error}</p>}

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
            {results.length > 0 ? (
              results.slice(0, 5).map((item, i) => (
                <motion.button
                  key={i}
                  onClick={() => onSelectResult(item.name)}
                  className='block w-full text-right px-4 py-2 bg-darker-black/10 hover:bg-darker-black/20 rounded transition text-sm'
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}>
                  <div className='font-bold'>{item.name}</div>
                  <div className='text-darker-black/70 text-xs'>
                    {item.brand} — {item.category} — ${item.price}
                  </div>
                </motion.button>
              ))
            ) : (
              <p>مورد یافت نشد</p>
            )}
          </motion.div>

       

          {/* Recent Searches */}
          {results.length === 0 && recentSearches.length > 0 && (
            <motion.div
              className='mt-6'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}>
              <p className='text-darker-black/60 mb-2'>جستجوهای اخیر:</p>
              <div className='flex flex-wrap gap-2'>
                {recentSearches.map((item, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setQuery(item)}
                    className='bg-darker-black/10 hover:bg-darker-black/20 text-darker-black/80 px-3 py-1 rounded-full text-sm transition'
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

          {/* Load More */}
          {results.length > 0 && hasMore && !loading && (
            <div className='mt-4 text-center'>
              <button
                onClick={() => onLoadMore(page + 1)}
                className='text-sm px-4 py-2 bg-darker-black/10 hover:bg-darker-black/20 rounded transition'>
                بارگذاری بیشتر
              </button>
            </div>
          )}

          {!query && <SearchSuggestion />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
