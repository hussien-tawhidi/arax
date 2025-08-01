"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import AddBtn from "../AddBtn";
import TabelRowsLoader from "../TabelRowsLoader";
import Pagination from "./Pagination";
import ProductTableRow from "./ProductTableRow";
import { ApiResponseType, tableHeaders } from "./data";

export default function AdminProducts() {
  const [data, setData] = useState<ApiResponseType>({
    products: [],
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const itemsPerPage = 10;

  const fetchProducts = async (page: number) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/products/admin-pagination?page=${page}&limit=${itemsPerPage}`
      );
      setData(data);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`/api/products/${id}`);
      // Refresh current page after deletion
      fetchProducts(data.currentPage);
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      setError("Failed to delete product");
    }
  };

  const handlePageChange = (page: number) => {
    fetchProducts(page);
  };

  if (error) return <p className='p-4 text-red-500'>{error}</p>;

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>مدیریت محصولات</h2>
      <AddBtn link='/admin/products/add-products' title='افرودن محصول جدید' />
      <div className='overflow-x-auto rounded-lg mt-5'>
        <table className='min-w-full table-auto'>
          <thead className=''>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header.key} className='px-4 py-2 text-right'>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: itemsPerPage }).map((_, index) => (
                  <TabelRowsLoader key={index} />
                ))
              : data.products.map((product) => (
                  <ProductTableRow
                    key={product._id}
                    product={product}
                    onDelete={handleDelete}
                  />
                ))}
          </tbody>
        </table>
        <Pagination
          currentPage={data.currentPage}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
