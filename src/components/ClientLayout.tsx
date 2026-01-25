"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import Header from "@/components/Header";
import LoginModal from "@/components/LoginModal";
import SellerModalWrapper from "@/components/SellerModalWrapper";

/**
 * ClientLayout
 * ------------
 * - Central place for ALL modals
 * - Nothing opens unless Redux explicitly allows it
 */
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const showLoginModal = useSelector(
    (state: RootState) => state.ui.showLoginModal
  );

  return (
    <>
      <Header />

      {/* User login modal (checkout flow) */}
      {showLoginModal && <LoginModal />}

      {/* Seller login/register modal (Become Seller flow) */}
      <SellerModalWrapper />

      {children}
    </>
  );
}
