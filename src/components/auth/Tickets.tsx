"use client";

import { useEffect, useState } from "react";
import { FaInbox, FaPlus, FaTimes } from "react-icons/fa";
import SubmitButton from "../admin/SubmitButton";
import Input from "../ui/Input";
import TextAreaInput from "../ui/TextAreaInput";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

interface Ticket {
  _id: string;
  subject: string;
  message: string;
  status: "open" | "closed" | "pending";
  createdAt: string;
}

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user.id;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios("/api/ticket");

        setTickets(response.data?.tickets);
      } catch (err) {
        console.log("🚀 ~ fetchTickets ~ err:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject || !message) return;

    try {
      const res = await fetch("/api/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });

      if (!res.ok) throw new Error("ارسال ناموفق بود");

      const { ticket } = await res.json();
      setTickets([ticket, ...tickets]);
      setShowForm(false);
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error("❌ خطا در ارسال تیکت:", err);
    }
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between'>
        <h2 className='text-2xl font-bold text-darker-black/70 mb-4'>
          تیکت‌های پشتیبانی
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className='mt-6 px-10 bg-red hover:bg-red/70 transition text-light py-3 rounded-lg flex items-center justify-center gap-2'>
          {showForm ? <FaTimes /> : <FaPlus />}
          تیکت جدید
        </button>
      </div>
      {loading ? (
        <p className='text-gray-500'>در حال بارگذاری...</p>
      ) : tickets.length === 0 ? (
        <div className='text-center py-10 text-gray-500'>
          <FaInbox className='text-4xl mx-auto mb-2' />
          هیچ تیکتی ثبت نشده است.
        </div>
      ) : (
        <div className='grid gap-4'>
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              onClick={() =>
                router.push(`/user/${userId}/tickets/${ticket._id}`)
              }
              className='p-4 border-b border-darker-black/30 hover:shadow-md transition'>
              <div className='flex items-center justify-between'>
                <h3 className='font-semibold text-lg'>{ticket.subject}</h3>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    ticket.status === "open"
                      ? "bg-green/10 text-green"
                      : ticket.status === "closed"
                      ? "bg-red/10 text-red"
                      : "bg-orange/10 text-orange"
                  }`}>
                  {ticket.status === "open"
                    ? "باز"
                    : ticket.status === "closed"
                    ? "بسته"
                    : "در انتظار پاسخ"}
                </span>
              </div>
              <p className='text-sm text-gray-600 mt-2'>{ticket.message}</p>
              <p className='text-xs text-gray-400 mt-1'>
                تاریخ: {new Date(ticket.createdAt).toLocaleDateString("fa-IR")}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Ticket Form */}
      {showForm && (
        <div
          className='absolute top-0 bg-darker-black/50 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full'
          onClick={() => setShowForm(!showForm)}>
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className='p-10 border border-darker-black/20 rounded-lg flex flex-col gap-4 bg-light w-[50%]'>
            <p className='text-xl'>ارسال تیکت</p>
            <Input
              setValue={setSubject}
              value={subject}
              type='text'
              placeholder='موضوع'
            />
            <TextAreaInput
              onChange={setMessage}
              value={message}
              placeholder='توضیحات کامل'
            />
            <SubmitButton loading={loading} title='ارسال تیکت' type='submit' />
          </form>
        </div>
      )}
    </div>
  );
}
