import type { Metadata } from "next";
import Sidebar from "@/components/admin/aside/Sidebar";

export const metadata: Metadata = {
  title: "پنل مدیریت فروشگاه آنلاین",
  description: "این پنل برای مدیریت فروشگاه آنلاین طراحی شده است.",
};

export default function adminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex'>
      <div className='flex-1/5'>
        <Sidebar />
      </div>
      <div className='flex-4/5'>{children}</div>
    </div>
  );
}
