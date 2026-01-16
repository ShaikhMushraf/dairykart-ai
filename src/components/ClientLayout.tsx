"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import Header from "@/components/Header";
import LoginModal from "@/components/LoginModal";

/**
 * ClientLayout
 * - Runs on client
 * - Can safely use Redux hooks
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
      {showLoginModal && <LoginModal />}
      {children}
    </>
  );
}
