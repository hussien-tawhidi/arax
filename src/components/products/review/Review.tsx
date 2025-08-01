"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { GoStarFill } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";

interface Rating {
  price: number;
  quality: number;
  buyingCost: number;
}

interface usertype{
  name?: string
  avatar?: string
  phone?: string
  email?:string
}

export interface ReviewType {
  _id: string;
  username: string;
  rating: Rating;
  comment: string;
  date?: string;
  title?: string;
  isApproved: boolean;
  isRecommended?: boolean;
  createdAt?: Date;
 
  productId?: string;
  user?: usertype;
}

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(`/api/comments/${productId}`);
        console.log("🚀 ~ fetchComments ~ data:", data.comments)
       
        setReviews(data.comments || []);
      } catch (error) {
        console.error("❌ Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [productId]);

  const ratingLabels: Record<keyof Rating, string> = {
    price: "قیمت",
    quality: "کیفیت",
    buyingCost: "ارزش خرید",
  };

  const formatDate = (d?: string | Date) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("fa-IR");
  };

  const approvedReviews = reviews.filter((r) => r.isApproved);

  return (
    <div className='space-y-4 mt-6'>
      {approvedReviews.length === 0 ? (
        <p className='text-sm text-gray-500'>
          نظری برای این محصول ثبت نشده است.
        </p>
      ) : (
        approvedReviews.map((review) => (
          <div
            key={review._id}
            className='border border-darker-black/10 rounded-lg p-4 space-y-3 shadow-sm'>
            {/* Header: Username & Date */}
            <div className='flex items-center justify-between'>
              <div className='text-sm font-semibold text-darker-black/80'>
                {review.username}
              </div>
              <div className='text-xs text-darker-black/40'>
                {formatDate(review.date || review.createdAt)}
              </div>
            </div>

            {/* Title (optional) */}
            {review.title && (
              <div className='text-base font-medium text-darker-black'>
                {review.title}
              </div>
            )}

            {/* Comment */}
            <div className='text-darker-black/70 text-sm leading-relaxed'>
              {review.comment}
            </div>

            {/* Recommendation (optional) */}
            {review.isRecommended && (
              <div className='flex items-center gap-2 text-green text-sm font-medium'>
                <FaCheckCircle className='text-green' />
                پیشنهاد می‌کنم این محصول را بخرید
              </div>
            )}

            {/* Ratings */}
            <div className='space-y-1 text-sm text-darker-black/80'>
              {(Object.keys(ratingLabels) as (keyof Rating)[]).map((key) => (
                <div key={key} className='flex items-center gap-2'>
                  <span>{ratingLabels[key]}</span>
                  <div className='flex items-center gap-1'>
                    {Array.from({ length: 5 }, (_, i) => (
                      <GoStarFill
                        key={i}
                        className={
                          i < review.rating[key] ? "text-red" : "text-gray-300"
                        }
                      />
                    ))}
                    <span className='text-darker-black/40 text-xs'>
                      ({review.rating[key]})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
