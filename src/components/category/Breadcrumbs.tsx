"use client";

import Link from "next/link";
import { menu } from "../header/data";
import { usePathname } from "next/navigation";

function generateFriendlyLabels() {
  const labels: Record<string, string> = {};

  menu.forEach((category) => {
    if (category.category && category.title) {
      labels[category.category] = category.title;
    }

    if (Array.isArray(category.submenus)) {
      category.submenus.forEach((sub) => {
        if (sub.subcategory && sub.title) {
          labels[sub.subcategory] = sub.title;
        }

        if (Array.isArray(sub.items)) {
          sub.items.forEach((item) => {
            if (item.productType && item.title) {
              labels[item.productType] = item.title;
            }
          });
        }
      });
    }
  });

  return labels;
}

const friendlyLabels = generateFriendlyLabels();

export default function Breadcrumbs({ name }: { name?: string }) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <nav
      className='text-sm breadcrumbs py-2 px-4 text-darker-black/60'
      aria-label='breadcrumb'>
      <ol className='flex'>
        <li className='relative group'>
          <Link
            href={"/"}
            className='block overflow-hidden
          skew-x-[-20deg] relative
          sm:px-4 px-3 sm:py-2 py-1 border border-darker-black/70'>
            <span className='block skew-x-[20deg] sm:text-[12px] text-[8px]'>
              آراکس
            </span>
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const label =
            isLast && name ? name : friendlyLabels[segment] ?? segment;
          const href = "/" + pathSegments.slice(0, index + 1).join("/");

          return (
            <li key={href} className={`relative group`}>
              <Link
                href={isLast ? "#" : href}
                className={`
            block
            sm:px-4 px-3 sm:py-2 py-1 border border-darker-black/70
            ${isLast ? "bg-darker-black/70 text-light " : "bg-light"}
            relative
            overflow-hidden
            skew-x-[-20deg]
          `}>
                <span className='block skew-x-[20deg] sm:text-[12px] text-[8px]'>
                  {label}
                </span>
              </Link>
              {!isLast && (
                <span
                  className={`
              w-0 h-0 opacity-0
              border-t-8 border-b-8 border-l-8
              border-transparent border-l-blue-500
              absolute top-1/2 transform -translate-y-1/2
              ${
                index === pathSegments.length - 2
                  ? "hidden"
                  : "ltr:right-0 rtl:left-0"
              }
            `}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
