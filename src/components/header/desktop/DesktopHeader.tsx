"use client";

import { useEffect, useState } from "react";
import { menu } from "../data";
import { AnimatePresence, motion } from "framer-motion";
import Submenu from "../menus/SubMenu";
import { useRouter } from "next/navigation";
import { CiGift, CiShoppingBasket } from "react-icons/ci";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaSprayCanSparkles } from "react-icons/fa6";
import { LiaChildSolid } from "react-icons/lia";
import { LuTvMinimal } from "react-icons/lu";
import { PiDressThin, PiLampLight, PiShirtFolded } from "react-icons/pi";

const iconMap = {
  PiDressThin: <PiDressThin />,
  PiShirtFolded: <PiShirtFolded />,
  LiaChildSolid: <LiaChildSolid />,
  FaSprayCanSparkles: <FaSprayCanSparkles />,
  PiLampLight: <PiLampLight />,
  LuTvMinimal: <LuTvMinimal />,
  FaMapMarkedAlt: <FaMapMarkedAlt />,
  CiShoppingBasket: <CiShoppingBasket />,
  CiGift: <CiGift />,
}as const;
type IconKeys = keyof typeof iconMap;
export default function DesktopHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Close mobile menu on Esc key press
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
      if (e.key === "Escape" && openIndex !== null) {
        setOpenIndex(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, openIndex]);

  // Handlers for desktop menu open/close
  const handleMouseEnter = (index: number) => setOpenIndex(index);
  const handleMouseLeave = () => setOpenIndex(null);
  const router = useRouter();

  return (
    <nav className='relative z-40' aria-label='Primary navigation'>
      {/* Desktop Menu */}
      <ul
        className='hidden md:flex text-sm whitespace-nowrap overflow-hidden font-medium justify-center mx-auto py-5'
        onMouseLeave={handleMouseLeave}>
        {menu.map((m, i) => (
          <li
            key={i}
            className=' cursor-pointer lg:px-3 px-1'
            onMouseEnter={() => handleMouseEnter(i)}
            onFocus={() => setOpenIndex(i)}
            onBlur={() => setOpenIndex(null)}
            aria-haspopup={m.submenus?.length > 0 ? "true" : undefined}
            tabIndex={0}>
            <span
              onClick={() => {
                setOpenIndex(null);
                router.push(`/${m.category}`);
              }}
              className={`hover:text-primary  text-[16px] flex gap-1 items-center transition-colors ${
                openIndex === i ? "text-darker-black" : "text-darker-black/60"
              }`}>
              {iconMap[m.icon as IconKeys] ?? null}
              {m.title}
            </span>

            {/* AnimatePresence controls mounting/unmounting animation */}
            <AnimatePresence>
              {openIndex === i && m.submenus?.length > 0 && (
                <motion.div
                  key='submenu'
                  role='menu'
                  aria-label={`${m.title} submenu`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className='absolute top-full right-0 left-0  bg-light rounded shadow-lg p-4 z-50 w-[80vw] mx-auto'>
                  <div className='grid lg:grid-cols-5 grid-cols-2 gap-3'>
                    {m.submenus.map((submenu) => (
                      <Submenu
                        key={submenu.title}
                        submenu={submenu}
                        category={m.category}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
        <li className=' cursor-pointer lg:px-3 px-2'>
          <span
            onClick={() => router.push(`/contact-us`)}
            className={`hover:text-primary  text-[16px] flex gap-1 text-darker-black/60 items-center transition-colors`}>
            ارتباط با ما
          </span>
        </li>
      </ul>
    </nav>
  );
}
