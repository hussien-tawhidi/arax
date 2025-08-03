import { FaBoxOpen, FaTruck, FaReceipt } from "react-icons/fa";
import LocalizedPrice from "../ui/LocalizedPrice";

interface Props {
  totalPrice: number;
  deliveryCost: string | number;
  handleSubmit: () => void;
}

export default function CartDetails({
  totalPrice,
  deliveryCost,
  handleSubmit,
}: Props) {
  const finalPrice =
    totalPrice - (deliveryCost === "رایگان" ? 0 : Number(deliveryCost));

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

      <div className='border-t border-darker-black/10 pt-4 flex justify-between items-center text-base font-bold text-darker-black/90'>
        <div className='flex items-center gap-2'>
          <FaReceipt className='text-darker-black/50' />
          <span>مبلغ نهایی</span>
        </div>
        <LocalizedPrice value={finalPrice} className='font-medium' />
      </div>
      <button
        onClick={handleSubmit}
        className='w-full mt-4 flex items-center justify-center gap-2 bg-red text-white py-3 rounded-xl font-bold text-sm hover:bg-dark-red transition'>
        ثبت درخواست
      </button>
    </div>
  );
}
