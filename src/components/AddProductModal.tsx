"use client";

import { useState } from "react";

/**
 * Add Product Modal
 * - Clean popup UI
 * - Saves product via API
 */
export default function AddProductModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState("");
  const [stock, setStock] = useState<number>(1);
  const [category, setCategory] = useState("");

  const token = localStorage.getItem("token");

  const saveProduct = async () => {
    await fetch("/api/seller/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        price,
        image,
        stock,
        category,
      }),
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">
          Add New Product
        </h2>

        <input
          className="w-full mb-2 p-2 border"
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-2 p-2 border"
          placeholder="Category (Milk, Curd...)"
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          className="w-full mb-2 p-2 border"
          placeholder="Price"
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <input
          className="w-full mb-2 p-2 border"
          placeholder="Image URL"
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          type="number"
          className="w-full mb-4 p-2 border"
          placeholder="Stock"
          onChange={(e) => setStock(Number(e.target.value))}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={saveProduct}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
