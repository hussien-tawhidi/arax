import { GoStarFill } from "react-icons/go";
export interface ReviewType {
  id: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewComponentProps {
  review: ReviewType;
}

export default function Review({ review }: ReviewComponentProps) {
  return (
    <div className='border border-darker-black/10 rounded-lg p-4 space-y-2 my-3 shadow-sm'>
      <div className='flex items-center justify-between'>
        <div className='text-sm font-semibold text-darker-black/80'>
          {review.username}
        </div>
        <div className='flex items-center gap-1 text-yellow-500 text-sm'>
          {Array.from({ length: 5 }, (_, i) => (
            <GoStarFill
              key={i}
              className={
                i < review.rating ? "text-yellow-400" : "text-gray-300"
              }
            />
          ))}
          <span className='text-darker-black/50 text-xs'>({review.rating})</span>
        </div>
      </div>

      <p className='text-darker-black/70 text-sm'>{review.comment}</p>

      <div className='text-xs text-darker-black/40 text-left'>
        {new Date(review.date).toLocaleDateString("fa-IR")}
      </div>
    </div>
  );
}
