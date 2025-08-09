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

function Slide({
  products,
  imageBg,
  banner,
  bg,
  discount,
  special,
  loading,
}: Props) {
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
        breakpoint: 600,
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
    <div className={`relative sm:py-5 pb-5 pt-2 rounded-xl sm:${bg}`}>
      <Slider {...settings}>
        {products?.map((item, index) => {
          const discountAmount = (item.price * item.discount) / 100;
          const finalPrice = item.price - discountAmount;

          return (
            <div key={index} className='relative sm:px-3 px-1 pb-8'>
              {/* Discount Badge */}

              {discount && item.discount > 0 && (
                <div
                  className='absolute top-0 left-3 z-10 flex items-center text-sm text-white font-bold uppercase text-center shadow-lg'
                  style={{
                    background: "linear-gradient(180deg, #9f1c32, #9f1c32)",
                    clipPath:
                      "polygon(51% 0, 100% 0, 100% 100%, 53% 80%, 0% 100%, 0 0)",
                    padding: "0.4rem",
                    width: "40px",
                  }}>
                  %{toPersianDigits(item.discount.toLocaleString())}
                </div>
              )}
              {special && (
                <div
                  className='absolute top-0 left-3 text-xs z-10 flex items-center text-white font-bold uppercase text-center shadow-lg'
                  style={{
                    background: "linear-gradient(180deg, #9f1c32, #9f1c32)",
                    clipPath:
                      "polygon(51% 0, 100% 0, 100% 100%, 53% 90%, 0% 100%, 0 0)",
                    padding: "0.4rem",
                    width: "50px",
                  }}>
                  فروش <br /> ویژه
                </div>
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
                    className='rounded-lg sm:w-44 sm:h-44 w-28 h-28 mx-auto object-cover'
                  />
                </div>

                <h2 className='sm:mt-3 mt-1 text-right text-darker-black/60 font-semibold text-sm line-clamp-2'>
                  {item.name.length > 15 ? (
                    <span className='whitespace-nowrap'>
                      ...{item.name.slice(0, 12)}
                    </span>
                  ) : (
                    item.name
                  )}
                </h2>

                {/* Pricing */}
                <div className='sm:mt-2 text-sm text-right'>
                  {item.discount > 0 ? (
                    <>
                      <div className='text-darker-black/40 flex  gap-3 line-through text-xs font-light'>
                        <p>
                          {toPersianDigits(item.price.toLocaleString("fa-IR"))}
                        </p>
                        تومان
                      </div>
                      <div className='text-darker-black/60 flex  gap-3 font-bold text-left'>
                        <p>
                          {" "}
                          {toPersianDigits(finalPrice.toLocaleString("fa-IR"))}
                        </p>
                        تومان
                      </div>
                    </>
                  ) : (
                    <div className='text-darker-black flex  gap-3 font-medium'>
                      <p>
                        {toPersianDigits(item.price.toLocaleString("fa-IR"))}
                      </p>
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
