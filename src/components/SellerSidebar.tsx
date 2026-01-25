"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { logout, loginSuccess } from "@/redux/slices/authSlice";
import { clearCart } from "@/redux/slices/cartSlice";
import { openLoginModal } from "@/redux/slices/uiSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Backup session type
 */
interface UserSessionBackup {
  user: RootState["auth"]["user"];
  token: string;
  ts: number;
}

export default function SellerSidebar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  /**
   * ✅ Freeze "now" ONCE (pure)
   */
  const [now] = useState<number>(() => Date.now());

  /**
   * ✅ Read backup ONCE (pure, lazy)
   */
  const [backup] = useState<UserSessionBackup | null>(() => {
    if (typeof window === "undefined") return null;

    const raw = localStorage.getItem("userSessionBackup");
    if (!raw) return null;

    try {
      return JSON.parse(raw) as UserSessionBackup;
    } catch {
      return null;
    }
  });

  /**
   * ✅ Fully pure derived value
   */
  const canSwitchToUser =
    !!backup && now - backup.ts <= 15 * 60 * 1000;

  const handleSwitchToUser = () => {
    if (canSwitchToUser && backup) {
      dispatch(
        loginSuccess({
          user: backup.user,
          token: backup.token,
        })
      );
      localStorage.removeItem("userSessionBackup");
      router.push("/");
    } else {
      localStorage.removeItem("userSessionBackup");
      dispatch(openLoginModal());
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    router.push("/");
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-4 space-y-4">
      <div className="font-bold text-lg">
        🏪 {user?.firstName}
      </div>

      <nav className="space-y-2">
        <Link
          href="/seller/dashboard"
          className="block hover:text-blue-400"
        >
          📦 Products
        </Link>

        <Link
          href="/seller/products/add"
          className="block hover:text-blue-400"
        >
          ➕ Add Product
        </Link>

        {backup && (
          <button
            onClick={handleSwitchToUser}
            className="block text-left w-full hover:text-green-400"
          >
            🔁 Switch to User
          </button>
        )}

        <button
          onClick={handleLogout}
          className="block text-left w-full text-red-400 hover:text-red-500"
        >
          🚪 Logout
        </button>
      </nav>
    </aside>
  );
}
