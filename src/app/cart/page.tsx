"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "@/redux/slices/cartSlice";
import { openLoginModal } from "@/redux/slices/uiSlice";
import { useRouter } from "next/navigation";

/**
 * CartPage
 * --------
 * - Professional e-commerce style cart (Flipkart / Amazon inspired)
 * - No business logic changed
 * - Checkout flow remains intact
 */
export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { items, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  /**
   * Checkout handler
   * 🔐 Login enforced ONLY here (unchanged logic)
   */
  const handleCheckout = () => {
    if (!isAuthenticated) {
      localStorage.setItem("postLoginRedirect", "/checkout");
      dispatch(openLoginModal());
      return;
    }

    router.push("/checkout");
  };

  /**
   * Empty cart UI
   */
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-white">
        <h2 className="text-3xl font-bold mb-2">
          Your cart is empty 🛒
        </h2>
        <p className="text-gray-400">
          Looks like you haven’t added anything yet
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 text-white">
      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart
      </h1>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-gray-900 p-5 rounded-lg border border-gray-800"
            >
              {/* Product Info */}
              <div>
                <h3 className="text-lg font-semibold">
                  {item.name}
                </h3>
                <p className="text-green-400 font-bold mt-1">
                  ₹{item.price}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      dispatch(decreaseQty(item._id))
                    }
                    className="h-8 w-8 flex items-center justify-center bg-gray-800 rounded hover:bg-gray-700"
                  >
                    −
                  </button>

                  <span className="min-w-6 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(increaseQty(item._id))
                    }
                    className="h-8 w-8 flex items-center justify-center bg-gray-800 rounded hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={() =>
                  dispatch(removeFromCart(item._id))
                }
                className="text-sm text-red-400 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4">
            Price Details
          </h2>

          <div className="flex justify-between text-gray-300 mb-2">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>

          <div className="flex justify-between text-gray-300 mb-2">
            <span>Delivery</span>
            <span className="text-green-400">FREE</span>
          </div>

          <div className="border-t border-gray-700 my-3" />

          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded font-semibold"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={() => dispatch(clearCart())}
            className="w-full mt-3 bg-gray-800 hover:bg-gray-700 py-2 rounded text-sm"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
