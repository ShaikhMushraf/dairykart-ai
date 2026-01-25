"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { openSellerModal } from "@/redux/slices/uiSlice";
import { logout } from "@/redux/slices/authSlice";
import { clearCart } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";

export default function UserSidebar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    router.push("/");
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-4 space-y-4">
      <div className="font-bold text-lg">
        👤 {user?.firstName}
      </div>

      <nav className="space-y-2">
        <Link href="/orders" className="block hover:text-blue-400">
          📦 Orders
        </Link>

        <Link href="/profile" className="block hover:text-blue-400">
          ⚙️ Profile
        </Link>

        <button
          onClick={() => dispatch(openSellerModal())}
          className="block text-left w-full hover:text-green-400"
        >
          🏪 Switch to Seller
        </button>

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
