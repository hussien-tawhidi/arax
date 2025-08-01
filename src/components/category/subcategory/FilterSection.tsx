"use client";

import { useState } from "react";
import CustomCheckbox from "./CustomCheckbox";
import { Transition } from "@headlessui/react";
import { BiChevronLeft } from "react-icons/bi";

interface Props {
  title: string;
  allItems: string[];
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
}

export default function FilterSection({
  title,
  allItems,
  selectedItems,
  setSelectedItems,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleItem = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  if (!allItems.length) return null;

  return (
    <div className='border md:px-3 px-2 md:py-2 py-1 rounded border-darker-black/20'>
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between text-darker-black/70 w-full hover:bg-light/5 transition'>
        <span className='md:text-md text-[12px]'>{title}</span>
        <BiChevronLeft
          className={`w-5 ${
            isOpen
              ? "-rotate-90 transition-all duration-300"
              : "rotate-0 transition-all duration-300"
          } h-5 text-darker-black/40`}
        />
      </button>

      {/* Collapsible Content */}
      <Transition
        show={isOpen}
        enter='transition-all duration-300 ease-in-out'
        enterFrom='opacity-0 max-h-0'
        enterTo='opacity-100 max-h-[500px]'
        leave='transition-all duration-300 ease-in-out'
        leaveFrom='opacity-100 max-h-[500px]'
        leaveTo='opacity-0 max-h-0'>
        <div className='overflow-hidden pl-2 mt-3'>
          {allItems.map((item) => (
            <div className='my-2' key={item}>
              <CustomCheckbox
                id={item}
                label={item}
                checked={selectedItems.includes(item)}
                onChange={() => toggleItem(item)}
              />
            </div>
          ))}
        </div>
      </Transition>
    </div>
  );
}
