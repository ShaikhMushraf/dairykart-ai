"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

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

    if (data.user.role !== "admin") {
      alert("Admin access only");
      return;
    }

    localStorage.setItem("token", data.token);

    dispatch(
      loginSuccess({
        user: data.user,
        token: data.token,
      })
    );

    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded w-96">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

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
