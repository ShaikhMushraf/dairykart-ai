"use client";

import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { closeLoginModal, closeSellerModal } from "@/redux/slices/uiSlice";

interface Props {
  title: string;
  onBack?: () => void;
  children: ReactNode;
  type: "user" | "seller" | "admin";
}

export default function AuthModalShell({
  title,
  onBack,
  children,
  type,
}: Props) {
  const dispatch = useDispatch();

  const handleClose = () => {
    if (type === "seller") dispatch(closeSellerModal());
    else dispatch(closeLoginModal());
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded w-96 shadow-xl relative">
        {/* 🔙 Back Arrow */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute left-4 top-4 text-gray-400 hover:text-white"
          >
            ←
          </button>
        )}

        {/* ❌ Close */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-4">
          {title}
        </h2>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
