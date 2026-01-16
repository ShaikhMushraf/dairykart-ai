"use client";

import { useDispatch } from "react-redux";
import { closeLoginModal } from "@/redux/slices/uiSlice";
import { loginSuccess } from "@/redux/slices/authSlice";
import { useState } from "react";

export default function LoginModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    localStorage.setItem("token", data.token);

    dispatch(
      loginSuccess({
        user: data.user,
        token: data.token,
      })
    );

    dispatch(closeLoginModal());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Login Required</h2>

        <input
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-4 bg-gray-800 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
