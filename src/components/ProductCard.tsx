"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import type { Product } from "@/types/product";
import type { AppDispatch } from "@/redux/store";

/**
 * ProductCard
 * -----------
 * - User-facing card
 * - Add product to cart
 * - NO seller logic here
 */
interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );
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

      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-green-400 font-bold">₹{product.price}</p>

      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-blue-600 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
