/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SubmitButton from "../SubmitButton";
import SuccessMsg from "../SuccessMsg";
import ErrorMsg from "../ErrorMsg";
import CateInput from "./CateInput";

export default function AddCategories() {
  const [category, setCategory] = useState({ name: "", typeOf: "" });
  const [subcategory, setSubcategory] = useState({ name: "", typeOf: "" });
  const [productType, setProductType] = useState({ name: "", typeOf: "" });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await axios.post("/api/categories", {
        category,
        subcategory,
        productType,
      });

      setSuccess(true);

      setCategory({ name: "", typeOf: "" });
      setSubcategory({ name: "", typeOf: "" });
      setProductType({ name: "", typeOf: "" });

      setTimeout(() => router.push("/admin/categories"), 1500);
    } catch (err: any) {
      const message = err.response?.data?.message || "خطا در ایجاد دسته‌بندی";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-[90%] mx-auto mt-10 p-6 rounded-xl shadow'>
      <h2 className='text-xl font-bold mb-4'>افزودن دسته‌بندی جدید</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* ورودی category */}
        <CateInput
          onChange={(val) => setCategory((prev) => ({ ...prev, name: val }))}
          value={category.name}
          label='عنوان دسته بندی'
          placeholder='عنوان دسته بندی ماننده زنانه، مردانه، ...'
        />
        <CateInput
          value={category.typeOf}
          onChange={(val) => setCategory((prev) => ({ ...prev, typeOf: val }))}
          label='Category in English for url'
          placeholder='write category title in english like women,men'
        />
        {/* ورودی subcategory */}
        <CateInput
          onChange={(val) => setSubcategory((prev) => ({ ...prev, name: val }))}
          value={subcategory.name}
          label='عنوان فرعی دسته بندی'
          placeholder='عنوان دسته بندی ماننده لباس زنانه، لباس مردانه، ...'
        />
        <CateInput
          value={subcategory.typeOf}
          onChange={(val) =>
            setSubcategory((prev) => ({ ...prev, typeOf: val }))
          }
          label='Subcategory in English for url'
          placeholder='write subcategory title in english like women-clothes,men-clothes'
        />
        {/* ورودی productType */}
        <CateInput
          onChange={(val) => setProductType((prev) => ({ ...prev, name: val }))}
          value={productType.name}
          label='نام نوع محصول'
          placeholder='عنوان دسته بندی ماننده کفش زنانه، کفش مردانه، ...'
        />
        <CateInput
          value={productType.typeOf}
          onChange={(val) =>
            setProductType((prev) => ({ ...prev, typeOf: val }))
          }
          label='ProductType in English for url'
          placeholder='write ProductType title in english like women,men'
        />

        {error && <ErrorMsg text={error} />}
        {success && <SuccessMsg text='دسته‌بندی با موفقیت ایجاد شد.' />}

        <SubmitButton loading={loading} title='افزودن دسته بندی' />
      </form>
    </div>
  );
}
