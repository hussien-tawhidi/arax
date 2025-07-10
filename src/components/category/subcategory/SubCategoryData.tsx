import React from "react";
import Subcategory from "./Subcategory";
import { productsData } from "@/products";

export default function SubCategoryData({
  subcategory,
  subcategoryMenu,
}: {
  subcategory?: string;
  subcategoryMenu: boolean;
  }) {
  const data = productsData.filter((item) => item.subcategory === subcategory);
  return (
    <Subcategory
      subcategory={subcategory}
      productsData={data}
      subcategoryMenu={subcategoryMenu}
    />
  );
}
