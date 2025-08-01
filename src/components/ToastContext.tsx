// components/toast/ToastContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { BiError } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

interface ToastContextType {
  addToast: (
    message: string,
    type?: Toast["type"],
    position?: Toast["position"]
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

let toastId = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (
    message: string,
    type: Toast["type"] = "info",
    position: Toast["position"] = "top-right"
  ) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type, position }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const getPositionClass = (position: Toast["position"]) => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      default:
        return "top-4 right-4";
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {["top-right", "top-left", "bottom-left", "bottom-right"].map((pos) => (
        <div
          key={pos}
          className={`fixed z-[9999] space-y-2 ${getPositionClass(
            pos as Toast["position"]
          )}`}>
          {toasts
            .filter((toast) => toast.position === pos)
            .map((toast) => (
              <div
                key={toast.id}
                className={`flex items-center justify-between gap-4 px-4 py-2 rounded-lg shadow-lg  w-full animate-fade-in ${
                  toast.type === "success"
                    ? "bg-[#d4ecde] text-darker-black/70"
                    : toast.type === "error"
                    ? "bg-[#8b0000] text-[#fff]"
                    : "bg-[#fff] text-[#474747]"
                }`}>
                <div className='flex items-center gap-2'>
                  {toast.type === "success" && (
                    <FaCheck className='text-[#318253]' />
                  )}
                  {toast.type === "error" && (
                    <BiError className='text-xl text-[#8b0000]' />
                  )}
                  {toast.type === "info" && <FcInfo className='text-xl ' />}
                  <span className='text-sm'>{toast.message}</span>
                </div>
                <button onClick={() => removeToast(toast.id)}>
                  <CgClose size={16} />
                </button>
              </div>
            ))}
        </div>
      ))}
    </ToastContext.Provider>
  );
};
