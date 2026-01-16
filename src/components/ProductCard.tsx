"use client";

import { Product } from "@/types/product";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import type { AppDispatch } from "@/redux/store";

interface Props {
  product: Product;
}

/**
 * Product Card
 * Converts Product → CartItem before dispatch
 */
export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1, // 🔥 REQUIRED
      })
    );
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src={product.image || "/placeholder.png"}
        alt={product.name}
        className="h-40 w-full object-cover rounded mb-3"
      />

      <h2 className="text-lg font-semibold">{product.name}</h2>

      {product.category && (
        <p className="text-sm text-gray-400">
          {product.category.name}
        </p>
      )}

      <p className="mt-2 text-green-400 font-bold">
        ₹{product.price}
      </p>

      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
