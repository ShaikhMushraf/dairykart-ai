"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  address: string;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.status === 401) {
          router.push("/login");
          return;
        }

        const data = await res.json();
        setOrders(data);
      } catch {
        alert("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading) {
    return <p className="text-white text-center mt-10">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <p className="text-white text-center mt-10">
        No orders found 📦
      </p>
    );
  }

  return (
    <div className="p-6 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-900 p-4 rounded"
          >
            <div className="flex justify-between mb-2">
              <span className="text-gray-400 text-sm">
                {new Date(order.createdAt).toLocaleString()}
              </span>
              <span className="text-green-400 font-semibold">
                {order.status.toUpperCase()}
              </span>
            </div>

            {order.items.map((item, idx) => (
              <p key={idx} className="text-sm">
                {item.name} × {item.quantity} — ₹
                {item.price * item.quantity}
              </p>
            ))}

            <p className="mt-2 font-bold">
              Total: ₹{order.totalAmount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
