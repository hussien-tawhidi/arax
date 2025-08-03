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
  recentSearches: string[];
  results: ProductResult[];
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (term: string) => void;
  onSelectResult: (term: string) => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

export interface SearchProps {
  onClose: () => void;
}