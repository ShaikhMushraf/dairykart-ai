"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import SellerAuthModal from "@/components/SellerAuthModal";

/**
 * SellerModalWrapper
 * ------------------
 * - Controls visibility of SellerAuthModal
 * - Opens ONLY when user clicks "Become Seller"
 */
export default function SellerModalWrapper() {
  const showSellerModal = useSelector(
    (state: RootState) => state.ui.showSellerModal
  );

  if (!showSellerModal) return null;

  return <SellerAuthModal />;
}
