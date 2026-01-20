"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Seller Authentication Page
 * - Handles Seller Login
 * - Handles Seller Registration
 * - Matches backend API contract exactly
 */
export default function SellerAuthPage() {
  const router = useRouter();

  // Toggle login / register
  const [isLogin, setIsLogin] = useState(true);

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Seller-only fields
  const [name, setName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  /**
   * Handle login or registration
   */
  const handleSubmit = async () => {
    const url = isLogin
      ? "/api/auth/login"
      : "/api/seller/register";

    // 🔥 IMPORTANT: body must match backend
    const body = isLogin
      ? { email, password }
      : {
          name,
          email,
          password,
          storeName,
          phone,
          address,
        };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Redirect seller
      router.push("/seller/dashboard");
    } catch (error) {
      console.error("SELLER AUTH ERROR:", error);
      alert("Network error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-14 bg-gray-900 p-6 rounded text-white shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? "Seller Login" : "Create Seller Account"}
      </h1>

      {/* Seller name */}
      {!isLogin && (
        <input
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      {/* Store name */}
      {!isLogin && (
        <input
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          placeholder="Store Name"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
      )}

      {/* Email */}
      <input
        className="w-full p-2 mb-3 bg-gray-800 rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <input
        type="password"
        className="w-full p-2 mb-3 bg-gray-800 rounded"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Phone */}
      {!isLogin && (
        <input
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      )}

      {/* Address */}
      {!isLogin && (
        <input
          className="w-full p-2 mb-4 bg-gray-800 rounded"
          placeholder="Store Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
      >
        {isLogin ? "Login" : "Register"}
      </button>

      <p
        className="mt-4 text-sm text-center cursor-pointer text-gray-400"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "New seller? Create an account"
          : "Already a seller? Login"}
      </p>

      <p className="mt-2 text-xs text-center text-gray-500">
        Forgot password? (coming soon)
      </p>
    </div>
  );
}
