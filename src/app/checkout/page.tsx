"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { clearCart } from "@/redux/slices/cartSlice";
import { openLoginModal } from "@/redux/slices/uiSlice";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { items, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [address, setAddress] = useState("");

  /**
   * 🔐 Soft auth guard
   */
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
    }
  }, [isAuthenticated, dispatch]);

  /**
   * Place Order
   */
  const handlePlaceOrder = async () => {
    if (!address) {
      alert("Please enter delivery address");
      return;
    }

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        items: items.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount,
        address,
      }),
    });

    if (!res.ok) {
      alert("Order failed");
      return;
    }

    dispatch(clearCart());
    router.push("/orders");
  };

  if (items.length === 0) {
    return (
      <p className="text-center text-white mt-10">
        Cart is empty
      </p>
    );
  }

  return (
    <div className="p-6 text-white max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Checkout
      </h1>

      <textarea
        placeholder="Delivery Address"
        className="w-full p-3 bg-gray-800 rounded mb-4"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <div className="bg-gray-900 p-4 rounded">
        <h2 className="font-semibold mb-2">
          Order Total: ₹{totalAmount}
        </h2>

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 py-2 rounded mt-4"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
