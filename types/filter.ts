export interface filterTypes {
  onlyAvailable: boolean;
  setOnlyAvailable: (value: boolean) => void;

  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  allBrands: string[];

  selectedMaterials: string[];
  setSelectedMaterials: (materials: string[]) => void;
  allMaterials: string[];

  selectedAgeRanges: string[];
  setSelectedAgeRanges: (ages: string[]) => void;
  allAgeRanges: string[];

  selectedGenders: string[];
  setSelectedGenders: (genders: string[]) => void;
  allGenders: string[];

  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  allTypes: string[];

  selectedPatterns: string[];
  setSelectedPatterns: (patterns: string[]) => void;
  allPatterns: string[];

  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
  allSizes: string[];

  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}
