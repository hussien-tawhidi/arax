"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImStarFull } from "react-icons/im";
import { MdKeyboardArrowDown } from "react-icons/md";

interface itemsProps {
  title: string;
  image: string;
}

export default function Submenu({
  submenu,
  category,
}: {
  submenu: { title: string; items: itemsProps[]; subcategory: string };
  category: string;
}) {
  const [showAll, setShowAll] = useState(false);

  const itemsToShow = showAll ? submenu.items : submenu.items.slice(0, 7);

  const router = useRouter();

  return (
    <div>
      <h4
        className='text-sm font-semibold mb-2 text-gray-700 flex gap-1'
        onClick={() => router.push(`/${category}/${submenu.subcategory}`)}>
        <ImStarFull className='text-red' />
        {submenu.title}
      </h4>
      <ul className='space-y-1' role='menuitem'>
        {itemsToShow.map((item, i) => (
          <li
            key={i}
            className='text-darker-black/60 text-[13px] hover:text-darker-black transition-colors cursor-pointer'
            tabIndex={0}>
            {item.title}
          </li>
        ))}
      </ul>

      {submenu.items.length > 7 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className='mt-1 text-primary text-xs font-semibold hover:underline text-darker-black/60 '>
          {showAll ? (
            <MdKeyboardArrowDown className='rotate-180' />
          ) : (
            <div className='flex items-center gap-1 flex-row-reverse'>
              <MdKeyboardArrowDown /> بیشتر
            </div>
          )}
        </button>
      )}
    </div>
  );
}
