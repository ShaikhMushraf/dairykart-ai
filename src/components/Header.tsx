"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

/**
 * Header Component
 * - Shows app title
 * - Shows cart icon with item count
 * - Uses Redux global state
 */
export default function Header() {
  const totalItems = useSelector(
    (state: RootState) =>
      state.cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
  );

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white">
      <Link href="/">
        <h1 className="text-xl font-bold">
          DairyKart 🥛
        </h1>
      </Link>

      <Link href="/cart" className="relative">
        <span className="text-2xl">🛒</span>

        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 py-1 rounded-full">
            {totalItems}
          </span>
        )}
      </Link>
    </header>
  );
}
