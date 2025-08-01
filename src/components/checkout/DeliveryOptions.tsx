"use client";

const deliveryOptions = [
  {
    id: "standard",
    title: "ارسال عادی",
    desc: "تحویل ۳ تا ۵ روز کاری",
    cost: "رایگان",
  },
  {
    id: "express",
    title: "ارسال اکسپرس",
    desc: "تحویل ۱ روزه",
    cost: "۴۰٬۰۰۰ تومان",
  },
  {
    id: "pickup",
    title: "تحویل حضوری",
    desc: "دریافت از فروشگاه",
    cost: "رایگان",
  },
];

interface Props {
  selectedDelivery: string;
  setSelectedDelivery: (value: string) => void;
}

export default function DeliveryOptions({
  selectedDelivery,
  setSelectedDelivery,
}: Props) {
  return (
    <div className='rounded-lg p-4 border-darker-black/10 border-b text-darker-black/70'>
      <h2 className='text-lg font-semibold mb-4'>روش ارسال</h2>
      <div className='space-y-4'>
        {deliveryOptions.map((option) => (
          <label
            key={option.id}
            className={`block cursor-pointer border p-3 rounded-lg ${
              selectedDelivery === option.title
                ? "border-green bg-green/5"
                : "border-none"
            }`}>
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-semibold'>{option.title}</p>
                <p className='text-sm text-darker-black/60'>{option.desc}</p>
              </div>
              <div className='text-sm text-gray-800 font-medium'>
                {option.cost}
              </div>
            </div>
            <input
              type='radio'
              name='delivery'
              className='hidden'
              checked={selectedDelivery === option.title}
              onChange={() => setSelectedDelivery(option.title)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
