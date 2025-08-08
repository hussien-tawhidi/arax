"use client";

import { BiUserCircle } from "react-icons/bi";
import AddBtn from "../../admin/AddBtn";
import { useState, useEffect } from "react";
import { IBankAccount } from "@/models/BankAccount";
import AccountCard from "./AccountCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import ErrorMsg from "@/components/admin/ErrorMsg";
import { useToast } from "@/components/ToastContext";
import { useRouter } from "next/navigation";

export default function UserBankInfo() {
  const { data: session } = useSession();
  const [bankAccounts, setBankAccounts] = useState<IBankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = session?.user.id;
  const router = useRouter();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const response = await axios.get(`/api/bank-account?userId=${userId}`);
        setBankAccounts(response?.data);
      } catch (err) {
        setError("Failed to fetch bank accounts");
        console.error("Error fetching bank accounts:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBankAccounts();
    }
  }, [userId]);

  const handleEditAccount = (accountId: string) => {
    console.log("Edit account:", accountId);
  };

  const handleDeleteAccount = async (accountId: string) => {
    try {
      await axios.delete(`/api/bank-account/${accountId}`);
      setBankAccounts((prev) => prev?.filter((acc) => acc.id !== accountId));
      addToast("کارت حذف شد", "success");
      router.refresh();
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("Failed to delete account");
    }
  };

  const handleSetDefault = async (accountId: string) => {
    console.log("🚀 ~ handleSetDefault ~ accountId:", accountId);
  };

  if (loading) {
    return (
      <div className='rtl text-right p-4 md:p-6 rounded-xl backdrop-blur-md'>
        <div className='flex justify-center items-center h-40'>
          <p>در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorMsg text={error} />;
  }

  return (
    <div className='rtl text-right p-4 md:p-6 rounded-xl backdrop-blur-md'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-semibold text-darker-black/70'>
          اطلاعات حساب بانکی
        </h2>
        <AddBtn
          link={`/user/${userId}/bank-info/add-bank-account`}
          title='افزودن حساب جدید'
        />
      </div>

      <div className='space-y-5'>
        {bankAccounts.length > 0 &&
          bankAccounts.map((account, index) => (
            <AccountCard
              _id=''
              status='pending'
              userId={session?.user?.id}
              key={index}
              bankName={account.bankName}
              accountNumber={account.accountNumber}
              cardNumber={account.cardNumber}
              ownerName={account.ownerName}
              isDefault={account.isDefault}
              onEdit={() => handleEditAccount(account._id.toString())}
              onDelete={() => handleDeleteAccount(account._id.toString())}
              onSetDefault={() => handleSetDefault(account._id.toString())}
            />
          ))}
      </div>

      {bankAccounts.length === 0 && (
        <div className='text-center py-12 text-darker-black/70'>
          <BiUserCircle className='mx-auto h-12 w-12 mb-2' />
          <h3 className='text-sm font-medium'>حساب بانکی ثبت نشده است</h3>
          <p className='text-xs'>هنوز هیچ حساب بانکی اضافه نکرده‌اید</p>
        </div>
      )}
    </div>
  );
}
