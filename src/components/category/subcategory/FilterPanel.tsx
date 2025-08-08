import FilterSection from "./FilterSection";
import CustomCheckbox from "./CustomCheckbox";
import { filterTypes } from "../../../../types/filter";
import PriceRangeSlider from "./PriceRangeSlider";
import { TbFilterSearch, TbFilterOff } from "react-icons/tb";
import { useState } from "react";

export default function FilterPanel({
  onlyAvailable,
  setOnlyAvailable,
  selectedBrands,
  setSelectedBrands,
  allBrands,
  selectedMaterials,
  setSelectedMaterials,
  allMaterials,
  selectedAgeRanges,
  setSelectedAgeRanges,
  allAgeRanges,
  selectedGenders,
  setSelectedGenders,
  allGenders,
  selectedTypes,
  setSelectedTypes,
  allTypes,
  selectedPatterns,
  setSelectedPatterns,
  allPatterns,
  selectedSizes,
  setSelectedSizes,
  allSizes,
  priceRange,
  setPriceRange,
}: filterTypes) {
  const [showFilter, setShowFilter] = useState(false);

  // Check if any filter is active
  const isAnyFilterActive =
    onlyAvailable ||
    selectedBrands.length > 0 ||
    selectedMaterials.length > 0 ||
    selectedAgeRanges.length > 0 ||
    selectedGenders.length > 0 ||
    selectedTypes.length > 0 ||
    selectedPatterns.length > 0 ||
    selectedSizes.length > 0 ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 500000000;

  // Clear all filters
  const clearAllFilters = () => {
    setOnlyAvailable(false);
    setSelectedBrands([]);
    setSelectedMaterials([]);
    setSelectedAgeRanges([]);
    setSelectedGenders([]);
    setSelectedTypes([]);
    setSelectedPatterns([]);
    setSelectedSizes([]);
    setPriceRange([0, 500000000]);
  };

  return (
    <div className='relative flex-1 z-10'>
      {/* mobile filter show */}
      <div className='flex items-center md:hidden'>
        <button
          className='flex items-center px-3 py-1.5 w-full border-l border-t border-r border-darker-black/30 text-darker-black/80 sm:text-sm text-[14px] justify-center'
          onClick={() => setShowFilter(!showFilter)}>
          <TbFilterSearch />
          <span className='ml-2'>فیلتر</span>
        </button>
      </div>

      <div
        className={`space-y-3 ${
          showFilter
            ? "block absolute top-full bg-light right-0 left-0 z-10 p-4 shadow-lg"
            : "hidden"
        } md:block`}>
        {/* Clear All Button (Desktop) */}
        {isAnyFilterActive && (
          <button
            onClick={clearAllFilters}
            className='flex items-center rounded py-1.5 justify-center border border-red/50 w-full text-red sm:text-sm mb-2 text-[10px]'>
            <TbFilterOff className='ml-1' />
            <span>حذف همه فیلترها</span>
          </button>
        )}

        {/* ✅ Only Available */}
        <CustomCheckbox
          id='onlyAvailable'
          checked={onlyAvailable}
          onChange={() => setOnlyAvailable(!onlyAvailable)}
          label='فقط کالاهای موجود'
        />

        {/* ✅ Brand */}
        <FilterSection
          title='برند'
          allItems={allBrands}
          selectedItems={selectedBrands}
          setSelectedItems={setSelectedBrands}
        />

        {/* ✅ Material */}
        <FilterSection
          title='جنس'
          allItems={allMaterials}
          selectedItems={selectedMaterials}
          setSelectedItems={setSelectedMaterials}
        />

        {/* ✅ Age Range */}
        <FilterSection
          title='رده سنی'
          allItems={allAgeRanges}
          selectedItems={selectedAgeRanges}
          setSelectedItems={setSelectedAgeRanges}
        />

        {/* ✅ Gender */}
        <FilterSection
          title='جنسیت'
          allItems={allGenders}
          selectedItems={selectedGenders}
          setSelectedItems={setSelectedGenders}
        />

        {/* ✅ Type */}
        <FilterSection
          title='نوع'
          allItems={allTypes}
          selectedItems={selectedTypes}
          setSelectedItems={setSelectedTypes}
        />

        {/* ✅ Pattern */}
        <FilterSection
          title='طرح'
          allItems={allPatterns}
          selectedItems={selectedPatterns}
          setSelectedItems={setSelectedPatterns}
        />

        {/* ✅ Size */}
        <FilterSection
          title='سایز'
          allItems={allSizes}
          selectedItems={selectedSizes}
          setSelectedItems={setSelectedSizes}
        />

        {/* ✅ Price Slider */}
        <PriceRangeSlider
          value={priceRange}
          onChange={setPriceRange}
          min={0}
          max={500000000}
        />
      </div>
    </div>
  );
}
