"use client";

import { useEffect, useState } from "react";
import Subcategory from "./Subcategory";
import { ProductType } from "../../../../types/productTypes";
import axios from "axios";

export default function SubCategoryData({
  subcategory,
  subcategoryMenu,
}: {
  subcategory?: string;
  subcategoryMenu: boolean;
}) {
  const [data, setData] = useState<ProductType[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get("/api/products");

        setData(
          data.filter((item: ProductType) => item.subcategory === subcategory)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [subcategory]);

  if (!data) {
    return (
      <div className='text-center text-red-600 py-10 font-bold'>
        دسته‌بندی یافت نشد!
      </div>
    );
  }
  return (
    <Subcategory
      subcategory={subcategory}
      productsData={data}
      subcategoryMenu={subcategoryMenu}
      loading={loading}
    />
  );
}
