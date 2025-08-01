/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import FormInput from "../products/add-products/Input";
import CustomDropdown from "../products/add-products/FormSelect";
import ImageUploadInput from "../products/add-products/ImageUpload";

const userRole = [
  { _id: 1, name: "کاربر عادی" },
  { _id: 2, name: "ادیتور" },
  { _id: 3, name: "ادمین" },
];

export default function AddUser() {
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState("");

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
      const formData = await new FormData();
      formData.append("userName", userName);
      formData.append("userEmail", userEmail);
      formData.append("userPhone", userPhone);
      formData.append("role", role);
      if (avatar) formData.append("avatar", avatar);
      await axios.post("/api/users", formData);

      setSuccess(true);
      setUserName("");
      setUserEmail("");
      setUserPhone("");
      setRole("");

      router.push("/admin/users");
    } catch (err: any) {
      console.error("❌ Error creating users:", err);
      setError(err.response?.data?.message || "خطا در ایجاد کاربر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-[90%] mx-auto mt-10 p-6 rounded-xl shadow'>
      <h2 className='text-xl font-bold mb-4'>افزودن محصول جدید</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <FormInput
          label='نام کاربر'
          type='text'
          id='userName'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <FormInput
          label='مبایل'
          type='text'
          id='userPhone'
          value={userPhone}
          onChange={(e) => setUserPhone(e.target.value)}
        />
        <FormInput
          label='ایمیل'
          type='email'
          id='userEmail'
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <CustomDropdown
          label='نقش یا رول کاربر'
          options={userRole.map((cat: any) => ({
            label: cat.name,
            value: cat.name,
          }))}
          selected={role}
          onChange={setRole}
        />
        <ImageUploadInput image={avatar} setImage={setAvatar} />

        {error && <p className='text-red-500 text-sm'>{error}</p>}
        {success && (
          <p className='text-green text-sm'>محصول با موفقیت ایجاد شد.</p>
        )}

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-darker-black/70 text-darker py-2 rounded-lg transition'>
          {loading ? (
            "در حال ارسال..."
          ) : (
            <span className='flex items-center justify-center'>
              افزودن کاربر <IoAddSharp />
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
