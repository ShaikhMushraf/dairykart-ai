"use client"; // Required because we use hooks & Redux

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "@/redux/slices/cartSlice";
import { openLoginModal } from "@/redux/slices/uiSlice";

/**
 * Cart Page
 * - Guest users can reach page
 * - If not authenticated → login modal opens
 */
export default function CartPage() {
  // ✅ SINGLE dispatch (fixed)
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Cart state
  const { items, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  // ✅ Auth state
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  /**
   * 🔐 Soft auth guard
   * Opens login modal instead of redirect
   */
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(openLoginModal()); // ✅ ADDED
    }
  }, [isAuthenticated, dispatch]);

  /**
   * Empty cart UI
   */
  if (items.length === 0) {
    return (
      <div className="p-6 text-center text-white">
        <h2 className="text-2xl font-bold">
          Your cart is empty 🛒
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Your Cart
      </h1>

      {/* Cart items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center bg-gray-900 p-4 rounded"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-green-400">
                ₹{item.price}
              </p>

              {/* Quantity controls */}
              <div className="flex items-center mt-2 gap-2">
                <button
                  onClick={() =>
                    dispatch(decreaseQty(item._id))
                  }
                  className="px-3 bg-gray-700 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    dispatch(increaseQty(item._id))
                  }
                  className="px-3 bg-gray-700 rounded"
                >
                  +
                </button>
              </div>
            </div>

            {/* Remove item */}
            <button
              onClick={() =>
                dispatch(removeFromCart(item._id))
              }
              className="text-red-400 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Cart summary */}
      <div className="mt-8 border-t border-gray-700 pt-4">
        <h2 className="text-xl font-bold">
          Total: ₹{totalAmount}
        </h2>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Clear Cart
          </button>

          <button className="bg-green-600 px-4 py-2 rounded">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
