"use client";

import { useState } from "react";

export default function AddProductModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(1);
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const uploadImage = async () => {
    if (!file) return "";

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url;
  };

  const saveProduct = async () => {
    setLoading(true);

    const imageUrl = await uploadImage();

    await fetch("/api/seller/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        price,
        image: imageUrl,
        stock,
        category,
      }),
    });

    setLoading(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>

        <input
          className="w-full mb-2 p-2 border"
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-2 p-2 border"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          className="w-full mb-2 p-2 border"
          placeholder="Price"
          onChange={(e) => setPrice(+e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="w-full mb-2"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <input
          type="number"
          className="w-full mb-4 p-2 border"
          placeholder="Stock"
          onChange={(e) => setStock(+e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={saveProduct}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Uploading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
