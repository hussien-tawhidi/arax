"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddBtn from "../AddBtn";
import TableActions from "../TableActions";

interface UserTypes {
  _id: string;
  name: string;
  phone: string;
  email: number;
  avatar: string;
  role: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/users");
        setUsers(data.users);
        console.log("🚀 ~ fetchData ~ data:", data);
      } catch (err) {
        console.error("❌ خطا در دریافت کاربران:", err);
        setError("خطا در بارگذاری کاربران");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("آیا از حذف این کاربر مطمئن هستید؟")) return;
    setLoading(true);
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ خطا در حذف کاربر:", err);
      setError("خطا در حذف کاربر");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className='p-4 text-red'>{error}</p>;

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>مدیریت محصولات</h2>

      <AddBtn link='/admin/users/add-user' title='افزودن کاربر جدید' />
      <div className='overflow-x-auto rounded-lg mt-5'>
        <table className='min-w-full table-auto text-right'>
          <thead className=' text-darker-black'>
            <tr>
              <th className='px-4 py-2'>عکس کاربر</th>
              <th className='px-4 py-2'>نام کاربر</th>
              <th className='px-4 py-2'>موبایل</th>
              <th className='px-4 py-2'>ایمیل</th>
              <th className='px-4 py-2'>وضعیت</th>
              <th className='px-4 py-2 text-center'>عملیات</th>
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
                    <td className='px-4 py-2 border-b text-center' colSpan={4}>
                      <div className='flex justify-center gap-2'>
                        <div className='h-6 w-6 bg-gray-300 rounded-full' />
                        <div className='h-6 w-6 bg-gray-300 rounded-full' />
                      </div>
                    </td>
                  </tr>
                ))
              : users.map((user) => (
                  <tr key={user._id} className='hover:bg-darker-black/70/10'>
                    <td className=' border-b border-darker-black/70/30 text-darker-black/50 px-4 py-2 '>
                      <Image
                        src={user?.avatar || "/avatar.jpeg"}
                        alt={user.name}
                        width={50}
                        height={50}
                        className='object-cover w-16 h-16 rounded-full'
                      />
                    </td>
                    <td className='px-4 py-2 font-normal border-b border-darker-black/70/30 text-darker-black/50'>
                      {user.name}
                    </td>
                    <td className='px-4 py-2 border-b border-darker-black/70/30 text-darker-black/50'>
                      {user.phone}
                    </td>

                    <td className='px-4 py-2 border-b border-darker-black/70/30 text-darker-black/50'>
                      {user.email}
                    </td>
                    <td className='px-4 py-2 border-b border-darker-black/70/30 text-darker-black/50'>
                      {user.role}
                    </td>
                    <td className='px-4 py-2 border-b border-darker-black/70/30 text-darker-black/50 text-center space-x-2'>
                      <TableActions
                        onDelete={() => handleDelete(user._id)}
                        onEdit={() => router.push(`/admin/users/${user._id}`)}
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
