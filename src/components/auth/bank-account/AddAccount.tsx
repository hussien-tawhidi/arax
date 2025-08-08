"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomStatusSelect from "@/components/ui/CustomStatusSelect";
import Input from "@/components/ui/Input";
import StatusCheckBox from "@/components/admin/off-codes/StatusCheckBox";
import { bankOptions } from "./data";
import SubmitButton from "@/components/admin/SubmitButton";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@/components/ToastContext";

export default function AddAccount() {
  const router = useRouter();
  const [bankName, setBankName] = useState(bankOptions[0].value);
  const [accountNumber, setAccountNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [shabaNumber, setShabaNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const userId = session?.user.id;

  const { addToast } = useToast();

  const handleSubmit = async () => {
    const data = {
      bankName,
      accountNumber,
      cardNumber,
      shabaNumber,
      ownerName,
      isDefault,
    };
    try {
      setLoading(true);
      const res = await axios.post("/api/bank-account", data);
      if (!res) throw new Error("ثبت حساب بانکی با مشکل مواجه شد");
      router.push(`/user/${userId}/bank-info`);
      addToast("کارت شما موفقانه افزوده شد", "success");
    } catch (err) {
      console.log("🚀 ~ handleSubmit ~ err:", err);
      addToast("خطا روخ داده است", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto  p-6 rounded-xl shadow-md backdrop-blur-md text-right rtl'>
      <h2 className='text-xl font-bold mb-6'>افزودن حساب بانکی</h2>

      <div className='space-y-5'>
        {/* Bank Name */}
        <CustomStatusSelect
          value={bankName}
          onChange={setBankName}
          options={bankOptions}
        />

        {/* Account Number */}
        <Input
          setValue={setAccountNumber}
          value={accountNumber}
          type='text'
          placeholder='شماره حساب: 123-456789-1'
        />

        {/* Card Number */}
        <Input
          setValue={setCardNumber}
          value={cardNumber}
          type='text'
          placeholder='شماره کارت: 6037-1234-5678-0000'
        />

        {/* SHABA */}
        <Input
          setValue={setShabaNumber}
          value={shabaNumber}
          type='text'
          placeholder='شماره شبا: IR820540102680020817909002'
        />

        {/* Owner Name */}
        <Input
          setValue={setOwnerName}
          value={ownerName}
          type='text'
          placeholder='مالک: IR820540102680020817909002'
        />

        {/* Default Checkbox */}
        <StatusCheckBox
          isActive={isDefault}
          setIsActive={setIsDefault}
          title='تنظیم به عنوان حساب پیش‌فرض'
        />
        {/* Submit Button */}
        <SubmitButton
          loading={loading}
          disabled={
            !bankName.length ||
            !accountNumber.length ||
            !cardNumber.length ||
            !shabaNumber.length ||
            !ownerName.length
          }
          type='button'
          title=' ذخیره حساب'
          onclick={handleSubmit}
        />
      </div>
    </div>
  );
}
