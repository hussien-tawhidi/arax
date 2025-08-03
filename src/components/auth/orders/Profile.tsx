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
    <div className='flex flex-col gap-6 px-4 py-6'>
      <main className='flex-1 rounded'>
        <h1 className='text-lg font-bold mb-4'>سفارش‌های من</h1>

        {/* Tabs */}
        <div className='flex flex-wrap gap-4 mb-4 text-sm'>
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`pb-2 ${
                activeTab === i
                  ? "border-b-2 border-red text-red font-semibold"
                  : "text-darker-black/70"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table Header (Desktop Only) */}
        <div className='hidden md:grid grid-cols-4 text-sm text-darker-black/70 border-b py-2 font-medium'>
          <span>شماره سفارش</span>
          <span>تاریخ ثبت</span>
          <span>مبلغ کل</span>
          <span>وضعیت</span>
        </div>

        {/* Loading */}
        {loading && (
          <div className='text-center py-10 text-darker-black/50'>
            در حال بارگذاری...
          </div>
        )}

        {/* Error */}
        {error && <div className='text-center py-10 text-red'>{error}</div>}

        {/* No Orders */}
        {!loading && !error && filteredOrders.length === 0 && (
          <div className='text-center text-darker-black/50 py-10'>
            <p>محتوایی جهت نمایش موجود نیست.</p>
          </div>
        )}

        {/* Orders List */}
        {!loading &&
          !error &&
          filteredOrders.length > 0 &&
          filteredOrders.map((order) => (
            <div
              key={order._id}
              className='grid grid-cols-1 md:grid-cols-4 border-b border-darker-black/10 text-sm py-4 md:py-2 gap-y-2 md:gap-0 text-darker-black/60'>
              {/* Mobile View */}
              <div className='md:hidden'>
                <p className='text-xs text-darker-black/50 mb-1'>شماره سفارش</p>
                <p>{order._id?.slice(-6).toUpperCase()}</p>
              </div>
              <div className='md:hidden'>
                <p className='text-xs text-darker-black/50 mb-1'>تاریخ ثبت</p>
                <p>{formatDate(order.createdAt)}</p>
              </div>
              <div className='md:hidden'>
                <p className='text-xs text-darker-black/50 mb-1'>مبلغ کل</p>
                <p>{formatPrice(order.totalPrice)}</p>
              </div>
              <div className='md:hidden'>
                <p className='text-xs text-darker-black/50 mb-1'>وضعیت</p>
                <p className='capitalize'>{order.status}</p>
              </div>

              {/* Desktop View */}
              <span className='hidden md:block'>
                {order._id?.slice(-6).toUpperCase()}
              </span>
              <span className='hidden md:block'>
                {formatDate(order.createdAt)}
              </span>
              <span className='hidden md:block'>
                {formatPrice(order.totalPrice)}
              </span>
              <span className='hidden md:block capitalize'>{order.status}</span>
            </div>
          ))}
      </main>
    </div>
  );
}
