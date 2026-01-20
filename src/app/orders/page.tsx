"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { fetchUserOrders } from "@/redux/slices/orderSlice";

export default function OrdersPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { orders, loading, error } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-white mt-10">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (orders.length === 0) {
    return (
      <p className="text-center text-white mt-10">
        No orders found 📦
      </p>
    );
  }

  return (
    <div className="p-6 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-900 p-4 rounded"
          >
            <p className="text-sm text-gray-400">
              Order ID: {order._id}
            </p>

            <p className="font-semibold">
              Total: ₹{order.totalAmount}
            </p>

            <p className="text-green-400">
              Status: {order.status}
            </p>

            <ul className="mt-2 text-sm text-gray-300">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
