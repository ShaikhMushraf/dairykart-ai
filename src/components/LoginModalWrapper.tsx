"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import LoginModal from "./LoginModal";

export default function LoginModalWrapper() {
  const showLoginModal = useSelector(
    (state: RootState) => state.ui.showLoginModal
  );

  if (!showLoginModal) return null;

  return <LoginModal />;
}
/**
 * Controls visibility of login modal globally
 * Uses Redux UI slice
 */
