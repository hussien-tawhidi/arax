import React from "react";

export default function TabelRowsLoader() {
  return (
    <tr className='animate-pulse'>
      <td className='px-4 py-2 border-b'>
        <div className='h-4 bg-darker-black/60 rounded w-24 mx-auto' />
      </td>
      <td className='px-4 py-2 border-b'>
        <div className='h-4 bg-darker-black/60 rounded w-32 mx-auto' />
      </td>
      <td className='px-4 py-2 border-b text-center' colSpan={4}>
        <div className='flex justify-center gap-2'>
          <div className='h-6 w-6 bg-darker-black/60 rounded-full' />
          <div className='h-6 w-6 bg-darker-black/60 rounded-full' />
        </div>
      </td>
    </tr>
  );
}
