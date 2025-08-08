/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineTicket } from "react-icons/hi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaInbox } from "react-icons/fa";
import axios from "axios";
import LoadingMessage from "@/components/ui/Loader";

export default function TicketLists() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/ticket");
        console.log("🚀 ~ fetchTickets ~ response:", response);

        setTickets(response.data.tickets || []);
      } catch (err) {
        console.error("Failed to load tickets", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className='p-6 max-w-5xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2'>
        <HiOutlineTicket className='w-6 h-6 text-blue-600' />
        لیست تیکت‌ها
      </h1>
      {loading ? (
        <LoadingMessage />
      ) : tickets.length === 0 ? (
        <div className='text-center py-10 text-gray-500'>
          <FaInbox className='text-4xl mx-auto mb-2' />
          هیچ تیکتی ثبت نشده است.
        </div>
      ) : (
        <div className='space-y-4'>
          {tickets.map((t: any) => (
            <Link
              href={`/admin/tickets/${t._id}`}
              key={t._id}
              className='flex justify-between items-center bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 transition duration-200'>
              <div>
                <p className='font-medium text-gray-800'>
                  <span className='text-sm text-gray-500 mr-2'>موضوع:</span>
                  {t.subject}
                </p>
                <p className='text-sm text-gray-500 mt-1'>
                  شناسه:{" "}
                  <span className='ltr:text-left rtl:text-right'>{t._id}</span>
                </p>
              </div>

              <div className='flex items-center gap-3'>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                    t.status === "closed"
                      ? "bg-red-100 text-red-700"
                      : t.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-700"
                  }`}>
                  {t.status === "open"
                    ? "باز"
                    : t.status === "pending"
                    ? "در انتظار"
                    : "بسته"}
                </span>
                <MdOutlineKeyboardArrowRight className='text-gray-400 w-5 h-5' />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
