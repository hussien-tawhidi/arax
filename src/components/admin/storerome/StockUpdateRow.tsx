"use client";

import Image from "next/image";
import { FormEvent } from "react";

import SubmitButton from "../SubmitButton"; 
import FormInput from "../products/add-products/Input";

interface StockUpdateRowProps {
  product: {
    _id: string;
    name: string;
    stock: number;
    imageUrl: string[];
  };
  stockMap: Record<string, number>;
  setStockMap: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  loadingMap: Record<string, boolean>;
  successMap: Record<string, boolean>;
  handleUpdate: (productId: string) => void;
}

export default function StockUpdateRow({
  product,
  stockMap,
  setStockMap,
  loadingMap,
  successMap,
  handleUpdate,
}: StockUpdateRowProps) {
  return (
    <tr key={product._id} className='hover:shadow-md transition-all'>
      <td className='border-b border-darker-black/30 text-darker-black/50 px-4 py-2'>
        <Image
          src={product.imageUrl[0]}
          alt={product.name}
          width={50}
          height={50}
          className='object-cover w-16 h-16 rounded-full'
        />
      </td>
      <td className='px-4 py-2 font-normal border-b border-darker-black/30 text-darker-black/50'>
        {product.name}
      </td>
      <td className='px-4 py-2 border-b border-darker-black/30 text-darker-black/50'>
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            handleUpdate(product._id);
          }}
          className='flex items-center gap-4'>
          <FormInput
            label=''
            type='number'
            id={`stock-${product._id}`}
            value={stockMap[product._id] ?? ""}
            onChange={(e) =>
              setStockMap((prev) => ({
                ...prev,
                [product._id]: Number(e.target.value),
              }))
            }
          />

          <SubmitButton
            type='submit'
            loading={loadingMap[product._id] || false}
            title='بروزرسانی'
            disabled={
              stockMap[product._id] === undefined ||
              Number(stockMap[product._id]) === product.stock
            }
          />
        </form>

        {successMap[product._id] && (
          <span className='text-green-600 text-xs mt-1 inline-block'>
            ذخیره شد
          </span>
        )}
      </td>
    </tr>
  );
}
