import React from 'react'

export default function SkeltonCard() {
  return (
    <div className='relative sm:px-3 px-1 py-8 animate-pulse'>
      <div className='rounded-lg shadow-xl md:p-3 p-1.5 flex flex-col bg-darker-black/5'>
        <div className='rounded-md bg-darker-black/30 h-40 w-full' />
        <div className='mt-3 h-4 bg-darker-black/30 rounded w-3/4' />
        <div className='mt-2 h-4 bg-darker-black/10 rounded w-1/2' />
      </div>
    </div>
  );
}
