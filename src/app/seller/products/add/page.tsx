"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(1);
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

  const handleSave = async () => {
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
    router.push("/seller/dashboard");
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <div className="bg-gray-900 p-6 rounded space-y-5">
        <input
          className="w-full p-2 bg-gray-800 rounded"
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 bg-gray-800 rounded"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        />

        <div className="flex gap-4">
          <input
            type="number"
            className="w-full p-2 bg-gray-800 rounded"
            placeholder="Price"
            onChange={(e) => setPrice(+e.target.value)}
          />

          <input
            type="number"
            className="w-full p-2 bg-gray-800 rounded"
            placeholder="Stock"
            onChange={(e) => setStock(+e.target.value)}
          />
        </div>

        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </div>
  );
}
