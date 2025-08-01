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
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 10,
    slidesToScroll: 3,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 10 } },
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 400, settings: { slidesToShow: 2 } },
    ],
  };
  const router = useRouter();

  return (
    <div className='relative p-2 overflow-hidden rounded-xl'>
      <Slider {...settings}>
        {header?.items.map((item, index) => (
          <div key={index} className='px-1 p-8 h-full'>
            <div className='shadow-xl text-darker-black/80 py-1 rounded-lg overflow-hidden'>
              <Image
                src={item.image}
                alt={item.title}
                width={60}
                onClick={() =>
                  router.push(`/${category}/${subCatefory}/${item.productType}`)
                }
                height={60}
                className='object-cover w-full h-[16vh] mx-auto border bg-pink-300'
              />
              <p className='font-medium text-nowrap sm:text-[12px] text-[10px] pb-2 text-center'>
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
