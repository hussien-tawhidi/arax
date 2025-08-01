/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormInput from "./add-products/Input";
import CustomDropdown from "./add-products/FormSelect";
import Image from "next/image";
import ImageUploadInput from "./add-products/ImageUpload";
import SubmitButton from "../SubmitButton";

export default function UpdateProduct({ id }: { id: string }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File  | null>(null);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [pattern, setPattern] = useState("");
  const [discount, setDiscount] = useState("");
  const [sales, setSales] = useState("");
  const [views, setViews] = useState("");
  const [material, setMaterial] = useState("");
  const [productCode, setProductCode] = useState("");
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [sizesAvailable, setSizesAvailable] = useState("");
  const [colorsAvailable, setColorsAvailable] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/categories`);
        const product = await axios.get(`/api/products/${id}`);

        setCategories(data.categories);
        const p = product.data;

        setName(p.name || "");
        setImage(p.imageUrl?.[0] || "");
        setCategoryId(p.category || "");
        setDescription(p.description || "");
        setStock(p.stock?.toString() || "0");
        setPrice(p.price?.toString() || "0");

        setBrand(p.brand || "");
        setType(p.type || "");
        setPattern(p.pattern || "");
        setDiscount(p.discount?.toString() || "0");
        setSales(p.sales?.toString() || "0");
        setViews(p.views?.toString() || "0");
        setMaterial(p.material || "");
        setProductCode(p.productCode || "");
        setGender(p.gender || "");
        setAgeRange(p.ageRange || "");
        setSizesAvailable(p.sizesAvailable?.join(", ") || "");
        setColorsAvailable(p.colorsAvailable?.join(", ") || "");
      } catch (err) {
        console.error("❌ خطا در دریافت اطلاعات:", err);
        setError("خطا در بارگذاری محصول");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
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
      if (image && typeof image !== "string") formData.append("image", image);

      formData.append("brand", brand);
      formData.append("type", type);
      formData.append("pattern", pattern);
      formData.append("discount", discount);
      formData.append("sales", sales);
      formData.append("views", views);
      formData.append("material", material);
      formData.append("productCode", productCode);
      formData.append("gender", gender);
      formData.append("ageRange", ageRange);
      formData.append("sizesAvailable", sizesAvailable);
      formData.append("colorsAvailable", colorsAvailable);

      await axios.put(`/api/products/${id}`, formData);

      router.push("/admin/products");
    } catch (err: any) {
      console.error("❌ Error updating product:", err);
      setError(err.response?.data?.message || "خطا در بروزرسانی محصول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-[90%] mx-auto mt-10 p-6 relative rounded-xl shadow'>
      <h2 className='text-xl font-bold mb-4'>بروزرسانی محصول</h2>
      <form onSubmit={handleUpdate} className='space-y-4'>
        <FormInput
          label='نام محصول'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          label='کد محصول'
          id='productCode'
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
        />
        <FormInput
          label='توضیحات'
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
        <FormInput
          label='تخفیف (%)'
          type='number'
          id='discount'
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <FormInput
          label='تعداد فروش'
          type='number'
          id='sales'
          value={sales}
          onChange={(e) => setSales(e.target.value)}
        />
        <FormInput
          label='بازدید'
          type='number'
          id='views'
          value={views}
          onChange={(e) => setViews(e.target.value)}
        />
        <FormInput
          label='برند'
          id='brand'
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <FormInput
          label='نوع'
          id='type'
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <FormInput
          label='جنس'
          id='material'
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        />
        <FormInput
          label='طرح'
          id='pattern'
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
        />
        <FormInput
          label='سایزها (با , جدا کنید)'
          id='sizes'
          value={sizesAvailable}
          onChange={(e) => setSizesAvailable(e.target.value)}
        />
        <FormInput
          label='رنگ‌ها (با , جدا کنید)'
          id='colors'
          value={colorsAvailable}
          onChange={(e) => setColorsAvailable(e.target.value)}
        />

        <CustomDropdown
          label='دسته‌بندی'
          options={categories.map((cat) => ({
            label: cat.name,
            value: cat._id,
          }))}
          selected={categoryId}
          onChange={setCategoryId}
        />
        <CustomDropdown
          label='جنسیت'
          options={[
            { label: "عمومی", value: "عمومی" },
            { label: "مردانه", value: "مردانه" },
            { label: "زنانه", value: "زنانه" },
          ]}
          selected={gender}
          onChange={setGender}
        />
        <CustomDropdown
          label='رده سنی'
          options={[
            { label: "تمام سنین", value: "تمام سنین" },
            { label: "بزرگسال", value: "بزرگسال" },
            { label: "کودک", value: "کودک" },
          ]}
          selected={ageRange}
          onChange={setAgeRange}
        />

        {image && (
          <Image
            src={typeof image === "string" ? image : URL.createObjectURL(image)}
            alt='تصویر محصول'
            width={100}
            height={100}
            className='w-32 h-auto object-cover z-0 rounded'
          />
        )}
        <ImageUploadInput image={image} setImage={setImage} />

        {error && <p className='text-red-500 text-sm'>{error}</p>}
        {success && (
          <p className='text-green-600 text-sm'>
            ✅ محصول با موفقیت بروزرسانی شد.
          </p>
        )}
        <SubmitButton loading={loading} title='بروزرسانی محصول' />
      </form>
    </div>
  );
}
