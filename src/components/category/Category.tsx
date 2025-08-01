"use client";

import HeroSlider from "../home/hero/HerosSlider";
import Slide from "../home/special-offer/Slider";
import BestOffs from "../home/BestOffs";
import Banner from "./Banner";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { menu } from "../header/data";
import { productsData } from "@/products";
import { ProductType } from "../../../types/productTypes";

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
import CategoryMenu from "./CategoryMenu";
import axios from "axios";

interface brands {
  src: string;
  alt: string;
}

const categoriesData = {
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

export default function Category({ category }: { category: string }) {
  const [randomProducts, setRandomProducts] = useState<ProductType[]>([]);
  const [product, setProduct] = useState<ProductType[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const currentData = useMemo(
    () => categoriesData[category as keyof typeof categoriesData],
    [category]
  );

  const cate = menu.find((item) => item.category === category);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/products");
        setProduct(data);
        console.log("🚀 ~ getData ~ data:", data);
      } catch (error) {
        console.log("🚀 ~ getData ~ error:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // get rondom data
  useEffect(() => {
    if (!cate) {
      setRandomProducts([]);
      return;
    }

    const filtered = productsData.filter(
      (item) => item.category === cate?.title
    );
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setRandomProducts(shuffled.slice(0, 10));
  }, [cate]);

  // most sales
  const mostSales = product?.filter((item) => item.sales > 270);

  // most discount
  const mostDiscount = product?.filter(
    (item) => item.discount > 25 || item.discount > 10
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
        {/* <Menu data={cate?.submenus} /> */}
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

        {/* most discount */}
        <Slide products={mostDiscount} discount loading={loading} />
        <BestOffs data={currentData.offs} />
        <div className='my-10'>
          <Banner
            imageSm={currentData.banners[0]?.imageSm}
            imagelg={currentData.banners[0]?.imagelg}
          />
        </div>
        {/* most sales */}
        <Slide
          products={mostSales}
          loading={loading}
          // banner='/images/category/women/poster-2.jpg'
          special
        />
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
        {currentData.brands?.length > 0 && (
          <div className='py-10'>
            <h4 className='text-cente my-3 py-2 md:text-xl font-bold relative text-darker-black/80'>
              <span className='absolute bottom-0 right-0  w-[70px] h-[5px] rounded-xl bg-red'></span>
              برندهای محبوب
            </h4>

            <div className='grid md:grid-cols-8 grid-cols-4 md:gap-5 gap-3'>
              {currentData.brands.map((b: brands, index) => (
                <Image
                  key={index}
                  src={b.src}
                  alt={b.alt}
                  width={300}
                  height={300}
                  className='object-cover'
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
