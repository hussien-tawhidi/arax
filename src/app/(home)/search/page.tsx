import { Suspense } from "react";
import SearchResults from "./SearchResult";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query ?? "";

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <h1 className='text-xl font-bold mb-4'>نتایج جستجو برای: {query}</h1>
      <Suspense fallback={<p>در حال بارگذاری...</p>}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
