"use client";

import Image from "next/image";
import Slider from "react-slick";
import { toPersianDigits } from "@/utils/priceConverter";
import { useRouter } from "next/navigation";
import { ProductType } from "../../../../types/productTypes";
import SkeltonCard from "./SkeltonCard";

interface Props {
  products?: ProductType[];
  imageBg?: string;
  banner?: string;
  bg?: string;
  discount?: boolean;
  special?: boolean;
  loading?: boolean;
}

function Slide({ products, imageBg, banner, bg, discount, special,loading }: Props) {
  const router = useRouter();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    rtl: true,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className='flex justify-center mt-4 gap-2'>{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className='w-3 h-1 rounded-full bg-light/60 hover:bg-red transition-all duration-300' />
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  if (loading) {
    return (
      <div className={`relative py-5 rounded-xl ${bg}`}>
        <Slider {...settings}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeltonCard key={idx} />
          ))}
        </Slider>
      </div>
    );
  }
  
  return (
    <div className={`relative py-5 rounded-xl ${bg}`}>
      <Slider {...settings}>
        {products?.map((item, index) => {
          const discountAmount = (item.price * item.discount) / 100;
          const finalPrice = item.price - discountAmount;

          return (
            <div key={index} className='relative sm:px-3 px-1 py-8'>
              {/* Discount Badge */}
              {discount && item.discount > 0 && (
                <span className='bg-red text-light p-1 rounded-br-xl text-xs absolute top-8 left-3 z-10'>
                  %{toPersianDigits(item.discount.toLocaleString())} تخفیف
                </span>
              )}
              {special && (
                <span className='text-red font-extrabold sm:p-2 p-1 rounded-br-xl text-xs absolute top-8 left-3 z-10'>
                  فروش ویژه
                </span>
              )}

              {/* Product Card */}
              <div
                onClick={() => router.push(`/products/${item.productCode}`)}
                className={`rounded-br-lg rounded-tr-lg rounded-bl-lg shadow-xl md:p-3 p-1.5 hover:shadow-lg transition-shadow duration-300 flex flex-col ${imageBg}`}>
                <div className={`overflow-hidden rounded-md`}>
                  <Image
                    src={item.imageUrl[0]}
                    alt={item.name}
                    width={300}
                    height={300}
                    className='rounded-lg w-44 h-44 mx-auto object-cover'
                  />
                </div>

                <h2 className='mt-3 text-right text-darker-black/60 font-semibold text-sm line-clamp-2'>
                  {item.name.length > 15 ? (
                    <span>...{item.name.slice(0, 15)}</span>
                  ) : (
                    item.name
                  )}
                </h2>

                {/* Pricing */}
                <div className='mt-2 text-sm text-right'>
                  {item.discount > 0 ? (
                    <>
                      <div className='text-darker-black/40 line-through text-xs font-light'>
                        {toPersianDigits(item.price.toLocaleString("fa-IR"))}{" "}
                        تومان
                      </div>
                      <div className='text-darker-black/60 font-bold text-left'>
                        {toPersianDigits(finalPrice.toLocaleString("fa-IR"))}{" "}
                        تومان
                      </div>
                    </>
                  ) : (
                    <div className='text-darker-black font-medium'>
                      {toPersianDigits(item.price.toLocaleString("fa-IR"))}{" "}
                      تومان
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {banner && (
          <div className='overflow-hidden md:pt-8 pt-10 '>
            <Image
              src={banner || "/"}
              alt={"poster"}
              width={300}
              height={300}
              property='all'
              className='rounded-lg  object-cover shadow-xl overflow-hidden'
            />
          </div>
        )}
      </Slider>
    </div>
  );
}

export default Slide;
