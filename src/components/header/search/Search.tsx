"use client";
import { useEffect, useRef, useState } from "react";
import { ProductResult, SearchProps } from "./types";
import SearchModal from "./SearchModal";
import { useRouter } from "next/navigation";

export default function Search({ onClose }: SearchProps) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [results, setResults] = useState<ProductResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const router = useRouter();

  // Fetch from your real Mongo-powered API
  const fetchResults = async (term: string, pageNum = 1) => {
    if (pageNum === 1) {
      setResults([]);
      setHasMore(true);
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/search?query=${encodeURIComponent(term)}&page=${pageNum}&limit=10`
      );
      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      if (pageNum === 1) {
        setResults(data.results);
      } else {
        setResults((prev) => [...prev, ...data.results]);
      }

      setHasMore(data.results.length > 0);
    } catch (err) {
      console.error(err);
      setError("محصول دریافت نشد لطفا دوباره تلاش کنید");
      if (pageNum === 1) setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Load recent searches
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("recentSearches");
      if (saved) setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Save recent searches
  const saveToRecentSearches = (term: string) => {
    setRecentSearches((prev) => {
      const updated = [term, ...prev.filter((q) => q !== term)].slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  };

  // search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const handler = setTimeout(() => {
      setPage(1);
      fetchResults(query, 1);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  const handleSearchSubmit = (val: string) => {
    saveToRecentSearches(val);
    router.push(`/search?query=${encodeURIComponent(val)}`);
    onClose();
  };
  return (
    <SearchModal
      query={query}
      setQuery={setQuery}
      recentSearches={recentSearches}
      results={results}
      loading={loading}
      error={error}
      hasMore={hasMore}
      page={page}
      onClose={onClose}
      onSubmit={handleSearchSubmit}
      onSelectResult={(term) => {
        saveToRecentSearches(term);
        onClose();
      }}
      onLoadMore={(nextPage) => {
        setPage(nextPage);
        fetchResults(query, nextPage);
      }}
      formRef={formRef}
    />
  );
}
