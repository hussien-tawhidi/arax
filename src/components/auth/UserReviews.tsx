"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { faIR } from "date-fns/locale";
import { GoStarFill } from "react-icons/go";
import Image from "next/image";
import axios from "axios";

interface ReviewType {
  _id: string;
  name: string;
  comment: string;
  isApproved: boolean;
  isRecommended: boolean;
  createdAt: string;
  productId: {
    imageUrl: string[];
    slug: string;
    name: string;
  };
  rating: {
    price: number;
    quality: number;
    buyingCost: number;
  };
}

export default function UserReviews({ id }: { id?: string }) {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  useEffect(() => {
    // Replace with real API call
    const fetchReviews = async () => {
      const { data } = await axios.get(`/api/comments/user-comments/${id}`);
      console.log("🚀 ~ fetchReviews ~ data:", data);
      setReviews(data.comments || []);
    };

    fetchReviews();
  }, [id]);

  return (
    <div className='max-w-5xl mx-auto p-4' dir='rtl'>
      <h2 className='text-xl font-bold mb-4 text-darker-black/70'>نظرات من</h2>

      {reviews.length === 0 ? (
        <p className='text-darker-black/60'>شما هنوز نظری ثبت نکرده‌اید.</p>
      ) : (
        <div className='grid md:grid-cols-2 gap-4'>
          {reviews.map((review) => (
            <div
              key={review._id}
              className='border-b border-darker-black/20 p-4  hover:shadow-md transition'>
              <div className='flex gap-4'>
                <Image
                  width={200}
                  height={200}
                  src={review.productId.imageUrl[0]}
                  alt={review.productId.name}
                  className='w-24 h-24 rounded object-cover border'
                />
                <div className='flex-1'>
                  <p className='text-sm text-gray-600 mt-1'>{review.name}</p>

                  <div className='flex flex-col gap-1 mt-2 text-sm'>
                    <div className='flex items-center gap-1'>
                      <span className='text-darker-black/60'>قیمت:</span>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <GoStarFill
                          key={i}
                          className={`text-orange ${
                            i < review.rating.price
                              ? "opacity-100"
                              : "opacity-20"
                          }`}
                        />
                      ))}
                    </div>
                    <div className='flex items-center gap-1'>
                      <span className='text-darker-black/60'>کیفیت:</span>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <GoStarFill
                          key={i}
                          className={`text-orange ${
                            i < review.rating.quality
                              ? "opacity-100"
                              : "opacity-20"
                          }`}
                        />
                      ))}
                    </div>
                    <div className='flex items-center gap-1'>
                      <span className='text-darker-black/60'>ارزش خرید:</span>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <GoStarFill
                          key={i}
                          className={`text-orange ${
                            i < review.rating.buyingCost
                              ? "opacity-100"
                              : "opacity-20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className='mt-2 text-sm text-darker-black/70'>
                    {review.comment}
                  </p>

                  <div className='flex justify-between items-center mt-3 text-xs text-darker-black/60'>
                    <span>
                      {formatDistanceToNow(new Date(review.createdAt), {
                        addSuffix: true,
                        locale: faIR,
                      })}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        review.isApproved
                          ? "text-green bg-green/10"
                          : "text-orange bg-orange/10"
                      }`}>
                      {review.isApproved ? "تأیید شده" : "در انتظار تأیید"}
                    </span>
                  </div>

                  {review.isRecommended && (
                    <span className='inline-block mt-2 text-green-700 text-sm bg-green-100 px-2 py-1 rounded'>
                      خرید این محصول را توصیه می‌کنم
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
