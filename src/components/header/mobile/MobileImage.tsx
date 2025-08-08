"use client";

import { useState } from "react";
import Image from "next/image";

interface BannerImageProps {
  src: string;
  alt?: string;
  priority?: boolean;
}

export default function MobileImage({
  src,
  alt = "Category",
  priority = false,
}: BannerImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className='relative w-full h-64 overflow-hidden group'>
      {/* Skeleton Loader */}
      {loading && (
        <div className='absolute inset-0 bg-gray-200 animate-pulse' />
      )}

      <Image
        src={src || "/fallback.jpg"}
        alt={alt}
        fill
        priority={priority}
        quality={85}
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        className={`object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
}
