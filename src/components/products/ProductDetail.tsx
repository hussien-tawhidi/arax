"use client";
import { menu } from "../header/data";
import ProductBreadCumb from "./ProductBreadCumb";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import ProductSpecs from "./ProductSpecs";
import dynamic from "next/dynamic";
import StickyCard from "./StickyCard";
import { useEffect, useState } from "react";
import ReviewForm from "./review/ReviewForm";
import axios from "axios";
import { ProductType } from "../../../types/productTypes";
import ProductDetailsLoader from "./ProductDetailsLoader";

const Slide = dynamic(() => import("../home/special-offer/Slider"), {
  ssr: false,
});

export default function ProductDetail({
  productCode,
}: {
  productCode: string;
}) {
  const [productDetail, setProductDetail] = useState<ProductType>();
  const [sameProduct, setSameProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/products");
        const found = data.find(
          (item: ProductType) => item.productCode === productCode
        );
        setProductDetail(found);

        if (found) {
          setSameProducts(
            data.filter((item: ProductType) => item.category === found.category)
          );
        } else {
          setSameProducts([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productCode]);

  if (loading) {
    return (
      <div className='max-w-6xl mx-auto p-4'>
        <ProductDetailsLoader />
      </div>
    );
  }

  if (!productDetail) {
    return (
      <div className='max-w-6xl mx-auto p-4 text-center text-red'>
        محصولی با این کد یافت نشد.
      </div>
    );
  }

  const category = menu.find((item) => item.title === productDetail.category);
  const subcategory = category?.submenus.find(
    (item) => item.title === productDetail.subcategory
  );

  const specs = [
    { key: "برند", value: productDetail.brand },
    { key: "جنس", value: productDetail.material },
    { key: "رنگ‌ها", value: productDetail.colorsAvailable?.join(" / ") },
    { key: "طرح", value: productDetail.pattern },
    { key: "رده سنی", value: productDetail.ageRange },
    { key: "جنسیت", value: productDetail.gender },
    { key: "توضیحات", value: productDetail.description },
  ].filter((item) => item.value);

  return (
    <div className='md:w-[90%] w-[98%] mx-auto p-4 font-sans'>
      <ProductBreadCumb
        category={
          category
            ? { category: category.category, title: category.title }
            : undefined
        }
        subcategory={
          subcategory
            ? { subcategory: subcategory.subcategory, title: subcategory.title }
            : undefined
        }
        product={{ name: productDetail.name }}
      />

      <div className='flex flex-col md:flex-row gap-6'>
        <ProductImages images={productDetail.imageUrl ?? []} />
        <ProductInfo product={productDetail} />
      </div>

      <Slide products={sameProduct.slice(0, 12)} special />

      <div className='relative'>
        <div className='flex gap-3'>
          <div className='md:w-[70%] w-full'>
            <ProductSpecs specs={specs} />
            <ReviewForm productId={productDetail?._id} />
          </div>
          <div className='w-[30%] md:block hidden h-full sticky top-0 right-0 left-0'>
            <StickyCard
              image={productDetail.imageUrl?.[0]}
              price={productDetail.price}
              title={productDetail.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
