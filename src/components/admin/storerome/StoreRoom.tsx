/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import TabelRowsLoader from "../TabelRowsLoader";
import ErrorMsg from "../ErrorMsg";
import { useToast } from "@/components/ToastContext";
import { ApiResponseType } from "../products/data";
import Pagination from "../products/Pagination";
import StockUpdateRow from "./StockUpdateRow";

export default function StoreRoom() {
  const [stockMap, setStockMap] = useState<Record<string, number>>({});
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [successMap, setSuccessMap] = useState<Record<string, boolean>>({});

  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<ApiResponseType>({
    products: [],
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
  });
  const itemsPerPage = 10;

  const { addToast } = useToast();

  const fetchProducts = async (page: number) => {
    try {
      setFetchLoading(true);
      const { data } = await axios.get(
        `/api/products/admin-pagination?page=${page}&limit=${itemsPerPage}`
      );
      setData(data);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      setError("Failed to load products");
    } finally {
      setFetchLoading(false);
    }
  };
  useEffect(() => {
    if (data.products.length > 0) {
      const initialStock = data.products.reduce(
        (acc, product) => ({ ...acc, [product._id]: product.stock }),
        {}
      );
      setStockMap(initialStock);
    }
  }, [data]);

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handleUpdate = async (productId: string) => {
    setLoadingMap((prev) => ({ ...prev, [productId]: true }));
    setError("");
    setSuccessMap((prev) => ({ ...prev, [productId]: false }));

    try {
      const formData = new FormData();
      formData.append("stock", String(stockMap[productId]));

      await axios.put(`/api/products/stock/${productId}`, formData);
      addToast("موجودی محصول موفقانه بروز رسانی شد", "success");
    } catch (err: any) {
      console.error("❌ Error updating product:", err);
      setError(err.response?.data?.message || "خطا در بروزرسانی موجودی");
    } finally {
      setLoadingMap((prev) => ({ ...prev, [productId]: false }));

      setTimeout(() => {
        setSuccessMap((prev) => ({ ...prev, [productId]: false }));
      }, 2000);
    }
  };
  const handlePageChange = (page: number) => {
    fetchProducts(page);
  };
  return (
    <div className='w-[90%] mx-auto mt-10 p-6 rounded-xl shadow'>
      <h2 className='text-xl font-bold mb-4'>بروزرسانی انبار</h2>
      {error && <ErrorMsg text={error} />}
      <table className='min-w-full table-auto text-right'>
        <thead className='text-darker-black/70'>
          <tr>
            <th className='px-4 py-2'>عکس محصول</th>
            <th className='px-4 py-2'>نام محصول</th>
            <th className='px-4 py-2'>موجودی</th>
          </tr>
        </thead>
        <tbody>
          {fetchLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TabelRowsLoader key={index} />
            ))
          ) : data.products.length > 0 ? (
            data.products.map((product) => (
              <StockUpdateRow
                key={product._id}
                product={product}
                stockMap={stockMap}
                setStockMap={setStockMap}
                loadingMap={loadingMap}
                successMap={successMap}
                handleUpdate={handleUpdate}
              />
            ))
          ) : (
            <tr>
              <td colSpan={3} className='text-center py-4 text-darker-black/50'>
                محصولی یافت نشد
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
