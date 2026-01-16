"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { clearCart } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Only select what is actually used
  const { items, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  const [address, setAddress] = useState("");

  /**
   * Place order handler
   * - Calls backend Orders API
   * - Clears cart on success
   * - Redirects user
   */
  const handlePlaceOrder = async () => {
    if (!address) {
      alert("Please enter delivery address");
      return;
    }

    try {
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
        throw new Error("Order failed");
      }

      dispatch(clearCart());
      alert("Order placed successfully 🎉");
      router.push("/orders");
    } catch {
  alert("Something went wrong");
}

  };

  return (
    <div className="p-6 text-white max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

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
