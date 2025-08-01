"use client";

import { IUser } from "@/models/User";
import { CartItem } from "@/store/slice/cartSlice";
import axios from "axios";
import { useEffect, useState } from "react";

interface orderType {
  province: string;
  user: IUser;
  _id?: string;
  city: string;
  address: string;
  houseNumber: string;
  unit?: string;
  name: string;
  phone: string;
  selectedDelivery: string;
  selectedPayment: string;
  totalPrice: number;
  deliveryCost: string;
  discountCode?: string;
  discountApplied: boolean;
  cartItems: CartItem[];
  status: string;
  createdAt: string;
}

const tabs = [
  { label: "سفارشات جاری", status: "pending" },
  { label: "تحویل داده شده", status: "delivered" },
  { label: "مرجوعی", status: "returned" },
  { label: "لغو شده", status: "cancelled" },
];

export default function Orders() {
  const [activeTab, setActiveTab] = useState(0);
  const [orders, setOrders] = useState<orderType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get("/api/order");
        setOrders(data);
      } catch (err) {
        console.log("🚀 ~ fetchOrders ~ err:", err);
        setError("خطا در دریافت سفارشات");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders by active tab status
  const filteredOrders = orders.filter(
    (order) => order.status === tabs[activeTab].status
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR");
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("fa-IR") + " تومان";
  };

  return (
    <div className='flex flex-col md:flex-row gap-6'>
      {/* Main content */}
      <main className='flex-1 rounded shadow p-4'>
        <h1 className='text-lg font-bold mb-4'>سفارش‌های من</h1>

        {/* Tabs */}
        <div className='flex gap-4 border-b mb-4 text-sm'>
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`pb-2 ${
                activeTab === i
                  ? "border-b-2 border-red text-red font-semibold"
                  : "text-gray-500"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table Header */}
        <div className='grid grid-cols-4 text-sm text-gray-600 border-b py-2 font-medium'>
          <span>شماره سفارش</span>
          <span>تاریخ ثبت</span>
          <span>مبلغ کل</span>
          <span>وضعیت</span>
        </div>

        {/* Loading */}
        {loading && (
          <div className='text-center py-10 text-gray-400'>
            در حال بارگذاری...
          </div>
        )}

        {/* Error */}
        {error && <div className='text-center py-10 text-red-500'>{error}</div>}

        {/* Orders List */}
        {!loading && !error && filteredOrders.length === 0 && (
          <div className='text-center text-gray-400 py-10'>
            <p>محتوایی جهت نمایش موجود نیست.</p>
          </div>
        )}

        {!loading && !error && filteredOrders.length > 0 && (
          <>
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className='grid grid-cols-4 text-sm py-2 border-b items-center'>
                <span>{order._id&& order._id.slice(-6).toUpperCase()}</span>
                <span>{formatDate(order.createdAt)}</span>
                <span>{formatPrice(order.totalPrice)}</span>
                <span className='capitalize'>{order.status}</span>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}
