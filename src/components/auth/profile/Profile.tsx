"use client";

import ErrorMsg from "@/components/admin/ErrorMsg";
import ImageUploadInput from "@/components/admin/products/add-products/ImageUpload";
import SubmitButton from "@/components/admin/SubmitButton";
import Input from "@/components/ui/Input";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import DateObject from "react-date-object"; // ✅ Add this import
import { HiIdentification } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { faIR } from "date-fns/locale"; // Optional for Persian support
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import { useToast } from "@/components/ToastContext";
export default function ProfileForm({ id }: { id?: string }) {
  const [gender, setGender] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [joined, setJoined] = useState<Date>(new Date());
  const [birthday, setBirthday] = useState<DateObject | null>(
    new DateObject({ calendar: persian, locale: persian_fa })
  );

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { addToast } = useToast();

  // ✅ Fetch user data on mount
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/users/${id}`);
        console.log("🚀 ~ fetchData ~ data:", data);
        const user = data?.user;
        setName(user?.name || "");
        setBio(user?.bio || "");
        setGender(user?.gender || "");
        setPhone(user?.phone || "");
        setEmail(user?.email || "");
        setBirthday(user?.birthday ? new DateObject(user.birthday) : null);
        setJoined(user?.createdAt ? new Date(user.createdAt) : new Date());
        setAvatar(user?.avatar); // reset to null; you can show preview if needed
      } catch (err) {
        console.error("❌ خطا در دریافت کاربر:", err);
        setError("خطا در بارگذاری اطلاعات کاربر");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("gender", gender);
      formData.append("birthday", birthday?.toDate()?.toISOString() || "");
      formData.append("email", email);
      formData.append("phone", phone);
      if (avatar) {
        formData.append("avatar", avatar);
      }

      await axios.put(`/api/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      addToast("اطلاعات با موفقیت ذخیره شد.", "success");
    } catch (err) {
      console.error("❌ خطا در ذخیره اطلاعات:", err);
      setError("خطا در ذخیره اطلاعات کاربر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=''>
      {error && <ErrorMsg text={error} />}
      {success && (
        <div className='text-green-600 text-sm text-center my-2'>{success}</div>
      )}
      <form
        onSubmit={handleSubmit}
        className='rounded-xl p-6 w-[90%] mx-auto flex flex-col gap-4 text-right'
        dir='rtl'>
        <h2 className='text-2xl font-bold mb-4 text-gray-700'>حساب کاربری</h2>
        {joined && (
          <p className='text-sm text-gray-500'>
            عضو شده:{" "}
            {formatDistanceToNow(new Date(joined), {
              addSuffix: true,
              locale: faIR, // omit this if you're showing English
            })}
          </p>
        )}
        <div className='flex md:flex-row flex-col gap-3'>
          <Input
            setValue={setName}
            value={name}
            icon={<BiUser />}
            type='text'
            placeholder='نام خود را وارد کنید'
          />
          <Input
            setValue={setBio}
            value={bio}
            icon={<BiUser />}
            type='text'
            placeholder='بیوگرافی خود را وارد کنید'
          />
        </div>

        {/* ✅ Gender Selection */}
        <div className=''>
          <div className='flex gap-2 items-center'>
            <p>جنسیت</p>
            {/* man */}
            <div className='container flex justify-start gap-1.5 items-center'>
              <input
                type='checkbox'
                id={"men"}
                className='hidden bg-darker-black'
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />
              <label htmlFor={"men"} className='check'>
                <svg width='18px' height='18px' viewBox='0 0 18 18'>
                  <path d='M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z'></path>
                  <polyline points='1 9 7 14 15 4'></polyline>
                </svg>
              </label>
              <label
                htmlFor={"men"}
                className='text-darker-black/70 cursor-pointer md:text-sm text-[12px]'>
                مرد
              </label>
            </div>
            {/* ******************* */}
            {/* woman */}
            <div className='container flex justify-start gap-1.5 items-center'>
              <input
                type='checkbox'
                id={"women"}
                className='hidden bg-darker-black'
                checked={gender === "women"}
                onChange={() => setGender("women")}
              />
              <label htmlFor={"women"} className='check'>
                <svg width='18px' height='18px' viewBox='0 0 18 18'>
                  <path d='M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z'></path>
                  <polyline points='1 9 7 14 15 4'></polyline>
                </svg>
              </label>
              <label
                htmlFor={"women"}
                className='text-darker-black/70 cursor-pointer md:text-sm text-[12px]'>
                زن
              </label>
            </div>
          </div>
        </div>
        <Input
          setValue={setPhone}
          value={phone}
          icon={<HiIdentification />}
          type='text'
          placeholder='شماره تلفن خود را وارد کنید'
        />
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium'>تاریخ تولد</label>
          <DatePicker
            value={birthday}
            onChange={setBirthday}
            calendar={persian}
            locale={persian_fa}
            calendarPosition='bottom-right'
            className='!w-full border rounded p-2 text-right'
            inputClass='w-full py-2 px-3 border border-gray-300 rounded'
          />
        </div>
        <Input
          setValue={setEmail}
          value={email}
          icon={<MdEmail />}
          type='email'
          placeholder='ایمیل خود را وارد کنید'
        />
        {avatar && (
          <Image
            src={
              typeof avatar === "string" ? avatar : URL.createObjectURL(avatar)
            }
            alt={name}
            width={200}
            height={200}
            className='object-cover rounded-md'
          />
        )}

        <ImageUploadInput image={avatar} setImage={setAvatar} />

        <div className='flex gap-4 justify-between mt-6'>
          <button
            type='button'
            className='bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition w-1/2'>
            تغییر کلمه عبور
          </button>
          <SubmitButton
            loading={loading}
            title='ذخیره تغییرات'
            disabled={loading}
            type='submit'
          />
        </div>
      </form>
    </div>
  );
}
