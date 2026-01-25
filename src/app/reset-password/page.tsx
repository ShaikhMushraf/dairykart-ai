"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { openLoginModal } from "@/redux/slices/uiSlice";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get("token");

  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    setError("");
    setMessage("");

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    alert("Password reset successful. Please login again.");

    // Redirect to home
    window.location.href = "/";

    // Open login modal after redirect
    setTimeout(() => {
      dispatch(openLoginModal());
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-6 rounded w-96 text-white">
        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleReset()}
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {message && <p className="text-green-400 text-sm">{message}</p>}

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 py-2 rounded mt-4"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
