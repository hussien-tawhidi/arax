import { SortOption } from "@/components/category/subcategory/SortDropdown";

export interface Product {
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  imageUrl: string[];
  colorsAvailable: string[];
  sizesAvailable: string[];
  category: string;
  subcategory: string;
  type: string;
  productCode: string;
  description: string;
  material: string;
  brand: string;
  stock: number;
  views: number;
  sales: number;
  createdAt: string;
}

export function sortProducts(products: Product[], sortOption: SortOption) {
  const sorted = [...products];

  switch (sortOption) {
    case "cheapest":
      return sorted.sort((a, b) => a.price - b.price);
    case "mostExpensive":
      return sorted.sort((a, b) => b.price - a.price);
    case "mostViewed":
      return sorted.sort((a, b) => b.views - a.views);
    case "bestSelling":
      return sorted.sort((a, b) => b.sales - a.sales);
    case "biggestDiscount":
      return sorted.sort((a, b) => b.discount - a.discount);
    case "newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
}
