"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { openSellerModal, openLoginModal } from "@/redux/slices/uiSlice";
import UserMenu from "@/components/UserMenu";

export default function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const cartCount = useSelector(
    (state: RootState) => state.cart.items.length
  );

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-black text-white border-b border-gray-800">
      <Link href="/" className="text-xl font-bold">
        🧺 DairyKart
      </Link>

      <div className="flex items-center gap-4">
        {/* Cart (Public + User only) */}
        {(!user || user.role === "user") && (
          <Link href="/cart" className="bg-gray-800 px-3 py-1 rounded">
            🛒 Cart ({cartCount})
          </Link>
        )}

        {/* Switch to Seller (Public + User) */}
        {(!user || user.role === "user") && (
          <button
            onClick={() => dispatch(openSellerModal())}
            className="bg-green-600 px-3 py-1 rounded"
          >
            🏪 Switch to Seller
          </button>
        )}

        {/* Login (Public only) */}
        {!user && (
          <button
            onClick={() => dispatch(openLoginModal())}
            className="bg-blue-600 px-3 py-1 rounded"
          >
            🔐 Login
          </button>
        )}

        {/* Seller shortcut */}
        {user?.role === "seller" && (
          <Link
            href="/seller/dashboard"
            className="bg-blue-600 px-3 py-1 rounded"
          >
            Seller Dashboard
          </Link>
        )}

        {/* User Menu (User + Seller) */}
        {user && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">
              Hi, {user.firstName}
            </span>
            <UserMenu />
          </div>
        )}
      </div>
    </header>
  );
}
