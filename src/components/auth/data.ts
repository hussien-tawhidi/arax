import {
  FaClipboardList,
  FaHeart,
  FaComment,
  FaTicketAlt,
  FaCreditCard,
} from "react-icons/fa";
import { BiUser } from "react-icons/bi";

export const userMenuItems = [
  {
    title: "سفارش های من",
    href: "",
    icon: FaClipboardList,
  },
  {
    title: "علاقه‌مندی‌ها",
    href: "/wishlist",
    icon: FaHeart,
  },
  {
    title: "حساب کاربری",
    href: "/profile",
    icon: BiUser,
  },
  {
    title: "نظرات ثبت شده",
    href: "/reviews",
    icon: FaComment,
  },
  {
    title: "تیکت‌ها",
    href: "/tickets",
    icon: FaTicketAlt,
  },
  {
    title: "اطلاعات حساب بانکی",
    href: "/bank-info",
    icon: FaCreditCard,
  },
];
