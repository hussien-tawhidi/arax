"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { BiX } from "react-icons/bi";
import { FiUploadCloud } from "react-icons/fi";

export default function ImageUploadInput({
  image,
  setImage,
}: {
  image: File | null;
  setImage: (file: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateImage(file);
  };

  const updateImage = (file: File | null) => {
    setImage(file);

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    updateImage(file);
  };

  return (
    <div className='w-full'>
      <label
        htmlFor='image'
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className='relative flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-darker-black/70/30 rounded-lg cursor-pointer hover:bg-darker-black/70/10 transition'>
        {preview ? (
          <>
            <Image
              src={preview}
              alt='پیش‌نمایش'
              width={200}
              height={200}
              className='w-32 h-32 object-cover rounded-lg'
            />
            <button
              type='button'
              onClick={() => updateImage(null)}
              className='absolute top-2 left-2 bg-red p-1 rounded-full shadow'>
              <BiX className='w-4 h-4 text-darker-black' />
            </button>
          </>
        ) : (
          <div className='flex flex-col items-center gap-2 text-darker-black'>
            <FiUploadCloud className='w-8 h-8' />
            <span className='text-sm font-medium'>
              عکس را بکشید یا کلیک کنید
            </span>
            <span className='text-xs text-gray-400'>
              فرمت‌های مجاز: JPG, PNG
            </span>
          </div>
        )}
        <input
          ref={fileInputRef}
          id='image'
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          required={!image}
          className='hidden'
        />
      </label>

      {image && (
        <p className='mt-2 text-sm text-gray-600 truncate'>
          فایل انتخاب شده: <span className='font-medium'>{image.name}</span>
        </p>
      )}
    </div>
  );
}
