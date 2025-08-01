"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  images?: string[];
}

export default function ProductImages({ images }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState<string>(
    images?.[0] || "/"
  );

  return (
    <div className='flex-1/2'>
      {/* Main Image */}
      <div className='rounded'>
        <Image
          src={selectedImage}
          alt='تصویر محصول'
          width={600}
          height={600}
          className='object-contain w-full h-auto rounded'
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className='flex gap-2 mt-2 justify-center md:justify-start flex-wrap'>
        {images?.map((img) => (
          <button
            key={img}
            onClick={() => setSelectedImage(img)}
            className={`rounded p-1 transition ring-offset-2 ${
              selectedImage === img ? "ring-1 ring-darker-black/50" : ""
            }`}>
            <Image
              src={img}
              alt='تصویر کوچک'
              width={60}
              height={60}
              className='object-cover rounded'
            />
          </button>
        ))}
      </div>
    </div>
  );
}
