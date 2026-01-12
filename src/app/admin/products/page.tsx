"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { fetchProducts, deleteProduct } from "@/redux/slices/productSlice";
import AdminGuard from "@/components/AdminGuard";

export default function AdminProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-2xl font-bold mb-4">📦 Products</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <ul className="space-y-3">
          {items.map((product) => (
            <li
              key={product._id}
              className="bg-gray-900 p-4 rounded"
            >
              <h2>{product.name}</h2>
              <p>₹{product.price}</p>

              <button
                className="text-red-400 mt-2"
                onClick={() => dispatch(deleteProduct(product._id))}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </AdminGuard>
  );
}
