"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineDiscount } from "react-icons/md";
import TableActions from "../TableActions";
import AddBtn from "../AddBtn";

interface Product {
  _id: string;
  code: string;
  discount: string;
  isActive: boolean;
  expireAt: string | number | Date;
}

export default function OffCodes() {
  const [discounts, setDiscounts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/off-codes");
        setDiscounts(data.data);
      } catch (err) {
        console.error("❌ خطا در دریافت کد های تخفیف:", err);
        setError("خطا در بارگذاری کدهای تخفیف");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("آیا از حذف این کد تخفیف مطمئن هستید؟")) return;
    setLoading(true);
    try {
      await axios.delete(`/api/off-codes/${id}`);
      setDiscounts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ خطا در حذف کد تحفیف:", err);
      setError("خطا در حذف تخفیف");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className='p-4 text-red'>{error}</p>;

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>مدیریت کد های تخفیف</h2>
      <AddBtn
        link='/admin/off-codes/add-off-code'
        title='افزودن کد تحفیف جدید'
      />
      <div className='rounded-lg mt-5'>
        {discounts.length > 0 ? (
          <table className='min-w-full table-auto text-right'>
            <thead className=' text-darker-black/70'>
              <tr>
                {[
                  "شناسه",
                  "کد تحفیف",
                  "درصد تحفیف",
                  "تاریخ انقصا",
                  "وضعیت",
                  "عملیات",
                ].map((header, index) => (
                  <th
                    key={index}
                    className={`px-4 py-2 ${
                      header === "عملیات" ? "text-center" : ""
                    }`}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className='animate-pulse'>
                      <td className='px-4 py-2 border-b'>
                        <div className='h-4 bg-gray-300 rounded w-24 mx-auto' />
                      </td>
                      <td className='px-4 py-2 border-b'>
                        <div className='h-4 bg-gray-300 rounded w-32 mx-auto' />
                      </td>
                      <td
                        className='px-4 py-2 border-b text-center'
                        colSpan={4}>
                        <div className='flex justify-center gap-2'>
                          <div className='h-6 w-6 bg-gray-300 rounded-full' />
                          <div className='h-6 w-6 bg-gray-300 rounded-full' />
                        </div>
                      </td>
                    </tr>
                  ))
                : discounts.map((d) => (
                    <tr key={d._id} className='hover:bg-darker-black/70/10'>
                      <td className=' border-b border-darker-black/15 text-darker-black/50 px-4 py-2 '>
                        {d._id}
                      </td>

                      <td className='px-4 py-2 border-b border-darker-black/15 text-darker-black/50'>
                        {d.code}
                      </td>
                      <td className='px-4 py-2 font-normal border-b border-darker-black/15 text-darker-black/50'>
                        {new Intl.NumberFormat("fa-IR").format(
                          Number(d.discount)
                        )}
                        %
                        <MdOutlineDiscount className='inline-block mr-2' />
                      </td>
                      <td className='px-4 py-2 font-thin text-sm border-b border-darker-black/15 text-darker-black/50'>
                        {new Date(d.expireAt).toLocaleString("fa-IR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className='px-4 py-2 border-b border-darker-black/15 text-darker-black/50'>
                        {!d.isActive ? (
                          <span
                            className='py-1 px-3 text-[10px] border border-red/50 text-red/70 rounded-full bg-green-50'
                            title='غیر فعال'>
                            غیر فعال
                          </span>
                        ) : (
                          <span
                            className='py-1 px-3 text-[10px] border border-green/50 text-green/70 rounded-full bg-green-50'
                            title='فعال'>
                            فعال
                          </span>
                        )}
                      </td>
                      <td className='px-4 py-2 border-b border-darker-black/15 text-darker-black/50 text-center space-x-2'>
                        <TableActions
                          onEdit={() =>
                            router.push(`/admin/off-codes/${d._id}`)
                          }
                          onDelete={() => handleDelete(d._id)}
                        />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        ) : (
          <p className='text-center w-full text-darker-black/70'>
            کد تحفیف ایجاد نشده
          </p>
        )}
      </div>
    </div>
  );
}
