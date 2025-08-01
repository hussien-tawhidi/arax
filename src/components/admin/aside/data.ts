import { IconType } from "react-icons";
import { CiPercent } from "react-icons/ci";
import { FaTachometerAlt, FaShoppingCart } from "react-icons/fa";
import { LiaComment } from "react-icons/lia";
import { PiUsersFourThin } from "react-icons/pi";
import { SiDatabricks } from "react-icons/si";
export interface SidebarItem {
  label: string;
  href: string;
  icon: IconType;
}

export const sidebarItems: SidebarItem[] = [
  { label: "داشبورد", href: "/admin", icon: FaTachometerAlt },
  {
    label: "مدیریت دسته بندی ها",
    href: "/admin/categories",
    icon: FaShoppingCart,
  },
  { label: "مدیریت محصولات", href: "/admin/products", icon: SiDatabricks },
  { label: "مدیریت کدهای تحفیف", href: "/admin/off-codes", icon: CiPercent },
  { label: "مدیریت نظرات", href: "/admin/comments", icon: LiaComment },
  { label: "مدیرت انبار", href: "/admin/storeroom", icon: FaShoppingCart },
  { label: "مدیریت کاربران", href: "/admin/users", icon: PiUsersFourThin },
];
