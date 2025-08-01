export interface ReviewType {
  id: string;
  username: string;
  rating: number; // 1 to 5 stars
  comment: string;
  date?: string; // ISO date string
}

export interface ProductType {
  _id: string;
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
  brand: string;
  stock: number;
  views: number;
  sales: number;
  material: string;
  createdAt: string; // or Date if you parse it
  ageRange: string;
  gender: string;
  pattern: string;
  reviews?: ReviewType[];
}
export interface Category {
  _id: string;
  name: string;
}