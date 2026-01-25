"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/types/product";

/**
 * SellerProductCard
 * -----------------
 * - Seller-only controls
 * - Update stock
 * - Toggle active/inactive
 * - Delete product
 */
interface Props {
  product: Product;
  refresh: () => void;
}

export default function SellerProductCard({ product, refresh }: Props) {
  const [stock, setStock] = useState(product.stock);
  const token = localStorage.getItem("token");

  const updateStock = async () => {
    await fetch(`/api/seller/products/${product._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ stock }),
    });

    refresh();
  };

  const toggleStatus = async () => {
    await fetch(`/api/seller/products/${product._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isActive: !product.isActive }),
    });

    refresh();
  };

  const deleteProduct = async () => {
    if (!confirm("Delete this product?")) return;

    await fetch(`/api/seller/products/${product._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    refresh();
  };

  return (
    <div className="bg-gray-900 p-4 rounded shadow text-white">
      <Image
        src={product.image || "/products/Cream Milk.jpeg"}
        alt={product.name}
        width={400}
        height={250}
        className="h-40 w-full object-cover rounded mb-3"
      />

      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-green-400">₹{product.price}</p>

      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        className="w-full mt-2 p-1 bg-gray-800 rounded"
      />

      <button
        onClick={updateStock}
        className="w-full mt-2 bg-blue-600 py-1 rounded"
      >
        Update Stock
      </button>

      <button
        onClick={toggleStatus}
        className={`w-full mt-2 py-1 rounded ${
          product.isActive ? "bg-yellow-600" : "bg-gray-600"
        }`}
      >
        {product.isActive ? "Mark Out of Stock" : "Mark In Stock"}
      </button>

      <button
        onClick={deleteProduct}
        className="w-full mt-2 bg-red-600 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
}
