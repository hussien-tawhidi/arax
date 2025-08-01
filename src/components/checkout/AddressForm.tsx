"use client";

import { useState, useEffect } from "react";
import Input from "../ui/Input";
import SelectOption from "../ui/SelectOption";
import { provinces } from "../../../data/provinces";
import { cities } from "../../../data/cities";

type Props = {
  province: number;
  setProvince: (id: number) => void;
  city: number;
  setCity: (id: number) => void;
  address: string;
  setAddress: (value: string) => void;
  houseNumber: string;
  setHouseNumber: (value: string) => void;
  unit: string;
  setUnit: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
};

export default function AddressForm({
  province,
  setProvince,
  city,
  setCity,
  address,
  setAddress,
  houseNumber,
  setHouseNumber,
  unit,
  setUnit,
  name,
  setName,
  phone,
  setPhone,
}: Props) {
  const [errors, setErrors] = useState({
    province: "",
    city: "",
    address: "",
    houseNumber: "",
    name: "",
    phone: "",
  });

  const validate = () => {
    const newErrors: typeof errors = {
      province: province ? "" : "استان الزامی است.",
      city: city ? "" : "شهر الزامی است.",
      address: address.trim() ? "" : "آدرس الزامی است.",
      houseNumber: houseNumber.trim() ? "" : "پلاک الزامی است.",
      name: name.trim() ? "" : "نام الزامی است.",
      phone: /^09\d{9}$/.test(phone) ? "" : "شماره موبایل معتبر نیست.",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((v) => v === "");
  };

  // Optional: validate on change or on blur
  useEffect(() => {
    validate();
  }, [province, city, address, houseNumber, name, phone]);

  const filteredCities = cities.filter((c) => c.province_id === province);

  return (
    <div className='rounded-lg p-4 space-y-4 border-b border-darker-black/10'>
      <h2 className='font-semibold text-lg text-darker-black/70'>آدرس تحویل</h2>

      <div className='flex sm:flex-row flex-col gap-3 w-full'>
        <div className='w-full'>
          <SelectOption
            value={province}
            onChange={setProvince}
            placeholder='استان را انتخاب کنید'
            options={provinces}
          />
          {errors.province && (
            <p className='text-red-500 text-sm mt-1'>{errors.province}</p>
          )}
        </div>

        <div className='w-full'>
          <SelectOption
            value={city}
            onChange={setCity}
            options={filteredCities}
            placeholder='شهر را انتخاب کنید'
          />
          {errors.city && (
            <p className='text-red-500 text-sm mt-1'>{errors.city}</p>
          )}
        </div>
      </div>

      <div>
        <Input
          value={address}
          setValue={setAddress}
          type='text'
          placeholder='آدرس کامل'
        />
        {errors.address && (
          <p className='text-red-500 text-sm mt-1'>{errors.address}</p>
        )}
      </div>

      <div className='flex gap-3 w-full'>
        <div className='w-full'>
          <Input
            value={houseNumber}
            setValue={setHouseNumber}
            type='text'
            placeholder='پلاک'
          />
          {errors.houseNumber && (
            <p className='text-red-500 text-sm mt-1'>{errors.houseNumber}</p>
          )}
        </div>
        <Input value={unit} setValue={setUnit} type='text' placeholder='واحد' />
      </div>

      <div>
        <Input
          value={name}
          setValue={setName}
          type='text'
          placeholder='نام گیرنده'
        />
        {errors.name && (
          <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
        )}
      </div>

      <div>
        <Input
          value={phone}
          setValue={setPhone}
          type='text'
          placeholder='شماره تماس گیرنده'
        />
        {errors.phone && (
          <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>
        )}
      </div>
    </div>
  );
}
