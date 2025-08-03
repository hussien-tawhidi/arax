export const mostSearchedDummy = [
  { term: "کفش نایک", count: 32 },
  { term: "هدفون بی‌سیم", count: 28 },
  { term: "کتونی ورزشی", count: 25 },
  { term: "گوشی سامسونگ", count: 22 },
  { term: "لپ‌تاپ دانشجویی", count: 19 },
  { term: "عینک آفتابی", count: 17 },
  { term: "تلویزیون 4K", count: 15 },
  { term: "ساعت هوشمند", count: 14 },
  { term: "کاور گوشی", count: 12 },
  { term: "کوله‌پشتی لپ‌تاپ", count: 10 },
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