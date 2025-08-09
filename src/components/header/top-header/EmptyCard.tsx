import { CiShoppingBasket } from "react-icons/ci";

export default function EmptyCart() {
  return (
    <div className='flex flex-col items-center justify-center max-h-72 p-8 bg-light rounded-lg shadow-md text-center text-darker-black/70 space-y-6 animate-fadeIn'>
      {/* SVG shopping cart icon */}
      <div className='mb-2'>
        <CiShoppingBasket className='text-4xl' />
      </div>

      {/* Main heading */}
      <h2 className='text-2xl font-bold'>سبد خرید شما خالی است!</h2>

      {/* Supporting text */}
      <p className='max-w-xs text-gray-600'>
        هنوز چیزی اضافه نکرده‌اید. محصولات محبوب ما را ببینید و خرید خود را شروع
        کنید.
      </p>

      {/* Primary button */}
      <button
        onClick={() => (window.location.href = "/")}
        className='bg-primary text-darker-black/70 px-6 py-3 rounded-md shadow-md hover:bg-primary-dark transition font-semibold'>
        مشاهده محصولات
      </button>

      {/* Secondary link */}
      <button
        onClick={() => (window.location.href = "/")}
        className='text-primary hover:underline text-sm'>
        مرور دسته‌بندی‌ها
      </button>
    </div>
  );
}
