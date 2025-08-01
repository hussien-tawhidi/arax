"use client";

import AraxMagezineSlider from "./AraxMagezineSlider";

const data = [
  {
    id: 1,
    image: "/images/magezine/blog-poster-4.jpg",
    title: "رهنمایی خرید پیراهن مردانه",
    desc: "",
    link: "/",
  },
  {
    id: 2,
    image: "/images/magezine/blog-poster-2.jpg",
    title: "بهترین کرم های مرطوب کننده",
    desc: "",
    link: "",
  },
  {
    id: 3,
    image: "/images/magezine/blog-poster-1.jpg",
    title: "کفش های طبی مناسب",
    desc: "",
    link: "/",
  },
  {
    id: 4,
    image: "/images/magezine/blog-poster-3.jpg",
    title: "ایا ضد افتاب ها باعث جوش زدن ها میشود",
    desc: "",
    link: "/",
  },
];
export default function AraxMagezine() {
  return (
    <div className='py-10 overflow-hidden border px-4 border-darker-black/10'>
      <p className="text-center font-semibold text-darker-black/80 mb-10 text-2xl">مجله آراکس</p>
      <AraxMagezineSlider products={data} />
    </div>
  );
}
