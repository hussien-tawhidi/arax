/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { HiUserCircle } from "react-icons/hi2";
import TextAreaInput from "@/components/ui/TextAreaInput";
import CustomStatusSelect from "@/components/ui/CustomStatusSelect";
const options = [
  { value: "open", label: "باز" },
  { value: "pending", label: "در انتظار" },
  { value: "closed", label: "بسته" },
];
export default function TicketDetails({ replier }: { replier: string }) {
  const { id } = useParams();
  const [ticket, setTicket] = useState<any>(null);
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      const res = await axios.get(`/api/ticket/reply/${id}`);
      setTicket(res.data.ticket);
      setStatus(res.data.ticket.status);
    };
    fetchTicket();
  }, [id]);

  const handleReply = async () => {
    if (!reply.trim()) return;

    setLoading(true);
    await axios.put(`/api/ticket/reply/${id}`, {
      message: reply,
      replier,
      status,
    });
    setReply("");
    const res = await axios.get(`/api/ticket/reply/${id}`);
    setTicket(res?.data?.ticket);
    setLoading(false);
  };

  if (!ticket)
    return <div className='p-6 text-gray-500'>در حال بارگذاری...</div>;

  return (
    <div className='p-6 space-y-6 max-w-3xl mx-auto'>
      <div className='bg-red text-light p-3 rounded-md'>
        <h2 className='text-2xl font-bold mb-1'>موضوع: {ticket.subject}</h2>
        <p className='p-4'>
          <strong className='block mb-1'>متن تیکت:</strong>
          {ticket.message}
        </p>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-darker-black/80'>پاسخ‌ها</h3>
        {ticket.replies.length === 0 && (
          <p className='text-sm text-gray-500'>هنوز پاسخی ثبت نشده است.</p>
        )}
        {ticket.replies.map((r: any, i: number) => (
          <div
            key={i}
            className={`flex items-start gap-3 p-4 rounded-lg shadow-sm ${
              r.sender === "admin"
                ? "bg-darker-black/10 border ml-5 border-darker-black/20"
                : "bg-darker-black/5 mr-5 border border-darker-black/20"
            }`}>
            <HiUserCircle className='w-8 h-8 text-darker-black/50' />
            <div>
              <p className='text-sm font-medium text-darker-black/80 mb-1'>
                {r.sender === "admin" ? "ادمین" : "کاربر"}
                <span className='text-xs text-gray-500 dark:text-gray-400 font-medium rtl:mr-1 ltr:ml-1 flex items-center'>
                  <svg
                    className='w-3 h-3 rtl:ml-1 ltr:mr-1'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  {new Date(r.createdAt).toLocaleDateString("fa-IR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </p>
              <p className='text-darker-black/70'>{r.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='space-y-4 pt-6'>
        <TextAreaInput
          onChange={setReply}
          value={reply}
          placeholder='پاسخ جدید خود را بنویسید...'
        />

        <div className=' flex items-center justify-between md:flex-row flex-col gap-3'>
          <CustomStatusSelect
            value={status}
            onChange={setStatus}
            options={options}
          />

          <button
            onClick={handleReply}
            disabled={loading || !reply.trim()}
            className={`px-5 py-2 rounded-md text-light font-medium transition ${
              loading || !reply.trim()
                ? "bg-red/40 cursor-not-allowed"
                : "bg-red hover:bg-red/90"
            }`}>
            {loading ? "در حال ارسال..." : "ارسال پاسخ"}
          </button>
        </div>
      </div>
    </div>
  );
}
