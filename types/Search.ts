import { RecentSearchType } from "@/components/header/search/Search";

export interface ProductResult {
  _id?: string;
  name: string;
  brand: string;
  category: string;
  productCode?: string;
  price: number;
  imageUrl?: string[];
}

export interface SearchModalProps {
  query: string;
  setQuery: (q: string) => void;
  recentSearches: RecentSearchType[];
  results: ProductResult[];
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (term: string) => void;
  onSelectResult: (term: RecentSearchType) => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

export interface SearchProps {
  onClose: () => void;
}
