"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddBtn from "../AddBtn";
import TableActions from "../TableActions";
import TabelRowsLoader from "../TabelRowsLoader";
import ErrorMsg from "../ErrorMsg";

type Category = {
  _id: string;
  category: { name: string };
};

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  console.log("🚀 ~ AdminCategories ~ categories:", categories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/categories");
        setCategories(data.categories);
        console.log("✅ دریافت دسته‌بندی‌ها:", data);
      } catch (err) {
        console.error("❌ خطا در دریافت دسته‌بندی‌ها:", err);
        setError("خطا در بارگذاری دسته‌بندی‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("آیا از حذف این دسته‌بندی مطمئن هستید؟")) return;

    setLoading(true);
    try {
      await axios.delete(`/api/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("❌ Error deleting category:", err);
      setError("خطا در حذف دسته‌بندی");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <ErrorMsg text={error} />;

  return (
    <div className='px-4 pt-10'>
      <h2 className='text-xl font-bold mb-4 text-darker-black/60'>
        مدیریت دسته‌بندی‌ها
      </h2>

      <AddBtn link='/admin/categories/add' title='افزودن دسته بندی' />

      <div className='overflow-x-auto rounded-lg mt-5'>
        <table className='min-w-full table-auto text-right'>
          <thead className='text-darker-black/70'>
            <tr>
              {["شناسه", "نام دسته", "عملیات"].map((item, index) => (
                <th key={index} className='px-4 py-2'>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TabelRowsLoader key={index} />
              ))
            ) : categories.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className='text-center py-6 text-darker-black/50'>
                  هیچ دسته‌بندی‌ای یافت نشد.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category._id} className='hover:bg-darker-black/10'>
                  <td className='px-4 py-2 text-darker-black/60 border-b border-darker-black/30'>
                    {category._id}
                  </td>
                  <td className='px-4 py-2 text-darker-black/60 border-b border-darker-black/30'>
                    {category.category.name}
                  </td>
                  <td className='px-4 py-2 text-center border-b border-darker-black/30'>
                    <TableActions
                      onEdit={() =>
                        router.push(`/admin/categories/${category._id}`)
                      }
                      onDelete={() => handleDelete(category._id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
