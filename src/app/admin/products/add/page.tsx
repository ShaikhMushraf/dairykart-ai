"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import type { AppDispatch } from "@/redux/store";
import { addProduct } from "@/redux/slices/productSlice";
import AdminGuard from "@/components/AdminGuard";

/**
 * Admin Add Product Page
 * - Admin only
 * - Submits product to backend
 * - Updates Redux
 */
export default function AddProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");

  /**
   * Submit handler
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(
      addProduct({
        name,
        price,
        description,
      })
    );

    // Redirect back to product list
    router.push("/admin/products");
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-2xl font-bold mb-6">➕ Add Product</h1>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <input
            type="text"
            placeholder="Product name"
            className="w-full p-2 bg-gray-800 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full p-2 bg-gray-800 rounded"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />

          <textarea
            placeholder="Description"
            className="w-full p-2 bg-gray-800 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Add Product
          </button>
        </form>
      </div>
    </AdminGuard>
  );
}
