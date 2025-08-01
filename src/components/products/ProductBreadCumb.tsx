import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";

interface Category {
  category?: string;
  title?: string;
}

interface Subcategory {
  subcategory?: string;
  title?: string;
}

interface Product {
  name: string;
}

interface Props {
  category?: Category;
  subcategory?: Subcategory;
  product?: Product;
}

export default function ProductBreadCumb({
  category,
  subcategory,
  product,
}: Props) {
  return (
    <nav className='flex flex-wrap items-center text-sm md:text-base text-darker-black/60 my-6 md:my-10 mb-4 space-x-1 rtl:space-x-reverse'>
      <Link
        href='/'
        className='hover:underline hover:text-darker-black/80 font-medium transition-colors'>
        آراکس
      </Link>
      <BiChevronLeft className='text-darker-black/40 w-4 h-4' />

      {category && (
        <>
          <Link
            href={`/${category.category}`}
            className='hover:underline hover:text-darker-black/80 font-medium transition-colors'>
            {category.title}
          </Link>
          <BiChevronLeft className='text-darker-black/40 w-4 h-4' />
        </>
      )}

      {subcategory && (
        <>
          <Link
            href={`/${category?.category}/${subcategory.subcategory}`}
            className='hover:underline hover:text-darker-black/80 font-medium transition-colors'>
            {subcategory.title}
          </Link>
          <BiChevronLeft className='text-darker-black/40 w-4 h-4' />
        </>
      )}

      {product && (
        <p className='text-darker-black/80 font-semibold'>{product.name}</p>
      )}
    </nav>
  );
}
