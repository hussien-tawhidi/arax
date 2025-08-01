"use client";

import { useState } from "react";
import AddressForm from "./AddressForm";
import DeliveryOptions from "./DeliveryOptions";
import OrderSummary from "../cart/OrderSummary";
import PaymentMethods from "./PaymentMethod";
import StepHeader from "./StepHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { provinces } from "../../../data/provinces";
import { cities } from "../../../data/cities";
import { useToast } from "../ToastContext";
export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [province, setProvince] = useState(0);
  const [city, setCity] = useState(0);
  const [address, setAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [unit, setUnit] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState("ارسال عادی");
  const [selectedPayment, setSelectedPayment] = useState(
    "پرداخت با کارت بانکی"
  );

  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);

  const deliveryCost = "رایگان";

  const { addToast } = useToast();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const discountAmount = applied ? 50000 : 0; // Example logic, adjust as needed
  const proveName = provinces.find((prov) => prov.id === province);
  const cityName = cities.find((prov) => prov.id === city);

 const handleSubmit = async () => {
   setLoading(true);
   try {
     const orderData = {
       province: proveName?.name,
       city: cityName?.name,
       address,
       houseNumber,
       unit,
       name,
       phone,
       selectedDelivery,
       selectedPayment,
       totalPrice,
       deliveryCost,
       code,
       applied,
       cartItems,
     };

     const res = await fetch("/api/order", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(orderData),
     });

     if (!res.ok) {
       const errorData = await res.json().catch(() => null);
       addToast(errorData?.error || "خطا در ثبت سفارش", "error");
       return;
     }

     const result = await res.json();
     console.log("✅ API Result:", result);

     if (!result.success) {
       addToast("خطا در ثبت سفارش", "error");
       return;
     }

     addToast("سفارش شما موفقانه ثبت شد", "success");
   } catch (error) {
     console.error("❌ API Error:", error);
     addToast("خطا در ارتباط به سرور", "error");
   } finally {
     setLoading(false);
   }
 };


  return (
    <div className='max-w-7xl mx-auto px-4 py-6 space-y-6 relative'>
      <StepHeader step={2} />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Left Side */}
        <div className='md:col-span-2 space-y-6'>
          <AddressForm
            province={province}
            setProvince={setProvince}
            city={city}
            setCity={setCity}
            address={address}
            setAddress={setAddress}
            houseNumber={houseNumber}
            setHouseNumber={setHouseNumber}
            unit={unit}
            setUnit={setUnit}
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
          />
          <DeliveryOptions
            selectedDelivery={selectedDelivery}
            setSelectedDelivery={setSelectedDelivery}
          />
          <PaymentMethods
            selected={selectedPayment}
            onChange={setSelectedPayment}
          />
          <div className='mt-4 text-sm text-gray-700'>
            روش انتخاب شده: <span className='font-bold'>{selectedPayment}</span>
          </div>
        </div>

        {/* Right Side */}
        <div className='space-y-4'>
          <OrderSummary
            loading={loading}
            code={code}
            setCode={setCode}
            applied={applied}
            setApplied={setApplied}
            discountAmount={discountAmount}
            totalPrice={totalPrice}
            deliveryCost={deliveryCost}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
