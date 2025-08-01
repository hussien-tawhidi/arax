import { Suspense } from "react";
import SearchResults from "./SearchResult";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function SearchPage({ searchParams }: any) {
  // const searchParams = await params;
  const query = (await searchParams.query) ?? "";
  console.log("🚀 ~ SearchPage ~ searchParams:", searchParams);

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <p>{query}</p>
      <h1 className='text-xl font-bold mb-4'>نتایج جستجو برای: {query}</h1>
      <Suspense fallback={<p>در حال بارگذاری...</p>}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
