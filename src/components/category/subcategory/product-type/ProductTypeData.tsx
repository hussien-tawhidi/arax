"use client"

import Subcategory from "../Subcategory";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductType } from "../../../../../types/productTypes";

export default function ProductTypeComp({
  productType,
  subcategoryMenu,
}: {
  productType?: string;
  subcategoryMenu?: boolean;
}) {
  const [data, setData] = useState<ProductType[]>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get("/api/products");

        setData(data.filter((item: ProductType) => item.type === productType));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productType]);

  return (
    <Subcategory
      productsData={data}
      subcategoryMenu={subcategoryMenu}
      productType={productType}
      loading={loading}
    />
  );
}
