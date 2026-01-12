"use client";

import { Product } from "@/types/product";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import type { AppDispatch } from "@/redux/store";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="bg-gray-900 text-white rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src={product.image || "/placeholder.png"}
        alt={product.name}
        className="h-40 w-full object-cover rounded mb-3"
      />

      <h2 className="font-semibold text-lg">{product.name}</h2>

      {product.category && (
        <p className="text-sm text-gray-400">
          {product.category.name}
        </p>
      )}

      <p className="mt-2 text-green-400 font-bold">
        ₹{product.price}
      </p>

      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-3 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
