/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormInput from "./Input";
import CustomDropdown from "./FormSelect";
import ImageUploadInput from "./ImageUpload";
import SubmitButton from "../../SubmitButton";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState("");
  console.log("🚀 ~ AddProduct ~ categoryId:", categoryId);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/categories");
        setCategories(data.categories);
        console.log("✅ دریافت دسته‌بندی‌ها:", data);
      } catch (err) {
        console.error("❌ خطا در دریافت دسته‌بندی‌ها:", err);
        setError("خطا در بارگذاری دسته‌بندی‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("stock", stock);
      formData.append("price", price);
      formData.append("categoryId", categoryId);
      if (image) {
        formData.append("image", image);
      }

      await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      setName("");
      setDescription("");
      setStock("");
      setPrice("");
      setImage(null);
      setCategoryId("");

      router.push("/admin/products");
    } catch (err: any) {
      console.error("❌ Error creating product:", err);
      setError(err.response?.data?.message || "خطا در ایجاد محصول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-[90%] mx-auto mt-10 p-6 rounded-xl shadow'>
      <h2 className='text-xl font-bold mb-4'>افزودن محصول جدید</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <FormInput
          label='نام محصول'
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          label='توضیحات'
          type='text'
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormInput
          label='موجودی'
          type='number'
          id='stock'
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <FormInput
          label='قیمت'
          type='number'
          id='price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <CustomDropdown
          label='دسته‌بندی'
          options={categories.map((cat: any) => ({
            label: cat.name,
            value: cat._id,
          }))}
          selected={categoryId}
          onChange={setCategoryId}
        />

        <ImageUploadInput image={image} setImage={setImage} />

        {error && <p className='text-red-500 text-sm'>{error}</p>}
        {success && (
          <p className='text-green text-sm'>محصول با موفقیت ایجاد شد.</p>
        )}
        <SubmitButton loading={loading} title='افزودن محصول ' />
      </form>
    </div>
  );
}
