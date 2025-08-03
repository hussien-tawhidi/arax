import { FaBoxOpen, FaTruck, FaReceipt, FaPercent } from "react-icons/fa";
import DiscountCode from "../checkout/DiscountCode";
import LocalizedPrice from "../ui/LocalizedPrice";

interface Props {
  totalPrice: number;
  deliveryCost: string | number;
  discountCode?: string;
  discountAmount?: number;
  code: string;
  setCode: (value: string) => void;
  applied: boolean;
  setApplied: (value: boolean) => void;
  handleSubmit: () => void;
  loading: boolean;
}

export default function OrderSummary({
  totalPrice,
  loading,
  deliveryCost,
  discountCode,
  discountAmount = 0,
  handleSubmit,
  code,
  applied,
  setApplied,
  setCode,
}: Props) {
  const finalPrice =
    totalPrice -
    discountAmount +
    (deliveryCost === "رایگان" ? 0 : Number(deliveryCost));

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("fa-IR").format(value) + " تومان";

  return (
    <div className='p-6 rounded-2xl space-y-5 border border-darker-black/20 sticky top-4 shadow-sm'>
      <h2 className='text-xl font-bold text-darker-black/90 border-b border-darker-black/10 pb-3'>
        خلاصه سفارش
      </h2>

      <div className='flex justify-between text-sm text-darker-black/70'>
        <div className='flex items-center gap-2'>
          <FaBoxOpen className='text-darker-black/40' />
          <span>مجموع قیمت کالاها</span>
        </div>
        <LocalizedPrice value={totalPrice} className='font-medium' />
      </div>

      <div className='flex justify-between text-sm text-darker-black/70'>
        <div className='flex items-center gap-2'>
          <FaTruck className='text-darker-black/40' />
          <span>هزینه ارسال</span>
        </div>
        <span className='font-medium text-green'>
          {deliveryCost === "رایگان"
            ? "رایگان"
            : formatPrice(Number(deliveryCost))}
        </span>
      </div>

      {discountAmount > 0 && (
        <div className='flex justify-between text-sm text-darker-black/70'>
          <div className='flex items-center gap-2'>
            <FaPercent className='text-darker-black/40' />
            <span>
              کد تخفیف
              {discountCode ? ` (${discountCode})` : ""}
            </span>
          </div>
          <span className='text-red font-medium'>
            {formatPrice(discountAmount)}
          </span>
        </div>
      )}

      <div className='border-t border-darker-black/10 pt-4 flex justify-between items-center text-base font-bold text-darker-black/90'>
        <div className='flex items-center gap-2'>
          <FaReceipt className='text-darker-black/50' />
          <span>مبلغ نهایی</span>
        </div>
        <LocalizedPrice value={finalPrice} className='font-medium' />
      </div>

      <DiscountCode
        code={code}
        setCode={setCode}
        applied={applied}
        setApplied={setApplied}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className='w-full mt-4 flex items-center justify-center gap-2 bg-red text-white py-3 rounded-xl font-bold text-sm hover:bg-dark-red transition'>
        {loading && (
          <svg
            className='animate-spin h-5 w-5 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            aria-hidden='true'>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
            />
          </svg>
        )}
        {loading ? "در حال پردازش..." : "ثبت و پرداخت نهایی"}
      </button>
    </div>
  );
}
