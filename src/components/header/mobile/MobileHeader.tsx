// import Menus from "../menus/menus";

import { BiHomeSmile } from "react-icons/bi";
import { RiMenuSearchLine, RiUser3Line } from "react-icons/ri";
import { TfiShoppingCartFull } from "react-icons/tfi";

export default function MobileHeader() {
  return (
    <div className='fixed z-30 bottom-0 left-0 right-0 bg-light'>
      <ul className='flex justify-between sm:w-[90%] w-[95%] mx-auto sm:py-5 py-3 border-t border-dark/30'>
        <li className='flex-1 flex items-center text-sm flex-col sm:text-xl text-dark/60 gap-1.5'>
          <RiUser3Line className='sm:text-[30px] text-[22px]' />
          <p>اراکس من</p>
        </li>

        <li className='flex-1 flex items-center text-sm flex-col sm:text-xl text-dark/60 gap-1.5'>
          <RiMenuSearchLine className='sm:text-[30px] text-[22px]' />
          <p>دسته‌بندی‌ها</p>
        </li>

        <li className='flex-1 flex items-center text-sm flex-col sm:text-xl text-dark/60 gap-1.5'>
          <BiHomeSmile className='sm:text-[30px] text-[22px]' />
          <p>خانه</p>
        </li>

        <li className='flex-1 flex items-center flex-col text-sm sm:text-xl text-dark/60 gap-1.5'>
          <TfiShoppingCartFull className='sm:text-[30px] text-[22px]' />
          <p>سبد خرید</p>
        </li>
      </ul>
    </div>
  );
}
