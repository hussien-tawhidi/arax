export interface ProductResult {
  name: string;
  brand: string;
  category: string;
  price: number;
}

export interface SearchProps {
  onClose: () => void;
}
