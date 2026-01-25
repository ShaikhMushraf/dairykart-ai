"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { useState } from "react";
import { closeSellerModal } from "@/redux/slices/uiSlice";
import { loginSuccess } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import AuthModalShell from "@/components/AuthModalShell";

export default function SellerAuthModal() {
  const dispatch = useDispatch();
  const router = useRouter();
  const authUser = useSelector((state: RootState) => state.auth.user);

  const [mode, setMode] = useState<"login" | "register" | "forgot" | "sent">(
    "login"
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [storeName, setStoreName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        mode === "login" ? "/api/seller/login" : "/api/seller/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            mode === "login"
              ? { email, password }
              : {
                  firstName,
                  lastName,
                  email,
                  password,
                  storeName,
                  phone,
                  address,
                }
          ),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      // ✅ BACKUP USER SESSION BEFORE SWITCHING TO SELLER
     if (authUser?.role === "user") {
  localStorage.setItem(
    "userSessionBackup",
    JSON.stringify({
      user: authUser,
      token: localStorage.getItem("token"),
      ts: Date.now(), // ✅ timestamp
    })
  );
}

      dispatch(loginSuccess({ user: data.user, token: data.token }));
      dispatch(closeSellerModal());
      router.push("/seller/dashboard");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FORGOT PASSWORD ---------------- */
  const handleForgotPassword = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to send reset email");
        return;
      }

      setMode("sent");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthModalShell
      title={
        mode === "login"
          ? "Seller Login"
          : mode === "register"
          ? "Create Seller Account"
          : "Forgot Password"
      }
      type="seller"
      onBack={mode !== "login" ? () => setMode("login") : undefined}
    >
      {mode === "register" && (
        <>
          <input
            className="w-full p-2 mb-3 bg-gray-800 rounded"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={loading}
          />
          <input
            className="w-full p-2 mb-3 bg-gray-800 rounded"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={loading}
          />
          <input
            className="w-full p-2 mb-3 bg-gray-800 rounded"
            placeholder="Store Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            disabled={loading}
          />
          <input
            className="w-full p-2 mb-3 bg-gray-800 rounded"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
          />
          <input
            className="w-full p-2 mb-3 bg-gray-800 rounded"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={loading}
          />
        </>
      )}

      {mode !== "sent" && (
        <input
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      )}

      {(mode === "login" || mode === "register") && (
        <input
          type="password"
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={loading}
        />
      )}

      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

      {(mode === "login" || mode === "register") && (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 py-2 rounded font-semibold disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Login"
            : "Create Seller Account"}
        </button>
      )}

      {mode === "forgot" && (
        <button
          onClick={handleForgotPassword}
          disabled={loading}
          className="w-full bg-blue-600 py-2 rounded font-semibold disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      )}

      {mode === "sent" && (
        <div className="text-center space-y-4">
          <p className="text-green-400 font-semibold">
            Password reset link sent
          </p>
          <p className="text-sm text-gray-400">Please check your email.</p>
          <button
            onClick={() => setMode("login")}
            className="w-full bg-blue-600 py-2 rounded"
          >
            Back to Login
          </button>
        </div>
      )}

      <div className="text-sm text-center text-gray-400 mt-4 space-y-1">
        {mode === "login" && (
          <>
            <p
              className="cursor-pointer text-blue-400"
              onClick={() => setMode("register")}
            >
              New seller? Create account
            </p>
            <p
              className="cursor-pointer text-blue-400"
              onClick={() => setMode("forgot")}
            >
              Forgot password?
            </p>
          </>
        )}
      </div>
    </AuthModalShell>
  );
}
