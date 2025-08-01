"use client";

import { ReviewType } from "@/components/products/review/Review";
import { useToast } from "@/components/ToastContext";
import axios from "axios";
import { useEffect, useState } from "react";
import {IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

export default function AdminComments() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { addToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/comments");
        console.log("🚀 ~ fetchData ~ data:", data);
        setReviews(data.data);
      } catch (err) {
        console.error("❌ خطا در دریافت کمنت ها:", err);
        setError("خطا در بارگذاری کمنت ها");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (reviewId: string) => {
    setUploadingId(reviewId);
    try {
      const res = await fetch(`/api/comments/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isApproved: true }),
      });

      if (res.ok) {
        addToast(`کمنت تایید شد`, "success");
        setReviews((prev) =>
          prev.map((r) => (r._id === reviewId ? { ...r, isApproved: true } : r))
        );
      } else {
        addToast("خطا در هنگام تایید کمنت", "error");
      }
    } catch (error) {
      console.error("Error approving review:", error);
    } finally {
      setUploadingId(null);
    }
  };
  const handleDelete = async (reviewId: string) => {
    if (!window.confirm("آیا از حذف این محصول مطمئن هستید؟")) return;
    setLoading(true);
    try {
      await axios.delete(`/api/comments/${reviewId}`);
      setReviews((prev) => prev.filter((p) => p._id !== reviewId));
      addToast(`کمنت موفقانه حذف شد`, "success");
    } catch (err) {
      console.error("❌ خطا در حذف محصول:", err);
      setError("خطا در حذف محصول");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className='p-4 text-red'>{error}</p>;

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>مدیریت نظرات</h2>
      <div className='overflow-x-auto rounded-lg mt-5'>
        <table className='min-w-full table-auto text-right'>
          <thead className='bg-darker-black/5 text-darker'>
            <tr>
              <th className='px-4 py-2'>شناسه</th>
              <th className='px-4 py-2'>نام کاربر</th>
              <th className='px-4 py-2'>موبایل کاربر</th>
              <th className='px-4 py-2'>متن نظر</th>
              <th className='px-4 py-2'>محصول</th>
              <th className='px-4 py-2'>وضعیت</th>
              <th className='px-4 py-2'>تاریخ نظر</th>
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
                    <td className='px-4 py-2 border-b'>
                      <div className='h-4 bg-gray-300 rounded w-32 mx-auto' />
                    </td>
                    <td className='px-4 py-2 border-b'>
                      <div className='h-4 bg-gray-300 rounded w-32 mx-auto' />
                    </td>
                    <td className='px-4 py-2 border-b'>
                      <div className='h-4 bg-gray-300 rounded w-32 mx-auto' />
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
              : reviews.map((review) => (
                  <tr key={review._id} className='hover:bg-darker-black/70/10'>
                    <td className=' border-b border-darker-black/70/30 text-darker-black/50 px-4 py-2 '>
                      ...{review._id.slice(0, 10)}
                    </td>
                    <td className='px-4 py-2 font-normal border-b border-darker-black/70/30 text-darker-black/50'>
                      {review?.user?.name}
                    </td>
                    <td className='px-4 py-2 border-b border-darker-black/70/30 text-darker-black/50'>
                      {review?.user?.phone}
                    </td>

                    <td className='px-4 py-2 border-b border-darker-black/70/30 text-darker-black/50'>
                      {review.comment.slice(0, 10)}...
                    </td>
                    <td className='px-4 py-2 border-b border-darker-black/70/30 text-darker-black/50'>
                      ...{review.productId && review.productId.slice(0, 10)}
                    </td>
                    <td className='px-4 py-2 text-sm border-b border-darker-black/70/30 text-darker-black/50'>
                      {review.isApproved === false ? (
                        <button
                          className='text-orange hover:text-green'
                          onClick={() => handleApprove(review._id)}
                          disabled={uploadingId === review._id}>
                          {uploadingId === review._id
                            ? "لطفا صبر کنید ..."
                            : "در حال بررسی (کلیک برای تایید)"}
                        </button>
                      ) : (
                        <span className='text-green flex items-center gap-1'>
                          <IoCheckmarkCircleOutline /> تایید شده
                        </span>
                      )}
                    </td>

                    <td className='px-4 py-2 text-sm border-b border-darker-black/70/30 text-darker-black/50'>
                      {review.createdAt &&
                        new Date(review?.createdAt).toLocaleString("fa-IR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                    </td>
                    <td className='px-4 py-2 border-b border-darker-black/70/30 text-darker-black/50 text-center space-x-2'>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className='text-red px-3 py-2 rounded border border-red/40 hover:bg-red hover:text-light'>
                        <MdDeleteOutline />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
