"use client";
import { useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import SubHeader from "./SubHeader";
import SortDropdown from "./SortDropdown";
import FilterPanel from "./FilterPanel";
import { usePathname } from "next/navigation";
import { menu } from "@/components/header/data";
import SubCategoryCard from "./SubCategoryCard";
import { ProductType } from "../../../../types/productTypes";
import SkeltonCard from "@/components/home/special-offer/SkeltonCard";
export default function Subcategory({
  subcategory,
  subcategoryMenu,
  productsData,
  productType,
  loading,
}: {
  productType?: string;
  subcategory?: string;
  subcategoryMenu?: boolean;
  loading?: boolean;
  productsData?: ProductType[];
}) {
  // Sort option state
  const [sortOption, setSortOption] = useState<
    | "newest"
    | "cheapest"
    | "mostExpensive"
    | "mostViewed"
    | "bestSelling"
    | "biggestDiscount"
  >("newest");

  // Filter states
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 500000000,
  ]);

  // All filter options extracted from productsData (using Set to get unique values)
  const allBrands = Array.from(new Set(productsData?.map((p) => p.brand)));
  const allMaterials = Array.from(
    new Set(productsData?.map((p) => p.material))
  ).filter(Boolean);
  const allAgeRanges = Array.from(
    new Set(productsData?.map((p) => p.ageRange))
  ).filter(Boolean);

  const allGenders = Array.from(
    new Set(productsData?.map((p) => p.gender))
  ).filter(Boolean);
  const allTypes = Array.from(new Set(productsData?.map((p) => p.type))).filter(
    Boolean
  );
  const allPatterns = Array.from(
    new Set(productsData?.map((p) => p.pattern))
  ).filter(Boolean);
  const allSizes = Array.from(
    new Set(productsData?.flatMap((p) => p.sizesAvailable))
  ).filter(Boolean);

  // Filtering products by subcategory and all selected filters
  const filteredProducts =
    productsData &&
    productsData
      .filter((item) => !onlyAvailable || item.stock > 0)
      .filter(
        (item) =>
          selectedBrands.length === 0 || selectedBrands.includes(item.brand)
      )
      .filter(
        (item) =>
          selectedMaterials.length === 0 ||
          selectedMaterials.includes(item.material)
      )
      .filter(
        (item) =>
          selectedAgeRanges.length === 0 ||
          selectedAgeRanges.includes(item.ageRange)
      )
      .filter(
        (item) =>
          selectedGenders.length === 0 || selectedGenders.includes(item.gender)
      )
      .filter(
        (item) =>
          selectedTypes.length === 0 || selectedTypes.includes(item.type)
      )
      .filter(
        (item) =>
          selectedPatterns.length === 0 ||
          selectedPatterns.includes(item.pattern)
      )
      .filter(
        (item) =>
          selectedSizes.length === 0 ||
          item.sizesAvailable.some((size) => selectedSizes.includes(size))
      )
      .filter(
        (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
      );

  // Sorting filtered products
  filteredProducts?.sort((a, b) => {
    switch (sortOption) {
      case "cheapest":
        return a.price - b.price;
      case "mostExpensive":
        return b.price - a.price;
      case "mostViewed":
        return b.views - a.views;
      case "bestSelling":
        return b.sales - a.sales;
      case "biggestDiscount":
        return b.discount - a.discount;
      case "newest":
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const menuItem = menu.find((item) => item.category === segments[0]);
  const header = menuItem?.submenus.find(
    (item) => item.subcategory === segments[1]
  );

  return (
    <div className='space-'>
      <Breadcrumbs />
      <h1 className='text-darker-black/70 font-bold md:text-xl my-1'>
        {subcategory ? "دسته‌بندی " + subcategory : productType}
      </h1>
      {subcategoryMenu && (
        <SubHeader
          header={header}
          category={segments[0]}
          subCatefory={segments[1]}
        />
      )}
      {!loading && filteredProducts?.length === 0 ? (
        <div className='col-span-full flex flex-col items-center justify-center border border-darker-black/10 rounded-lg p-6 bg-light/50 text-darker-black/60'>
          <svg
            className='w-12 h-12 mb-3 text-red'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z'
            />
          </svg>
          <p className='text-lg font-medium'>محصولی یافت نشد</p>
          <p className='text-lg font-medium'>
            ای دسته در حال بروز رسانی میباشد
          </p>
          <div className='loader'></div>
        </div>
      ) : (
        <div className='flex flex-col md:flex-row gap-4 md:mt-10 mt-5'>
          <div className='w-full flex md:items-start mb-5 z-30 items-center md:border-0 border-b border-darker-black/30 justify-between md:w-1/4 md:rounded md:p-4'>
            {filteredProducts && filteredProducts.length > 0 && (
              <FilterPanel
                onlyAvailable={onlyAvailable}
                setOnlyAvailable={setOnlyAvailable}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                allBrands={allBrands}
                selectedMaterials={selectedMaterials}
                setSelectedMaterials={setSelectedMaterials}
                allMaterials={allMaterials}
                selectedAgeRanges={selectedAgeRanges}
                setSelectedAgeRanges={setSelectedAgeRanges}
                allAgeRanges={allAgeRanges}
                selectedGenders={selectedGenders}
                setSelectedGenders={setSelectedGenders}
                allGenders={allGenders}
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
                allTypes={allTypes}
                selectedPatterns={selectedPatterns}
                setSelectedPatterns={setSelectedPatterns}
                allPatterns={allPatterns}
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
                allSizes={allSizes}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            )}
            <div className='justify-between items-center md:hidden block flex-1'>
              <SortDropdown
                sortOption={sortOption}
                setSortOption={setSortOption}
              />
            </div>
          </div>

          <div className='w-full md:w-3/4 space-y-4'>
            <div className='justify-between items-center md:flex hidden'>
              <SortDropdown
                sortOption={sortOption}
                setSortOption={setSortOption}
              />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <SkeltonCard key={i} />
                  ))
                : filteredProducts?.map((item) => (
                    <SubCategoryCard
                      key={item.productCode}
                      productCode={item.productCode}
                      discount={item.discount}
                      image={item.imageUrl}
                      title={item.name}
                      price={item.price}
                    />
                  ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
