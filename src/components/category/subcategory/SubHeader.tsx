"use client";
import "../../../app/style/subcate-slider.css";
import Image from "next/image";
import Slider from "react-slick";
import { useRouter } from "next/navigation";

interface SubHeaderProps {
  category?: string;
  subCatefory?: string;
  header?: {
    title?: string;
    items: { title: string; image: string; productType: string }[];
  };
}

export default function SubHeader({
  header,
  category,
  subCatefory,
}: SubHeaderProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 10,
    slidesToScroll: 3,
    dotsClass: "slick-dots floating-dots",
    customPaging: () => (
      <div className='dot-outer'>
        <div className='dot-inner'></div>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 10,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          dots: true,
        },
      },
    ],
  };
  const router = useRouter();

  return (
    <div className='relative md:p-5 p-3 overflow-hidden rounded-xl'>
      <Slider {...settings}>
        {header?.items.map((item, index) => (
          <div key={index} className='px-1 h-full'>
            <div className='text-darker-black/80 py-1 rounded-lg overflow-hidden'>
              <Image
                src={item.image}
                alt={item.title}
                width={60}
                onClick={() =>
                  router.push(`/${category}/${subCatefory}/${item.productType}`)
                }
                height={60}
                className='object-cover sm:w-16 w-8 sm:h-16 h-8 mx-auto border border-darker-black rounded-full'
              />
              <p className='font-medium text-nowrap text-[14px] pb-2 text-center'>
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
