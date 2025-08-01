"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

interface Product {
  title: string;
  image: string;
  id: number;
  desc: string;
}

interface Props {
  products: Product[];
}

function AraxMagezineSlider({ products }: Props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrow: true,
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
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={`rounded-xl w-full`}>
      <Slider {...settings}>
        {products.map((item, index) => (
          <div key={index}>
            <div className='relative mx-2 flex justify-center rounded group overflow-hidden'>
              <Image
                src={item.image}
                alt={`عکس ${item.title}`}
                width={300}
                height={300}
                className='object-cover h-[300px] w-full'
              />
              <div className='absolute top-0 left-auto right-auto h-full items-center  bg-red/80 translate-x-full transition-all duration-300 group-hover:translate-x-0 flex w-full justify-center text-light'>
                <div className='text-center flex flex-col px-4 py-7 max-w-md mx-auto'>
                  <h2 className='text-xl font-bold mb-2'>{item.title}</h2>
                  <p className='text-sm text-darker-black/50 mb-1'>{item.desc}</p>
                  <button className='bg-light transition text-darker-black text-sm px-4 py-2 rounded-md'>
                    اطلاعات بیشتر
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AraxMagezineSlider;
