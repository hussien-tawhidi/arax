import { ProductType } from "../../../../types/productTypes";

export const tableHeaders = [
  { key: "image", label: "عکس محصول" },
  { key: "name", label: "نام محصول" },
  { key: "category", label: "دسته بندی" },
  { key: "stock", label: "موجودی" },
  { key: "actions", label: "عملیات" },
];

export interface ApiResponseType {
  products: ProductType[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
