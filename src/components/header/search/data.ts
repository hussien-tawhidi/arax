export const mostSearchedDummy = [
  {
    title: "کفش نایک مدل اسپرت راحت و بادوام",
    count: 32,
    image: "/images/search/nike.png",
    date: "2025-08-01",
  },
  {
    title: "هدفون بی‌سیم بلوتوثی با کیفیت بالا",
    count: 28,
    image: "/images/special-offer/a1.png",
    date: "2025-07-29",
  },
  {
    title: "گوشی اپل آیفون با صفحه نمایش بزرگ",
    count: 22,
    image: "/images/special-offer/phone.png",
    date: "2025-07-28",
  },
  {
    title: "لپ‌تاپ دانشجویی سبک و پرقدرت برای کارهای روزمره",
    count: 19,
    image: "/images/special-offer/surface.png",
    date: "2025-07-27",
  },
  {
    title: "عینک آفتابی شیک و مقاوم در برابر UV",
    count: 17,
    image: "/images/menu/women/accessories/glass.png",
    date: "2025-07-26",
  },
  {
    title: "تلویزیون 4K با کیفیت تصویر فوق‌العاده",
    count: 15,
    image: "/images/special-offer/tv.png",
    date: "2025-07-25",
  },
  {
    title: "ساعت هوشمند با امکانات سلامتی و ورزشی پیشرفته",
    count: 14,
    image: "/images/special-offer/watch.png",
    date: "2025-07-24",
  },
];

export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // ⏱️ custom duration
      ease: "easeOut",
    },
  },
};
