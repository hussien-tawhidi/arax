"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import TableActions from "../TableActions";

interface ProductType {
  _id: string;
  name: string;
  category: string;
  stock: number;
  imageUrl: string[];
}

interface Props {
  product: ProductType;
  onDelete: (id: string) => void;
}

export default function ProductTableRow({ product, onDelete }: Props) {
  const router = useRouter();

  return (
    <tr className='hover:bg-darker-black/5 border-b border-darker-black/20'>
      <td className='px-4 py-2'>
        <Image
          src={product.imageUrl[0]}
          alt={product.name}
          width={50}
          height={50}
          className='w-16 h-16 rounded object-cover'
        />
      </td>
      <td className='px-4 py-2'>{product.name}</td>
      <td className='px-4 py-2'>{product.category}</td>
      <td className='px-4 py-2'>{product.stock}</td>
      <td className='px-4 py-2 text-center'>
        <TableActions
          onDelete={() => onDelete(product._id)}
          onEdit={() => router.push(`/admin/products/${product._id}`)}
        />
      </td>
    </tr>
  );
}
