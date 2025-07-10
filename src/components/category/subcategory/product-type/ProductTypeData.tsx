import { productsData } from "@/products";
import Subcategory from "../Subcategory";

export default function ProductType({
  productType,
  subcategoryMenu,
}: {
  productType?: string;
  subcategoryMenu?: boolean;
}) {
  const data = productsData.filter((item) => item.type === productType);
  return (
    <Subcategory
      productsData={data}
      subcategoryMenu={subcategoryMenu}
      productType={productType}
    />
  );
}
