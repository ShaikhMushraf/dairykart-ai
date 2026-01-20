"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

/**
 * Header Component
 * - Public users: Cart + Become Seller
 * - Seller users: Cart + Seller Dashboard
 * - Shows cart item count (UX feedback)
 */
export default function Header() {
  const { user } = useSelector((state: RootState) => state.auth);

  // ✅ NEW: Cart count from Redux
  const cartCount = useSelector(
    (state: RootState) => state.cart.items.length
  );

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-black text-white">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        🧺 DairyKart
      </Link>

      {/* Right Actions */}
      <div className="flex gap-4 items-center">
        {/* Cart always visible */}
        <Link
          href="/cart"
          className="px-3 py-1 bg-gray-800 rounded"
        >
          🛒 Cart ({cartCount})
        </Link>

        {/* Become Seller (only when NOT logged in) */}
        {!user && (
          <Link
            href="/seller/register"
            className="px-3 py-1 bg-green-600 rounded"
          >
            🏪 Become a Seller
          </Link>
        )}

        {/* Seller Dashboard */}
        {user?.role === "seller" && (
          <Link
            href="/seller/dashboard"
            className="px-3 py-1 bg-blue-600 rounded"
          >
            Seller Dashboard
          </Link>
        )}
      </div>
    </header>
  );
}
