import React from 'react'

export default function ProductDetailsLoader() {
  return (
    <div className='animate-pulse flex flex-col md:flex-row gap-6'>
      <div className='bg-gray-200 rounded w-full md:w-1/2 h-[400px]' />
      <div className='flex flex-col gap-4 w-full md:w-1/2'>
        <div className='h-8 bg-gray-200 rounded w-2/3' />
        <div className='h-6 bg-gray-200 rounded w-1/2' />
        <div className='h-40 bg-gray-200 rounded w-full' />
        <div className='h-10 bg-gray-200 rounded w-1/3' />
      </div>
    </div>
  );
}
