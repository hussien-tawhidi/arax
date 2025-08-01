"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface CategoryType {
  name: string;
  typeOf: string;
}

interface CategoryForm {
  category: CategoryType;
  subcategory: CategoryType;
  productType: CategoryType;
}

const defaultValue: CategoryForm = {
  category: { name: "", typeOf: "" },
  subcategory: { name: "", typeOf: "" },
  productType: { name: "", typeOf: "" },
};

export default function EditCategoryForm({ id }: { id: string }) {
  const [form, setForm] = useState<CategoryForm>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`/api/categories/${id}`);
        const data = res.data;

        setForm({
          category: {
            name: data?.category.category?.name || "",
            typeOf: data?.category?.typeOf || "",
          },
          subcategory: {
            name: data?.subcategory?.name || "",
            typeOf: data?.subcategory?.typeOf || "",
          },
          productType: {
            name: data?.productType?.name || "",
            typeOf: data?.productType?.typeOf || "",
          },
        });
      } catch (err) {
        alert("❌ خطا در دریافت اطلاعات دسته‌بندی.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (
    field: keyof CategoryForm,
    subfield: keyof CategoryType,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subfield]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`/api/categories/${id}`, form);
      alert("✅ دسته‌بندی با موفقیت ویرایش شد.");
    } catch (err) {
      alert("❌ خطا در ویرایش دسته‌بندی.");
    }
  };

  if (loading) return <p className='text-center py-4'>در حال بارگذاری...</p>;

  return (
    <div className='max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-6 border'>
      <h2 className='text-xl font-bold text-center text-gray-800'>
        ویرایش دسته‌بندی
      </h2>

      {/* Category */}
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>
            عنوان دسته‌بندی
          </label>
          <input
            value={form.category.name}
            onChange={(e) => handleChange("category", "name", e.target.value)}
            className='w-full border p-2 rounded'
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>
            نوع دسته‌بندی
          </label>
          <input
            value={form.category.typeOf}
            onChange={(e) => handleChange("category", "typeOf", e.target.value)}
            className='w-full border p-2 rounded'
          />
        </div>
      </div>

      {/* Subcategory */}
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>
            عنوان زیر‌دسته
          </label>
          <input
            value={form.subcategory.name}
            onChange={(e) =>
              handleChange("subcategory", "name", e.target.value)
            }
            className='w-full border p-2 rounded'
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>نوع زیر‌دسته</label>
          <input
            value={form.subcategory.typeOf}
            onChange={(e) =>
              handleChange("subcategory", "typeOf", e.target.value)
            }
            className='w-full border p-2 rounded'
          />
        </div>
      </div>

      {/* Product Type */}
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>
            عنوان نوع محصول
          </label>
          <input
            value={form.productType.name}
            onChange={(e) =>
              handleChange("productType", "name", e.target.value)
            }
            className='w-full border p-2 rounded'
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>
            نوع نوع محصول
          </label>
          <input
            value={form.productType.typeOf}
            onChange={(e) =>
              handleChange("productType", "typeOf", e.target.value)
            }
            className='w-full border p-2 rounded'
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'>
        ذخیره تغییرات
      </button>
    </div>
  );
}
