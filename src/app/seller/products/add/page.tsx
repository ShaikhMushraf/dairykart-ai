"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/slices/productSlice";
import type { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState("");
  const [stock, setStock] = useState<number>(1);

  const handleSubmit = async () => {
    if (!name || price <= 0 || stock < 0) {
      alert("Please enter valid product details");
      return;
    }

    await dispatch(
      addProduct({
        name,
        price,
        image,
        stock, // ✅ VALID
      })
    );

    router.push("/seller/dashboard");
  };

  return (
    <div className="p-6 text-white max-w-md">
      <h1 className="text-2xl mb-4 font-bold">➕ Add Product</h1>

      <input
        className="w-full mb-3 p-2 bg-gray-800 rounded"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full mb-3 p-2 bg-gray-800 rounded"
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      <input
        className="w-full mb-3 p-2 bg-gray-800 rounded"
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <input
        className="w-full mb-4 p-2 bg-gray-800 rounded"
        placeholder="Stock Quantity"
        type="number"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 px-4 py-2 rounded w-full hover:bg-green-700"
      >
        Save Product
      </button>
    </div>
  );
}
