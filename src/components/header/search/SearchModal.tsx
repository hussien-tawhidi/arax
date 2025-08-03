"use client";

import { AnimatePresence, motion } from "framer-motion";
import SearchForm from "./SearchForm";
import SearchSuggestion from "./SearchSuggestion";
import SearchResultItem from "./SearchResultItem";
import { SearchModalProps } from "../../../../types/Search";

export default function SearchModal({
  query,
  setQuery,
  recentSearches,
  results,
  loading,
  error,
  onClose,
  onSubmit,
  onSelectResult,
  formRef,
}: SearchModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        role='dialog'
        aria-modal='true'
        className='fixed inset-0 w-screen h-screen bg-darker-black/50 z-50 flex items-start justify-center'
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          ref={formRef}
          className='md:w-[50%] relative sm:w-[90%] w-full bg-light sm:mt-0 rounded-br-xl rounded-bl-xl md:px-10 sm:px-5 px-2 pb-3 max-h-[80vh] overflow-y-auto scrollbar-hide'
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
              showBtnMore={results.length > 5}
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
            {results.length > 0
              ? results.map((item, i) => (
                  <SearchResultItem
                    key={i}
                    item={item}
                    onSelect={onSelectResult}
                    index={i}
                  />
                ))
              : query &&
                !loading &&
                !error && (
                  <p className='mt-4 text-darker-black/60'>موردی یافت نشد</p>
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

          {!query && <SearchSuggestion />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
