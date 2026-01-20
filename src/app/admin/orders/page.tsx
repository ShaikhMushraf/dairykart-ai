"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { fetchUserOrders } from "@/redux/slices/orderSlice";

export default function AdminOrdersPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { orders, loading } = useSelector(
    (state: RootState) => state.orders // ✅ FIXED
  );

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (loading) {
    return <p className="text-white p-6">Loading orders...</p>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-gray-900 p-4 rounded mb-4"
        >
          <p>Total: ₹{order.totalAmount}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
}
