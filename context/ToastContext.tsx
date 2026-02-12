"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiInfo, FiAlertCircle } from "react-icons/fi";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success": return <FiCheck className="text-[#B79F58]" />;
      case "error": return <FiAlertCircle className="text-red-500" />;
      case "info": return <FiInfo className="text-blue-500" />;
      default: return null;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="pointer-events-auto"
            >
              <div className="
                min-w-[320px] bg-[#F6F3EE] border border-[#B79F58]/30 shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                px-5 py-4 flex items-center gap-4 relative overflow-hidden
              ">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#B79F58]/10 flex items-center justify-center text-[18px]">
                  {getIcon(toast.type)}
                </div>
                <div className="flex-1">
                  <p className="text-[#12385C] font-body text-[13px] font-medium tracking-wide uppercase">
                    {toast.message}
                  </p>
                </div>
                
                {/* Progress bar */}
                <motion.div 
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 3, ease: "linear" }}
                  className="absolute bottom-0 left-0 h-[2px] bg-[#B79F58]/40"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
