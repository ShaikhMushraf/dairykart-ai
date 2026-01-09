"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { loginSuccess } from "@/redux/slices/authSlice";

/**
 * Temporary Home page to test real login
 */
export default function Home() {
  // ✅ Typed dispatch
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Typed selector
  const auth = useSelector((state: RootState) => state.auth);

  /**
   * Calls backend login API
   * On success, updates Redux state
   */
  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ Update Redux with backend response
      dispatch(
        loginSuccess({
          user: data.user,
          token: data.token,
        })
      );
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-4">DairyKart AI 🚀</h1>

      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Login with Backend API
      </button>

      {/* ✅ FIXED UI COLORS */}
      <pre className="mt-4 bg-gray-900 text-green-400 p-4 rounded text-sm overflow-auto">
        {JSON.stringify(auth, null, 2)}
      </pre>
    </div>
  );
}
