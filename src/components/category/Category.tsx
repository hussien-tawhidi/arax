/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import HeroSlider from "../home/hero/HerosSlider";
import Slide from "../home/special-offer/Slider";
import BestOffs from "../home/BestOffs";
import Banner from "./Banner";
import Breadcrumbs from "./Breadcrumbs";
import { menu } from "../header/data";
import { ProductType } from "../../../types/productTypes";
import CategoryMenu from "./CategoryMenu";
import {
  electronics,
  gifts,
  applliance,
  supermarket,
  beauty,
  kid,
  men,
  sport,
  women,
} from "./data";

interface Brand {
  src: string;
  alt: string;
}

interface CategoryData {
  hero: any[];
  offs: any[];
  banners: { imageSm: string; imagelg: string }[];
  brands?: Brand[];
}

const categoriesData: Record<string, CategoryData> = {
  women,
  men,
  kid,
  beauty,
  sport,
  applliance,
  supermarket,
  electronics,
  gifts,
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function Category({ category }: { category: string }) {
  const [randomProducts, setRandomProducts] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const currentData = useMemo(
    () => categoriesData[category as keyof typeof categoriesData],
    [category]
  );

  const cate = useMemo(
    () => menu.find((item) => item.category === category),
    [category]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get<ProductType[]>("/api/products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!cate || !products.length) {
      setRandomProducts([]);
      return;
    }

    const filtered = products.filter((item) => item.category === cate.title);
    const shuffled = shuffleArray(filtered);
    setRandomProducts(shuffled.slice(0, 10));
  }, [cate, products]);

  const mostSales = useMemo(
    () => products?.filter((item) => item.sales > 270),
    [products]
  );

  const mostDiscount = useMemo(
    () => products?.filter((item) => item.discount > 25),
    [products]
  );

  if (!currentData) {
    return (
      <div className='text-center text-red-600 py-10 font-bold'>
        دسته‌بندی یافت نشد!
      </div>
    );
  }

  return (
    <div className='pb-10'>
      <div className='lg:w-[80%] w-[95%] mx-auto'>
        <Breadcrumbs name={cate?.title} />
        <h1 className='text-darker-black/70 font-bold md:text-xl sm:my-3 my-1'>
          دسته‌بندی {cate?.title}
        </h1>

        <HeroSlider data={currentData.hero} />

        <div className='lg:pt-32 pt-16 flex items-center justify-center'>
          <ul className='hide-scrollbar w-full flex md:gap-16 gap-10 justify-center mx-auto overflow-x-auto whitespace-nowrap px-4'>
            {cate?.submenus.map((item, i) => (
              <CategoryMenu
                key={i}
                title={item.title}
                image={item.image}
                category={category}
                subcategory={item.subcategory}
              />
            ))}
          </ul>
        </div>

        <Slide products={mostDiscount} discount loading={loading} />
        <BestOffs data={currentData.offs} />

        <div className='my-10'>
          <Banner
            imageSm={currentData.banners[0]?.imageSm}
            imagelg={currentData.banners[0]?.imagelg}
          />
        </div>

        <Slide products={mostSales} loading={loading} special />

        {currentData.banners[1] && (
          <Banner
            imageSm={currentData.banners[1].imageSm}
            imagelg={currentData.banners[1].imagelg}
          />
        )}

        <Slide
          products={randomProducts}
          loading={loading}
          banner='/images/category/women/poster-3.jpg'
          special
        />

        {currentData.brands && currentData?.brands?.length > 0 && (
          <div className='py-10'>
            <h4 className='text-cente my-3 py-2 md:text-xl font-bold relative text-darker-black/80'>
              <span className='absolute bottom-0 right-0 w-[70px] h-[5px] rounded-xl bg-red'></span>
              برندهای محبوب
            </h4>

            <div className='grid md:grid-cols-8 grid-cols-4 md:gap-5 gap-3'>
              {currentData.brands.map((b, index) => (
                <Image
                  key={index}
                  src={b.src}
                  alt={b.alt}
                  width={300}
                  height={300}
                  className='object-cover'
                  priority={index < 4} // Only prioritize first 4 images
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
